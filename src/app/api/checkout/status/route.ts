import { NextResponse } from 'next/server';
import { stripe } from '@/shared/stripe';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    if (!sessionId)
        return NextResponse.json(
            { error: 'sessionId required' },
            { status: 400 },
        );

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent'],
    });

    const paid =
        session.payment_status === 'paid' ||
        (session.payment_intent &&
            typeof session.payment_intent !== 'string' &&
            session.payment_intent.status === 'succeeded');

    return NextResponse.json({
        paid,
        status: session.payment_status,
    });
}
