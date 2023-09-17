import { StyleSheet,TouchableOpacity,Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { historyStyle } from './Style/historyStyle';
import { useState } from 'react';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';



export default function History() {

  const [isAll, setisAll] = useState("true");
  const [isSafe, setisSafe] = useState("false");
  const [isSuspicious, setisisSuspicious] = useState("false");
  

  //  List of Data
  const historyData = [

      {id:"1", link:"Link1" ,linkStatus:"Safe", time:"12:00 am", date:"08/03/2023"},
      {id:"2", link:"Link2" ,linkStatus:"Suspicious", time:"12:00 am", date:"08/03/2023"},
      {id:"3", link:"Link3" ,linkStatus:"Suspicious", time:"12:00 am", date:"08/03/2023"},
      {id:"4", link:"Link4" ,linkStatus:"Safe", time:"12:00 am", date:"08/03/2023"},
      {id:"5", link:"Link5" ,linkStatus:"Safe", time:"12:00 am", date:"08/03/2023"},
      {id:"6", link:"Link6" ,linkStatus:"Message", time:"12:00 am", date:"08/03/2023"},
    ];


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

      const filterData = (state) =>{

            if (state === 'All'){
                setData(historyData);
            }else{

            const filtered = historyData.filter(item => item.linkStatus === state);
              setData(filtered);
            }

            setActiveFilter(state)
      };

  
  // Render Button with color based on data status
  const renderButton = (state, color) =>{

      const isActive = activeFilter === state;

      return(
        <TouchableOpacity 
            onPress = {() => filterData(state)} 
            style = {[historyStyle.allBttn, isActive && {backgroundColor:color}]} 

            >
            
            <Text 
              style = {isActive && historyStyle.activeButtonText}>{state}  </Text>
        </TouchableOpacity>


            // <TouchableOpacity style = {historyStyle.allBttn} onPress = {() => filterData('All')}> 
           //     <Text style = {historyStyle.allBttn_label}> All </Text>
            // </TouchableOpacity>

            // <TouchableOpacity style = {historyStyle.safeBttn} onPress = {() => filterData('Safe')}> 
            //     <Text style = {historyStyle.safeBttn_label}> Safe </Text>
            // </TouchableOpacity>

            // <TouchableOpacity style = {historyStyle.susBttn} onPress = {() => filterData('Suspicious')}> 
            //     <Text style = {historyStyle.susBttn_label}> Suspicious </Text>
            // </TouchableOpacity>
      );

  }


    const renderAllData = ({item}) => {

      const colorStyles = getColorStatus (item.linkStatus);
      

      return(
        <View style = {[historyStyle.listHistory, colorStyles ]}>

        <View style = {historyStyle.leftHistory}>
          <Ionicons  name='person' size={18} color="#2FA0D8"/>
          <View style = {historyStyle.details}>
            <Text> You scanned </Text>
            <Text> {item.link}</Text>
          </View>
        </View>

        <View style = {historyStyle.rightHistory}>
          <Text style = {historyStyle.historyTime}>  {item.time} </Text>
          <Text style = {historyStyle.historyDate}> {item.date}  </Text>
        </View>         
    </View>

      );



    }

  return (
    
    
    <SafeAreaView style = {historyStyle.mainContainer}>

        <View style = {historyStyle.bttnCont}>

           {renderButton('All','#2FA0D8')}
           {renderButton('Safe','#25C196')}
           {renderButton('Suspicious','#FF5757')}

{/* 
            <TouchableOpacity style = {historyStyle.allBttn} onPress = {() => filterData('All')}> 
                <Text style = {historyStyle.allBttn_label}> All </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {historyStyle.safeBttn} onPress = {() => filterData('Safe')}> 
                <Text style = {historyStyle.safeBttn_label}> Safe </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {historyStyle.susBttn} onPress = {() => filterData('Suspicious')}> 
                <Text style = {historyStyle.susBttn_label}> Suspicious </Text>
            </TouchableOpacity> */}
        </View>




        <View style ={historyStyle.historyList}>
            <FlatList 
                  // style ={historyStyle.historyFlatlist}
                  data={data}
                  renderItem={renderAllData}
                  

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


