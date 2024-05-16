// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";
import dotenv from "dotenv"

console.log(dotenv.config())

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

export { storage };