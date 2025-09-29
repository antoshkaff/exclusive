import { prisma } from '@/shared/prisma';
import type {
    OrderCreateInput,
    OrderListOptions,
    OrderListResult,
    OrderRecord,
} from '@/modules/order/order.types';
import { Prisma } from '@prisma/client';

export class OrdersDao {
    static async findBySessionId(
        sessionId: string,
    ): Promise<OrderRecord | null> {
        return prisma.order.findUnique({ where: { sessionId } });
    }

    static async createOrderWithItems(
        data: OrderCreateInput,
    ): Promise<OrderRecord> {
        return prisma.$transaction(async (tx) => {
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
            } catch (e: unknown) {
                if (
                    e instanceof Prisma.PrismaClientKnownRequestError &&
                    e.code === 'P2002'
                ) {
                    const existing = await tx.order.findUnique({
                        where: { sessionId: data.sessionId },
                    });
                    if (existing) return existing as OrderRecord;
                }
                throw e;
            }
        });
    }

    static async findManyByUserId(
        userId: string,
        options: OrderListOptions = {},
    ): Promise<OrderListResult> {
        const {
            take = 20,
            skip = 0,
            includeItems = true,
            order = 'desc',
        } = options;

        const where = { userId };
        const [total, data] = await Promise.all([
            prisma.order.count({ where }),
            prisma.order.findMany({
                where,
                orderBy: { createdAt: order },
                take,
                skip,
                include: {
                    items: includeItems,
                },
            }),
        ]);

        return { total, data };
    }
}
