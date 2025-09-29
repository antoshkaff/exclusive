'use server';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { IPublicUser } from '@/shared/types/user.interface';
import { IJWTPayload } from '@/shared/types/jwt.interface';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export const getServerUser = async (): Promise<IPublicUser | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify<IJWTPayload>(token, secret, {
            algorithms: ['HS256'],
        });

        const id =
            payload.id ??
            (typeof payload.sub === 'string' ? payload.sub : undefined);
        const email = payload.email;

        if (!id || !email) return null;

        return { id, email };
    } catch {
        return null;
    }
};
