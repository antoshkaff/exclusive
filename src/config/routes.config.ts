export const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    SHOP: '/shop',
    ORDERS: '/orders',
    CATEGORY: (name: string) => `/category/${name}`,
    PRODUCT: (id: number) => `/product/${id}`,
} as const;
