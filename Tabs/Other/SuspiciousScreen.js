import React, { Component } from 'react';
import { suspiciousStyle } from './suspiciousStyle';
import { View, Text, ImageBackground, TouchableOpacity, Linking,Alert, ToastAndroid} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard'
const SuspiciousScreen = ({route,navigation}) =>   {


  const {link} = route.params;
  const redirect = () =>{

    Alert.alert(
        //title
        'Warning',
        //body
        'The link you are trying to open is flagged as suspicious by the system. Do you still want want to continue?',
        [
          { text: 'Yes', onPress: () => {Linking.openURL(link);} },
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );

}


  const copyToClipboard = async () => {
      await Clipboard.setStringAsync(link);
      ToastAndroid.show('Copy to clipboard', ToastAndroid.SHORT);
    };

    return (
      <View style={suspiciousStyle.mainContainer}>

        <ImageBackground  source={require('../../assets/images/sus.png')} style={suspiciousStyle.headerContainer}  > 
            <Ionicons name='shield-checkmark-sharp' size={270} color="white"/>
            <Text style={suspiciousStyle.notifText}>The encoded URL is to be found to be suspicious</Text>
        </ImageBackground>

        <View style={suspiciousStyle.contentContainer} >
            <View style={suspiciousStyle.scanResult}>

              <View style={suspiciousStyle.linkContainer}>

                <View style={suspiciousStyle.linkIconContainer}>
                    <Ionicons  style ={suspiciousStyle.linkIcon} name='link-outline' size={25}  />
                </View>

                <View style={suspiciousStyle.linkLabelContainer}>
                    <Text style={suspiciousStyle.linkLabel}> Link </Text>
                    <Text  style={suspiciousStyle.link} numberOfLines={5}> {link}  </Text> 
                </View>

              </View>

              <View style={suspiciousStyle.safeContainer}>
                <View style={suspiciousStyle.statusIconContainer}>
                    <Ionicons  style ={suspiciousStyle.statusIcon} name='notifications-outline' size={25}  />
                </View>

                <View style={suspiciousStyle.linkLabelContainer}>
                    <Text style={suspiciousStyle.safeLabel}> Status </Text>
                    <Text  style={suspiciousStyle.status} > Suspicious</Text> 
                </View>
              </View>
            </View>

            <View style={suspiciousStyle.bttnContainer}>

            <TouchableOpacity 
                style={suspiciousStyle.goBttn}
                onPress={redirect}

            >
                <Text style={suspiciousStyle.goLabel} numberOfLines={1}> Go to {link} </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={copyToClipboard}>
                <Text style={suspiciousStyle.backBttn}>
                    Copy Link
                </Text>
            </TouchableOpacity>
</View>

        </View>
  
      </View>
    );
  }
export default SuspiciousScreen;
