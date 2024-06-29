// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5BPtHbw1akYq48tAbtw36F3Q8e3v_XfQ",
  authDomain: "mooneye-e-shop.firebaseapp.com",
  projectId: "mooneye-e-shop",
  storageBucket: "mooneye-e-shop.appspot.com",
  messagingSenderId: "574591052894",
  appId: "1:574591052894:web:b22a5ba25490df0ad7d8cf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
