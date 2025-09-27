export type CheckoutStartResult = { id: string; url: string };
export type CheckoutStatus = 'unpaid' | 'paid' | 'no_payment_required';

export type StatusResponse = {
    paid: boolean;
    status: CheckoutStatus;
    orderId?: string | null;
};
