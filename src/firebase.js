// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa9j2SIOJhnlZ1sz5bNR_8izqhLN9f9qU",
  authDomain: "carmel-3ef71.firebaseapp.com",
  projectId: "carmel-3ef71",
  storageBucket: "carmel-3ef71.firebasestorage.app",
  messagingSenderId: "321108792560",
  appId: "1:321108792560:web:5b3c00da8adc53d655de35",
  measurementId: "G-RZR3XJRG3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
