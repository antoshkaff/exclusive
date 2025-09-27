'use client';

import QuantityStepper from '@/components/ui/QuantityStepper';
import Button from '@/components/ui/Button';
import { IProduct } from '@/shared/types/product.interface';
import { useState } from 'react';
import { useCartAction } from '@/context/CartContext';

type BuyProductButtonProps = {
    product: IProduct;
};

const BuyProductButton = ({ product }: BuyProductButtonProps) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartAction();

    return (
        <>
            <QuantityStepper onChange={setQuantity} value={quantity} />
            <Button
                variant={'accent'}
                size={'md'}
                onClick={() => addToCart(product, quantity)}
            >
                Buy now
            </Button>
        </>
    );
};

export default BuyProductButton;
