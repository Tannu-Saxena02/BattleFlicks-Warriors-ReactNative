import { StackActions, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }) => {

  const handleLogout = async () => {
    await auth().signOut();
    navigation.dispatch(navigation.replace('FirebaseLogin'));

  }
  return (
    <View style={{ flex: 1 }}>

      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
        style={{
          width: '90%',
          marginTop: "15%",
          height: '5%',
          backgroundColor: 'green',
          marginHorizontal: '10%',
          borderRadius: 10,
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            textAlign: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export default HomeScreen;