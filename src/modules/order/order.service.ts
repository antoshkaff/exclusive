import Stripe from 'stripe';
import { OrdersDao } from './order.dao';
import { stripe } from '@/shared/stripe';
import {
    OrderItemInput,
    OrderListOptions,
    OrderListResult,
    StripeWebhookHandleResult,
} from '@/modules/order/order.types';

class HttpError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public publicMessage: string = message,
    ) {
        super(message);
    }
}

export class OrdersService {
    private static readonly webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    static async handleStripeWebhook({
        rawBody,
        signature,
    }: {
        rawBody: Buffer;
        signature: string;
    }): Promise<StripeWebhookHandleResult> {
        const event = this.verifySignature(rawBody, signature);

        if (event.type !== 'checkout.session.completed') {
            return { received: true };
        }

        const raw = event.data.object as Stripe.Checkout.Session;

        const paid =
            raw.payment_status === 'paid' ||
            (raw.payment_intent &&
                typeof raw.payment_intent !== 'string' &&
                raw.payment_intent.status === 'succeeded');

        if (!paid) return { received: true, skipped: 'not paid' };

        const userId = raw.metadata?.userId;
        if (!userId || raw.metadata?.skipSave === '1') {
            return { received: true, skipped: 'anonymous' };
        }

        const session = await stripe.checkout.sessions.retrieve(raw.id, {
            expand: ['line_items.data.price.product'],
        });

        const existing = await OrdersDao.findBySessionId(session.id);
        if (existing)
            return { received: true, saved: false, skipped: 'duplicate' };

        const items: OrderItemInput[] = (session.line_items?.data ?? []).map(
            (li) => {
                const qty = li.quantity ?? 1;
                const unit = li.price?.unit_amount ?? 0;
                const prod = li.price?.product as Stripe.Product | null;
                return {
                    title: prod?.name ?? li.description ?? 'Item',
                    unitPrice: unit,
                    quantity: qty,
                    image: prod?.images?.[0],
                };
            },
        );

        await OrdersDao.createOrderWithItems({
            sessionId: session.id,
            userId,
            email: session.customer_details?.email ?? undefined,
            currency: session.currency ?? 'usd',
            amountTotal: session.amount_total ?? 0,
            items,
        });

        return { received: true, saved: true };
    }

    static async getOrdersByUserId(
        userId: string,
        options: OrderListOptions = {},
    ): Promise<OrderListResult> {
        return OrdersDao.findManyByUserId(userId, options);
    }

    private static verifySignature(
        rawBody: Buffer,
        signature: string,
    ): Stripe.Event {
        try {
            return stripe.webhooks.constructEvent(
                rawBody,
                signature,
                this.webhookSecret,
            );
        } catch (e: unknown) {
            const baseErr = e instanceof Error ? e : new Error(String(e));
            throw new HttpError(
                `Bad signature: ${baseErr.message}`,
                400,
                `Bad signature: ${baseErr.message}`,
            );
        }
    }
}
