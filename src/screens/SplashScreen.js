import React, { useEffect } from 'react';
import {StyleSheet, Text, TextInput, View,onChangeText, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import FirebaseLogin from './FirebaseLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
const SplashScreen = ({navigation}) => {
    var value;
    useEffect(()=>{
        // 'signinFlag',
        getNaviagtionData();
                window.setTimeout(() => {
                    // auth().onAuthStateChanged(user=>{
                    //     const routeName=user!=null?
                    //     value?'FirebaseLogin':'HomeScreen'
                    //     :'FirebaseLogin'


                        // 'HomeScreen':'FirebaseLogin';
                        // console.log("splash",user);
                        // navigation.dispatch(StackActions.replace(routeName))
                        navigation.dispatch(StackActions.replace('FirebaseLogin'))
                        
                    // })
                }, 6000);
            
        
        // },3000);
    });
    const getNaviagtionData=async()=>{
         value = await AsyncStorage.getItem('signinFlag');
        console.log("value in async is",value);
    }
  return (
    <View style={{flex: 1,
    backgroundColor:"#242841ff"}}>
        {/* <View style={{flex:0.3,
            // backgroundColor:"red"
            }}>
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: '10%',
          fontSize:30,
          color:"green",
          fontWeight:"bold"
        }}>
        Firebase
      </Text>

</View> */}
    
 
      {/* <View style={{flex:0.1,
        // backgroundColor:"pink"
        }}>
      <TouchableOpacity
      style={{width:"90%",
      height:"70%",
      backgroundColor:"green",
      marginHorizontal:"10%",
      borderRadius:10,
      alignSelf:"center",
      alignContent:'center',
      justifyContent:"center"}}>
        <Text
        style={{color:"white",fontSize:17,textAlign:"center",
        alignSelf:"center",justifyContent:"center"}}>SplashScreen</Text>
      </TouchableOpacity>
      </View> */}
       <Lottie source={require('../assets/lottieFiles/rocketloader.json')} autoPlay loop />
    </View>
  );
};
const styles=StyleSheet.create({
    input: {
        height: 50,
        width:"85%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
        alignSelf:"center"
      },  
})
export default SplashScreen;
