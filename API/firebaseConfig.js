
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAhPGWG10raDHEBCQHkZFpb3m5lCIKE1Yw",
  authDomain: "seqrscan-6f8ab.firebaseapp.com",
  projectId: "seqrscan-6f8ab",
  storageBucket: "seqrscan-6f8ab.appspot.com",
  messagingSenderId: "272662321097",
  appId: "1:272662321097:web:161192d218d265998a3a18"
});

// Initialize Firebase
const app = initializeAuth(firebaseConfig,{
  persistence: getReactNativePersistence(AsyncStorage),
});

export const auth = getAuth(firebaseConfig);

