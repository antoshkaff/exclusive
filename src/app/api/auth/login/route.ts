import { NextResponse } from 'next/server';
import { AuthService } from '@/modules/auth/auth.service';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);
        const result = await AuthService.loginUser(body);

        if (!result.ok) {
            return NextResponse.json(
                { error: result.error },
                { status: result.status },
            );
        }

        const res = NextResponse.json(
            { data: result.data },
            { status: result.status },
        );

        if (result.token) {
            res.cookies.set('auth', result.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        return res;
    } catch (e) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
