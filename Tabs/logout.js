import React, { Component } from 'react';
import { View, Text,  ActivityIndicator } from 'react-native';
import { StackActions } from '@react-navigation/native';
// import Login from './Login';
// import SignInScreen from './signInScreen';
const Logout = ({navigation})=> {

    React.useEffect(() => {

        const time = () =>{
        const interval = setTimeout(() =>{
            const pushAction = StackActions.push('Login')     
            navigation.dispatch(pushAction);
    
      
        },1000
    
        )}

        time();
       
       
      
      }, []);
    return (
      <View
        style={{flex:1, justifyContent:"center",alignItems:"center"}}
      >
         <ActivityIndicator size={"large"} />
      </View>
    );
  }


export default Logout;
