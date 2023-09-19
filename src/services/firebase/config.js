import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAArC9SqsIN0xluQ4V59V_itbW95WomNx0",
  authDomain: "scheduler-c7a0b.firebaseapp.com",
  projectId: "scheduler-c7a0b",
  storageBucket: "scheduler-c7a0b.appspot.com",
  messagingSenderId: "230637557804",
  appId: "1:230637557804:web:517d9e7f63e6dc6b59d989"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }