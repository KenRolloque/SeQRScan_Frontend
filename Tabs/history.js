import { StyleSheet,TouchableOpacity,Text, View,RefreshControl, ToastAndroid } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { historyStyle } from './Style/historyStyle';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import Moment from 'moment';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {app} from "../API/firebaseCRUD";

import { doc,orderBy, getFirestore,collection, getDocs, query} from "firebase/firestore"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading
 from '../components/loading';
export default function History() {

  const [myData, setMyData] = useState([]);
  const [sortedData, setSortedData]= useState([]);
  const [ascending, setAscending] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  //  List of Data

  // Font
  useEffect(() => {


    const interval = setInterval(() =>{

      fetchData();
      

    },3000
    )
    return () =>  clearInterval(interval);
   
   
   }, []);



  const fetchData = async() =>{

    try{
      const db = getFirestore(app);

      // try{
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON):null; 
    
      const val = doc(db, "qrCodeHistory",userData.uid)
      const ref = collection(val,"Generated")
      const getValue = await getDocs(query(ref),orderBy("qrCodeContent"));

      setMyData(getValue.docs.reverse().map((doc)=> ({...doc.data(), id:doc.id})))
      // console.log(myData)
      // sort data
      // setSortedData(myData);
      // toggleSorting();
    
   
      setRefreshing(false);

    }catch(e){
      // ToastAndroid.showWithGravity(
      //   'Failed to Fetch Data. Please check you internet connection',
      //   ToastAndroid.SHORT, //can be SHORT, LONG
      //   ToastAndroid.CENTER //can be TOP, BOTTON, CENTER
      // );
  
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

  const [activeFilter, setActiveFilter] = useState('All');
 

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
          {/* <Text style = {historyStyle.historyTime}>  </Text> */}
          <Text style = {historyStyle.historyDate}> {Moment(item.qrCodeDate+","+item.qrCodeTime, "MMDDYYYY, h:mm:ss").fromNow()}  </Text>
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

        <View style={historyStyle.labelContainer}>

              <View style={historyStyle.safeContainer}>

                  <View style={{width:10, height:10,backgroundColor:"#25C196",marginHorizontal: 10}}></View>
                  <Text>Safe</Text>
              </View>

              <View style={historyStyle.suspiciousContainer}>

                  <View style={{width:10, height:10,backgroundColor:"#FF5757",marginHorizontal: 10,}}></View>
                  <Text>Suspicious</Text>
              </View>

              <View 
                  style={historyStyle.messageContainer}>
                  
                  <View 
                    style={{
                      width:10,   
                      height:10,
                      backgroundColor:"#2FA0D8",
                      marginHorizontal: 10
                      }}>   
                  </View>
                  <Text>Message</Text>
              </View>


        </View>



        <View style ={historyStyle.historyList}>
            <FlatList 
                  // style ={historyStyle.historyFlatlist}
                  // style ={{width:"90%",backgroundColor:"red"}}
                  data={myData}
                  keyExtractor={(item) => item.id}
                  renderItem={renderAllData}
                  ListEmptyComponent={Loading}
   
                  
            />
        </View>


        



    </SafeAreaView>
  );
}


