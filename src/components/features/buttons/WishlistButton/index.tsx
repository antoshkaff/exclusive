'use client';

import Button from '@/components/ui/Button';
import HeartIcon from '@/shared/icons/HeartIcon';
import styles from './styles.module.scss';

import { useWishlistAction, useWishlistState } from '@/context/WishlistContext';
import { IProduct } from '@/shared/types/product.interface';
import { useState } from 'react';
import clsx from 'clsx';

type WishlistButtonProps = {
    product: IProduct;
};

const WishlistButton = ({ product }: WishlistButtonProps) => {
    const { wishItems } = useWishlistState();

    const { toggleToWish } = useWishlistAction();
    const [isActive, setIsActive] = useState(() => {
        return !!wishItems.find((wishProduct) => wishProduct.id === product.id);
    });

    const handleClick = () => {
        setIsActive(!isActive);
        toggleToWish(product);
    };

    return (
        <Button
            className={clsx(isActive && styles.active)}
            variant={'circle'}
            aria-label={'Add to wish'}
            onClick={handleClick}
        >
            <HeartIcon size={24} fill={isActive ? 'currentColor' : 'none'} />
        </Button>
    );
};

export default WishlistButton;
