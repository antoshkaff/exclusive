'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { IPublicUser } from '@/shared/types/user.interface';
import { apiLogin, apiRegister } from '@/modules/auth/auth.api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes.config';

interface IAuthState {
    user: IPublicUser | null;
}

interface IAuthActions {
    register: (data: { email: string; password: string }) => void;
    login: (data: { email: string; password: string }) => void;
}

const AuthStateContext = createContext<IAuthState | null>(null);
const AuthActionsContext = createContext<IAuthActions | null>(null);

export const AuthProvider = ({
    children,
    initialUser,
}: {
    children: ReactNode;
    initialUser: IPublicUser | null;
}) => {
    const [user, setUser] = useState<IPublicUser | null>(initialUser);
    const router = useRouter();

    const register = async (data: { email: string; password: string }) => {
        try {
            await apiRegister(data);
            router.replace(ROUTES.SIGN_IN);
        } catch (e) {
            throw new Error((e as Error).message);
        }
    };

    const login = async (data: { email: string; password: string }) => {
        try {
            const user = await apiLogin(data);
            setUser(user);
            router.replace(ROUTES.HOME);
        } catch (e) {
            throw new Error((e as Error).message);
        }
    };

    return (
        <AuthActionsContext.Provider value={{ register, login }}>
            <AuthStateContext.Provider value={{ user }}>
                {children}
            </AuthStateContext.Provider>
        </AuthActionsContext.Provider>
    );
};

export const useAuthActions = () => {
    const ctx = useContext(AuthActionsContext);
    if (!ctx)
        throw new Error('useAuthActions must be used within AuthProvider');
    return ctx;
};

export const useAuthState = () => {
    const ctx = useContext(AuthStateContext);
    if (!ctx) throw new Error('useAuthState must be used within AuthProvider');
    return ctx;
};
