import { IProduct } from '@/shared/types/product.interface';

export interface ICartItem {
    product: IProduct;
    amount: number;
}
