'use client';

import { useRef, useState, useCallback } from 'react';
import { ICartItem } from '@/shared/types/cart.interface';
import { apiCheckout } from '@/modules/checkout/checkout.api';
import { useModalActions } from '@/context/ModalContext';

export const useCheckout = () => {
    const { openModal } = useModalActions();
    const [isLoading, setIsLoading] = useState(false);
    const sessionIdRef = useRef<string | null>(null);

    const startCheckout = useCallback(
        async (cartItems: ICartItem[]) => {
            setIsLoading(true);
            try {
                const { url, id } = await apiCheckout(cartItems);
                sessionIdRef.current = id;

                openModal({
                    title: 'Waiting for confirmation of payment',
                    content:
                        'We opened a secure Stripe page in a new tab.\n' +
                        'Complete the payment; we will mark your order as paid automatically.',
                    type: 'warning',
                });

                window.open(url, '_blank', 'noopener');
                return id;
            } catch (e) {
                setIsLoading(false);
                throw e;
            }
        },
        [openModal],
    );

    const stopLoading = useCallback(() => setIsLoading(false), []);

    return {
        isLoading,
        startCheckout,
        stopLoading,
        sessionIdRef,
    };
};
