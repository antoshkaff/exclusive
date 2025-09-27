import React from 'react';
import styles from './styles.module.scss';
import ProductsCartList from '@/components/features/product/ProductsCartList';
import Container from '@/components/ui/Container';
import CartTotal from '@/components/features/CartTotal';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cart',
};

const CartPage = () => {
    return (
        <Container className={styles.page}>
            <ProductsCartList />
            <CartTotal />
        </Container>
    );
};

export default CartPage;
