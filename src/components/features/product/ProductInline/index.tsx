'use client';

import Image from 'next/image';
import QuantityStepper from '@/components/ui/QuantityStepper';
import { ICartItem } from '@/shared/types/cart.interface';
import { useCartAction } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import TrashIcon from '@/shared/icons/TrashIcon';
import styles from './styles.module.scss';
import { memo } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

type ProductInlineProps = {
    cartItem: ICartItem;
};

const ProductInline = ({ cartItem }: ProductInlineProps) => {
    const { product, amount } = cartItem;
    const { setAmount, removeFromCart } = useCartAction();
    const isMobile = useBreakpoint(768);
    const onChange = (newAmount: number) => setAmount(product.id, newAmount);

    return isMobile ? (
        <article className={styles.product}>
            <div className={styles.product__contentContainer}>
                <Image
                    src={product.thumbnail}
                    alt={`${product.title} image`}
                    width={54}
                    height={54}
                />
                <span>{product.title}</span>

                <QuantityStepper value={amount} onChange={onChange} />
            </div>
            <div className={styles.product__contentContainer}>
                <span>${(product.price * amount).toFixed(2)}</span>
                <Button
                    variant={'transparent'}
                    aria-label={'Delete from cart'}
                    onClick={() => removeFromCart(product.id)}
                >
                    <TrashIcon />
                </Button>
            </div>
        </article>
    ) : (
        <article className={styles.product}>
            <div className={styles.product__contentContainer}>
                <Image
                    src={product.thumbnail}
                    alt={`${product.title} image`}
                    width={54}
                    height={54}
                />
                <span>{product.title}</span>
            </div>
            <span>${product.price}</span>
            <QuantityStepper value={amount} onChange={onChange} />
            <div className={styles.product__contentContainer}>
                <span>${(product.price * amount).toFixed(2)}</span>
                <Button
                    variant={'transparent'}
                    aria-label={'Delete from cart'}
                    onClick={() => removeFromCart(product.id)}
                >
                    <TrashIcon />
                </Button>
            </div>
        </article>
    );
};

export default memo(ProductInline);
