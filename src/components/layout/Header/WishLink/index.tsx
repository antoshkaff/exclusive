'use client';

import React from 'react';
import sharedStyles from '../sharedStyles.module.scss';

import Link from 'next/link';
import { ROUTES } from '@/config/routes.config';
import HeartIcon from '@/shared/icons/HeartIcon';
import { useWishlistState } from '@/context/WishlistContext';

const WishLink = () => {
    const { wishItems } = useWishlistState();
    return (
        <Link
            href={ROUTES.WISH}
            aria-label="Open 'Cart' page"
            className={sharedStyles.link}
        >
            <HeartIcon />
            {!!wishItems.length && (
                <span className={sharedStyles.link__label}>
                    {wishItems.length > 9 ? '9+' : wishItems.length}
                </span>
            )}
        </Link>
    );
};

export default WishLink;
