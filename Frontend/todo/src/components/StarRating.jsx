// StarRating.js
import React, { useState } from 'react';

export default function StarRating({ totalStars = 5, initialRating = 0, onRate }) {
  // 1️⃣ Local state for current rating
  const [rating, setRating] = useState(initialRating);

  // 2️⃣ When a star is clicked, update state and call callback
  const handleClick = (starValue) => {
    setRating(starValue);
    if (onRate) onRate(starValue);
  };

  return (
    <div>
      {/* 3️⃣ Render stars based on totalStars */}
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        // 4️⃣ Conditional: filled if starNumber ≤ rating
        return (
          <span
            key={index}
            style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '4px' }}
            onClick={() => handleClick(starNumber)}
          >
            {starNumber <= rating ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
}