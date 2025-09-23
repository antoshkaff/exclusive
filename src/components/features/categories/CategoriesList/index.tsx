import styles from './styles.module.scss';
import CategoryCard from '@/components/features/categories/CategoryCard';

type CategoriesListProps = {
    categories: string[];
};

const CategoriesList = ({ categories }: CategoriesListProps) => {
    return (
        <ul className={styles.list}>
            {categories.map((category) => (
                <li key={category}>
                    <CategoryCard categoryName={category} />
                </li>
            ))}
        </ul>
    );
};

export default CategoriesList;
