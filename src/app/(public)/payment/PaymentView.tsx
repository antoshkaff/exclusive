'use client';

import { useEffect, useRef, useState } from 'react';
import { useCheckoutPolling } from '@/hooks/useCheckoutPolling';
import { useCartAction } from '@/context/CartContext';

const PaymentView = ({ sessionId }: { sessionId: string }) => {
    const { clearCart } = useCartAction();
    const [isFinished, setIsFinished] = useState(false);
    const sessionIdRef = useRef(sessionId);
    const { start, stop } = useCheckoutPolling({
        sessionIdRef,
        intervalMs: 200,
        onPaid: () => {
            clearCart();
            setIsFinished(true);
        },
    });

    useEffect(() => {
        if (isFinished) stop();
        else start();
        return () => stop();
    }, [isFinished, start, stop]);

    return null;
};

export default PaymentView;
