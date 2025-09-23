import styles from './styles.module.scss';
import Section from '@/components/layout/Section';
import React from 'react';
import Review from '@/components/features/review/Review';
import { IReview } from '@/shared/types/review.interface';

type ReviewSectionProps = {
    reviews: IReview[];
};

const ReviewSection = ({ reviews }: ReviewSectionProps) => {
    return !!reviews.length ? (
        <Section title={'Reviews'}>
            <ul className={styles.list}>
                {reviews.map((review) => (
                    <li key={review.reviewerEmail}>
                        <Review data={review} />
                    </li>
                ))}
            </ul>
        </Section>
    ) : (
        <span>Nothing here...</span>
    );
};

export default ReviewSection;
