// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Auth, getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF5Lr5svwgEnYXFWY1UCMJ_T7ol8HeNAg",
  authDomain: "random-webtoon.firebaseapp.com",
  projectId: "random-webtoon",
  storageBucket: "random-webtoon.firebasestorage.app",
  messagingSenderId: "464545518311",
  appId: "1:464545518311:web:a036a0db05a0aeffe40842",
};

// Initialize Firebase
const currentApps = getApps(); // get current apps if exited
let auth: Auth;
if (!currentApps.length) {
  // if there is no initialized app => initialize a new app
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  // if there is any initialized app => take and use that app
  const app = currentApps[0];
  auth = getAuth(app);
}

export { auth };
// any CLIENT-SIDE task that needs to use these features, just:
// import {auth} from '@/firebase/client'
