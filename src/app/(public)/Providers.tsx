import React, { ReactNode } from 'react';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { IPublicUser } from '@/shared/types/user.interface';

const Providers = ({
    children,
    initialUser,
}: {
    children: ReactNode;
    initialUser: IPublicUser | null;
}) => {
    return (
        <>
            <AuthProvider initialUser={initialUser}>
                <WishlistProvider>{children}</WishlistProvider>
            </AuthProvider>
        </>
    );
};

export default Providers;
