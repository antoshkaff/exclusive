'use client';

import styles from './styles.module.scss';
import { IProduct } from '@/shared/types/product.interface';
import Rating from '@/components/features/Rating';
import QuantityStepper from '@/components/ui/QuantityStepper';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import HeartIcon from '@/shared/icons/HeartIcon';
import clsx from 'clsx';
import DeliveryIcon from '@/shared/icons/DeliveryIcon';
import ReturnIcon from '@/shared/icons/ReturnIcon';

type ProductDetailsProps = {
    product: IProduct;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <section className={styles.product}>
            <header className={styles.product__header}>
                <h2>{product.title}</h2>
                <div className={styles.infoContainer}>
                    <Rating data={product.rating} reviews={product.reviews} />
                    <span
                        className={clsx(
                            styles.infoContainer__status,
                            product.availabilityStatus === 'In Stock'
                                ? styles.green
                                : styles.red,
                        )}
                    >
                        {product.availabilityStatus}
                    </span>
                </div>
                <span>${product.price}</span>
            </header>
            <div className={styles.product__body}>
                <p>{product.description}</p>
            </div>
            <footer className={styles.product__footer}>
                <div className={styles.actionsContainer}>
                    <QuantityStepper onChange={setQuantity} value={quantity} />
                    <Button variant={'accent'} size={'md'}>
                        Buy now
                    </Button>
                    <Button
                        variant={'bordered'}
                        className={styles.wishButton}
                        aria-label={'Add to wish'}
                    >
                        <HeartIcon />
                    </Button>
                </div>
                <ul className={styles.terms}>
                    <li className={styles.terms__item}>
                        <DeliveryIcon />
                        {product.shippingInformation}
                    </li>
                    <li className={styles.terms__item}>
                        <ReturnIcon />
                        {product.warrantyInformation}
                    </li>
                </ul>
            </footer>
        </section>
    );
};

export default ProductDetails;
