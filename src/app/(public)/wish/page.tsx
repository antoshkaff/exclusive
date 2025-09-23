import React from 'react';
import styles from './styles.module.scss';
import Container from '@/components/ui/Container';
import { Metadata } from 'next';
import Button from '@/components/ui/Button';
import ProductsList from '@/components/features/product/ProductsList';
import WishView from '@/app/(public)/wish/WishView';

export const metadata: Metadata = {
    title: 'Wish',
    robots: {
        index: false,
    },
};

const WishPage = () => {
    return (
        <Container>
            <section className={styles.page}>
                <WishView />
            </section>
        </Container>
    );
};

export default WishPage;
