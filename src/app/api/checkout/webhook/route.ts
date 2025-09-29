import { NextRequest, NextResponse } from 'next/server';
import { OrdersService } from '@/modules/order/order.service';

type HttpError = Error & { statusCode?: number; publicMessage?: string };

function toHttpError(err: unknown): HttpError {
    if (err instanceof Error) return err as HttpError;
    return { name: 'Error', message: String(err) } as HttpError;
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
        return new NextResponse('Missing stripe-signature header', {
            status: 400,
        });
    }

    const rawBody = Buffer.from(await req.arrayBuffer());

    try {
        const result = await OrdersService.handleStripeWebhook({
            rawBody,
            signature,
        });
        return NextResponse.json(result);
    } catch (err: unknown) {
        const e = toHttpError(err);
        const status = e.statusCode ?? 500;
        const message = e.publicMessage ?? 'Webhook processing failed';
        return new NextResponse(message, { status });
    }
}
