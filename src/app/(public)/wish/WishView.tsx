'use client';

import React from 'react';
import styles from '@/app/(public)/wish/styles.module.scss';
import Button from '@/components/ui/Button';
import { useWishlistState } from '@/context/WishlistContext';
import ProductsList from '@/components/features/product/ProductsList';

const WishView = () => {
    const { wishItems } = useWishlistState();

    return (
        <>
            <header className={styles.header}>
                <span className={styles.header__title}>
                    Wishlist ({wishItems.length})
                </span>
                <Button variant={'bordered'} className={styles.header__action}>
                    Move all to Bag
                </Button>
            </header>
            <div className={styles.body}>
                <ProductsList products={wishItems} animated={true} />
            </div>
        </>
    );
};

export default WishView;
