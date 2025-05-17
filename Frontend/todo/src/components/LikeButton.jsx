import React, { useState } from 'react';

function LikeButton({ initialLikes = 0 }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  return (
    <button onClick={toggleLike}>
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  );
}

export default LikeButton;
