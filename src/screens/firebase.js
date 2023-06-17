// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoVf2DJSdqHVCm0cBZ5biM4ta8PksYoyo",
  authDomain: "fir-auth-4473c.firebaseapp.com",
  projectId: "fir-auth-4473c",
  storageBucket: "fir-auth-4473c.appspot.com",
  messagingSenderId: "1080940728811",
  appId: "1:1080940728811:web:c7776b577e7a1a8ba909ae"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();