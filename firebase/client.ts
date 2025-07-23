// Correct client-side Firebase config
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAF5Lr5svwgEnYXFWY1UCMJ_T7ol8HeNAg",
  authDomain: "random-webtoon.firebaseapp.com",
  projectId: "random-webtoon",
  storageBucket: "random-webtoon.appspot.com",
  messagingSenderId: "464545518311",
  appId: "1:464545518311:web:a036a0db05a0aeffe40842",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
