// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACxqu1uejpGzC4JTC5dWnK4yXJEBT5-h4",
  authDomain: "netflix-4daba.firebaseapp.com",
  projectId: "netflix-4daba",
  storageBucket: "netflix-4daba.appspot.com",
  messagingSenderId: "35856935971",
  appId: "1:35856935971:web:7b5d938631d7bb263c9596",
  measurementId: "G-LN5V2V04WD",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
