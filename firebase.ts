// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOiPvsa1_qHwv1J_lKQ1-dwhA60C0QvwE",
  authDomain: "stepper-17611.firebaseapp.com",
  projectId: "stepper-17611",
  storageBucket: "stepper-17611.appspot.com",
  messagingSenderId: "217844723429",
  appId: "1:217844723429:web:aff04a3095293e56932e0c",
  measurementId: "G-WNZ342P3R0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);