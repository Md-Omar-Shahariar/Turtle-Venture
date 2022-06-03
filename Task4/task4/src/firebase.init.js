// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqsdV5PIfWunIqNPvLxw0Fv3oYXsEnlFc",
  authDomain: "radio-d89ed.firebaseapp.com",
  projectId: "radio-d89ed",
  storageBucket: "radio-d89ed.appspot.com",
  messagingSenderId: "1015889543278",
  appId: "1:1015889543278:web:dc6561714e44d6248de67f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
