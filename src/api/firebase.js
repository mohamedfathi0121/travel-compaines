// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7cKUAmzxN2lipY86xzA5bHCuzYXeo-Wg",
  authDomain: "travel-b6d33.firebaseapp.com",
  projectId: "travel-b6d33",
  storageBucket: "travel-b6d33.firebasestorage.app",
  messagingSenderId: "1042705025697",
  appId: "1:1042705025697:web:bf26530a06dc688a1f7ee0",
  measurementId: "G-7ME5STR8M5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};