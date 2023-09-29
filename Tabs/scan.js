import React, { useEffect, useState, useRef } from 'react';
import {StyleSheet, View, Text, Dimensions, Platform,Image, TouchableOpacity, Button, Toast, Alert} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Slider from '@react-native-community/slider';
import { scanStyle } from './Style/scanStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


import SafeScreen from './Other/SafeScreen';
import SuspiciousScreen from './Other/SuspiciousScreen';

import {app} from "../API/firebaseCRUD";
import { doc,setDoc, Timestamp, getFirestore,collection, addDoc, getDocs, deleteDoc} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Scan({navigation}) {


  //  camera permissions
  const [hasCameraPermission, setHasCameraPermission] = useState (null);
  const [camera, setCamera] = useState(null);
  const isFocused = useIsFocused();
  const [qrLabel, setQRLabel] =useState();


  // flashlight
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [buttonColor, setButtonColor] = useState("#00a398")

  // Zoom
  const [sliderValue, setSliderValue] = useState(0)
  const cameraRef2 = useRef (null);

  // Scanning
  const [scanned, setScanned] = useState(false);

  // Upload QR  Code
  
  const [image, setImage] = useState(null);
  // const [scannedQR, setScannedQR] = useState(null);
  // const [decodeData, setDecodeData] = useState(null)


  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] =  useState(false);


  // on screen  load, ask for permission to use the camera
  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status == 'granted');
    }
    getCameraStatus();
  }, []);



// Toggle Flashlight
  const toggleFlash = () => {
    const newFlashMode =
    flashMode === 'off'
      ? 'torch'
      : 'off';

  setFlashMode(newFlashMode);
  setButtonColor(newFlashMode === 'off' ? '#00a398' : '#56fcf1');
  };
  

  
  // Changing the Zoom Value of Camera
  const manipulateZoom = (value) => {

    if (cameraRef2.current){

      cameraRef2.current.zoom =  value;
      setSliderValue(value);
    }
    
  }


const showDate = () =>{

    const dateNow = new Date();
    const time = dateNow.getHours()+":"+ dateNow.getMinutes()+":"+dateNow.getSeconds();
    const date = dateNow.getFullYear()+dateNow.getMonth()+"-"+ dateNow.getDate();






}

  // Scanning QR code

  const handleBarCodeScanned = ({ type, data }) => {
    
    setScanned(true);


    try{
      url = Boolean (new URL("",data))
      
      alert(`${data} is a link`);
      sendData(data)

    }catch (e){
      const status = "Message"
      alert(`${data} is not link`);
      sendServer(data, status)
      console.log(e)
    }
    
  };

  const sendData = async(data) =>{

    // console.log("Hello")

    try{

    console.log(data)

    fetch('http://192.168.1.48:8000/validationServer/validate/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        url: data
      })
    })
    .then((response) => response.json())
    .then((json) => getResponse(json,data))
    .catch((error) => console.error(error));
 
    } catch (error) {
      console.error(error);
    }
}



const getResponse = async (json,data) =>{

  // const count = JSON.parse(json);

  console.log("get response")

  try{
    if (json.result == 1){
      const status = "Safe"
      console.log("Safe")
      sendServer(data, status)
      navigation.navigate('SafeScreen', {
        
          link:data
      })

      
      
    }else{
      const status = "Suspicious"
      sendServer(data,status)
      console.log("Suspicious")
      navigation.navigate('SuspiciousScreen', {
        
        link:data
    })                                                                                                        
    }



  }catch(e){


    }

}

const sendServer = async (data, status) =>{

  try{

  const dateNow = new Date();
  const time = dateNow.getHours()+":"+ dateNow.getMinutes()+":"+dateNow.getSeconds();
  const date = dateNow.getMonth()+"-"+ dateNow.getDate()+"-"+dateNow.getFullYear();
    

  const db = getFirestore(app);
  const userJSON = await AsyncStorage.getItem("@user");
  const userData = userJSON ? JSON.parse(userJSON):null;


  const val = doc(db, "qrCodeHistory",userData.uid)
  const ref = collection(val,"Generated")
  console.log(date)
  await addDoc(ref,{
    qrCodeContent:data,
    qrCodeStatus:status,
    qrCodeDate: date,
    qrCodeTime: time,

})

console.log("Saved")
}catch(e){

  console.log(e)

}


}



  


    // Upload Image
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
     
     try{

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        // aspect: [4, 3],
        quality: 1,
      });
 
      
        const results = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri)
        const qrCodeDataStrings = results.map(qrCode => qrCode.data);
        const data = qrCodeDataStrings.toString();
      
        console.log(data)
        // alert(`Data ${qrCodeDataStrings} has been scanned!`);
        try{
          url = Boolean (new URL("",data))
          alert(`${data} is a link`);
          sendData(data)
    
        }catch (e){
          alert(`${data} is not link`);
          const status = "Message"
          sendServer(data, status)
          navigation.navigate("Message", {
        
            message:data
        })
         
        }
      
     } catch(error){
      console.debug(error)
     }

    };


  // useEffect(() => {
  const prepareRatio = async () => {
    let desiredRatio = '4:3';  // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios= {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio; 
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this 
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  
  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async() => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View>
        <Text style = {{flex:1}}>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasCameraPermission === false) {
    return (
      // <View >
      //   <Text>No access to camera</Text>
      // </View>

      alert(`No access to camera`)
    );
  } else {
    return (
      <SafeAreaView style={scanStyle.mainContainer}>
        {/* 
        We created a Camera height by adding margins to the top and bottom, 
        but we could set the width/height instead 
        since we know the screen dimensions
        */}
        { isFocused && <Camera
          style={[scanStyle.cameraContainer, {marginTop: imagePadding, marginBottom: imagePadding}]}
          onCameraReady={setCameraReady}
          flashMode={flashMode}
          zoom={sliderValue}
          ratio={ratio}
          

          barCodeScannerSettings={{
            barCodeTypes:[BarCodeScanner.Constants.BarCodeType.qr]
            }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          // ref={(ref) => {
          //   setCamera(ref);
          // }}
      
          ref={(ref) => {
            setCamera(ref);
            cameraRef2.current = ref; // Set the cameraRef2 current value
          }}
          
          >

  
                  <Slider
                    style={scanStyle.slider}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="white"
                    thumbTintColor = "white"
                    onValueChange={manipulateZoom}  
                    
                  />



                <View style ={scanStyle.buttons}> 


                      <View style ={{width:"20%", alignItems:"center"}}>

                        <TouchableOpacity style ={scanStyle.uploadButton} onPress={pickImage}  >         
                          <Ionicons name="image-outline" size={20}  />
                          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        </TouchableOpacity>

                      </View>

                      <View style ={{width:"20%", alignItems:"center"}}>

                        <TouchableOpacity onPress={toggleFlash} style={[scanStyle.torchButton, {backgroundColor:buttonColor  }]}>         
                          <Ionicons name="flashlight-outline" size={20} color="white" />
                        </TouchableOpacity>

                

                      </View>




                </View>
                <Button title='Message'  onPress={ () => navigation.navigate('Message',{link:"https://www.facebook.com/"})}/>
                <Button title='Suspicious'  onPress={ () => navigation.navigate('SuspiciousScreen',{link:"https://www.facebook.com/"})}/>
                <Button title='Safe'  onPress={ () => navigation.navigate('SafeScreen',{link:"https://www.facebook.com/"})}/>
                <Button title='Date' onPress = {showDate}/>
        </Camera>
  }
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </SafeAreaView>
    );
  }
}