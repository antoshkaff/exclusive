import styles from './styles.module.scss';
import StarIcon from '@/shared/icons/StarIcon';

type RatingProps = {
    data: number;
    reviews?: object[];
};

const Rating = ({ data, reviews }: RatingProps) => {
    const maxStars = 5;
    const roundedRating = Math.round((data / 2) * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={styles.container}>
            <ul className={styles.list} aria-label="Rating">
                {[...Array(fullStars)].map((star, index) => (
                    <li key={index} className={styles.list__item}>
                        <StarIcon variant={'full'} aria-label="Full star" />
                    </li>
                ))}
                {hasHalfStar && (
                    <li className={styles.list__item}>
                        <StarIcon variant={'half'} aria-label="Half star" />
                    </li>
                )}
                {[...Array(emptyStars)].map((star, index) => (
                    <li key={index} className={styles.list__item}>
                        <StarIcon variant={'empty'} aria-label="Empty star" />
                    </li>
                ))}
            </ul>
            {reviews && (
                <span className={styles.amount}>
                    ({reviews?.length} Reviews)
                </span>
            )}
        </div>
    );
};

export default Rating;
