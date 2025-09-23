import React from 'react';
import styles from './styles.module.scss';
import Container from '@/components/ui/Container';
import { Params } from 'next/dist/server/request/params';
import { ProductsService } from '@/services/ProductsService';
import { Metadata } from 'next';
import ProductSection from '@/components/features/product/ProductSection';
import ReviewSection from '@/components/features/review/ReviewSection';

export const generateMetadata = async ({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> => {
    const { id } = await params;
    const { product } = await ProductsService.getProductById(id as string);

    const title = `${product.title}`;
    const description = product.description;

    const cover = product.images?.[0];
    const images = [
        {
            url: cover,
            width: 1080,
            height: 1080,
            alt: `${product.title} — photo`,
        },
    ];

    return {
        title,
        description: description,
        openGraph: {
            title,
            description,
            images,
            locale: 'en_US',
        },
        other: {
            'product:availability': product.availabilityStatus,
            'product:price:amount': String(product.price),
            'product:price:currency': 'USD',
            ...(product.category
                ? { 'product:category': product.category }
                : {}),
            ...(product.rating
                ? { 'product:rating': String(product.rating) }
                : {}),
        },
    };
};
const ProductPage = async ({ params }: { params: Promise<Params> }) => {
    const { id } = await params;
    const { product } = await ProductsService.getProductById(id as string);

    return (
        <Container className={styles.page}>
            <ProductSection product={product} />
            <ReviewSection reviews={product.reviews} />
        </Container>
    );
};

export default ProductPage;
