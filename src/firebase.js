// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "@firebase/firestore";
// eslint-disable-next-line
import dotenv from "dotenv";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// To apply the default browser preference instead of explicitly setting it.
const signInwithGoogle = async () => {
  
  const result =await signInWithPopup(auth, provider)
    .then((result) => {
      return result
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
    });
    return result
}
const signOutFromGoogle = async () => {
  await signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

export { app, db, signInwithGoogle, signOutFromGoogle }
