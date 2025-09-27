import { useEffect, RefObject } from 'react';

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null>,
    callback: () => void,
): void {
    useEffect(() => {
        const el = ref?.current;
        if (!el) return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as Node | null;
            if (target && !el.contains(target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, callback]);
}
