import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIMWcXsHjkmsDcg03K6LOCeYJai9JoowM",
  authDomain: "jobtrackerapp-db652.firebaseapp.com",
  projectId: "jobtrackerapp-db652",
  storageBucket: "jobtrackerapp-db652.firebasestorage.app",
  messagingSenderId: "70545083270",
  appId: "1:70545083270:web:cc1a8d735574754f4e7a07"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);