import React, { Component } from 'react';
import { View, Text,Alert,Button, TouchableOpacity, Image } from 'react-native';
import Navigation from '../Navigation/navigation'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {loginStyle} from './Style/loginStyle'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import {app} from "../API/firebaseCRUD";
import { getFirestore, doc, setDoc  } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({promptAsync}) =>{

    // For Login
    const navigation = useNavigation()



    const signin = async() =>{
       
      try{
        const userJSON = await AsyncStorage.getItem("@user");
        const userData = userJSON ? JSON.parse(userJSON) : null;

        console.log("User Json", userJSON)
        
        if(userJSON === null){

          promptAsync();
  

        }else{
          navigation.navigate(Navigation);
          promptAsync();
         
        }

  
      }catch(e){


      }



    }


    // For Font
    const [isLoaded] = useFonts({
      'Roboto-Regular':require ("../assets/font/Roboto/Roboto-Regular.ttf"),
    
    });
  
    if (!isLoaded){
      return null;
    }
    
    
  

    return (
      <SafeAreaView style={loginStyle.mainContainer}>
     
          <View style={loginStyle.logoContainer}> 
            <Ionicons name="qr-code-outline" size={80} color={"#004694"}/>
            <Text style={loginStyle.logoText}> SeQRScan</Text>
            </View>

          
          <TouchableOpacity style ={loginStyle.loginBttn} onPress={signin}>
            <Image 
                source={require("../components/images/google.png")}
                style={{height: 25, width:25}}
            />
            <Text style ={loginStyle.contGoogle}> Continue with Google</Text>
          </TouchableOpacity>


         

          <Text></Text>
      </SafeAreaView>
      
    );
  }


export default SignInScreen;
