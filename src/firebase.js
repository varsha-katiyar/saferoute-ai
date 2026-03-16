
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHBK_jwRC481wKMBECbFrcKCoCkbdNWbc",
  authDomain: "saferouteai-c1810.firebaseapp.com",
  projectId: "saferouteai-c1810",
  storageBucket: "saferouteai-c1810.firebasestorage.app",
  messagingSenderId: "1030362086543",
  appId: "1:1030362086543:web:1e72b699a0ce5858eb84fa",
  measurementId: "G-9KVXXR5NSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);