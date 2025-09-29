export type OrderItemInput = {
    title: string;
    unitPrice: number;
    quantity: number;
    image?: string;
};

export type OrderCreateInput = {
    sessionId: string;
    userId: string;
    email?: string;
    currency: string;
    amountTotal: number;
    items: OrderItemInput[];
};

export type OrderRecord = {
    id: string;
    sessionId: string;
    userId: string;
    email: string | null;
    currency: string;
    amountTotal: number;
    createdAt: Date;
    items?: Array<{
        id: string;
        title: string;
        unitPrice: number;
        quantity: number;
        image?: string | null;
    }>;
};

export type StripeWebhookHandleResult =
    | { received: true }
    | {
          received: true;
          skipped: 'not paid' | 'anonymous' | 'duplicate';
          saved?: false;
      }
    | { received: true; saved: true };

export type OrderListOptions = {
    take?: number;
    skip?: number;
    includeItems?: boolean;
    order?: 'asc' | 'desc';
};

export type OrderListResult = { total: number; data: OrderRecord[] };
