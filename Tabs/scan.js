import React, { useEffect, useState, useRef } from 'react';
import {StyleSheet, View, Text, Dimensions, Platform,Image, TouchableOpacity, Button, Toast} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Slider from '@react-native-community/slider';
import { scanStyle } from './Style/scanStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Scan() {


  //  camera permissions
  const [hasCameraPermission, setHasCameraPermission] = useState (null);
  const [camera, setCamera] = useState(null);
  const isFocused = useIsFocused();


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




  // Scanning QR code

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    
  };


  


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

        console.log(results);

        alert(`Data ${qrCodeDataStrings} has been scanned!`);

      



      
     } catch(error){
      console.debug(error)
     }

    };


  // set the camera ratio and padding.
  // this code assumes a portrait mode screen


  // useEffect(() => {
  //   async function getCameraStatus() {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasCameraPermission(status == 'granted');
  //   }
  //   getCameraStatus();
  // }, []);

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
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasCameraPermission === false) {
    return (
      <View >
        <Text>No access to camera</Text>
      </View>
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


        </Camera>
  }
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </SafeAreaView>
    );
  }
}