import React from 'react';
import { ProductsService } from '@/services/ProductsService';
import Container from '@/components/ui/Container';
import styles from '@/app/(public)/shop/styles.module.scss';
import Section from '@/components/layout/Section';
import ProductsInfiniteList from '@/components/features/product/ProductsInfiniteList';
import { Params } from 'next/dist/server/request/params';
import { formatTitle } from '@/shared/utils/formatters';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<Params>;
}) => {
    return {
        title: `${formatTitle((await params).categoryName as string)}`,
    };
};

const CategoryPage = async ({ params }: { params: Promise<Params> }) => {
    const limit = 20;
    const { categoryName } = await params;
    const { products, response } =
        await ProductsService.getProductsByCategory(categoryName);

    return (
        <Container className={styles.page}>
            <Section
                title={formatTitle(categoryName as string)}
                subtitle={'Browse Our Products'}
            >
                <ProductsInfiniteList
                    initial={products}
                    limit={limit}
                    total={response.total}
                />
            </Section>
        </Container>
    );
};

export default CategoryPage;
