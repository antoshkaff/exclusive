import Container from '@/components/ui/Container';
import styles from './styles.module.scss';
import Section from '@/components/layout/Section';
import { ProductsService } from '@/services/ProductsService';
import CategoriesList from '@/components/features/categories/CategoriesList';
import ProductsList from '@/components/features/product/ProductsList';
import { ROUTES } from '@/config/routes.config';

export default async function Home() {
    const { categories } = await ProductsService.getCategories();
    const { products } = await ProductsService.getProducts(15);
    const [bestSelling, restProducts] = [
        products.slice(0, 5),
        products.slice(5),
    ];

    return (
        <Container className={styles.page}>
            <Section title={'Categories'} subtitle={'Browse By Category'}>
                <CategoriesList categories={categories} />
            </Section>
            <Section title={'This Month'} subtitle={'Best Selling Products'}>
                <ProductsList products={bestSelling} />
            </Section>
            <Section
                title={'Our Products'}
                subtitle={'Explore Our Products'}
                actionText={'View all'}
                action={ROUTES.SHOP}
            >
                <ProductsList products={restProducts} />
            </Section>
        </Container>
    );
}
