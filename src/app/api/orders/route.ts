import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/shared/utils/jwt';
import { OrdersService } from '@/modules/order/order.service';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('auth')?.value;

    const auth = await verifyToken(token);
    if (!auth) return new NextResponse('Unauthorized', { status: 401 });

    const userId = auth.id;
    if (!userId)
        return new NextResponse('Invalid token payload (no userId)', {
            status: 401,
        });

    const { searchParams } = new URL(req.url);
    const take = Math.min(Number(searchParams.get('take') ?? '20'), 100);
    const skip = Number(searchParams.get('skip') ?? '0');
    const order = (searchParams.get('order') as 'asc' | 'desc') ?? 'desc';

    const result = await OrdersService.getOrdersByUserId(userId, {
        take,
        skip,
        order,
    });
    return NextResponse.json(result);
}
