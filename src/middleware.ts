import { NextRequest, NextResponse } from 'next/server';
import { PRIVATE_ROUTES, ROUTES } from '@/config/routes.config';
import { verifyToken } from '@/shared/utils/jwt';

const PRIVATE_PATHS = Object.values(PRIVATE_ROUTES);

const isPrivateRoute = (path: string) => {
    const pathname = path.split('?')[0].replace(/\/+$/, '') || '/';
    return PRIVATE_PATHS.some(
        (p) => pathname === p || pathname.startsWith(p + '/'),
    );
};

export const middleware = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    if (!isPrivateRoute(pathname)) return NextResponse.next();

    const token = req.cookies.get('auth')?.value;
    const auth = await verifyToken(token);

    if (!auth) {
        const url = req.nextUrl.clone();
        url.pathname = ROUTES.SIGN_IN;

        return NextResponse.redirect(url);
    } else {
        return NextResponse.next();
    }
};

export const config = {
    matcher: ['/orders/:path*', '/api/orders/:path*'],
};
