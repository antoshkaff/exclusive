import { INavLink } from '@/shared/types/nav-link.interface';
import { ROUTES } from '@/config/routes.config';

export const NAV_LINKS: INavLink[] = [
    {
        href: ROUTES.HOME,
        name: 'Home',
    },
    {
        href: ROUTES.SHOP,
        name: 'Shop',
    },
];
