import React, { useEffect } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonHeader from './CommonHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const InitialGameScreen = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    // const backAction = () => {
    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );
    // return () => backHandler.remove();
    // }

  },[])
  return (
    <View style={{flex: 1, backgroundColor: 'black',
   
}}>
    <TouchableOpacity
        onPress={()=>{navigation.openDrawer();}}
          style={{
            flex: 0.2,
            backgroundColor: 'red',
            marginTop:"5%"
          }}>
          <FontAwesome name={'bars'} size={30} 
          style={{marginLeft: '7%'}} />
        </TouchableOpacity>
  {/* <CommonHeader navigation={navigation}/> */}
  <View style={{  justifyContent: 'center',
          alignSelf: 'center',
          flex:1,
         }}>
      <Image
        style={{
          width: 300,
          height: 200,
        }}
        source={require('../assets/pngImages/rps.png')}
      />
      </View>
      {/* <Text style={styles.readyText}>Let's play</Text> */}
      <TouchableOpacity
        onPress={()=>{
         navigation.navigate('GameScreen');
          }}
        style={{
          flexDirection:"row",
          borderRadius: 10,
          padding: '3%',
          backgroundColor: '#f9d835',
          marginHorizontal: '24%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: '5%',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 17,
            fontWeight: '600',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginRight:"6%"
          }}>
          Let's Play
        </Text>
        <AntDesign name="arrowright" size={18} 
        style={{justifyContent:"center",alignItems:"center",alignSelf:"center",color:"black",marginTop:"2%"}} color="#6a5300"/>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  readyText: {
    marginTop: -48,
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    fontSize: 48,
    fontWeight: 'bold',
    color:"white"
  },
});
export default InitialGameScreen;
