// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0rOItmgdcSVx_2KmaPaLJE-9pBt1beyo",
  authDomain: "fathom-a5885.firebaseapp.com",
  projectId: "fathom-a5885",
  storageBucket: "fathom-a5885.appspot.com",
  messagingSenderId: "601872921145",
  appId: "1:601872921145:web:6310c7ad80ed1b0e8513e8",
  measurementId: "G-287VSYE4TK",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);
const firebaseData = {
  firebase: firebase,
  analytics: analytics,
  firebaseDb: db,
};
export default firebaseData;
