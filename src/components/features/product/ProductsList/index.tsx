'use client';

import styles from './styles.module.scss';
import { IProduct } from '@/shared/types/product.interface';
import ProductCard from '@/components/features/product/ProductCard';
import { AnimatePresence, motion } from 'framer-motion';
import { FADEIN_VARIANTS } from '@/shared/animations/variants/fadeIn';
import { TRANSITIONS } from '@/shared/animations/transitions';

type ProductsListProps = {
    products: IProduct[];
    animated?: boolean;
};

const ProductsList = ({ products, animated = false }: ProductsListProps) => {
    if (!animated) {
        return (
            <ul className={styles.list}>
                {products.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <motion.ul className={styles.list} layout>
            <AnimatePresence initial={false} mode="popLayout">
                {products.map((product) => (
                    <motion.li
                        key={product.id}
                        variants={FADEIN_VARIANTS}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={TRANSITIONS.NORMAL}
                        layout
                    >
                        <ProductCard product={product} />
                    </motion.li>
                ))}
            </AnimatePresence>
        </motion.ul>
    );
};

export default ProductsList;
