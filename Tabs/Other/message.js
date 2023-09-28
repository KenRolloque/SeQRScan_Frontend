import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView,ToastAndroid } from 'react-native';
import { messageStyle } from './messageStyle'
import QRCode from 'react-native-qrcode-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from "expo-font";
import * as Clipboard from 'expo-clipboard';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';

const Message = ({route, navigation}) => {

    
    const {message} = route.params;
    const [isLoaded] = useFonts({
        "Poppins-Regular": require("../../assets/font/Poppins/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../../assets/font/Poppins/Poppins-SemiBold.ttf"),
      });
    
      if (!isLoaded) {
        return null;
      }

    

    const copyToClipboard = async () => {
        ToastAndroid.show('Copy to clipboard', ToastAndroid.SHORT);
        await Clipboard.setStringAsync(message);
    };
    return (

      <SafeAreaView style={messageStyle.mainContainer}>
       

        <View style ={messageStyle.messageContainer}>

            <View style ={messageStyle.header}>

                <Ionicons name="mail-outline" size={20}  color={"#ffffff"}/>
                <Text 
                    style ={{color:"#ffffff", fontFamily:"Poppins-SemiBold", marginLeft:10}}> 
                    
                    Content
                    
                </Text>

            </View>
            

           <View style ={messageStyle.content}>
                <TouchableOpacity 
                        style ={{alignSelf:"flex-end", marginHorizontal:20,}}
                        onPress={copyToClipboard}
                        >
                    <Ionicons 
                        name="copy-outline" 
                        size={20} 
                    />
                </TouchableOpacity>

             
                <ScrollView>
                    <Text 
                        style = {messageStyle.contentText}
                    > 
                       {message}
                    </Text>
                </ScrollView>
             

           </View>

        </View>

        <View style ={messageStyle.qrContainer}>
                <QRCode value={message} size={200}/>
        </View>

        {/* <TouchableOpacity
            style ={{
                width:"80%", 
 
                alignItems:"center",
                padding:15, 
                marginTop:25,
                borderRadius:5,
                backgroundColor:"#f2f2f2",
            }}
        >
            <Text
                style ={{

                    fontFamily:"Poppins-Regular",
                    color:"#3d3d3d"
                }}

                onPress={() => navigation.goBack()}
            
            >
                Back
            </Text>

        </TouchableOpacity> */}

      </SafeAreaView>


    );
  
}

export default Message;
