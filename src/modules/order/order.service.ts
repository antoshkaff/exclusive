import Stripe from 'stripe';
import { OrderDAO, OrderItemInput } from './order.dao';

export const OrderService = {
    mapSessionToOrderData(session: Stripe.Checkout.Session) {
        const items: OrderItemInput[] = (session.line_items?.data ?? []).map(
            (li) => {
                const qty = li.quantity ?? 1;
                const unit = li.price?.unit_amount ?? 0;
                const prod = li.price?.product as Stripe.Product | null;

                const title = prod?.name ?? li.description ?? 'Item';
                const image = prod?.images?.[0];

                return {
                    title,
                    unitPrice: unit,
                    quantity: qty,
                    image,
                };
            },
        );

        return {
            sessionId: session.id,
            email: session.customer_details?.email ?? null,
            currency: session.currency ?? 'usd',
            amountTotal: session.amount_total ?? 0,
            items,
        };
    },

    async savePaidOrderIfNeeded(
        raw: Stripe.Checkout.Session,
        expanded: Stripe.Checkout.Session,
    ) {
        const isPaid =
            raw.payment_status === 'paid' ||
            (raw.payment_intent &&
                typeof raw.payment_intent !== 'string' &&
                raw.payment_intent.status === 'succeeded');

        if (!isPaid) return { skipped: 'not paid' as const };

        const existing = await OrderDAO.findBySessionId(expanded.id);
        if (existing) return { skipped: 'exists' as const, order: existing };

        const data = this.mapSessionToOrderData(expanded);
        const order = await OrderDAO.createWithItems(data);
        return { saved: true as const, order };
    },
};
