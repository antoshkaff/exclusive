import { IPublicUser } from '@/shared/types/user.interface';

export async function apiRegister(payload: {
    email: string;
    password: string;
}) {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
        throw new Error(json?.error || 'Something get wrong');
    }

    return json as IPublicUser;
}

export async function apiLogin(payload: {
    email: string;
    password: string;
}): Promise<IPublicUser> {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
        throw new Error(json?.error || 'Something get wrong');
    }

    return json as IPublicUser;
}

export async function apiLogout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
        throw new Error(json?.error || 'Something get wrong');
    }
}
