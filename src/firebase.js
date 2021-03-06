import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAcLRYAZtX864d_aBqvkrpapQTJeV9OMeg",
  authDomain: "journos-4e471.firebaseapp.com",
  projectId: "journos-4e471",
  storageBucket: "journos-4e471.appspot.com",
  messagingSenderId: "680993814297",
  appId: "1:680993814297:web:1387b2e57bd5f76d76b788",
  measurementId: "G-821F1R9F4R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const analytics=getAnalytics(app);
export default app;
