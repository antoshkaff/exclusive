import { useState, useCallback } from 'react';

export function useFetching<TArgs extends unknown[], TResult>(
    callback: (...args: TArgs) => Promise<TResult> | TResult,
): [
    (...args: TArgs) => Promise<TResult | undefined>,
    boolean,
    string | null,
    () => void,
] {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetching = useCallback(
        async (...args: TArgs) => {
            try {
                setIsLoading(true);
                setError(null);
                return await callback(...args);
            } catch (e: unknown) {
                console.log(e);
                setError(e instanceof Error ? e.message : String(e));
                return undefined;
            } finally {
                setIsLoading(false);
            }
        },
        [callback],
    );

    const clearError = useCallback(() => setError(null), []);

    return [fetching, isLoading, error, clearError];
}
