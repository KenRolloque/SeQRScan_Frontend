import { StyleSheet, TouchableOpacity,FlatList, Modal, ToastAndroid, ScrollView, Alert,PixelRatio  } from 'react-native';

import { galleryStyle } from './Style/galleryStyle';
import Ionicons from '@expo/vector-icons/Ionicons';

import QRCode from 'react-native-qrcode-svg';
import React, { useRef, useState } from 'react';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from "expo-media-library";
import { View, Text, RefreshControl } from 'react-native';

import {
  SafeAreaView,

} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {app} from "../API/firebaseCRUD";

import { doc,setDoc, Timestamp, getFirestore,collection, addDoc, getDocs, deleteDoc, onSnapshot} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from '@firebase/util';



export default function Gallery({navigation}) {



  const [refreshing, setRefreshing] = useState(true);
  const [myData, setMyData] = useState();
  const [updateData, setUpdateData] = useState();
  const [extraD, setExtraD] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const viewShotRef = useRef(null);

  React.useEffect(() => {

    const interval = setInterval(() =>{

      getData();
    },3000

    )
   
    return () =>  clearInterval(interval);
  
  }, []);

  const getData = async() =>{


      const db = getFirestore(app);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null;
    
      const val = doc(db, "qrCode",userData.uid)
      const ref = collection(val,"Generated")
      const getValue = await getDocs(ref);
 
      const responseData = getValue.docs.reverse().map((doc)=> ({...doc.data(), id:doc.id}))

      setMyData(responseData)
      setRefreshing(false);

  }


  React.useEffect(() => {

    updateDate();

   
   }, []);

   const updateDate = async() =>{

      const db = getFirestore(app);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null;
    
      const val = doc(db, "qrCode",userData.uid)
      const ref = collection(val,"Generated")
      const getValue = await getDocs(ref);
      const responseData = getValue.docs.map((doc)=> ({...doc.data(), id:doc.id}))

      setUpdateData(responseData)
      console.log("Update: ",updateData)
      setExtraD((prevExtraData) => !prevExtraData);
      console.log("Extra Data",extraD)

  }



  const deleteData = (item) =>{

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
 

  const onRefresh = () => {t
    setMyData([]);
    getData();
  };

  // Font

  const [isLoaded] = useFonts({
    'Poppins-Regular':require ("../assets/font/Poppins/Poppins-Regular.ttf"),
    'Poppins-SemiBold': require ("../assets/font/Poppins/Poppins-SemiBold.ttf"),
  });

  if (!isLoaded){
    return null;
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
    updateDate();
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


  const renderQR = ({item, index}) => {
    
    const itemStyle = index % 2 === 0 ? galleryStyle.qrOdd : galleryStyle.qrEven;

    return(

    <TouchableOpacity  
            style = {[galleryStyle.qrItem, itemStyle]}
            onPress={() => {
              setModalVisible(true);
              setSelectedQR(item);}}
            > 
        <QRCode value ={item.value} size={30}/>
        
        <View  style = {galleryStyle.qrDesc}>
            <Text numberOfLines={1} style ={galleryStyle.descText}>{item.qrCodeDescription}  </Text>
            <Text numberOfLines={1} style ={galleryStyle.linkText}> {item.qrCodeContent} </Text>
            {/* <Text style ={galleryStyle.dateText}>{item.dates.toDateString()}</Text> */}
        </View>  

        {selectedQR && ( 


<Modal
   animationType="slide"
   transparent={true}
   visible={modalVisible}
   onRequestClose={() => {
   setModalVisible(!modalVisible);
}}>


<View style = {galleryStyle.centeredView}>

 <TouchableOpacity style= {galleryStyle.backIconCont} onPress={ ()=> setModalVisible(!modalVisible)}>

     <Ionicons name='arrow-back-outline' size={20} />

 </TouchableOpacity>

 <View style={galleryStyle.modalView}>

   <View style={galleryStyle.qrCodeModal}>

   <ViewShot 
        ref={viewShotRef} 
        options={{ format: 'png', quality: 1 }}
    >
     <View style={{backgroundColor:"#ffffff", padding:20}}>

         <QRCode 
         value ={selectedQR.qrCodeContent}
         size={200}
         />

     </View>

   </ViewShot>
    <Text>Created </Text>
   </View>

    <View style={galleryStyle.descContainer}>

        <View style={galleryStyle.linkIconContainer}>
            <Ionicons  style ={galleryStyle.linkIcon} name='document-text-outline' size={20}  />
        </View>

        <View style={galleryStyle.linkLabelContainer}>

          <Text style={galleryStyle.linkLabel}> Description </Text>
          <Text  style={galleryStyle.desc} numberOfLines={2}>{selectedQR.qrCodeDescription} </Text> 
      </View>
    </View>


    <View style={galleryStyle.linkContainer}>

        <View style={galleryStyle.linkIconContainer}>
            <Ionicons  style ={galleryStyle.linkIcon} name='mail-outline' size={20}  />
        </View>

        <View style={galleryStyle.linkLabelContainer}>
          <ScrollView style={{paddingRight:20}}>
              <Text style={galleryStyle.linkLabel}> Content </Text>
              <Text  style={galleryStyle.link} >  {selectedQR.qrCodeContent}</Text> 
            </ScrollView>
        </View>

    </View>
  


   </View>

   <View style={galleryStyle.modalButton}>
       <TouchableOpacity style={galleryStyle.modalButtonDL} onPress={downloadToast}>
           <Text style={galleryStyle.modalButtonDLLabel}>Download</Text>
       </TouchableOpacity>

       <TouchableOpacity style={galleryStyle.modalButtonDel} onPress={ () => deleteData(selectedQR)} >
         <Text style={galleryStyle.modalButtonDLLabel}>Delete</Text>
       </TouchableOpacity>
   </View>

</View>
</Modal>    
)}
                 
   </TouchableOpacity> 

);

};


  return (
    
    <SafeAreaView style={galleryStyle.mainContainer}>

        <View style = {galleryStyle.qrGallery}>

        <FlatList
            data={myData}
            keyExtractor={(item) => item.id}
            renderItem={renderQR}
            extraData ={extraD}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            } 
       />

        </View>
    </SafeAreaView>
  );
}

