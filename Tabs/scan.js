import React, { useEffect, useState, useRef } from 'react';
import {StyleSheet, View, Text, Dimensions, Platform,Image, ToastAndroid,TouchableOpacity, Button, Toast, Alert, ActivityIndicator} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Slider from '@react-native-community/slider';
import { scanStyle } from './Style/scanStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sample from '../Tabs/sample';
import {app} from "../API/firebaseCRUD";
import { doc,setDoc, Timestamp, getFirestore,collection, addDoc, getDocs, deleteDoc} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from 'moment';
import { SvgXml } from 'react-native-svg';

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

const pleaseWait = () =>{
  
  ToastAndroid.showWithGravity(
    'The URL is validating please wait.',
    ToastAndroid.SHORT, //can be SHORT, LONG
    ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
  );
}

const errorToast = () =>{
  
  ToastAndroid.showWithGravity(
    'Failed to Read QR Code.',
    ToastAndroid.SHORT, //can be SHORT, LONG
    ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
  );
}

const validationError = () =>{
  
  ToastAndroid.showWithGravity(
    'Failed to Validate QR Code. ',
    ToastAndroid.SHORT, //can be SHORT, LONG
    ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
  );
}

const invalidInput = () =>{
  
  ToastAndroid.showWithGravity(
    'Failed to Read QR Code. Make sure it is a QR code ',
    ToastAndroid.SHORT, //can be SHORT, LONG
    ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
  );
}
  // Scanning QR code

  const handleBarCodeScanned = ({ type, data }) => {
    
    setScanned(true);
    try{
      url = Boolean (new URL("",data))
      // alert(`${data} is a link`);
      
      sendData(data)

    }catch (e){
      const status = "Message"
      sendServer(data, status)
      navigation.navigate("Message", {
        
            message:data
      })  


    }
    
  };


  // Send Data to Server
  const sendData = async(data) =>{
    pleaseWait();

    try{
    console.log(data)

    fetch('https://seqrscan.online/validationServer/validate/', {
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
    .catch((error) => 
      validationError()
    
    );
 
    } catch (error) {
      // console.error(error);
      errorToast()
     
    }
}



const getResponse = async (json,data) =>{
  console.log("get response")
  console.log(json.result)
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
  const showMonth = dateNow.getMonth()+1;
  const date = showMonth+"-"+ dateNow.getDate()+"-"+dateNow.getFullYear();
  
  const db = getFirestore(app);
  const userJSON = await AsyncStorage.getItem("@user");
  const userData = userJSON ? JSON.parse(userJSON):null;

  const idDate = Moment().format();
  const stringDate = idDate.toString();
  console.log(stringDate);



  await setDoc(doc(db,"qrCodeHistory",userData.uid,"Generated",idDate),{
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

        const booleanData = Boolean(data);

      
      
        // alert(`Data ${qrCodeDataStrings} has been scanned!`);
        try{
          if (booleanData === false){

            invalidInput();

          }else{
            url = Boolean (new URL("",data))
            sendData(data)
          }

    
        }catch (e){
          if (booleanData === false){

            invalidInput();
          }else{
          }
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
    let desiredRatio = '4:3';  
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();
      let distances = {};
      let realRatios= {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
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
      desiredRatio = minDistance;

      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );

      setImagePadding(remainder);
      setRatio(desiredRatio);

      setIsRatioSet(true);
    }
  };

  

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

                 
        </Camera>
  }
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </SafeAreaView>
    );
  }
}