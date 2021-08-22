import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input } from '@material-ui/core';
import firebase from 'firebase';
import { db } from './firebase';
import './Post.css';

function Post({ imageUrl, username, caption, id, user }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection('posts')
        .doc(id)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [id]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection('posts').doc(id).collection('comments').add({
      text: comment,
      username: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };

  const RenderComments = () => {
    return (
      <form className="post-commentBox" onSubmit={(e) => postComment(e)}>
        <Input
          className="post-input"
          type="text"
          placeholder="Enter a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="post-button" type="submit" disabled={!comment}>
          Post
        </Button>
      </form>
    );
  };

  return (
    <div className="post">
      <div className="post-header">
        <Avatar className="post-avatar" alt={username} src={username} />

        <h3>{username}</h3>
      </div>

      <img className="post-img" src={imageUrl} alt={username} />
      <h4 className="post-text">
        <strong>{username}</strong> {caption}
      </h4>
      <div className="post-comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user ? (
        <RenderComments />
      ) : (
        <h4 className="post-h4">Login to comment</h4>
      )}
    </div>
  );
}

export default Post;
