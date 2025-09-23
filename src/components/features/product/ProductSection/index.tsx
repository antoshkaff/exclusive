'use client';

import styles from './styles.module.scss';
import { IProduct } from '@/shared/types/product.interface';
import ImageGallery from '@/components/features/ImageGallery';
import ProductDetails from '@/components/features/product/ProductSection/ProductDetails';

type ProductDetailsProps = {
    product: IProduct;
};

const ProductSection = ({ product }: ProductDetailsProps) => {
    return (
        <article className={styles.container}>
            <ImageGallery images={product.images} />
            <ProductDetails product={product} />
        </article>
    );
};

export default ProductSection;
