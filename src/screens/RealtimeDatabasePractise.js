import React from 'react';
import { useEffect } from 'react';
import {StyleSheet, Text, TextInput, View,onChangeText, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import { useState } from 'react';

const RealtimeDatabasePractise = () => {
    const [myData,setMyData]=useState();
    useEffect(()=>{
        getUserData();
    },[]);

    const getUserData=async()=>{
        try{
            const data = await database().ref('users/1').once('value');
            console.log("data from real database is>>>>>>",data);
            setMyData(data.val());
            console.log("data in state is",myData);
        }
        catch(error)
        {
        console.log(error);
        }
    }
  return (
    <View style={{flex: 1}}>
        <Text style={styles.text}>Name:{myData?myData.name:'Loading.....'}</Text>
        <Text style={styles.text}>Age:{myData?myData.age:'Loading.....'}</Text>

    </View>
  );
};
const styles=StyleSheet.create({
    text: {
        fontSize:30,
        color:"green",
        fontFamily:"monospace",
        fontWeight:"400",
        justifyContent:"center",
        alignSelf: 'center',
      },  
})
export default RealtimeDatabasePractise;
