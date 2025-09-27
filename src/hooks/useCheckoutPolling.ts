'use client';

import { RefObject, useCallback, useEffect, useRef } from 'react';
import { apiGetStatus } from '@/modules/checkout/checkout.api';
import { useModalActions } from '@/context/ModalContext';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes.config';

type Options = {
    sessionIdRef: RefObject<string | null>;
    intervalMs?: number;
    onPaid?: (data: { orderId?: string | null }) => void;
    onTick?: (status: string) => void;
    onStop?: () => void;
};

export function useCheckoutPolling({
    sessionIdRef,
    intervalMs = 2000,
    onPaid,
    onTick,
    onStop,
}: Options) {
    const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { openModal } = useModalActions();
    const router = useRouter();

    const stop = useCallback(() => {
        if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
        }
        onStop?.();
    }, [onStop]);

    const start = useCallback(() => {
        stop();
        pollTimerRef.current = setInterval(async () => {
            const id = sessionIdRef.current;
            if (!id) return;
            try {
                const data = await apiGetStatus(id);
                onTick?.(data.status);
                if (data.paid) {
                    stop();
                    onPaid?.({ orderId: data.orderId });
                    openModal({
                        title: 'Payment successful',
                        content:
                            'Thank you! Your order is paid. We sent confirmation to your email.',
                        type: 'success',
                        action: () => {
                            router.replace(ROUTES.SHOP);
                        },
                    });
                }
            } catch (e) {
                console.log((e as Error).message);
            }
        }, intervalMs);
    }, [intervalMs, onPaid, onTick, openModal, sessionIdRef, stop]);

    useEffect(() => () => stop(), [stop]);

    return { start, stop };
}
