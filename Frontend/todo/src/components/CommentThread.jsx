import React, { useState } from 'react';

// 🔁 Comment Component (Only one-level reply thread)
function Comment({ comment, onReply, isReply = false }) {
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment, { text: replyText });
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div style={{ marginLeft: isReply ? '40px' : '20px', marginTop: '10px' }}>
      <p>{comment.text}</p>

      {/* Only show Reply button for top-level comments */}
      {!isReply && (
        <button onClick={() => setShowReplyBox(!showReplyBox)}>
          {showReplyBox ? 'Cancel' : 'Reply'}
        </button>
      )}

      {showReplyBox && (
        <div style={{ marginTop: '5px' }}>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply to comment..."
          />
          <button onClick={handleReply}>Post</button>
        </div>
      )}

      {/* Render replies (but no nested replies for replies) */}
      {comment.replies?.map((reply, i) => (
        <Comment key={i} comment={reply} isReply={true} />
      ))}
    </div>
  );
}

// 🧱 Post Component
function Post({ post, addCommentToPost, addReplyToComment }) {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addCommentToPost(post, { text: commentText, replies: [] });
    setCommentText('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '15px' }}>
      <h3>🧵 {post.text}</h3>

      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>

      {/* Render comments */}
      {post.comments.map((comment, i) => (
        <Comment
          key={i}
          comment={comment}
          onReply={(parent, reply) => addReplyToComment(post, parent, reply)}
        />
      ))}
    </div>
  );
}

// 🧩 Main App Component
export default function SocialMediaApp() {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');

  const addNewPost = () => {
    if (!postText.trim()) return;
    setPosts([...posts, { text: postText, comments: [] }]);
    setPostText('');
  };

  const addCommentToPost = (targetPost, newComment) => {
    const updated = posts.map((p) =>
      p === targetPost
        ? { ...p, comments: [...p.comments, newComment] }
        : p
    );
    setPosts(updated);
  };

  // Add a reply only one level deep
  const addReplyToComment = (targetPost, parentComment, reply) => {
    const updatedPosts = posts.map((post) => {
      if (post === targetPost) {
        const updatedComments = post.comments.map((comment) => {
          if (comment === parentComment) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>📝 Create a Post</h2>
      <input
        type="text"
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        style={{ width: '80%', padding: '8px' }}
      />
      <button onClick={addNewPost} style={{ padding: '8px 12px', marginLeft: 8 }}>
        Post
      </button>

      <div style={{ marginTop: 30 }}>
        {posts.map((post, i) => (
          <Post
            key={i}
            post={post}
            addCommentToPost={addCommentToPost}
            addReplyToComment={addReplyToComment}
          />
        ))}
      </div>
    </div>
  );
}




// import React, { useState } from 'react';

// // 🔁 Recursive Comment Component with Like Button
// function Comment({ comment, onReply, onLikeToggle }) {
//   const [replyText, setReplyText] = useState('');
//   const [showReplyBox, setShowReplyBox] = useState(false);

//   const handleReply = () => {
//     if (!replyText.trim()) return;
//     onReply(comment, { text: replyText, replies: [], likes: 0, liked: false });
//     setReplyText('');
//     setShowReplyBox(false);
//   };

//   return (
//     <div style={{ marginLeft: '20px', marginTop: '10px', borderLeft: '1px solid #ddd', paddingLeft: '10px' }}>
//       <p>{comment.text}</p>

//       <button onClick={() => setShowReplyBox(!showReplyBox)}>
//         {showReplyBox ? 'Cancel' : 'Reply'}
//       </button>

//       <button
//         style={{
//           marginLeft: '10px',
//           color: comment.liked ? 'red' : 'gray',
//           transform: comment.liked ? 'scale(1.2)' : 'scale(1)',
//           transition: 'transform 0.2s ease',
//         }}
//         onClick={() => onLikeToggle(comment)}
//       >
//         ❤️ {comment.likes}
//       </button>

//       {showReplyBox && (
//         <div style={{ marginTop: '5px' }}>
//           <input
//             type="text"
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             placeholder="Reply to comment..."
//           />
//           <button onClick={handleReply}>Post</button>
//         </div>
//       )}

//       {/* Render nested replies recursively */}
//       {comment.replies.map((child, i) => (
//         <Comment
//           key={i}
//           comment={child}
//           onReply={onReply}
//           onLikeToggle={onLikeToggle}
//         />
//       ))}
//     </div>
//   );
// }

// // 🧱 Post Component (with nested comments and Like button)
// function Post({ post, addCommentToPost, addReplyToComment, toggleLikeOnComment }) {
//   const [commentText, setCommentText] = useState('');

//   const handleAddComment = () => {
//     if (!commentText.trim()) return;
//     addCommentToPost(post, { text: commentText, replies: [], likes: 0, liked: false });
//     setCommentText('');
//   };

//   return (
//     <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '15px' }}>
//       <h3>🧵 {post.text}</h3>

//       <input
//         type="text"
//         placeholder="Write a comment..."
//         value={commentText}
//         onChange={(e) => setCommentText(e.target.value)}
//       />
//       <button onClick={handleAddComment}>Add Comment</button>

//       {/* Render comments */}
//       {post.comments.map((comment, i) => (
//         <Comment
//           key={i}
//           comment={comment}
//           onReply={(parent, reply) => addReplyToComment(post, parent, reply)}
//           onLikeToggle={toggleLikeOnComment}
//         />
//       ))}
//     </div>
//   );
// }

// // 🧩 Main App Component
// export default function SocialMediaApp() {
//   const [posts, setPosts] = useState([]);
//   const [postText, setPostText] = useState('');

//   const addNewPost = () => {
//     if (!postText.trim()) return;
//     setPosts([...posts, { text: postText, comments: [] }]);
//     setPostText('');
//   };

//   const addCommentToPost = (targetPost, newComment) => {
//     const updated = posts.map((p) =>
//       p === targetPost
//         ? { ...p, comments: [...p.comments, newComment] }
//         : p
//     );
//     setPosts(updated);
//   };

//   // Recursive function to immutably add reply to nested comments
//   const addReplyToComment = (targetPost, parentComment, reply) => {
//     const updateComments = (comments) => 
//       comments.map((comment) => {
//         if (comment === parentComment) {
//           return { ...comment, replies: [...comment.replies, reply] };
//         }
//         return { ...comment, replies: updateComments(comment.replies) };
//       });

//     const updatedPosts = posts.map((post) => {
//       if (post === targetPost) {
//         return { ...post, comments: updateComments(post.comments) };
//       }
//       return post;
//     });

//     setPosts(updatedPosts);
//   };

//   // Recursive function to toggle like on comment/reply immutably
//   const toggleLikeOnComment = (targetComment) => {
//     const toggleLike = (comments) =>
//       comments.map((comment) => {
//         if (comment === targetComment) {
//           return {
//             ...comment,
//             liked: !comment.liked,
//             likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
//           };
//         }
//         return { ...comment, replies: toggleLike(comment.replies) };
//       });

//     const updatedPosts = posts.map((post) => ({
//       ...post,
//       comments: toggleLike(post.comments),
//     }));

//     setPosts(updatedPosts);
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
//       <h2>📝 Create a Post</h2>
//       <input
//         type="text"
//         placeholder="What's on your mind?"
//         value={postText}
//         onChange={(e) => setPostText(e.target.value)}
//         style={{ width: '80%', padding: '8px' }}
//       />
//       <button onClick={addNewPost} style={{ padding: '8px 12px', marginLeft: 8 }}>
//         Post
//       </button>

//       <div style={{ marginTop: 30 }}>
//         {posts.map((post, i) => (
//           <Post
//             key={i}
//             post={post}
//             addCommentToPost={addCommentToPost}
//             addReplyToComment={addReplyToComment}
//             toggleLikeOnComment={toggleLikeOnComment}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


