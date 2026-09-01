import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAv6JIFwj8MNG7ma2oIIoCox6pI5oW_ksU",
  authDomain: "subtrack-65f21.firebaseapp.com",
  projectId: "subtrack-65f21",
  storageBucket: "subtrack-65f21.firebasestorage.app",
  messagingSenderId: "293590757897",
  appId: "1:293590757897:web:aeb104d610e09d63543ed8",
  measurementId: "G-J5ZNV4XQM9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
