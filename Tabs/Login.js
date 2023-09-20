import React, { Component } from 'react';
import { View, Text,Alert,Button, TouchableOpacity, Image } from 'react-native';
import Navigation from '../Navigation/navigation'
import Ionicons from '@expo/vector-icons/Ionicons';



import { SafeAreaView } from 'react-native-safe-area-context';
import {loginStyle} from './Style/loginStyle'
import { useFonts } from 'expo-font';

const Login = ({navigation}) =>{

    const signin = () =>{
      navigation.navigate(Navigation);
    }

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
         
      </SafeAreaView>
      
    );
  }


export default Login;
