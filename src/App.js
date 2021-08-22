import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

import { db, auth } from './firebase';
import Modal from './Modal';
import SignInModal from './SignInModal';
import ImageUpload from './ImageUpload';
import Post from './Post';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      return () => {
        unsubscribe();
      };
    });
  }, [user, username]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ post: doc.data(), id: doc.id })),
        );
      });
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
          className="app-header-logo"
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
        ) : (
          <div className="app-loginContainer">
            <Button onClick={handleOpen}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )}
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        setUsername={setUsername}
        username={username}
      />
      <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
      <div className="app-posts">
        {posts.map(({ post, id }) => {
          return (
            <Post
              caption={post.caption}
              username={post.username}
              imageUrl={post.imageUrl}
              key={id}
              id={id}
              user={user?.displayName}
            />
          );
        })}
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3 className="app-h3">Login to upload</h3>
      )}
    </div>
  );
}

export default App;
