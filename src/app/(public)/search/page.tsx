import { ProductsService } from '@/services/ProductsService';
import Container from '@/components/ui/Container';
import styles from '@/app/(public)/shop/styles.module.scss';
import Section from '@/components/layout/Section';
import ProductsInfiniteList from '@/components/features/product/ProductsInfiniteList';
import React from 'react';
import { SearchParams } from 'next/dist/server/request/search-params';
import { Metadata } from 'next';

export const generateMetadata = async ({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}): Promise<Metadata> => {
    return {
        title: `${(await searchParams).q || 'Search'}`,
        robots: {
            index: false,
        },
    };
};

const SearchPage = async ({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const limit = 20;
    const params = await searchParams;
    const { products, response } = params.q?.length
        ? await ProductsService.search(params.q)
        : await ProductsService.getProducts(limit);

    return (
        <Container className={styles.page}>
            <Section title={'Search'} subtitle={params.q as string}>
                <ProductsInfiniteList
                    initial={products}
                    limit={limit}
                    total={response?.total}
                />
            </Section>
        </Container>
    );
};

export default SearchPage;
