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
import { ICartItem } from '@/shared/types/cart.interface';

interface ICartActions {
    addToCart: (product: IProduct, amount?: number) => void;
    addToCartArray: (products: IProduct[]) => void;
    setAmount: (productId: number, amount: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

interface ICartState {
    cartItems: ICartItem[];
    total: number;
}

const CartStateContext = createContext<ICartState | null>(null);
const CartActionContext = createContext<ICartActions | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    const total = useMemo(
        () =>
            Number(
                cartItems
                    .reduce((acc, it) => acc + it.product.price * it.amount, 0)
                    .toFixed(2),
            ),
        [cartItems],
    );

    useEffect(() => {
        setCartItems(
            LocalstorageService.get<ICartItem[]>(LOCAL_STORAGE_KEYS.CART) || [],
        );
    }, []);

    const addToCart = useCallback((newProduct: IProduct, amount = 1) => {
        setCartItems((prev) => {
            const idx = prev.findIndex((ci) => ci.product.id === newProduct.id);

            let next: ICartItem[];
            if (idx >= 0) {
                next = [...prev];
                next[idx] = { ...next[idx], amount: next[idx].amount + amount };
            } else {
                next = [...prev, { product: newProduct, amount: amount }];
            }

            LocalstorageService.save(LOCAL_STORAGE_KEYS.CART, next);
            return next;
        });
    }, []);

    const addToCartArray = useCallback((products: IProduct[]) => {
        setCartItems((prev) => {
            const existing = new Set(prev.map((ci) => ci.product.id));
            const toAdd = products
                .filter((p) => !existing.has(p.id))
                .map((p) => ({ product: p, amount: 1 }));

            const next = [...prev, ...toAdd];
            LocalstorageService.save(LOCAL_STORAGE_KEYS.CART, next);
            return next;
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCartItems((prev) => {
            const next = prev.filter(({ product }) => product.id !== productId);
            LocalstorageService.save(LOCAL_STORAGE_KEYS.CART, next);
            return next;
        });
    }, []);

    const setAmount = useCallback((productId: number, amount: number) => {
        setCartItems((prev) => {
            const idx = prev.findIndex((ci) => ci.product.id === productId);
            if (idx === -1) return prev;

            const next = [...prev];
            next[idx] = { ...next[idx], amount };
            LocalstorageService.save(LOCAL_STORAGE_KEYS.CART, next);
            return next;
        });
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.CART);
        }
    }, []);

    const actions = useMemo<ICartActions>(
        () => ({
            addToCart,
            setAmount,
            removeFromCart,
            addToCartArray,
            clearCart,
        }),
        [addToCart, setAmount, removeFromCart, addToCartArray],
    );

    const state = useMemo<ICartState>(
        () => ({ cartItems, total }),
        [cartItems, total],
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const onStorage = (e: StorageEvent) => {
            if (e.key === LOCAL_STORAGE_KEYS.CART) {
                if (e.newValue == null) {
                    setCartItems([]);
                }
            }
        };

        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [setCartItems]);

    return (
        <CartActionContext.Provider value={actions}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartActionContext.Provider>
    );
};

export const useCartState = () => {
    const ctx = useContext(CartStateContext);
    if (!ctx)
        throw new Error('useCartState must be used within <CartProvider>');
    return ctx;
};

export const useCartAction = () => {
    const ctx = useContext(CartActionContext);
    if (!ctx)
        throw new Error('useCartAction must be used within <CartProvider>');
    return ctx;
};
