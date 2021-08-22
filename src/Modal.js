import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal as MatrieluiModal, Button, Input } from '@material-ui/core';
import { auth } from './firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Modal({ open, setOpen, setUsername, username }) {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [modalStyle] = useState(getModalStyle);

  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setEmail('');
    setUsername('');
    setPassword('');
  };
  return (
    <MatrieluiModal open={open} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        <form className="app-signup">
          <center>
            <img
              className="app-header-logo"
              alt="instagram logo"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            />
          </center>
          <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={(e) => {
              signUp(e);
              handleClose();
            }}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </MatrieluiModal>
  );
}

export default Modal;
