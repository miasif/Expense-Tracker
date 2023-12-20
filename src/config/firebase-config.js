// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGdI1CHTaxADtv5DDFK3nvRMOOvLUGCFM",
  authDomain: "expense-tracker-552ed.firebaseapp.com",
  projectId: "expense-tracker-552ed",
  storageBucket: "expense-tracker-552ed.appspot.com",
  messagingSenderId: "582392077260",
  appId: "1:582392077260:web:b3fe91f475367536b39b69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
//firebase login
//firebase init
//firebase deploy
