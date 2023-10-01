import React, { Component } from 'react';
import { View, Text,Alert,Button, TouchableOpacity, Image, ActivityIndicator,ToastAndroid } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {loginStyle} from './Style/loginStyle'
import { useFonts } from 'expo-font';

import Navigation from '../Navigation/navigation';
import SignInScreen from './signInScreen';

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../API/firebaseConfig";
import {app} from "../API/firebaseCRUD";

import { getFirestore, doc, setDoc  } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ActivityIndicator, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const Login = ({navigation}) =>{

  // User Data
  const [userID, setUserID] = React.useState([]);
  const [userName, setUserName] = React.useState();
  const [userEmail, setUserEmail] = React.useState();
  const db = getFirestore(app);

  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: "919867402252-t2hf11r1ff9mvj1d7akb5go417b0mtvf.apps.googleusercontent.com",
  });

  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
      setUserID(userJSON)

    
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };




  React.useEffect(() => {
    
    try{
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      
    }}catch(e){
      ToastAndroid.showWithGravity(
        'Failed to login. Please check your internet connection and try again.',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
      );
    }

 
  }, [response]);


  const checkLocalUser = async()=>{

    try{
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null;

    }catch{

      // alert.e(message);
      console.log("Error")

    }
  }
    const addUser = async () =>{

      console.log("user")
      try{
        const userJSON = await AsyncStorage.getItem("@user");
        const userData = userJSON ? JSON.parse(userJSON):null;
  
        await setDoc(doc(db, "users", userData.uid ),{
  
          userName: userData.displayName,
          userEmail: userData.email,
        });
      }catch{
     
  
      }
    }



  React.useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        // console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        addUser();
        // console.log("Login: ", checkLocalUser());
     
      } else {
        console.log("user not authenticated");
        // console.log("Logout: ", checkLocalUser());

      }
    });
    return () => unsub();
  }, []);

  if (loading)
    return (
      <View style={{height:"100%",width:"100%", alignItems: "center", justifyContent: "center" }}>
             <ActivityIndicator size={"large"} />
      </View>
    );


    return userInfo ? <Navigation /> : <SignInScreen promptAsync={promptAsync} />;
      
   
  }


export default Login;