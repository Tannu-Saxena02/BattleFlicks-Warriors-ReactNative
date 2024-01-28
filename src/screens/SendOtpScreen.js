import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  onChangeText,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CountryPicker} from 'react-native-country-codes-picker';
import {TextInput} from 'react-native-paper'
const SendOtpScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [confirmData, setConfirmData] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');

  const handleValidation = () => {
    console.log('mobile number>>>>>', mobileNumber);
    if (mobileNumber != null && mobileNumber) {
      navigation.navigate('VerifyOtpScreen');
      // sendOtp();
    } else Alert.alert('please enter mobile number');
  };
  // const sendOtp=async()=>{
  //  try{
  //   const mobile='+91'+mobileNumber;
  //   const response=await auth().signInWithPhoneNumber(mobile);
  //   setConfirmData(response);

  // await AsyncStorage.setItem("responseSendOtp", JSON.stringify(confirmData));
  // const sendOtpResponse =await AsyncStorage.getItem("responseSendOtp");

  //   console.log("response",sendOtpResponse,"datata>>>>>>>>>>>>>>>>:::::::::::",JSON.parse(sendOtpResponse));
  //  }
  //  catch(error)
  //  {
  //   console.log("error is>>>>",error);
  //  }
  // }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.5,
          // backgroundColor:"red",
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            //   marginTop: '10%',
            fontSize: 30,
            color: 'green',
            fontWeight: 'bold',
          }}>
          Enter Mobile Number
        </Text>
      </View>
      <View
        style={{
          flex: 0.5,
          // backgroundColor:"blue",
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginHorizontal: '6%',
        }}>
        <TouchableOpacity onPress={() => setShow(true)} style={{
          marginBottom:"4%",
          marginRight:"3%"
        }}>
          <TextInput
            value={countryCode}
            placeholder={'code'}
            editable={false}
            mode={'outlined'}
            placeholderTextColor="#AFAFAF"
            // style={styles.input}
            style={{
              color: '#4D4848',
              //   backgroundColor: '#ffff',
              width: '100%',
              height: 48,
              justifyContent: 'center',
              alignSelf: 'center',
              // marginBottom: '4%',
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
          style={{}}
          searchMessage={'hello'}
        />
        <TextInput
        // placeholder='hello'
          label="Mobile Number"
          value={mobileNumber}
          mode={'outlined'}
          // placeholderTextColor="red"
          onChangeText={text => {
            setMobileNumber(text);
          }}
          style={{
            color: 'red',
            width: '80%',
            height: 48,
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: '4%',
          }}
          underlineColorAndroid="transparent"
          outlineColor={'#AFAFAF'}
          theme={{
            colors: {
              primary: '#B5B5B5',
              text: '#4D4848',
              background: '#F4F4F4',

              // placeholder: '#989898',
            },
          }}
        />
       
      </View>
      <View
        style={{
          paddingVertical: 50,
          paddingHorizontal: 20,
          width: '100%',
          flexDirection: 'column',
          flex: 1,
        }}>
       
      </View>
      <View
        style={{
          flex: 0.1,
          // backgroundColor:"pink"
        }}>
        <TouchableOpacity
          onPress={() => {
            handleValidation();
          }}
          style={{
            width: '90%',
            height: '70%',
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
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    // borderRadius:10,
    alignSelf: 'center',
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
