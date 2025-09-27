import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set('auth', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });

    return res;
}
