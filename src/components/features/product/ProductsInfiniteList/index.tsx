'use client';

import { useEffect, useRef, useState } from 'react';
import { useObserver } from '@/hooks/useObserver';
import { useFetching } from '@/hooks/useFetching';
import ProductCard from '@/components/features/product/ProductCard';
import { ProductsService } from '@/services/ProductsService';
import styles from './styles.module.scss';
import { IProduct } from '@/shared/types/product.interface';
import clsx from 'clsx';

export default function ProductsInfiniteList({
    initial,
    total,
    limit,
}: {
    initial: IProduct[];
    total: number;
    limit: number;
}) {
    const [items, setItems] = useState<IProduct[]>(initial);
    const [skip, setSkip] = useState(initial?.length);
    const [hasMore, setHasMore] = useState(initial?.length < total);
    const skipRef = useRef(skip);
    const hasMoreRef = useRef(hasMore);

    useEffect(() => {
        skipRef.current = skip;
        hasMoreRef.current = hasMore;
    }, [skip, hasMore]);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    const [fetchMore, isLoading] = useFetching(async () => {
        if (!hasMoreRef.current) return;

        const { products } = await ProductsService.getProducts(
            limit,
            skipRef.current,
        );

        setItems((prev) => [...prev, ...products]);

        const nextSkip = skipRef.current + products.length;
        setSkip(nextSkip);
        setHasMore(nextSkip < total);
    });

    const canLoad = hasMore && !isLoading;

    useObserver(loaderRef, canLoad, fetchMore);

    return initial.length ? (
        <div className={styles.container}>
            <ul className={styles.list}>
                {items.map((p, i) => (
                    <li key={p.id}>
                        <ProductCard product={p} isPriority={i === 0} />
                    </li>
                ))}
            </ul>
            <div ref={loaderRef} style={{ height: 1 }} />
            {isLoading && (
                <ul className={styles.list}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <li key={i}>
                            <div
                                className={clsx(styles.skeleton, 'skeleton')}
                            ></div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    ) : (
        <span>Nothing here...</span>
    );
}
