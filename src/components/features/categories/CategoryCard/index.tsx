import styles from './styles.module.scss';
import { formatTitle } from '@/shared/utils/formatters';
import Link from 'next/link';
import PhoneIcon from '@/shared/icons/PhoneIcon';
import { ROUTES } from '@/config/routes.config';

type CategoryCardProps = {
    categoryName: string;
};

const CategoryCard = ({ categoryName }: CategoryCardProps) => {
    return (
        <Link href={ROUTES.CATEGORY(categoryName)}>
            <article className={styles.card}>
                <PhoneIcon />
                <h3 className={styles.title}>{formatTitle(categoryName)}</h3>
            </article>
        </Link>
    );
};

export default CategoryCard;
