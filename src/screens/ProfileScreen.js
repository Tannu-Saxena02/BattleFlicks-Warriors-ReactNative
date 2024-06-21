import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  useEffect(() => {
    setData();
  }, []);
  const setData = async () => {
    let userName = await AsyncStorage.getItem('username');
    let userEmail = await AsyncStorage.getItem('useremail');
    let userpassword = await AsyncStorage.getItem('userpassword');
    if(userName&&userEmail&&userpassword)
    {
    setName(userName);
    setEmail(userEmail);
    setPassword(userpassword);
    console.log('data is>>>>>>>>' + userName + userpassword + userEmail);
  }
  console.log('data in async is>>>>>>>>' + userName + userpassword + userEmail);

  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontSize: 25,
          color: 'green',
          fontWeight: 'bold',
        }}>
        Name :{name}
      </Text>
      <Text
        style={{
            fontSize: 25,
            color: 'green',
            fontWeight: 'bold',
        }}>
        Email:{email}
      </Text>
      <Text
        style={{
            fontSize: 25,
            color: 'green',
            fontWeight: 'bold',
        }}>
        Password:{Password}
      </Text>
    </View>
  );
};
export default ProfileScreen;
