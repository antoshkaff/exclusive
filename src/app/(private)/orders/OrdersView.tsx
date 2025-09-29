'use client';

import { useEffect, useRef, useState } from 'react';
import { useObserver } from '@/hooks/useObserver';
import { useFetching } from '@/hooks/useFetching';
import { apiGetOrders } from '@/modules/order/order.api';
import { OrderRecord } from '@/modules/order/order.types';
import Order from '@/components/features/order/Order';
import styles from './styles.module.scss';
import Container from '@/components/ui/Container';

type OrdersInfiniteListProps = {
    limit?: number;
};

export default function OrdersInfiniteList({
    limit = 5,
}: OrdersInfiniteListProps) {
    const [items, setItems] = useState<OrderRecord[]>([]);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState<number | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const skipRef = useRef(skip);
    const hasMoreRef = useRef(hasMore);
    const didInitRef = useRef(false);

    useEffect(() => {
        skipRef.current = skip;
        hasMoreRef.current = hasMore;
    }, [skip, hasMore]);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const [fetchMore, isLoading] = useFetching(async () => {
        if (!hasMoreRef.current) return;

        const res = await apiGetOrders(limit, skipRef.current);
        const batch = res.data ?? [];
        const received = batch.length;

        if (typeof res.total === 'number' && total === null) {
            setTotal(res.total);
        }

        setItems((prev) => [...prev, ...batch]);

        const nextSkip = skipRef.current + received;
        setSkip(nextSkip);

        const realTotal =
            (typeof res.total === 'number' ? res.total : total) ?? Infinity;
        setHasMore(received === limit && nextSkip < realTotal);
    });

    useEffect(() => {
        if (didInitRef.current) return;
        didInitRef.current = true;
        fetchMore();
    }, [fetchMore]);

    const canLoad = hasMore && !isLoading && skip > 0;
    useObserver(loaderRef, canLoad, fetchMore);

    return (
        <Container className={styles.page}>
            {items.length > 0 ? (
                <ul className={styles.list}>
                    {items.map((order) => (
                        <li key={order.id}>
                            <Order order={order} />
                        </li>
                    ))}
                </ul>
            ) : !isLoading && !hasMore ? (
                <span>Nothing here...</span>
            ) : null}

            <div ref={loaderRef} style={{ height: 1 }} />

            {isLoading && (
                <ul className={styles.list}>
                    {Array.from({ length: Math.min(4, limit) }).map((_, i) => (
                        <li key={i}>
                            <div
                                className="skeleton"
                                style={{
                                    height: `${Math.max(Math.floor(Math.random() * 400), 150)}px`,
                                    marginBlock: 22,
                                }}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}
