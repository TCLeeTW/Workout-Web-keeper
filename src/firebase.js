// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "@firebase/firestore";
// import "firebase/compat/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfFbTsjQpAb1S7TjURtZJpATVagkasTAE",
  authDomain: "keeper-213ed.firebaseapp.com",
  projectId: "keeper-213ed",
  storageBucket: "keeper-213ed.appspot.com",
  messagingSenderId: "513721806895",
  appId: "1:513721806895:web:98e8f20d648073860496da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore()

export {app,db}