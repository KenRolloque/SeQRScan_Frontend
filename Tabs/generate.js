import { StyleSheet, ScrollView,TextInput, TouchableOpacity,ImageBackground, Modal, Pressable, PixelRatio,Text, View, ToastAndroid, Alert } from 'react-native';

import { generateStyle } from './Style/generateStyle';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useRef, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import Moment  from 'moment';
import * as MediaLibrary from "expo-media-library";
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';

import { useFonts } from 'expo-font';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {app} from "../API/firebaseCRUD";
import { doc, setDoc, Timestamp, getFirestore,collection, addDoc} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Generate() {



    // Description and URL
    const [desc, setDesc] = useState("");
    const [inputText, setinputText] = useState("");

    // Boolean
    const [shouldShow, setShouldShow] = useState(false);
    const [isDisabled, setisDisabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const viewShotRef = useRef(null);
    const [qrCodeImagePath, setQRCodeImagePath] = useState(null);

    // Font
    const [isLoaded] = useFonts({
        'Poppins-Regular':require ("../assets/font/Poppins/Poppins-Regular.ttf"),
        'Poppins-SemiBold': require ("../assets/font/Poppins/Poppins-SemiBold.ttf"),

    });
    
      if (!isLoaded){
        return null;
      }



  // Input TextAlert
    const inputAlert = () =>
    Alert.alert('Input Error', 'Please fill all fields', [

      {text: 'OK'},
    ]);

  // Input TextAlert
  const qrCodeAlert = () =>
  Alert.alert('Generation Error', 'The amount of data is too big to be storedin a QR COde', [

    {text: 'OK'},
  ]);


    // Input Text
    const handleChangeText = (text) => {

        setinputText(text);
        setShouldShow(false);
    }

    
    // Input Description
    const handleChangeDesc = (description) => {

        setDesc(description);
        setShouldShow(false);
    }

    // Generate QR Code
    const handleGenerateQRCode = () => {

    
            if (inputText === "" || desc === ""){

                inputAlert();
                
            }else{
    
                setModalVisible(true)
                // setShouldShow(true); // Show the QR code when the "Generate" button is pressed
            }    
    };

    const clearInput = async () =>{

        const empty = "";
        setShouldShow(false);
        setDesc(empty);
        setinputText(empty);
    }


    // Show Download Toast
    const Download = async () => {
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
            
                  const asset = await MediaLibrary.createAssetAsync(uri);
            
                  console.log('QR Code PNG image saved:', asset.uri);

            }catch(error){
                console.error("Error Capturing QR Code",error)
            }
    
      
          }
        }else{
            console.error('Permission to save to media library denied');
          }

        ToastAndroid.showWithGravity(
          'Saved to Local Gallery.',
          ToastAndroid.SHORT, //can be SHORT, LONG
          ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
        );

      }catch(e){
        ToastAndroid.showWithGravity(
          'Failed to Local Gallery. Please try again.',
          ToastAndroid.SHORT, //can be SHORT, LONG
          ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
        )
      }


      };

      const add = async() => {

        // getDate();
        const db = getFirestore(app);
        const idDate = Moment().format();
        const stringDate = idDate.toString();

        const dateNow = new Date();
        const time = dateNow.getHours()+":"+ dateNow.getMinutes()+":"+dateNow.getSeconds();
        const showMonth = dateNow.getMonth()+1;
        const date = showMonth+"-"+ dateNow.getDate()+"-"+dateNow.getFullYear();

        try{
            const userJSON = await AsyncStorage.getItem("@user");
            const userData = userJSON ? JSON.parse(userJSON):null;


            const val = doc(db, "qrCode",userData.uid)
            const ref = collection(val,"Generated")

            await setDoc(doc(db,"qrCode",userData.uid,"Generated",stringDate),{
                qrCodeContent:inputText,
                qrCodeDescription:desc,
                qrCodeDate: date,
                qrCodeTime:time,
          
          })
            ToastAndroid.showWithGravity(
              'Saved to App Gallery',
              ToastAndroid.SHORT, //can be SHORT, LONG
              ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
            );
     
          }catch(e){
            console.log("Unable Error")
            ToastAndroid.showWithGravity(
              'Failed to saved in App Gallery. Please try again.',
              ToastAndroid.SHORT, //can be SHORT, LONG
              ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
            );
          }};

  return (

    // Main Container
    
   
    <SafeAreaView style = {generateStyle.mainContainer}>
    <ScrollView>

    {/* Section One */}

        <View style = {generateStyle.sectionOne}>

            <View style = {generateStyle.descContainer}>
                <FontAwesome style =  {generateStyle.icons}  name="font" size={16} color="#25C196" />
                <Text style = {generateStyle.descLabel}> Description </Text>
            </View>

            <TextInput
                placeholder='Enter Description'
                onChangeText={handleChangeDesc}
                value={desc}
                style={generateStyle.descInput}

            />

            <View style = {generateStyle.textContainer}>
                <FontAwesome style =  {generateStyle.icons} name="file" size={16} color="#25C196" />
                <Text style = {generateStyle.descLabel}> Text </Text>
            </View>
            <TextInput
                multiline
                onChangeText={handleChangeText}
                value={inputText}
                placeholder='Enter Text'
                style={generateStyle.textInput}
                scrollEnabled= {true}
                maxLength={1000}
            />

            <View style = {generateStyle.buttonsCont}>

                    <Pressable 
                    style = {[generateStyle.clearButton]}
                    // disabled = {inputText.trim() === '' && desc.trim() === ''}
                    onPress={clearInput}

                    >
                        <Text style = {generateStyle.clearText}>Clear</Text>
                    </Pressable>
                
                    <TouchableOpacity 
                        style = {generateStyle.genButton} onPress={handleGenerateQRCode}
                        >
                        <Text style = {generateStyle.clearButtonText}>Generate</Text>
                    </TouchableOpacity>
        
            </View>
        </View>



    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        
        >
        <View style={generateStyle.centeredView}>


        <View style={generateStyle.backContainer}>
            <Pressable
                style={[generateStyle.button, generateStyle.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>

                <Text style={generateStyle.textStyle}>Back</Text>

            </Pressable>
        </View>
{/* 
        <Text style ={generateStyle.ready}> Your QR Code is Ready</Text> */}

        
        <View style={generateStyle.modalView}>
 

        <View style ={generateStyle.qrContainer}>

            <ViewShot 
            ref={viewShotRef} 
          
            options={{ format: 'png', quality: 1 }}
            >

                <View
                  style={generateStyle.qr}
                >

                <QRCode value ={inputText} size={200}/>


                </View>
            </ViewShot>



            <View style={generateStyle.descContainerModal}>

                    <View style={generateStyle.linkIconContainer}>
                        <Ionicons  style ={generateStyle.linkIcon} name='document-text-outline' size={20}  />
                    </View>

                    <View style={generateStyle.descLabelContainer}>

                        <Text style={generateStyle.descLabel}> Description </Text>
                        <Text style={generateStyle.desc} numberOfLines={1}> {desc}</Text> 
                    </View>

            </View>

            <View style={generateStyle.linkContainer}>

                <View style={generateStyle.linkIconContainer}>
                    <Ionicons  style ={generateStyle.linkIcon} name='mail-outline' size={20}  />
                </View>

                <View style={generateStyle.linkLabelContainer}>
                    <ScrollView>
                        <Text style={generateStyle.linkLabel}> Content </Text>
                        <Text  style={generateStyle.link} > {inputText} </Text> 
                    </ScrollView>
                </View>

            </View>

        </View>

          </View>

          

          <View style ={generateStyle.actionBttn}>

                <TouchableOpacity style ={generateStyle.dlBttn}  onPress={Download}>
                    <Ionicons  style ={generateStyle.dlIcon} name='arrow-down-circle-outline' size={18} color="white" />
                    <Text style ={generateStyle.dlBttn_label}> Download</Text>
                </TouchableOpacity>

                <TouchableOpacity style ={generateStyle.addBttn} onPress={add}>
                    <Ionicons  style ={generateStyle.addIcon} name='add-circle-outline' size={18} color="white"/>
                    <Text style ={generateStyle.addBttn_label}> Add</Text>
                </TouchableOpacity>

        </View>

        </View>
      </Modal>

      </ScrollView>
    </SafeAreaView>

   
    

  );
}

const styles = StyleSheet.create({
    
  });

