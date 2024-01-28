import {View, Text, SafeAreaView, StyleSheet,Alert,ImageBackground} from 'react-native';
import React, {useState} from 'react';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const VerifyOtpScreen = ({navigation}) => {
  const CELL_COUNT = 6;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timerShow, setTimerShow] = useState(true);
  const [time, setTime] = useState(10);
  const [otpData, setOtpData] = useState();
  const [confirmData, setConfirmData] = useState();
  const [mobileNumber, setMobileNumber] = useState('');


  React.useEffect(() => {
    sendOtp();
    countDownTimer();
    
    // getSendOtpResponse();
  }, []);
  const getSendOtpResponse=async()=>{
    console.log("useeffect function");
  //  const sendOtpResponse =await AsyncStorage.getItem("responseSendOtp");
  //  setOtpData(JSON.parse(sendOtpResponse));
  //  console.log("response in verify>>>",sendOtpResponse,"stringify>>>",JSON.parse(sendOtpResponse),"and>>",JSON.parse(otpData),"otpdata>>>>",otpData);
  }
 
  const sendOtp=async()=>{
    try{
    let mobile=await AsyncStorage.getItem('mobileNumberWithCode');
     console.log("mobile no with code is"+mobile);
     setMobileNumber(mobile)
     if(mobile)
     {
     const response=await auth().signInWithPhoneNumber(mobile);
     setConfirmData(response);
     }
     await AsyncStorage.setItem("EmailFlow","false");
  //  await AsyncStorage.setItem("responseSendOtp", JSON.stringify(confirmData));
  //  const sendOtpResponse =await AsyncStorage.getItem("responseSendOtp");
 
    //  console.log("send otp response>>>",response);
    }
    catch(error)
    {
      Alert.alert(error.message);
     console.log("error is>>>>",error);
    }
   }
  const handleVerifyOtp=async()=>{
    try{
      console.log("handle useeffect function");
      // const sendOtpResponse =await AsyncStorage.getItem("responseSendOtp");
      // setOtpData(sendOtpResponse);
      // console.log("response in verify>>>",sendOtpResponse,"stringify>>>",JSON.parse(sendOtpResponse),"and>>",JSON.parse(otpData),"otpdata>>>>",otpData);
      // console.log("value>>",value,"confirm>>>>>>",otpData);
      const response=await confirmData.confirm(value);
      console.log("verify respnse>>",response);
      // Alert.alert("your email is verified successfully!!!")
      // navigation.navigate("AccountScreen")
      Alert.alert('Alert', 'your email is verified successfully!!!', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate("DrawerNavigation") },
      ]);
    }
    catch(error){
      Alert.alert(error.message);
      console.log("error is>>",error);
    }
  }
  const countDownTimer = () => {
    console.log("countdown tiler");
    let timerCount = 10;
    const timerId = setInterval(() => {
      timerCount -= 1;
      if (timerCount < 0) {
        clearInterval(timerId);
        setTimerShow(false);
      } else {
        setTimerShow(true)
        console.log("count is>>>",timerCount);
        setTime(timerCount);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  };
  return (
    <SafeAreaView style={styles.container}>
       <View
        style={{
          flex: 0.5,
          // backgroundColor: 'purple',
        }}>
        <ImageBackground
          source={require('../assets/pngImages/verify3.png')}
          resizeMode="cover"
          style={styles.image}></ImageBackground>
      </View>
      <View
        style={{
          flex: 0.3,
          // backgroundColor:"pink",
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>Verify your</Text>
        <Text style={styles.title}>Code</Text>
      </View>
      <View
        style={{
          flex: 0.1,
          // backgroundColor:"pink",
          justifyContent: 'center',
          alignSelf:"center"
        }}>
        <Text 
        style={{
          fontSize:16,
          fontWeight:"600"
        }}
        >You will get a OTP via SMS on Mobile number</Text>
        <Text style={{fontSize:16,
         fontWeight:"600",
         justifyContent:"center",
         alignSelf:"center"}}> {mobileNumber? mobileNumber:""}</Text>
      </View>
      <View
        style={{
          marginHorizontal: '4%',
          flex: 0.15,
          // backgroundColor:"red"
        }}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 0.1,
          justifyContent: 'center',
          alignSelf: 'center',
          //   backgroundColor:"yellow",
          marginTop: '4%',
          alignSelf: 'center',
        }}>
        <Text>Did n't get the code?</Text>
        {!timerShow ? (
          <TouchableOpacity
            onPress={() => {
              countDownTimer();
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#0379FF',
                fontWeight: '500',
                marginLeft: '4%',
              }}>
              Resend now
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{
              // textDecorationLine: 'underline',
              color: '#000',
              fontWeight: '500',
              marginLeft: '2%',
            }}>
            Resend code in {time}{' '}
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 0.12,
          //   backgroundColor:"pink"
        }}>
        <TouchableOpacity
        onPress={()=>{handleVerifyOtp()}}
          style={{
            width: '90%',
            height: '85%',
            backgroundColor: '#0379FF',
            // backgroundColor: '#4267b2',
            marginHorizontal: '0%',
            borderRadius: 10,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.7,
              //  backgroundColor:"red",
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                fontWeight: '500',
              }}>
              Verify now
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffff"
    //  padding: 40
  },
  title: {textAlign: 'left', fontWeight: '500', marginLeft: '8%', fontSize: 35,
},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 45,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#00000030',
    textAlign: 'center',
    // color:"#00"
  },
  focusCell: {
    borderColor: '#0379FF',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default VerifyOtpScreen;
