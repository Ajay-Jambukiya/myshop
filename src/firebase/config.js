import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDh5WcGoWxVST9g36xcedebszRo-jsW81w",
  authDomain: "myshop-9c510.firebaseapp.com",
  projectId: "myshop-9c510",
  storageBucket: "myshop-9c510.appspot.com",
  messagingSenderId: "229757712967",
  appId: "1:229757712967:web:4434734971f88ad0588f62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
export default app