'use client';

import styles from './styles.module.scss';
import ProductInline from '@/components/features/product/ProductInline';
import { useCartState } from '@/context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollArea from '@/components/layout/ScrollArea';
import { FADEIN_VARIANTS } from '@/shared/animations/variants/fadeIn';
import { TRANSITIONS } from '@/shared/animations/transitions';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const ProductsCartList = () => {
    const { cartItems } = useCartState();
    const isMobile = useBreakpoint(768);

    if (!cartItems.length) {
        return null;
    }
    return (
        <section className={styles.container}>
            {!isMobile && (
                <header className={styles.header}>
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Subtotal</span>
                </header>
            )}

            <div className={styles.content}>
                <ScrollArea>
                    <ul className={styles.list}>
                        <AnimatePresence initial={false} mode="popLayout">
                            {cartItems.map((cartItem) => (
                                <motion.li
                                    layout
                                    variants={FADEIN_VARIANTS}
                                    initial={'initial'}
                                    animate={'animate'}
                                    exit={'exit'}
                                    transition={TRANSITIONS.FAST}
                                    key={cartItem.product.id}
                                >
                                    <ProductInline cartItem={cartItem} />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </ScrollArea>
            </div>
        </section>
    );
};

export default ProductsCartList;
