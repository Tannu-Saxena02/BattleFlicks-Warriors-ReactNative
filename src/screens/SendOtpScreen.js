import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  onChangeText,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryPicker } from 'react-native-country-codes-picker';
import { TextInput } from 'react-native-paper'
const SendOtpScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirmData, setConfirmData] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [mobileErrorShow, setMobileErrorShow] = useState(false);

  const handleValidation = async () => {
    if (mobileNumber != null && mobileNumber) {
      await AsyncStorage.setItem("mobileNumberWithCode", countryCode + mobileNumber);
      navigation.navigate('VerifyOtpScreen');
      // sendOtp();
    } else {

      if (mobileNumber == '') {
        setMobileNumberError('mobile number cannot be empty');
        setMobileErrorShow(true);
      }
    }
  };
  // const sendOtp=async()=>{
  //  try{
  //   const mobile='+91'+mobileNumber;
  //   const response=await auth().signInWithPhoneNumber(mobile);
  //   setConfirmData(response);

  // await AsyncStorage.setItem("responseSendOtp", JSON.stringify(confirmData));
  // const sendOtpResponse =await AsyncStorage.getItem("responseSendOtp");

  //   console.log("response",sendOtpResponse,"datata>>>>>>>>>>>>>>>>:::::::::::",JSON.parse(sendOtpResponse)+" "+mobile);
  //  }
  //  catch(error)
  //  {
  //   console.log("error is>>>>",error);
  //  }
  // }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.6,
        }}>
        <ImageBackground
          source={require('../assets/pngImages/verify2.png')}
          resizeMode="cover"
          style={styles.image}></ImageBackground>
      </View>
      <View
        style={{
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            color: 'grey',
            fontWeight: '500',
          }}>
          Enter Mobile Number
        </Text>
      </View>
      <View
        style={{
          flex: 0.2,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginHorizontal: '6%',
        }}>
        <TouchableOpacity onPress={() => setShow(true)} style={{
          marginBottom: "5%",
          width: "30%",

        }}>
          <TextInput
            value={countryCode}
            placeholder={'code'}
            editable={false}
            mode={'outlined'}
            placeholderTextColor="#AFAFAF"

            style={{
              color: '#4D4848',
            }}
            outlineColor={'#AFAFAF'}
            theme={{
              colors: {
                primary: '#B5B5B5',
                text: '#4D4848',
                background: '#F4F4F4',
                placeholder: '#989898',
              },
            }}
          />
        </TouchableOpacity>

        <CountryPicker
          show={show}
          pickerButtonOnPress={item => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
          style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}
        />
        <View style={{ width: "70%" }}>
          <TextInput
            label="Mobile Number"
            value={mobileNumber}
            mode={'outlined'}
            keyboardType='numeric'
            onChangeText={text => {
              setMobileNumber(text);
              setMobileErrorShow(false);
            }}
            style={{
              color: 'red',
              width: '90%',
              height: 54,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            underlineColorAndroid="transparent"
            outlineColor={'#AFAFAF'}
            theme={{
              colors: {
                primary: '#B5B5B5',
                text: '#4D4848',
                background: '#F4F4F4',

              },
            }}
          />
          <View style={{ height: 20 }}>
            {mobileErrorShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '7%',
                  fontSize: 12,

                }}>
                {mobileNumberError}
              </Text>
            ) : null}
          </View>
        </View>

      </View>

      <View
        style={{
          flex: 0.1,
        }}>
        <TouchableOpacity
          onPress={() => {
            handleValidation();
          }}
          style={{
            width: '90%',
            height: '70%',
            backgroundColor: '#1877f2',
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
            Send otp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '70%',
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  countryCodeInput: {
    height: 50,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    color: '#000',
  },
});
export default SendOtpScreen;
