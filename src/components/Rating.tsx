import React from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingProps {
  rating: number | undefined;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const actualRating = rating || 0; // Use 0 as a default if rating is undefined
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} color={i < actualRating ? 'gold' : 'gray'} size={20} />
      );
    }
    return stars;
  };

  return (
    <div>
      <div>{renderStars()}</div>
      <div>Rating: {rating === undefined ? 'N/A' : rating}</div>
    </div>
  );
};

export default Rating;
