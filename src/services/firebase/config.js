import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyOUa054AYhpSXpdEam6IpfgdFoKuqakY",
  authDomain: "when3meet-30a61.firebaseapp.com",
  projectId: "when3meet-30a61",
  storageBucket: "when3meet-30a61.appspot.com",
  messagingSenderId: "645581900802",
  appId: "1:645581900802:web:5cca632205aafc7f0beb1b",
  measurementId: "G-RFKTL57DEY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }