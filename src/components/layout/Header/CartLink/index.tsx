'use client';

import React from 'react';
import sharedStyles from '../sharedStyles.module.scss';

import CartIcon from '@/shared/icons/CartIcon';
import Link from 'next/link';
import { ROUTES } from '@/config/routes.config';
import { useCartState } from '@/context/CartContext';

const CartLink = () => {
    const { cartItems } = useCartState();
    return (
        <Link
            href={ROUTES.CART}
            aria-label="Open 'Cart' page"
            className={sharedStyles.link}
        >
            <CartIcon />
            {!!cartItems.length && (
                <span className={sharedStyles.link__label}>
                    {cartItems.length > 9 ? '9+' : cartItems.length}
                </span>
            )}
        </Link>
    );
};

export default CartLink;
