'use client';

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { IProduct } from '@/shared/types/product.interface';
import { LOCAL_STORAGE_KEYS } from '@/shared/constants/localStorage';
import { LocalstorageService } from '@/services/LocalstorageService';

interface IWishlistActions {
    toggleToWish: (product: IProduct) => void;
}

interface IWishlistState {
    wishItems: IProduct[];
}

const WishlistStateContext = createContext<IWishlistState | null>(null);
const WishlistActionContext = createContext<IWishlistActions | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishItems, setWishItems] = useState<IProduct[]>([]);

    useEffect(() => {
        setWishItems(
            LocalstorageService.get<IProduct[]>(LOCAL_STORAGE_KEYS.WISH_LIST) ||
                [],
        );
    }, []);

    const toggleToWish = useCallback((newProduct: IProduct) => {
        setWishItems((prevState) => {
            const i = prevState.findIndex((p) => p.id === newProduct.id);
            const wishList =
                i >= 0
                    ? [...prevState.slice(0, i), ...prevState.slice(i + 1)]
                    : [...prevState, newProduct];
            LocalstorageService.save(LOCAL_STORAGE_KEYS.WISH_LIST, wishList);

            return wishList;
        });
    }, []);

    const actions = useMemo<IWishlistActions>(
        () => ({ toggleToWish }),
        [toggleToWish],
    );

    const state = useMemo<IWishlistState>(() => ({ wishItems }), [wishItems]);

    return (
        <WishlistActionContext.Provider value={actions}>
            <WishlistStateContext value={state}>
                {children}
            </WishlistStateContext>
        </WishlistActionContext.Provider>
    );
};

export const useWishlistState = () => {
    const ctx = useContext(WishlistStateContext);
    if (!ctx)
        throw new Error(
            'useWishlistState must be used within <WishlistProvider>',
        );
    return ctx;
};

export const useWishlistAction = () => {
    const ctx = useContext(WishlistActionContext);
    if (!ctx)
        throw new Error(
            'useWishlistAction must be used within <WishlistProvider>',
        );
    return ctx;
};
