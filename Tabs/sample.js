import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Button,TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {app} from "../API/firebaseCRUD";
import { doc,setDoc, Timestamp, getFirestore,collection, addDoc, getDocs, deleteDoc, onSnapshot} from "firebase/firestore"; 
const Sample = () => {  

    const [id, setID] = useState()
    const [text, setText] =useState()

  const [data, setData] = useState(
    // Add more data items as needed
  );
  

  const [extraData, setExtraData] = useState(false);
  const getData = async() =>{


    // try{

      const db = getFirestore(app);

      // try{
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null;
    
      const val = doc(db, "qrCode",userData.uid)
      const ref = collection(val,"Generated")
      const getValue = await getDocs(ref);
 

      const responseData = getValue.docs.map((doc)=> ({...doc.data(), id:doc.id}))
      setData(responseData)
   
  }


  useEffect(() => {
    // Simulate an update to the data without user interaction
    getData();
    console.log(data)
  }, []); 

  useEffect(() => {
    // Simulate an update to the data without user interaction
    updateDataWithoutButton();
  }, []); // The empty dependency array means this effect runs once, like componentDidMount

  const updateDataWithoutButton = async() => {
    // Modify the data as needed
        const db = getFirestore(app);

      // try{
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null;
    
      const val = doc(db, "qrCode",userData.uid)
      const ref = collection(val,"Generated")
      const getValue = await getDocs(ref);
 

      const responseData = getValue.docs.map((doc)=> ({...doc.data(), id:doc.id}))
      setData(responseData)
    setExtraData((prevExtraData) => !prevExtraData);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{borderWidth:1, padding: 10, marginTop:5, width:"80%"}}
      >
        <Text>{item.qrCodeContent}</Text>
      </View>
    );
  };

  const keyExtractor = (item) => item.id;



  return (
    <View>
    
        <TextInput
            onChangeText={setID}
            value={id}
            placeholder='ID'
        /> 
        <TextInput
            onChangeText={setText}
            value={text}
            placeholder='Text'
        />   

        <TouchableOpacity
         
        >
            <Text>
                Submit
            </Text>
        </TouchableOpacity> 
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={extraData} // Use extraData to trigger re-render
      />
    </View>
  );
};

export default Sample;
