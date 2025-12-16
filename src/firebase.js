// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Using environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAa9j2SIOJhnlZ1sz5bNR_8izqhLN9f9qU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "carmel-3ef71.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "carmel-3ef71",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "carmel-3ef71.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "321108792560",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:321108792560:web:5b3c00da8adc53d655de35",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RZR3XJRG3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
