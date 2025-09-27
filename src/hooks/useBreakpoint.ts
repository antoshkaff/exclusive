import { useEffect, useState } from 'react';

export const useBreakpoint = (breakpoint: number) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

        setMatches(mql.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, [breakpoint]);

    return matches;
};
