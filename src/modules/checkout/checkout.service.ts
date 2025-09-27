import { stripe } from '@/shared/stripe';
import { ICartItem } from '@/shared/types/cart.interface';
import { getServerUser } from '@/server/getServerUser';

export class CheckoutService {
    static stripe = stripe;

    static async createPayment(cart: ICartItem[]) {
        if (!Array.isArray(cart) || cart.length === 0) {
            throw new Error('Cart is empty');
        }

        const baseUrl =
            process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

        const session = await getServerUser();
        const line_items = cart.map(({ product, amount }) => {
            const qty = Math.max(1, Math.floor(amount || 1));
            const unit = Math.max(0, Math.floor(product.price * 100));

            if (!product?.title || !Number.isFinite(unit)) {
                throw new Error('Invalid product data');
            }

            return {
                price_data: {
                    currency: 'usd',
                    unit_amount: unit,
                    product_data: {
                        name: product.title,
                        images: product.thumbnail ? [product.thumbnail] : [],
                    },
                },
                quantity: qty,
            };
        });

        try {
            return await this.stripe.checkout.sessions.create({
                mode: 'payment',
                line_items,
                success_url: `${baseUrl}/payment?sessionId={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/payment?sessionId={CHECKOUT_SESSION_ID}`,
                metadata: { userId: session?.id || null },
            });
        } catch (e) {
            console.error('[Stripe] create session failed:', e);
            throw new Error('Failed to create payment session');
        }
    }
}
