'use client';

import styles from './styles.module.scss';
import Button from '@/components/ui/Button';
import { useCartState } from '@/context/CartContext';
import { useCheckout } from '@/hooks/useCheckout';
import { useCheckoutPolling } from '@/hooks/useCheckoutPolling';

const CartTotal = () => {
    const { cartItems, total } = useCartState();
    const { isLoading, startCheckout, stopLoading, sessionIdRef } =
        useCheckout();

    const { start: startPolling } = useCheckoutPolling({
        sessionIdRef,
        intervalMs: 2000,
        onPaid: () => {
            stopLoading();
        },
    });

    const handlePayment = async () => {
        try {
            await startCheckout(cartItems);
            startPolling();
        } catch (e) {
            stopLoading();
            console.log((e as Error).message || 'Failed to start checkout');
        }
    };

    return (
        <section className={styles.total}>
            <h2 className={styles.total__title}>Cart Total</h2>
            <ul className={styles.total__list}>
                <li className={styles.total__item}>
                    <span>Subtotal: </span>
                    <span>${total}</span>
                </li>
                <li className={styles.total__item}>
                    <span>Shipping: </span>
                    <span>Free</span>
                </li>
                <li className={styles.total__item}>
                    <span>Total:</span>
                    <span>${total}</span>
                </li>
            </ul>
            <Button
                variant="accent"
                disabled={!cartItems.length || isLoading}
                onClick={handlePayment}
            >
                {isLoading ? 'Loading...' : 'Process to checkout'}
            </Button>
        </section>
    );
};

export default CartTotal;
