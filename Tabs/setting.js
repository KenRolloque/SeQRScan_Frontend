import React, { Component, useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,NativeModules, Image } from 'react-native';
import {auth} from '../API/firebaseConfig'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import {settingStyle} from "./Style/settingStyle"
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';


const Setting = ({navigation}) =>{
  const popAction = StackActions.pop(1);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    const checkLocalUser = async()=>{

      try{
        const userJSON = await AsyncStorage.getItem("@user");
        const userData = userJSON ? JSON.parse(userJSON):null;
        
        console.log("+",userData.email)

        setUserEmail(userData.displayName)
        setUserName(userData.email)
        setUserPhoto(userData.photoURL)
        console.log(userPhoto);
      
      }catch(e){
  
        alert.e(message);
  
      }finally{
  
      }
    }
    checkLocalUser();
  }, []);


    const [isLoaded] = useFonts({
      'Poppins-Regular':require ("../assets/font/Poppins/Poppins-Regular.ttf"),
      'Poppins-SemiBold': require ("../assets/font/Poppins/Poppins-SemiBold.ttf"),
    });
  
    if (!isLoaded){
      return null;
    }
    
      // on screen  load, ask for permission to use the camera
  

    const logout = async() =>{
  

      const pushAction = StackActions.push('Logout')     
      navigation.dispatch(pushAction);
      await signOut (auth);
      await AsyncStorage.removeItem("@user"); 
      // NativeModules.DevSettings.reload();

    }

    return (
      <SafeAreaView style = {settingStyle.mainContainer}>

        <View style={settingStyle.userInfo}>

            
            <View style={settingStyle.imgContainer}>
              <Image

                  source={userPhoto ? {uri:userPhoto}:null}
                  style={settingStyle.userImg}
              />

              </View>

            <View style={settingStyle.userInfoText}>
              <Text style={settingStyle.userName}> {userName}</Text>
              <Text style={settingStyle.userEmail}> {userEmail}</Text>
            </View>

        </View>

         <TouchableOpacity 
         
         style ={settingStyle.logout}
         onPress={logout}>

            <Ionicons name="log-out-outline" size={20}  />
            <Text style={settingStyle.logoutText} >Logout</Text>
         </TouchableOpacity>
      </SafeAreaView>
    );
  }


export default Setting;