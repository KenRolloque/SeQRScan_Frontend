import { StyleSheet, TouchableOpacity,FlatList, Modal, ToastAndroid, ScrollView, Alert,PixelRatio  } from 'react-native';
import { galleryStyle } from './Style/galleryStyle';
import Ionicons from '@expo/vector-icons/Ionicons'
import QRCode from 'react-native-qrcode-svg';
import React, { useRef, useState,ActivityIndicator } from 'react';
import { View, Text, RefreshControl } from 'react-native';
import {
  SafeAreaView,

} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {app} from "../API/firebaseCRUD";

import { doc,setDoc, Timestamp, getFirestore,collection, addDoc, getDocs, deleteDoc, onSnapshot} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from '../components/loading';


export default function Gallery({navigation}) {

  const [myData, setMyData] = useState();
  const [updateData, setUpdateData] = useState();
  const [extraD, setExtraD] = useState(false);
  const [loading, setLoading] = useState(true)
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


  const [isLoaded] = useFonts({
    'Poppins-Regular':require ("../assets/font/Poppins/Poppins-Regular.ttf"),
    'Poppins-SemiBold': require ("../assets/font/Poppins/Poppins-SemiBold.ttf"),
  });



  const renderQR = ({item, index}) => {
    
    const itemStyle = index % 2 === 0 ? galleryStyle.qrOdd : galleryStyle.qrEven;

    return(

    <TouchableOpacity  
            style = {[galleryStyle.qrItem, itemStyle]}
            onPress={() => {
              // setModalVisible(true);
              // setSelectedQR(item);
              navigation.navigate('GalleryModal',{
                item
              })
            
            
            }}
            > 
        <QRCode value ={item.value} size={30}/>
        
        <View  style = {galleryStyle.qrDesc}>
            <Text numberOfLines={1} style ={galleryStyle.descText}>{item.qrCodeDescription}  </Text>
            <Text numberOfLines={1} style ={galleryStyle.linkText}> {item.qrCodeContent} </Text>
            {/* <Text style ={galleryStyle.dateText}>{item.dates.toDateString()}</Text> */}
        </View>                   
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
            ListEmptyComponent={Loading}

       />

        </View>
    </SafeAreaView>
  );
}
