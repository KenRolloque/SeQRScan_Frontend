import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Loading = ()=>{

    return (
    <View 
        style={{flex:1 ,
        justifyContent: 'center',
        alignItems:'center'}}>
      <ActivityIndicator animating size="large"  />
    </View>
    );
  }


export default Loading;