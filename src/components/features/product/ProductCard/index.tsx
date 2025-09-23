import styles from './styles.module.scss';
import Link from 'next/link';
import { IProduct } from '@/shared/types/product.interface';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import HeartIcon from '@/shared/icons/HeartIcon';
import Rating from '@/components/features/Rating';
import { memo } from 'react';
import { ROUTES } from '@/config/routes.config';
import WishlistButton from '@/components/features/WishlistButton';

type ProductCardProps = {
    product: IProduct;
    isPriority?: boolean;
};

const ProductCard = ({ product, isPriority = false }: ProductCardProps) => {
    return (
        <article className={styles.product}>
            <header className={styles.header}>
                <div className={styles.imageWrapper}>
                    <Link href={ROUTES.PRODUCT(product.id)}>
                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            width={180}
                            height={180}
                            priority={isPriority}
                        />
                    </Link>
                </div>
                <div className={styles.header__actions}>
                    <WishlistButton product={product} />
                </div>
            </header>
            <footer>
                <h3 className={styles.title}>{product.title}</h3>
                <span className={styles.price}>${product.price}</span>
                <Rating data={product.rating} reviews={product.reviews} />
            </footer>
        </article>
    );
};

export default memo(ProductCard);
