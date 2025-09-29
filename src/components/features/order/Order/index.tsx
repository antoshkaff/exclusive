import styles from './styles.module.scss';
import { OrderRecord } from '@/modules/order/order.types';
import { formatDate } from '@/shared/utils/formatters';
import Image from 'next/image';

type OrderProps = {
    order: OrderRecord;
};

const Order = ({ order }: OrderProps) => {
    return (
        <article className={styles.order}>
            <ul className={styles.order__list}>
                {order?.items?.map((item) => (
                    <li key={item.id} className={styles.order__item}>
                        <Image
                            src={item?.image ?? ''}
                            alt={`${item.title} image`}
                            height={64}
                            width={64}
                        />
                        <span>{item.title}</span>
                        <span>x{item.quantity}</span>
                        <span>
                            $
                            {((item.unitPrice / 100) * item.quantity).toFixed(
                                2,
                            )}
                        </span>
                    </li>
                ))}
            </ul>
            <footer className={styles.order__footer}>
                <span>Total: ${(order?.amountTotal / 100).toFixed(2)}</span>
                <span className={styles.order__time}>
                    {formatDate(order?.createdAt)}
                </span>
            </footer>
        </article>
    );
};

export default Order;
