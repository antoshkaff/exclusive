import { prisma } from '@/shared/prisma';
import type { OrderCreateInput, OrderRecord } from '@/modules/orders/types';

class OrdersDao {
    async findBySessionId(sessionId: string): Promise<OrderRecord | null> {
        return prisma.order.findUnique({ where: { sessionId } });
    }

    /**
     * Creates Order and nested OrderItems in a single transaction.
     * Adds minimal idempotency protection at DB level via unique sessionId.
     */
    async createOrderWithItems(data: OrderCreateInput): Promise<OrderRecord> {
        return prisma.$transaction(async (tx) => {
            // In case route-level check raced, rely on unique index on sessionId
            try {
                const created = await tx.order.create({
                    data: {
                        sessionId: data.sessionId,
                        userId: data.userId,
                        email: data.email,
                        currency: data.currency,
                        amountTotal: data.amountTotal,
                        items: {
                            create: data.items.map((it) => ({
                                title: it.title,
                                unitPrice: it.unitPrice,
                                quantity: it.quantity,
                                image: it.image,
                            })),
                        },
                    },
                });
                return created as OrderRecord;
            } catch (e: any) {
                if (e.code === 'P2002') {
                    const existing = await tx.order.findUnique({
                        where: { sessionId: data.sessionId },
                    });
                    if (existing) return existing as OrderRecord;
                }
                throw e;
            }
        });
    }
}
