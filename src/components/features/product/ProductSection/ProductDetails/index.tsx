import styles from './styles.module.scss';
import { IProduct } from '@/shared/types/product.interface';
import Rating from '@/components/features/Rating';
import clsx from 'clsx';
import DeliveryIcon from '@/shared/icons/DeliveryIcon';
import ReturnIcon from '@/shared/icons/ReturnIcon';
import WishlistButton from '../../../buttons/WishlistButton';
import BuyProductButton from '../../../buttons/BuyProductButton';

type ProductDetailsProps = {
    product: IProduct;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
    return (
        <section className={styles.product}>
            <header className={styles.product__header}>
                <h2>{product.title}</h2>
                <div className={styles.infoContainer}>
                    <Rating data={product.rating} reviews={product.reviews} />
                    <span
                        className={clsx(
                            styles.infoContainer__status,
                            product.availabilityStatus === 'In Stock'
                                ? styles.green
                                : styles.red,
                        )}
                    >
                        {product.availabilityStatus}
                    </span>
                </div>
                <span>${product.price}</span>
            </header>
            <div className={styles.product__body}>
                <p>{product.description}</p>
            </div>
            <footer className={styles.product__footer}>
                <div className={styles.actionsContainer}>
                    <BuyProductButton product={product} />
                    <WishlistButton product={product} />
                </div>
                <ul className={styles.terms}>
                    <li className={styles.terms__item}>
                        <DeliveryIcon />
                        {product.shippingInformation}
                    </li>
                    <li className={styles.terms__item}>
                        <ReturnIcon />
                        {product.warrantyInformation}
                    </li>
                </ul>
            </footer>
        </section>
    );
};

export default ProductDetails;
