export const PRIVATE_ROUTES = {
    ORDERS: '/orders',
} as const;

export const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    SHOP: '/shop',
    ORDERS: '/orders',
    WISH: '/wish',
    CART: '/cart',
    CHECK_OUT: '/cart/check-out',
    SEARCH: '/search',
    CATEGORY: (name: string) => `/category/${name}`,
    PRODUCT: (id: number) => `/product/${id}`,
} as const;
