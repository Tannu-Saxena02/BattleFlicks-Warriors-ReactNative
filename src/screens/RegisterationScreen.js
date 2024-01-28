import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  onChangeText,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const RegisterationScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailShow, setEmailShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState('');
  const [iconShow, setIconShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmIconShow, setConfirmIconShow] = useState(false);
let securityFlag=true;
  const element = <TextInput.Affix name="eye" />
  const handleValidation = () => {
    console.log('email>>', email, 'password>>>', password,"confirm password",confirmPassword);
    if (email == '') {
      setEmailError('Email cannot be empty');
      setEmailShow(true);
    }
    if (password == '') {
      setPasswordError('password cannot be empty');
      setPasswordShow(true);
    }
    if(confirmPassword=='')
    {
      console.log("trueeee");
      setConfirmPasswordError('confirm password cannot be empty');
      setConfirmPasswordShow(true);
    }
    if(password!=confirmPassword)
    {
      console.log("password is",password,"confirm",confirmPassword);
      setConfirmPasswordError('Password does not match');
      setConfirmPasswordShow(true);
    }
    if(email!=''&&password!=''&&confirmPassword!=""&&password==confirmPassword)
    handleSignUp();
  };
  const handleSignUp = async () => {
    try {
      const userCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(userCreated);
      console.log('email=>', email, 'password=>', password);
      await AsyncStorage.setItem(
        'signinFlag',
        'true',
      );
      // await auth().signOut();

      // navigation.navigate('FirebaseLogin');
      navigation.dispatch(navigation.push('EmailVerify'));
      // navigation.dispatch(navigation.push('EmailVerify'));


    } catch (error) {
        setMessage(error.message);
      console.log('error is>>>>>', error.message);
      switch(error.code) {
        case 'auth/email-already-in-use':
              setEmailError('Email already in use !')
              setPasswordError('');
              break;
              case 'auth/invalid-email':
              setEmailError('Email is badly formatted !')
              setPasswordError('');
              break;
              case 'auth/weak-password':
                setPasswordError('Password should be at least 6 characters');
                setEmailError('')
                break; 
              default:
                setEmailError(message);
                setPasswordError(message)
                
              
     }
     setEmailShow(true);
     setPasswordShow(true);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.4,
          // backgroundColor:"red",
          justifyContent:"center",
          alignSelf:"flex-start",
          marginLeft:"7%"
          // width:"100%"
        }}>
        <Text
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: '10%',
            fontSize: 30,
            color: 'green',
            fontWeight: 'bold',
          }}>
         Sign Up
        </Text>
      </View>

      <View
        style={{
          flex: 0.6,
          // backgroundColor:"blue"
        }}>
        <View style={{flex:0.23,
            // backgroundColor:"blue"
            }}>
          <TextInput
           label={'Enter your Email'}
           value={email}
           onChangeText={text => {
             setEmail(text);
             setEmailShow(false);
           }}
            mode={'outlined'}
            placeholderTextColor="#AFAFAF"
            autoCapitalize='none'
            style={{
              color: '#4D4848',
              width: '93%',
              height: 50,
              justifyContent: 'center',
              alignSelf: 'center',
              // marginBottom: '4%',
                fontSize:13,
                fontWeight:"300"
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
         
  
          {emailShow ? (
            <Text
              style={{
                color: 'red',
                marginLeft: '6%',
                fontSize: 12,
                // marginLeft: ,
                // alignSelf: 'center',
              }}>
              {emailError}
            </Text>
          ) : null}
        </View>

        <View style={{flex:0.23,
            // backgroundColor:"red"
            }}>
            <View
          style={{flexDirection:"row",
          justifyContent: 'center',
          alignSelf: 'center',
          }}>
            <TextInput
           label={'Enter your Password'}
           value={password}
           secureTextEntry={!iconShow}
           keyboardType={"numeric"}
           onChangeText={text => {
             setPassword(text);
             setPasswordShow(false)
           }}
            mode={'outlined'}
            placeholderTextColor="#AFAFAF"
         
            style={{
              color: '#4D4848',
              width: '93%',
              height: 50,
              
              justifyContent: 'center',
              alignSelf: 'center',
                fontSize:13,
                fontWeight:"300"
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
               <View
        style={{
          position: "absolute",
          zIndex: 1,
          right: 12,
          // marginVertical:"7%",
          marginTop:"6%",
          // backgroundColor:"red"
        }}
      >
          <Entypo
          name={iconShow?"eye":"eye-with-line"}
          size={23}
          onPress={()=>{setIconShow(!iconShow)}}/>
          </View>
          </View>
          {passwordShow ? (
            <Text
              style={{
                color: 'red',
                marginLeft: '6%',
                fontSize: 12,
              }}>
              {passwordError}
            </Text>
          ) : null}
        </View>
        <View style={{flex:0.23,
            // backgroundColor:"red"
            }}>
            <View
          style={{flexDirection:"row",
          justifyContent: 'center',
          alignSelf: 'center',
          }}>
            <TextInput
           label={'Confirm Password'}
           value={confirmPassword}
           secureTextEntry={!confirmIconShow}
           keyboardType={"numeric"}
           onChangeText={text => {
             setConfirmPassword(text);
             setConfirmPasswordShow(false)
           }}
            mode={'outlined'}
            placeholderTextColor="#AFAFAF"
         
            style={{
              color: '#4D4848',
              width: '93%',
              height: 50,
              
              justifyContent: 'center',
              alignSelf: 'center',
                fontSize:13,
                fontWeight:"300"
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
               <View
        style={{
          position: "absolute",
          zIndex: 1,
          right: 12,
          // marginVertical:"7%",
          marginTop:"6%",
          // backgroundColor:"red"
        }}
      >
          <Entypo
          name={confirmIconShow?"eye":"eye-with-line"}
          size={23}
          onPress={()=>{setConfirmIconShow(!confirmIconShow)}}/>
          </View>
          </View>
          {confirmPasswordShow ? (
            <Text
              style={{
                color: 'red',
                marginLeft: '6%',
                fontSize: 12,
              }}>
              {confirmPasswordError}
            </Text>
          ) : null}
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          // backgroundColor:"pink"
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            height: '80%',
            backgroundColor: 'green',
            marginHorizontal: '10%',
            borderRadius: 10,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
          onPress={() => handleValidation()}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              textAlign: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              fontWeight:"500"
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{marginBottom: '3%'}}
        onPress={() => {
          // navigation.navigate('FirebaseLogin');
      navigation.dispatch(navigation.replace('FirebaseLogin'));

        }}>
        <Text
          style={{
            color: 'green',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          Already have an Account?
        </Text>
      </TouchableOpacity>
      {/* <Text style={{color: 'red', fontSize: 15, marginHorizontal: '3%'}}>
        {message}
      </Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '85%',
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
export default RegisterationScreen;
