import {getAuth} from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhPGWG10raDHEBCQHkZFpb3m5lCIKE1Yw",
  authDomain: "seqrscan-6f8ab.firebaseapp.com",
  projectId: "seqrscan-6f8ab",
  storageBucket: "seqrscan-6f8ab.appspot.com",
  messagingSenderId: "272662321097",
  appId: "1:272662321097:web:161192d218d265998a3a18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);