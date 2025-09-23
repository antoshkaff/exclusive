import styles from './styles.module.scss';
import { IReview } from '@/shared/types/review.interface';
import Rating from '@/components/features/Rating';

type ReviewProps = {
    data: IReview;
};

const Review = ({ data }: ReviewProps) => {
    return (
        <article className={styles.review}>
            <header className={styles.review__header}>
                <div className={styles.user}>
                    <span className={styles.user__name}>
                        {data.reviewerName}
                    </span>
                    <span className={styles.user__email}>
                        {data.reviewerEmail}
                    </span>
                </div>
                <Rating data={data.rating} />
            </header>
            <div className={styles.body}>
                <span>{data.comment}</span>
            </div>
        </article>
    );
};

export default Review;
