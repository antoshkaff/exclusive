import React, { ReactNode } from 'react';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { IPublicUser } from '@/shared/types/user.interface';
import { CartProvider } from '@/context/CartContext';
import { ModalProvider } from '@/context/ModalContext';

const Providers = ({
    children,
    initialUser,
}: {
    children: ReactNode;
    initialUser: IPublicUser | null;
}) => {
    return (
        <>
            <ModalProvider>
                <AuthProvider initialUser={initialUser}>
                    <CartProvider>
                        <WishlistProvider>{children}</WishlistProvider>
                    </CartProvider>
                </AuthProvider>
            </ModalProvider>
        </>
    );
};

export default Providers;
