import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/shared/stripe';
import { prisma } from '@/shared/prisma';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
    const sig = req.headers.get('stripe-signature')!;
    const buf = Buffer.from(await req.arrayBuffer());

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!,
        );
    } catch (e: any) {
        return new NextResponse(`Bad signature: ${e.message}`, { status: 400 });
    }

    if (event.type !== 'checkout.session.completed') {
        return NextResponse.json({ received: true });
    }

    const raw = event.data.object as Stripe.Checkout.Session;

    const paid =
        raw.payment_status === 'paid' ||
        (raw.payment_intent &&
            typeof raw.payment_intent !== 'string' &&
            raw.payment_intent.status === 'succeeded');

    if (!paid)
        return NextResponse.json({ received: true, skipped: 'not paid' });

    const userId = raw.metadata?.userId;
    if (!userId || raw.metadata?.skipSave === '1') {
        return NextResponse.json({ received: true, skipped: 'anonymous' });
    }

    const session = await stripe.checkout.sessions.retrieve(raw.id, {
        expand: ['line_items.data.price.product'],
    });

    const items = (session.line_items?.data ?? []).map((li) => {
        const qty = li.quantity ?? 1;
        const unit = li.price?.unit_amount ?? 0;
        const prod = li.price?.product as Stripe.Product | null;
        return {
            title: prod?.name ?? li.description ?? 'Item',
            unitPrice: unit,
            quantity: qty,
            image: prod?.images?.[0],
        };
    });

    await prisma.order.create({
        data: {
            sessionId: session.id,
            userId,
            email: session.customer_details?.email ?? undefined,
            currency: session.currency ?? 'usd',
            amountTotal: session.amount_total ?? 0,
            items: { create: items },
        },
    });

    return NextResponse.json({ received: true, saved: true });
}
