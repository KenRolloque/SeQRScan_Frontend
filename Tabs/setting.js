import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';


import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';


const Setting = () =>{

    const navigation = useNavigation()
    

    return (
      <SafeAreaView style = {{flex:1, justifyContent:"center",alignItems:"center"}}>
         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontFamily:"Roboto-Regular"}} >Logout</Text>
         </TouchableOpacity>
      </SafeAreaView>
    );
  }


export default Setting;
