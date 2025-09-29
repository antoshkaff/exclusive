import React from 'react';
import OrdersView from '@/app/(private)/orders/OrdersView';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My orders',
    robots: {
        index: false,
    },
};
const OrdersPage = () => {
    return <OrdersView />;
};

export default OrdersPage;
