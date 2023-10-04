import React, { Component } from 'react';
import { View, Text, ImageBackground,TouchableOpacity,ToastAndroid,Linking, Alert } from 'react-native';
import { safeStyle } from './safeStyle';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard'

const SafeScreen = ({route,navigation}) =>   {

    const {link} = route.params;
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(link);
        ToastAndroid.show('Copy to clipboard', ToastAndroid.SHORT);
      };


      const redirect = () =>{

        Alert.alert(
            //title
            'Redirecting',
            //body
            'Confirm to access link?',
            [
              { text: 'Confirm', onPress: () => {Linking.openURL(link);} },
              {
                text: 'No',
                onPress: () => console.log('No Pressed'),
                style: 'cancel',
              },
            ],
            { cancelable: false }
          );
    
    }

    return (
      <View  style={safeStyle.mainContainer}>

      <ImageBackground  style={safeStyle.headerContainer} source={require('../../assets/images/safe.png')} resizeMode='cover'>
            <Ionicons name='shield-checkmark-sharp' size={270} color="white"/>
            <Text style={safeStyle.notifText}>The encoded URL is to be found to be safe</Text>
      </ImageBackground>


      <View style={safeStyle.contentContainer}>
        <View style={safeStyle.scanResult}>

          <View style={safeStyle.linkContainer}>

              <View style={safeStyle.linkIconContainer}>
                  <Ionicons  style ={safeStyle.linkIcon} name='link-outline' size={25}  />
              </View>

              <View style={safeStyle.linkLabelContainer}>

                  <Text style={safeStyle.linkLabel}> Link </Text>
                  <Text  style={safeStyle.link} numberOfLines={5}> {link} </Text> 
              </View>

          </View>
          <View style={safeStyle.safeContainer}>

              <View style={safeStyle.statusIconContainer}>
                  <Ionicons  style ={safeStyle.statusIcon} name='notifications-outline' size={25}  />
              </View>

              <View style={safeStyle.linkLabelContainer}>
                  <Text style={safeStyle.safeLabel}> Status </Text>
                  <Text  style={safeStyle.status} > Safe</Text> 
              </View>
            </View>
        </View>

        <View style={safeStyle.bttnContainer}>

            <TouchableOpacity 

                style={safeStyle.goBttn}   
                onPress={ redirect}

            >
                <Text style={safeStyle.goLabel} numberOfLines={1}> Go {link}</Text>
            </TouchableOpacity>


            <TouchableOpacity >
                <Text style={safeStyle.backBttn} onPress={copyToClipboard}>
                    Copy Link
                </Text>
            </TouchableOpacity>
        </View>



      </View>

      

  
      </View>
    );
  }
export default SafeScreen;
