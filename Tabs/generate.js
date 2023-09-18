import { StyleSheet,TextInput, TouchableOpacity,ImageBackground, Modal, Alert, Pressable, PixelRatio,Text, View, ToastAndroid } from 'react-native';

import { generateStyle } from './Style/generateStyle';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useRef, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';

import * as MediaLibrary from "expo-media-library";
import ViewShot from 'react-native-view-shot';
import { captureRef } from 'react-native-view-shot';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';




export default function Generate() {

    
    // Export Font


    


    //

    // Description and URL
    const [desc, setDesc] = useState("");
    const [inputText, setinputText] = useState("");

    // Boolean
    const [shouldShow, setShouldShow] = useState(false);
    const [isDisabled, setisDisabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const viewShotRef = useRef(null);
    const [qrCodeImagePath, setQRCodeImagePath] = useState(null);



    // Input Text
    const handleChangeText = (text) => {

        setinputText (text);
        setShouldShow(false);
    }

    
    // Input Description
    const handleChangeDesc = (description) => {

        setDesc (description);
        setShouldShow(false);
    }

    // Generate QR Code
    const handleGenerateQRCode = () => {

        if (inputText ==="" || desc ===""){
            
        }else{
            setShouldShow(true); // Show the QR code when the "Generate" button is pressed
        }
      
    };

    // Clear Inputs


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
          'Saved to Local Gallery',
          ToastAndroid.SHORT, //can be SHORT, LONG
          ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
        );



      };

      const add = () => {
        //function to make Toast With Duration And Gravity
        // ToastAndroid.showWithGravity(
        //   'Added to App Gallery',
        //   ToastAndroid.SHORT, //can be SHORT, LONG
        //   ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
        // );
      };


  return (

    // Main Container
    
   
    <SafeAreaView style = {generateStyle.mainContainer}>


    {/* Section One */}

        <View style = {generateStyle.sectionOne}>

            <View style = {generateStyle.descContainer}>
                <FontAwesome style =  {generateStyle.icons}  name="font" size={16} color="#25C196" />
                <Text style = {generateStyle.descLabel}> Description </Text>
            </View>

            <TextInput
                multiline
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
            />

            <View style = {generateStyle.buttonsCont}>

                    <Pressable 
                    style = {[generateStyle.clearButton]}
                    disabled = {inputText.trim() === '' && desc.trim() === ''}
                    onPress={clearInput}

                    >
                        <Text style = {generateStyle.clearText}>Clear</Text>
                    </Pressable>
                
                    <TouchableOpacity 
                        style = {[generateStyle.genButton, inputText.trim() === "" && generateStyle.disableDL]} onPress={() => setModalVisible(true)}
                         disabled = {inputText.trim() === ''}>
                        <Text style = {generateStyle.clearButtonText}>Generate</Text>
                    </TouchableOpacity>
        
            </View>
        </View>




        {/* Section Two */}

        {/* {shouldShow ? (

            // <View  style = {generateStyle.sectionTwo}>
            <ImageBackground style = {generateStyle.sectionTwo} source={require('../../assets/images/stacked-peaks-haikei.jpg')}>
                <Text style ={generateStyle.ready}> Your QR Code is Ready</Text>

                 <View style ={generateStyle.qrContainer}>

                    <View style={generateStyle.qr}>
                        <QRCode value ={inputText} size={200}/>
                    </View>

                    <View style ={generateStyle.actionBttn}>
        
                        <TouchableOpacity style ={generateStyle.dlBttn} >
                            <Ionicons  style ={generateStyle.dlIcon} name='arrow-down-circle-outline' size={18} color="white" />
                            <Text style ={generateStyle.dlBttn_label}> Download</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style ={generateStyle.addBttn}>
                            <Ionicons  style ={generateStyle.addIcon} name='add-circle-outline' size={18} color="white"/>
                            <Text style ={generateStyle.addBttn_label}> Add</Text>
                        </TouchableOpacity>



                    </View>
     
                </View>

            </ImageBackground>    

        ):null}  */}


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



            <View style={generateStyle.linkContainer}>

                    <View style={generateStyle.linkIconContainer}>
                        <Ionicons  style ={generateStyle.linkIcon} name='document-text-outline' size={25}  />
                    </View>

                    <View style={generateStyle.linkLabelContainer}>

                        <Text style={generateStyle.linkLabel}> Description </Text>
                        <Text  style={generateStyle.link} > {desc}</Text> 
                    </View>

            </View>

            <View style={generateStyle.linkContainer}>

                <View style={generateStyle.linkIconContainer}>
                    <Ionicons  style ={generateStyle.linkIcon} name='mail-outline' size={25}  />
                </View>

                <View style={generateStyle.linkLabelContainer}>

                    <Text style={generateStyle.linkLabel}> Content </Text>
                    <Text  style={generateStyle.link} > {inputText} </Text> 
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

          </View>


        </View>
      </Modal>


    </SafeAreaView>

   
    

  );
}

const styles = StyleSheet.create({
    
  });

