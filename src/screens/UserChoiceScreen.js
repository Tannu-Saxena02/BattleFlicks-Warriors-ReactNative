import React from 'react'
import { View,Text, TouchableOpacity } from 'react-native'

const UserChoiceScreen = ({navigation}) => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
         <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegisterationScreen");
          }}

          style={{
            borderRadius: 10,
            padding: '3.3%',
            backgroundColor: '#a9ff03',
            marginHorizontal: '7%',
            marginBottom: '5%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            Signup via  Email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SendOtpScreen")}}
     
          style={{
            borderRadius: 10,
            padding: '3.3%',
            backgroundColor: '#a9ff03',
            marginHorizontal: '7%',
            marginBottom: '5%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            Signup via phone
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default UserChoiceScreen
