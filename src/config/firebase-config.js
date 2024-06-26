// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_cG03CJRFrCYq7uTaX8Ifrj9KMqgoHC8",
  authDomain: "thoraxvision-9b277.firebaseapp.com",
  projectId: "thoraxvision-9b277",
  storageBucket: "thoraxvision-9b277.appspot.com",
  messagingSenderId: "96523553523",
  appId: "1:96523553523:web:0d5192237673c2816a8586",
  measurementId: "G-G8B0QXTM84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
