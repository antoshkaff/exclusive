import { NextResponse } from 'next/server';
import { CheckoutService } from '@/modules/checkout/checkout.service';
import type { ICartItem } from '@/shared/types/cart.interface';

export async function POST(req: Request) {
    try {
        const body = (await req.json().catch(() => null)) as ICartItem[] | null;
        if (!body) {
            return NextResponse.json(
                { error: 'Invalid JSON' },
                { status: 400 },
            );
        }

        const session = await CheckoutService.createPayment(body);
        return NextResponse.json(
            { url: session.url, id: session.id },
            { status: 200 },
        );
    } catch (e) {
        const msg = (e as Error)?.message || 'Internal error';

        if (msg === 'Cart is empty' || msg === 'Invalid product data') {
            return NextResponse.json({ error: msg }, { status: 400 });
        }
        if (msg === 'Failed to create payment session') {
            return NextResponse.json({ error: msg }, { status: 502 });
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
