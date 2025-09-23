import { useEffect, MutableRefObject } from 'react';

type ObserverCallback = () => void | Promise<void>;

export function useObserver(
    loaderRef: MutableRefObject<Element | null>,
    canLoad: boolean,
    callback: ObserverCallback,
): void {
    useEffect(() => {
        if (!canLoad) return;
        const el = loaderRef.current;
        if (!el) return;
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) callback();
            },
            { root: null, rootMargin: '300px', threshold: 0 },
        );

        observer.observe(el);
        return () => observer.unobserve(el);
    }, [canLoad, callback, loaderRef]);
}
