import { ICartItem } from '@/shared/types/cart.interface';
import { CheckoutStartResult, StatusResponse } from './checkout.types';

export async function apiCheckout(
    items: ICartItem[],
): Promise<CheckoutStartResult> {
    const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
    });
    if (!res.ok) throw new Error('Failed to create checkout session');
    return res.json();
}

export async function apiGetStatus(sessionId: string): Promise<StatusResponse> {
    const res = await fetch(`/api/checkout/status?sessionId=${sessionId}`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch status');
    return res.json();
}
