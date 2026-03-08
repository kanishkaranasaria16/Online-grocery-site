import React from 'react';
import './Review.css';

const reviews = [
  { id: 1, userName: "AISHA RAINA", rating: 5, comment: "Excellent product!" },
  { id: 2, userName: "JAY RAICHAIND", rating: 3, comment: "Good, but could be better." }
];

const Review = () => {
  return (
    <div className="review-page">
      <h1 className="page-title">Customer Reviews</h1>
      {reviews.map(review => (
        <div key={review.id} className="review-card">
          <div className="review-header">
            <h3 className="reviewer-name">{review.userName}</h3>
            <div className="review-rating">
              {Array.from({ length: review.rating }, (_, index) => (
                <span key={index} className="star">★</span>
              ))}
            </div>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Review;
