// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9TxINtFTVzxyaGA_jAMmK2h1gknhmPvo",
  authDomain: "seqrscan-895ed.firebaseapp.com",
  projectId: "seqrscan-895ed",
  storageBucket: "seqrscan-895ed.appspot.com",
  messagingSenderId: "480710136524",
  appId: "1:480710136524:web:b08fae6d78787c313fe869"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//919867402252-q2ia2lug6qga28nc2qsgmv7k3u98bqh9.apps.googleusercontent.com