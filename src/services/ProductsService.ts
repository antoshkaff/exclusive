import { IProduct } from '@/shared/types/product.interface';
import { ParamValue } from 'next/dist/server/request/params';

export class ProductsService {
    private static readonly API = 'https://dummyjson.com';

    static async getProducts(limit: number = 30, skip: number = 0) {
        const query = new URLSearchParams({
            limit: String(limit),
            skip: String(skip),
        }).toString();

        const response = await fetch(`${this.API}/products?${query}`, {
            next: {
                revalidate: 600,
            },
        });

        const json = await response.json();
        const products: IProduct[] = json.products;

        return { products: products, response: json };
    }

    static async getCategories() {
        const response = await fetch(`${this.API}/products/category-list`, {
            next: {
                revalidate: 600,
            },
        });

        const json: string[] = await response.json();
        return { categories: json };
    }

    static async getProductsByCategory(category: ParamValue) {
        const response = await fetch(
            `${this.API}/products/category/${category}`,
            {
                next: {
                    revalidate: 600,
                },
            },
        );

        const json = await response.json();
        const products: IProduct[] = json.products;

        return { products: products, response: json };
    }

    static async search(searchQuery: ParamValue) {
        const query = new URLSearchParams({
            q: String(searchQuery),
        }).toString();

        const response = await fetch(`${this.API}/products/search?${query}`, {
            next: {
                revalidate: 600,
            },
        });

        try {
            const json = await response.json();
            const products: IProduct[] = json.products;

            return { products: products, response: json };
        } catch {
            return { products: [], response: null, error: true };
        }
    }

    static async getProductById(id: string) {
        const response = await fetch(`${this.API}/products/${id}`, {
            next: {
                revalidate: 600,
            },
        });

        const product: IProduct = await response.json();

        return { product, response };
    }
}
