import { StyleSheet,TouchableOpacity,Text, View,RefreshControl, ToastAndroid } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { historyStyle } from './Style/historyStyle';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {app} from "../API/firebaseCRUD";

import { doc,setDoc, Timestamp, getFirestore,collection, addDoc, getDocs, deleteDoc, onSnapshot} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function History() {

  const [isAll, setisAll] = useState("true");
  const [isSafe, setisSafe] = useState("false");
  const [isSuspicious, setisisSuspicious] = useState("false");
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true)

  const [refreshing, setRefreshing] = useState(true);

  //  List of Data
  const historyData = [

      {id:"1", link:"Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1Link1" ,linkStatus:"Safe", time:"12:00 am", date:"08/03/2023"},
      {id:"2", link:"Link2" ,linkStatus:"Suspicious", time:"12:00 am", date:"08/03/2023"},
      {id:"3", link:"Link3" ,linkStatus:"Suspicious", time:"12:00 am", date:"08/03/2023"},
      {id:"4", link:"Link4" ,linkStatus:"Safe", time:"12:00 am", date:"08/03/2023"},
      {id:"5", link:"Link5" ,linkStatus:"Safe", time:"12:00 am", date:"08/03/2023"},
      {id:"6", link:"Link6" ,linkStatus:"Message", time:"12:00 am", date:"08/03/2023"},
      {id:"7", link:"Link7" ,linkStatus:"Message", time:"12:00 am", date:"08/03/2023"},
      {id:"8", link:"Link8" ,linkStatus:"Message", time:"12:00 am", date:"08/03/2023"},
      {id:"9", link:"Link9" ,linkStatus:"Message", time:"12:00 am", date:"08/03/2023"},
      {id:"10", link:"Link10" ,linkStatus:"Message", time:"12:00 am", date:"08/03/2023"},
      {id:"11", link:"Link11" ,linkStatus:"Message", time:"12:00 am", date:"08/03/2023"},
      {id:"12", link:"Link12" ,linkStatus:"Message", time:"12:00 am", date:"08/03/2023"},
    ];

  // Font
  useEffect(() => {

    fetchData();
   
   }, [setMyData]);

   const onRefresh = () => {
    //Clear old data of the list
    setMyData([]);
    //Call the Service to get the latest data
    fetchData();
  };

  const fetchData = async() =>{

    try{
      const db = getFirestore(app);

      // try{
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null;
    
      const val = doc(db, "qrCodeHistory",userData.uid)
      const ref = collection(val,"Generated")
      const getValue = await getDocs(ref);

      setMyData(getValue.docs.map((doc)=> ({...doc.data(), id:doc.id})))
      setRefreshing(false);

    }catch(e){
      ToastAndroid.showWithGravity(
        'Failed to Fetch Data. Please check you internet connection',
        ToastAndroid.SHORT, //can be SHORT, LONG
        ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
      );
  
    }


  }
  // Change the Background and Borde Color base on status
  const getColorStatus = (state) =>{

      switch (state){

        case "Safe":
          return {
            borderStartColor:"#25C196",
            backgroundColor: "#E4FFF2"
          };

        case "Suspicious":
          return {
            borderStartColor:"#C20000",
            backgroundColor:"#FFE3E3"
          };

        case "Message":
          return {
            borderStartColor:"#2FA0D8",
            backgroundColor:"#D7F2FF"
          };

        default:
          return {
            borderStartColor:"#C20000",
            backgroundColor:"#FFE3E3"
          };

      }

  };


  // Filter Data based on status
  const [data , setData] = useState(historyData);
  const [activeFilter, setActiveFilter] = useState('All');

      // const filterData = (state) =>{

      //       if (state === 'All'){
      //           setData(historyData);
      //       }else{

      //       const filtered = historyData.filter(item => item.linkStatus === state);
      //         setData(filtered);
      //       }

      //       setActiveFilter(state)
      // };

  
  // Render Button with color based on data status
  // const renderButton = (state, color) =>{

  //     const isActive = activeFilter === state;

  //     return(
  //       <TouchableOpacity 
  //           onPress = {() => filterData(state)} 
  //           style = {[historyStyle.allBttn, isActive && {backgroundColor:color}]} 

  //           >
            
  //           <Text 
  //             style = {isActive && historyStyle.activeButtonText}>{state}  </Text>
  //       </TouchableOpacity>


  //     );

  // }

    const [isLoaded] = useFonts({
      'Poppins-Regular':require ("../assets/font/Poppins/Poppins-Regular.ttf"),
    });

    if (!isLoaded){
      return null;
    }


    const renderAllData = ({item}) => {

      const colorStyles = getColorStatus (item.qrCodeStatus);
      

      return(
        <View style = {[historyStyle.listHistory, colorStyles ]}>

        <View style = {historyStyle.leftHistory}>
          <Ionicons  name='person' size={18} color="#2FA0D8"/>
          <View style = {historyStyle.details}>
            <Text style={historyStyle.introText}> You scanned </Text>
            <Text style={historyStyle.linkText} numberOfLines={1}> {item.qrCodeContent}</Text>
          </View>
        </View>

        <View style = {historyStyle.rightHistory}>
          <Text style = {historyStyle.historyTime}>   {item.qrCodeTime} </Text>
          <Text style = {historyStyle.historyDate}> {item.qrCodeDate}  </Text>
        </View>         
    </View>

      );



    }

  return (
    
    
    <SafeAreaView style = {historyStyle.mainContainer}>

        {/* <View style = {historyStyle.bttnCont}>

           {renderButton('All','#2FA0D8')}
           {renderButton('Safe','#25C196')}
           {renderButton('Suspicious','#FF5757')}

        </View> */}



        <View style ={historyStyle.historyList}>
            <FlatList 
                  // style ={historyStyle.historyFlatlist}
                  // style ={{width:"90%",backgroundColor:"red"}}
                  data={myData}
                  keyExtractor={(item) => item.id}
                  renderItem={renderAllData}
                  refreshControl={
                    <RefreshControl
                      //refresh control used for the Pull to Refresh
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  
            />
        </View>


        
{/* 
        <View style = {historyStyle.listHistory2}>

            <View style = {historyStyle.leftHistory}>
              <Ionicons  name='person' size={18} color="#2FA0D8"/>
              <View style = {historyStyle.details}>
                <Text> You scanned </Text>
                <Text> https://facebook.com </Text>
              </View>
            </View>

            <View style = {historyStyle.rightHistory}>
              <Text> Time </Text>
              <Text> Date </Text>
            </View>         
        </View> */}



    </SafeAreaView>
  );
}


