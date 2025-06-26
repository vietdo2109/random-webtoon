// // initialize app server-side, any server actions that interact with the auth and firestore will use this server-side app
// import { getApps, initializeApp, ServiceAccount } from "firebase-admin/app";
// import admin from 'firebase-admin'
// const serviceAccount = {
//   "type": "service_account",
//   "project_id": "random-webtoon",
//   "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
//   "private_key": process.env.FIREBASE_PRIVATE_KEY,
//   "client_email": process.env.FIREBASE_CLIENT_EMAIL,
//   "client_id": process.env.FIREBASE_CLIENT_ID,
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40random-webtoon.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }

// // Initialize Firebase
// const currentApps = getApps(); // get current apps if exited

// if (!currentApps.length) {
//   // if there is no initialized app => initialize a new app
//   const app = initializeApp({
//     credential: admin.credential.cert(serviceAccount as ServiceAccount)
//   });

// } else {
//   // if there is any initialized app => take and use that app
//   const app = currentApps[0];

// }

// export { };
// // any CLIENT-SIDE task that needs to use these features, just:
// // import {auth, storage} from '@/firebase/client'
