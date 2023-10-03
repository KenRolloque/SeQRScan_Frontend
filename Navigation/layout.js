import React, { Component } from 'react';
import { View, Text } from 'react-native';

// External
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Tabs/Login';
import Navigation from '../Navigation/navigation'
import SafeScreen from '../Tabs/Other/SafeScreen'
import SuspiciousScreen from '../Tabs/Other/SuspiciousScreen';
import Message from '../Tabs/Other/message';
import Logout from '../Tabs/logout';
import SignInScreen from '../Tabs/signInScreen';
import GalleryModal from '../Tabs/Modal/galleryModal';


const Stack = createStackNavigator();

const Layout = () =>{

    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="SafeScreen" component={SafeScreen} options={{ headerShown: true }}></Stack.Screen>
        <Stack.Screen name="SuspiciousScreen" component={SuspiciousScreen} options={{ headerShown: true }}></Stack.Screen>  
        <Stack.Screen name="Navigation" component={Navigation} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="Message" component={Message} options={{ headerShown: true }}></Stack.Screen>
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="GalleryModal" component={GalleryModal} options={{ headerShown: false }}></Stack.Screen>

      </Stack.Navigator>
    );
  }


export default Layout;
