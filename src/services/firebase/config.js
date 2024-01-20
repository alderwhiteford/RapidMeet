import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCMGnR7NYDd2H8gsNDTEVzGR03aYmcA_ao",
  authDomain: "schedule-app-ce368.firebaseapp.com",
  projectId: "schedule-app-ce368",
  storageBucket: "schedule-app-ce368.appspot.com",
  messagingSenderId: "1023450405060",
  appId: "1:1023450405060:web:e6a11b039d762a36391191",
  measurementId: "G-K0YWWDT99B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, analytics }