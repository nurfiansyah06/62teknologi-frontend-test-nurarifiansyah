// ReviewList.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardReview from './CardReview';

interface Review {
  id: number;
  text: string;
  rating: number;
}

interface ReviewListProps {
  review: Review[] | undefined;
  
}

const ReviewList: React.FC<ReviewListProps> = ({ review }) => {
    const { business_id } = useParams();
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
    axios
        .get(`https://api.yelp.com/v3/businesses/${business_id}/reviews`, {
        headers: {
            'Authorization': `Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx`,
        },
        })
        .then((response) => {
        setReviews(response.data.reviews);
        })
        .catch((error) => {
        });
    }, [business_id]);


  return (
    <div>
        <h2>What people say</h2>
        <ul>
        {reviews.map((review) => (
            <><CardReview key={review.id} text={review.text}/>
            </>
        ))}
        </ul>
    </div>
    );
};

export default ReviewList;
