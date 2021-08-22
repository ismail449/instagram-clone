import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBBVPep2KjtM6a2yinnH6tYmyoGpo3iohs',
  authDomain: 'instagram-clone-fec09.firebaseapp.com',
  projectId: 'instagram-clone-fec09',
  storageBucket: 'instagram-clone-fec09.appspot.com',
  messagingSenderId: '832751791892',
  appId: '1:832751791892:web:ea8c97fa893da4a0e79c01',
  measurementId: 'G-QQTPMT3VBH',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage()


export {db, auth, storage};