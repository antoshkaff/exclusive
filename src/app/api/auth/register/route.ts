import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);
        const result = await AuthService.registerUser(body);

        if (!result.ok) {
            return NextResponse.json(
                { error: result.error },
                { status: result.status },
            );
        }

        return NextResponse.json(
            { data: result.data },
            { status: result.status },
        );
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
