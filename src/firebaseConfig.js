import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore'; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyAZcAWcJWaU8bdxvUKYhwqmgdk9nVYi8vs",
  authDomain: "english-website-5c025.firebaseapp.com",
  projectId: "english-website-5c025",
  storageBucket: "english-website-5c025.appspot.com",
  messagingSenderId: "367606398500",
  appId: "1:367606398500:web:483167b69a83d1842e22b1",
  measurementId: "G-QTNRB73SE4"
};

firebase.initializeApp(firebaseConfig);

firebase.storage();

export default firebase;
