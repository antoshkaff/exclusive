'use server';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { IPublicUser } from '@/shared/types/user.interface';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export const getServerUser = async (): Promise<IPublicUser | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth')?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ['HS256'],
        });
        const id = (payload as any).id ?? payload.sub;
        const email = (payload as any).email;
        return { id: String(id), email: String(email) };
    } catch {
        return null;
    }
};
