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



export default function Gallery() {

  const [refreshing, setRefreshing] = useState(true);
  const [myData, setMyData] = useState();

  React.useEffect(() => {

   getData();
  
  }, []);

  const getData = async() =>{


    // try{

      const db = getFirestore(app);

      // try{
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null;
    
      const val = doc(db, "qrCode",userData.uid)
      const ref = collection(val,"Generated")
      const getValue = await getDocs(ref);
 
      setMyData(getValue.docs.map((doc)=> ({...doc.data(), id:doc.id})))
      setRefreshing(false);


  }

  const deleteData = (item) =>{

    Alert.alert(
      //title
      'Reminder',
      //body
      'Are you sure to delete this QR code?',
      [
        { text: 'Yes', onPress: () => deleteToast(item.id)},
        {
          text: 'No',
          // onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }

    )
    // await deleteDoc(doc(db, "qrCode", userData.uid, "Generated", item.id));

    
   
    // const deleteDoc = await deleteDoc(ref);
    // console.log(item.id,"Deleted Successfully")
  }
 

  const onRefresh = () => {
    //Clear old data of the list
    setMyData([]);
    //Call the Service to get the latest data
    getData();
  };

  const showData = () =>{

  
    console.log("ID: ",myData)


     
      // console.log(parseData.id)
      // console.log(qrCodeContent)
  }

  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);


  const qrData = [

    // {id: '1', value:"QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12QRCodeValue12", description:"Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1",dates: new Date("2023-08-10")},
    {id: '2', value:"QRCodeValue2", description:"Description 2",dates: new Date("2023-09-10")},
    {id: '3', value:"QRCodeValue3", description:"Description 3",dates: new Date("2023-10-10")},
    {id: '4', value:"QRCodeValue4", description:"Description 4",dates: new Date("2023-11-10")},
    {id: '5', value:"QRCodeValue5", description:"Description 5",dates: new Date("2023-12-10")},
    {id: '6', value:"QRCodeValue5", description:"Description 5",dates: new Date("2023-12-10")},
    {id: '7', value:"QRCodeValue5", description:"Description 5",dates: new Date("2023-12-10")},
    {id: '8', value:"QRCodeValue5", description:"Description 5",dates: new Date("2023-12-10")},
    {id: '9', value:"QRCodeValue5", description:"Description 5",dates: new Date("2023-12-10")},
    {id: '10', value:"QRCodeValue5", description:"Description 5",dates: new Date("2023-12-10")},
  ];

  
  const [sortedData, setSortedData] = useState(myData)
  const [ascending, setAscending] = useState(true);
  const [ascendingDate, setAscendingDate] = useState(true);
  const [showButtons, setShowButtons] = useState(false);

  const viewShotRef = useRef(null);

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

    // try{
    const userJSON = await AsyncStorage.getItem("@user");
    const userData = userJSON ? JSON.parse(userJSON):null;
  
    
    await deleteDoc(doc(db, "qrCode", userData.uid, "Generated", item))

    ToastAndroid.showWithGravity(
      'Deleted Successfully.',
      ToastAndroid.SHORT, //can be SHORT, LONG
      ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
    );

  }catch(e){
    ToastAndroid.showWithGravity(
      'Failed to Delete the QR Code. Please check you internet connection',
      ToastAndroid.SHORT, //can be SHORT, LONG
      ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
    );

  }

  }
  
  const downloadToast = async () => {
    //function to make Toast With Duration And Gravity

   
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
  
  
        }
    
    
        }
      
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


    // Sort Data Function

    const toggleSorting = () =>{

      setAscending(!ascending);
  
      const sortedArray = [...sortedData].sort((a,b) =>
      
      ascending ? a.value.localeCompare(b.value) :
      b.value.localeCompare(a.value)
  
      );
      setSortedData(sortedArray);
      setShowButtons(!showButtons);
    }
  
    const toggleSortingDate = () =>{
      console.log("hello");
      setAscendingDate(!ascendingDate);
  
      const sortedArray = [...sortedData].sort((a,b) =>
      
      ascendingDate ? a.dates-b.dates :
      b.dates-a.dates
  
      );
      setSortedData(sortedArray);
      setShowButtons(!showButtons);
    }


      // Render Button List

  const toggleButtonList = () => {
    setShowButtons(!showButtons);
  };

  const renderButtonList = () => {
    if (showButtons) {
      return (
        <View style={galleryStyle.bttnListCont}>

          <TouchableOpacity style={galleryStyle.bttn1} onPress={toggleSorting}>
            <Text>Description</Text>
          </TouchableOpacity>

          <TouchableOpacity style={galleryStyle.bttn2} onPress={toggleSortingDate}>
            <Text>Date</Text>
          </TouchableOpacity>
          {/* Add more buttons as needed */}
        </View>
      );
    } else {
      return null;
    }
  };


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
            <Text numberOfLines={1} style ={galleryStyle.descText}> {item.qrCodeContent} </Text>
            <Text numberOfLines={1} style ={galleryStyle.linkText}> {item.qrCodeDescription} </Text>
            {/* <Text style ={galleryStyle.dateText}>{item.dates.toDateString()}</Text> */}
        </View>  

        {/* <View style = {galleryStyle.qrAction}>
            <TouchableOpacity onPress={downloadToast}> 
                <Ionicons name='download-outline' size={18} color="#737373"/>
            </TouchableOpacity>  
            <TouchableOpacity onPress={()=> deleteData(item)}>
                <Ionicons name='trash-outline' size={18} color="#737373"/>
            </TouchableOpacity>  
        </View>   */}

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

   </View>
     {/* <Text style={galleryStyle.modalValue}>{selectedQR.description}</Text>
     <Text style={galleryStyle.modalValue}>{selectedQR.value}</Text> */}

    
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
    

        <View style = {galleryStyle.sectionOne}>
                      
          <Text style = {galleryStyle.title}> QR Code</Text>

          <View style = {galleryStyle.bttnCont}>

           <TouchableOpacity style = {galleryStyle.listBttn} >
              <Ionicons name='list-outline' size={18}  />
            </TouchableOpacity>

            <TouchableOpacity style = {galleryStyle.sortBttn} onPress={toggleButtonList}>
              <Ionicons name='funnel-outline' size={18} />
            </TouchableOpacity>

          </View>
        </View>

        <View style = {galleryStyle.qrGallery}>


        <FlatList
            data={myData}
            keyExtractor={(item) => item.id}
            renderItem={renderQR}
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            // extraData={this.state}
            
       />
        {renderButtonList()}
        </View>
    </SafeAreaView>
  );
}

