import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC8z77BJaayVlsTFiZ0RQ3sGaWQbcUgQ1A",
  authDomain: "bipple-5e92a.firebaseapp.com",
  projectId: "bipple-5e92a",
  storageBucket: "bipple-5e92a.appspot.com",
  messagingSenderId: "209170639153",
  appId: "1:209170639153:web:7d48669ab64f29eabe2810",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
