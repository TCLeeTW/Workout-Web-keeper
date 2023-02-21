// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "@firebase/firestore";
// import "firebase/compat/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId:  REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore()

export {app,db}