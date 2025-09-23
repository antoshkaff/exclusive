import React from 'react';
import styles from './styles.module.scss';
import Container from '@/components/ui/Container';
import Section from '@/components/layout/Section';
import ProductsInfiniteList from '@/components/features/product/ProductsInfiniteList';
import { ProductsService } from '@/services/ProductsService';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shop',
};

const ShopPage = async () => {
    const limit = 20;
    const { products, response } = await ProductsService.getProducts(limit);

    return (
        <Container className={styles.page}>
            <Section title={'All products'} subtitle={'Browse Our Products'}>
                <ProductsInfiniteList
                    initial={products}
                    limit={limit}
                    total={response.total}
                />
            </Section>
        </Container>
    );
};

export default ShopPage;
