// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuLkTj_J7u6VdEu3ngAb0CC--Qtb38PlI",
  authDomain: "vk-react-app.firebaseapp.com",
  projectId: "vk-react-app",
  storageBucket: "vk-react-app.appspot.com",
  messagingSenderId: "6454355285",
  appId: "1:6454355285:web:919211a4ff3c311ab23bdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);