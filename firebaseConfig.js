// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA6yJGVWKPF-ycb8jP8RRzeuhNmQnC7Mrs",
  authDomain: "to-dos-52fcf.firebaseapp.com",
  projectId: "to-dos-52fcf",
  storageBucket: "to-dos-52fcf.firebasestorage.app",
  messagingSenderId: "1070872659167",
  appId: "1:1070872659167:web:65ef00fb1c95205109556a",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
