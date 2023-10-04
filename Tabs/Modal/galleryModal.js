import { View, Text, TouchableOpacity, ScrollView,ToastAndroid, Alert, PixelRatio } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GalleryModalStyle } from './modalStyle/galleryModalStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useRef, useState } from 'react';
import ViewShot, { captureRef } from 'react-native-view-shot';
import QRCode from 'react-native-qrcode-svg';
import * as MediaLibrary from "expo-media-library";
import { useFonts } from 'expo-font';
import {app} from "../../API/firebaseCRUD";
import { doc,setDoc, Timestamp, getFirestore,collection, addDoc, getDocs, deleteDoc, onSnapshot} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const GalleryModal = ({route,navigation}) => {

    const {item} = route.params;
    const viewShotRef = useRef(null);

    const deleteData = (item) =>{

      console.log("Deleted")
      Alert.alert(
        'Reminder',
        'Are you sure to delete this QR code?',
        [
          { text: 'Yes', onPress: () => deleteToast(item.id)},
          {
            text: 'No',
            style: 'cancel',
          },
        ],
        { cancelable: false }
  
      )
    }

    const deleteToast = async(item) =>{

      try{
  
      const db = getFirestore(app);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null;
    
      
      await deleteDoc(doc(db, "qrCode", userData.uid, "Generated", item))
  
      ToastAndroid.showWithGravity(
        'Deleted Successfully.',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
      );
      navigation.goBack();
      
    }catch(e){
      ToastAndroid.showWithGravity(
        'Failed to Delete the QR Code. Please check you internet connection',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
      );
  
    }
    }

      
  const downloadToast = async () => {
    const targetPixelCount = 2160;
    const pixelRatio = PixelRatio.get();
    const pixels = targetPixelCount / pixelRatio;

    const { status } = await MediaLibrary.requestPermissionsAsync();
    try{
    if (status === 'granted') {
      if (viewShotRef.current) {

        try{
          const uri =  await captureRef(viewShotRef.current,{
    
            format:'png',
            quality:1,
            height: pixels,
            width: pixels,
            
          });
  
          console.log(uri)
          saveToGallery(uri)
    
        }catch (error){
          console.error("Error Capturing QR Code",error)

        } }
      
    } else {
      console.error('Permission to save to media library denied');
    }


  }catch(e){

    ToastAndroid.showWithGravity(
      'Failed to saved in gallery.',
      ToastAndroid.SHORT, //can be SHORT, LONG
      ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
    );

  }
  };


  const saveToGallery = async (uri) =>{

    try{
      
      const asset = await MediaLibrary.createAssetAsync(uri);

      ToastAndroid.showWithGravity(
        'Saved to gallery.',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
      );
  
        console.log('QR Code PNG image saved:', asset.uri);

    }catch(error){
      console.error("Error Saving QR Code",error)

      ToastAndroid.showWithGravity(
        'Failed to saved in gallery.',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
      );
  
    }
  }
    return (

      <SafeAreaView style={GalleryModalStyle.centeredView}>
      
      <TouchableOpacity 
            style= {GalleryModalStyle.backIconCont} 
            onPress={ ()=> navigation.goBack()}
      >
          <Ionicons name='arrow-back-outline' size={20} />
      </TouchableOpacity>

      <View style={GalleryModalStyle.modalView}>
        <View style={GalleryModalStyle.qrCodeModal}>
            <ViewShot 
            ref={viewShotRef} 
            options={{ format: 'png', quality: 1 }}
            >
              <View style={{backgroundColor:"#ffffff", padding:20}}>
                  <QRCode 
                  value ={item.qrCodeContent}
                  size={200}
                  />
              </View>
            </ViewShot>
            <View style ={{width:"100%",flexDirection:"row"}}>
                <Text 
                    style={{
                      fontFamily:"Poppins-Regular",
                      paddingHorizontal:5,
                      color:"#949494",
                      fontStyle:"italic"
                      }}>
                    Generated on
                </Text>

                <Text 
                    style={{
                      fontFamily:"Poppins-Regular",
                      paddingHorizontal:2,
                      color:"#949494",
                      fontStyle:"italic"
                      }}>
                    {item.qrCodeDate}
                </Text>

                <Text 
                    style={{
                      fontFamily:"Poppins-Regular",
                      paddingHorizontal:2,
                      color:"#949494",
                      fontStyle:"italic"
                      }}>
                    {item.qrCodeTime}
                </Text>

            </View>
        </View>

          
      <View style={GalleryModalStyle.descContainer}>
            <View style={GalleryModalStyle.linkIconContainer}>
                <Ionicons  style ={GalleryModalStyle.linkIcon} name='document-text-outline' size={20}  />
            </View>

            <View style={GalleryModalStyle.linkLabelContainer}>

              <Text style={GalleryModalStyle.linkLabel}> Description </Text>
              <Text  style={GalleryModalStyle.desc} numberOfLines={2}>{item.qrCodeDescription} </Text> 
            </View>
      </View>

      <View style={GalleryModalStyle.linkContainer}>

            <View style={GalleryModalStyle.linkIconContainer}>
                <Ionicons  style ={GalleryModalStyle.linkIcon} name='mail-outline' size={20}  />
            </View>

            <View style={GalleryModalStyle.linkLabelContainer}>
              <ScrollView style={{paddingRight:20}}>
                  <Text style={GalleryModalStyle.linkLabel}> Content </Text>
                  <Text  style={GalleryModalStyle.link} >  {item.qrCodeContent}</Text> 
              </ScrollView>
            </View>
      </View>

      <View style={GalleryModalStyle.modalButton}>
          <TouchableOpacity 
              style={GalleryModalStyle.modalButtonDL}
              onPress={downloadToast}
           >
              <Text style={GalleryModalStyle.modalButtonDLLabel}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={GalleryModalStyle.modalButtonDel} 
            onPress={()=>deleteData(item)}
          >
            <Text style={GalleryModalStyle.modalButtonDLLabel}>Delete</Text>
          </TouchableOpacity>
      </View>


      </View>


      </SafeAreaView>
    );
  }


  export default GalleryModal



