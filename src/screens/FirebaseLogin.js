import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  onChangeText,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {StackActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Google from '../assets/SvgImages/google.svg';
import Facebook from '../assets/SvgImages/facebook.svg';
import {TextInput} from 'react-native-paper';
import {CountryPicker} from 'react-native-country-codes-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ChangePassword from './ChangePassword';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// import { NavigationActions } from 'react-navigation';

const FirebaseLogin = ({navigation}) => {
  const isFocused = useIsFocused();
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileShow, setMobileShow] = useState(true);
  const [mobileError, setMobileError] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [emailFlowFlag, setEmailFlowFlag] = useState(true);
  const [emailShow, setEmailShow] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordShow, setPasswordShow] = useState('');
  const [iconShow, setIconShow] = useState(false);
  const [username, setUserName] = useState('');
  const [userShow, setUserShow] = useState(true);
  const [userError, setUserError] = useState('');
  GoogleSignin.configure({
    webClientId:
      '780651433656-0fjujud7ok89u8qn9a889srs1dhuogd3.apps.googleusercontent.com',
  });
  useEffect(() => {
    if (isFocused) {
      clearAllAsyncData();
      console.log('useEffect');
      // getEmailFlow();
    }
  }, [isFocused]);

  let keysToKeep = [];
  async function clearAllAsyncData() {
    try {
      const keys = await AsyncStorage.getAllKeys(); // Get all keys from AsyncStorage
      const keysToRemove = keys.filter(key => key !== 'userNameWithEmail' && key !== 'ImageUri');
      await AsyncStorage.multiRemove(keysToRemove); // Remove all keys
      let data = await AsyncStorage.getItem('userNameWithEmail');
      let imagedata = await AsyncStorage.getItem('ImageUri');

      console.log('data is' + data+">>>>"+imagedata);
      // alert('Success'); // Show success message
    } catch (error) {
      console.error('Error:', error); // Log any errors
    }
  }
  const userForgotPassword = async () => {
    navigation.navigate('ChangePassword', {
      forgotPasswordFlag: 'true',
    });
  };
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );

    console.log(
      'response' +
        JSON.stringify(googleCredential) +
        '>>>>>>>>>>>>>>' +
        JSON.stringify(userInfo),
    );
    await AsyncStorage.setItem('isGoogleSignin', JSON.stringify(true));
    await AsyncStorage.setItem('googleCreds', JSON.stringify(userInfo.user));
    await AsyncStorage.setItem('ImageUri',userInfo.user.photo);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  // const getEmailFlow = async () => {
  //   const EmailFlow = await AsyncStorage.getItem('EmailFlow');
  //   console.log('emailflow  is', EmailFlow);
  //   if (EmailFlow == 'true') setEmailFlowFlag(true);
  //   else setEmailFlowFlag(false);
  // };

  const handleLoginWithEmail = async () => {
    try {
      const isUserLogin = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log(isUserLogin);
      console.log(
        'navigate>>>>>',
        isUserLogin.user.email,
        isUserLogin.user.uid,
      );
      // navigation.navigate('HomeScreen', {
      //   email: isUserLogin.user.email,
      //   uid: isUserLogin.user.uid,
      // });
      if (isUserLogin.user.emailVerified) {
        await AsyncStorage.setItem('isEmailSignin', JSON.stringify(true));
        await AsyncStorage.setItem('email', email);
        // await AsyncStorage.setItem(
        //   'userNameWithEmail',
        //   name,
        // );
        navigation.dispatch(StackActions.replace('DrawerNavigation'));
      } else {
        Alert.alert('Please verify your account before login');
      }
    } catch (error) {
      console.log('error is>>>', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setEmailError('Email already in use !');
          setPasswordError('');
          break;
        case 'auth/invalid-email':
          setEmailError('Email is badly formatted !');
          setPasswordError('');
          break;
        case 'auth/weak-password':
          setPasswordError('Password should be at least 6 characters');
          setEmailError('');
          break;
        default:
          Alert.alert(error.message);
        // setEmailError(error.message);
        // setPasswordError(error.message)
      }
      setEmailShow(true);
      setPasswordShow(true);
    }
  };
  const handleEmailValidation = async () => {
    if (email == '') {
      setEmailError('Email cannot be empty');
      setEmailShow(true);
    }
    if (password == '') {
      setPasswordError('password cannot be empty');
      setPasswordShow(true);
    }
    if (email != '' && password != '') {
      handleLoginWithEmail();
      //here
    }
  };
  const handleMobileValidation = () => {
    console.log('mobileeee', mobileNumber);
    if (mobileNumber == '') {
      setMobileError('mobile number cannot be empty');
      setMobileShow(true);
    }
    if (username == '') {
      setUserError('Username cannot be empty');
      setUserShow(true);
    }
    if (mobileNumber != '' && username != '') {
      handleLoginWithMobile();
    }
  };
  const handleLoginWithMobile = async () => {
    console.log('mobile number>>>>>', mobileNumber);
    if (mobileNumber != null && mobileNumber) {
      // const confirmation = await auth().signInWithPhoneNumber(countryCode+mobileNumber);
      // setConfirm(confirmation);
      // console.log("data>"+confirmation+" "+JSON.stringify(confirmation));
      navigation.dispatch(StackActions.replace('DrawerNavigation'));
      await AsyncStorage.setItem(
        'mobileNumberWithCode',
        countryCode + mobileNumber,
      );
      await AsyncStorage.setItem('userName', username);
      await AsyncStorage.setItem('isEmailSignin', JSON.stringify(false));
      // sendOtp();
    } else Alert.alert('please enter mobile number');
  };

  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      console.log('result>>>>>.' + JSON.stringify(result));
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();
      console.log('data>>>>>.' + JSON.stringify(data));

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log('facebook' + JSON.stringify(facebookCredential));

      const facebookProfileData = await fetch(
        `https://graph.facebook.com/v13.0/me?fields=id,name,email&access_token=${data.accessToken}`,
      );
      const userData = await facebookProfileData.json();
      console.log(
        'facebook data' +
          JSON.stringify(facebookCredential) +
          '::::::::::::::::' +
          JSON.stringify(userData),
      );
      console.log('name and email' + userData.name + ' >>>' + userData.email);
      await AsyncStorage.setItem('isFacebookSignin', JSON.stringify(true));
      await AsyncStorage.setItem('facebookCreds', JSON.stringify(userData));
      await AsyncStorage.setItem('ImageUri','');
      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log('error is' + error);
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      <View
        style={{
          flex: 0.6,
          backgroundColor: 'purple',
        }}>
        <ImageBackground
          source={require('../assets/pngImages/loginimage.jpg')}
          resizeMode="cover"
          style={styles.image}></ImageBackground>
      </View>
      <View
        style={[
          // {marginTop:!emailFlowFlag?'2%':"0%"},
          // {marginBottom:emailFlowFlag?'1%':"0%"},
          {
            flex: 0.1,
            //   marginTop:'2%',
            marginBottom: '3%',
            //   // marginVertical:"4%",
            //   // backgroundColor: 'red',
          },
        ]}>
        <Text
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            alignSelf: 'flex-start',

            // marginTop: '20%',
            marginLeft: '9%',
            fontSize: 27,
            color: '#4267b2',
            fontWeight: 'bold',
          }}>
          Login
        </Text>
      </View>

      <View
        style={{
          flex: 0.5,
          // backgroundColor:"blue"
        }}>
        {emailFlowFlag ? (
          <View
            style={{
              flex: 0.9,
              // backgroundColosr:"blue",
              alignItems: 'center',
              justifyContent: 'center',
              //  flexDirection: 'row',
              marginHorizontal: '4%',
            }}>
            <View
              style={{
                flex: 0.9,
                width: '100%',
                // marginBottom:"6%",
                // backgroundColor:"pink"
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
                autoCapitalize="none"
                style={{
                  color: '#4D4848',
                  width: '100%',
                  height: 50,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  // marginBottom: '4%',
                  fontSize: 13,
                  fontWeight: '300',
                }}
                outlineColor={'#AFAFAF'}
                theme={{
                  colors: {
                    primary: '#B5B5B5',
                    text: '#4D4848',
                    background: '#FFFF',
                    placeholder: '#989898',
                  },
                }}
              />

              {emailShow ? (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: '3%',
                    fontSize: 11,
                    // marginLeft: ,
                    // alignSelf: 'center',
                  }}>
                  {emailError}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                flex: 0.9,
                width: '100%',
                // backgroundColor:"black"
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <TextInput
                  label={'Enter Password'}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setPasswordShow(false);
                  }}
                  secureTextEntry={!iconShow}
                  mode={'outlined'}
                  placeholderTextColor="#AFAFAF"
                  autoCapitalize="none"
                  style={{
                    color: '#4D4848',
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    // marginBottom: '4%',
                    fontSize: 13,
                    fontWeight: '300',
                  }}
                  outlineColor={'#AFAFAF'}
                  theme={{
                    colors: {
                      primary: '#B5B5B5',
                      text: '#4D4848',
                      background: '#FFFF',
                      placeholder: '#989898',
                    },
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    right: 12,
                    // marginVertical:"7%",
                    marginTop: '6%',
                    // backgroundColor:"red"
                  }}>
                  <Entypo
                    name={iconShow ? 'eye' : 'eye-with-line'}
                    size={23}
                    onPress={() => {
                      setIconShow(!iconShow);
                    }}
                  />
                </View>
              </View>

              {passwordShow ? (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: '3%',
                    fontSize: 11,
                    // marginLeft: ,
                    // alignSelf: 'center',
                  }}>
                  {passwordError}
                </Text>
              ) : null}
            </View>
          </View>
        ) : (
          <View
            style={{
              // flex: 0.5,
              // backgroundColor:"blue",
              // alignItems: 'center',
              // justifyContent: 'center',
              // flexDirection: 'row',
              // marginHorizontal: '6%',
              flex: 0.9,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: '4%',
            }}>
            <View
              style={{
                flex: 0.6,
                width: '100%',
                flexDirection: 'row',
                // justifyContent:"flex-end",
                // alignContent:"flex-end",
                // marginBottom:"6%",
                // backgroundColor:"pink"
              }}>
              <TouchableOpacity
                onPress={() => setShow(true)}
                style={{
                  // marginBottom: '4%',
                  marginRight: '3%',
                  marginTop: '2%',
                  // backgroundColor:"blue",
                  justifyContent: 'center',
                  alignSelf: 'center',
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
                    height: 52,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    fontSize: 13,
                    fontWeight: '300',
                    // marginBottom: '4%',
                  }}
                  outlineColor={'#AFAFAF'}
                  theme={{
                    colors: {
                      primary: '#B5B5B5',
                      text: '#4D4848',
                      background: '#FFFF',
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
              />
              <TextInput
                // placeholder='hello'
                label="Mobile Number"
                value={mobileNumber}
                mode={'outlined'}
                keyboardType="numeric"
                // placeholderTextColor="red"
                onChangeText={text => {
                  setMobileNumber(text);
                  setMobileShow(false);
                }}
                style={{
                  // color: 'red',
                  width: '80%',
                  height: 50,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  // marginBottom: '4%'
                  // backgroundColor:"red",
                  color: '#4D4848',
                  fontSize: 13,
                  fontWeight: '300',
                }}
                underlineColorAndroid="transparent"
                outlineColor={'#AFAFAF'}
                theme={{
                  colors: {
                    primary: '#B5B5B5',
                    text: '#4D4848',
                    background: '#FFFF',

                    // placeholder: '#989898',
                  },
                }}
              />
            </View>
            {mobileShow ? (
              <Text
                style={{
                  color: 'red',
                  // marginRight: '16%',
                  fontSize: 12,
                  // marginLeft: ,
                  alignSelf: 'center',
                }}>
                {mobileError}
              </Text>
            ) : null}
            <View
              style={{
                flex: 0.9,
                width: '100%',
                // marginBottom:"6%",
                // backgroundColor:"pink"
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <TextInput
                  label={'Enter your name'}
                  value={username}
                  onChangeText={text => {
                    setUserName(text);
                    setUserShow(false);
                  }}
                  mode={'outlined'}
                  placeholderTextColor="#AFAFAF"
                  autoCapitalize="none"
                  style={{
                    color: '#4D4848',
                    width: '101%',
                    height: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    // marginBottom: '4%',
                    fontSize: 13,
                    fontWeight: '300',
                  }}
                  outlineColor={'#AFAFAF'}
                  theme={{
                    colors: {
                      primary: '#B5B5B5',
                      text: '#4D4848',
                      background: '#FFFF',
                      placeholder: '#989898',
                    },
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    right: 12,
                    // marginVertical:"7%",
                    marginTop: '6%',
                    // backgroundColor:"red"
                  }}>
                  <FontAwesome5
                    name={'user-alt'}
                    color={'grey'}
                    // style={{backgroundColor:"grey"}}
                    size={23}
                    onPress={() => {
                      setIconShow(!iconShow);
                    }}
                  />
                </View>
              </View>

              {userShow ? (
                <Text
                  style={{
                    color: 'red',
                    marginLeft: '3%',
                    fontSize: 11,
                    // marginLeft: ,
                    // alignSelf: 'center',
                  }}>
                  {userError}
                </Text>
              ) : null}
            </View>
          </View>
        )}
      </View>
      {emailFlowFlag ? (
        <TouchableOpacity
          onPress={() => {
            userForgotPassword();
          }}
          style={{
            flex: 0.06,
            // justifyContent:"flex-end"
            alignSelf: 'flex-end',
            // backgroundColor:"red",
            justifyContent: 'flex-start',
            marginBottom: '3%',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: 'grey',
              fontWeight: '500',
              marginRight: '5%',
            }}>
            forgot Password ?
          </Text>
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flex: 0.12,
          // backgroundColor:"pink"
        }}>
        <TouchableOpacity
          onPress={() => {
            // handleEmailValidation();
            emailFlowFlag ? handleEmailValidation() : handleMobileValidation();
          }}
          style={{
            width: '90%',
            height: '95%',
            backgroundColor: '#4fb9fc',
            // backgroundColor: '#0379FF',
            marginHorizontal: '10%',
            borderRadius: 20,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              textAlign: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              fontWeight: '500',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.05,
          // backgroundColor:"red",
          marginBottom: '2%',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: '500',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          OR
        </Text>
      </View>
      <View
        style={{
          flex: 0.12,
          marginBottom: '2%',
          // backgroundColor:"pink"
        }}>
        <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('RegisterationScreen');
          // }}

          onPress={() => {
            setEmailFlowFlag(!emailFlowFlag);
          }}
          style={{
            width: '90%',
            height: '95%',
            // backgroundColor: '#4267b2',
            backgroundColor: 'skyblue',
            // backgroundColor: '#1877f2',
            marginHorizontal: '10%',
            borderRadius: 20,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          {emailFlowFlag ? (
            <FontAwesome
              name={'phone'}
              color={'white'}
              size={25}
              style={{marginVertical: '2%'}}
            />
          ) : (
            <AntDesign
              name={'mail'}
              color={'white'}
              size={25}
              style={{marginVertical: '2%'}}
            />
          )}

          {/* </View> */}
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
                fontSize: 15,
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                fontWeight: '500',
              }}>
              {emailFlowFlag ? 'Login with mobile' : 'Login with email'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.12,
          marginBottom: '2%',
          // backgroundColor:"pink"
        }}>
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress().then(() =>
              navigation.dispatch(StackActions.replace('DrawerNavigation')),
            )
          }
          style={{
            width: '90%',
            height: '95%',
            // backgroundColor: '#4267b2',
            // backgroundColor: '#e54545',
            // backgroundColor:"#800000",
            // backgroundColor: '#1877f2',
            backgroundColor: 'red',
            marginHorizontal: '10%',
            borderRadius: 20,
            borderColor: 'red',
            borderWidth: 1,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Google
            style={{
              width: '8%',
            }}
          />
          {/* </View> */}
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
                fontSize: 15,
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                fontWeight: '500',
              }}>
              Signin With Google
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.12,
          // backgroundColor:"pink"
        }}>
        <TouchableOpacity
          onPress={() =>
            onFacebookButtonPress().then(() =>
              navigation.dispatch(StackActions.replace('DrawerNavigation')),
            )
          }
          style={{
            width: '90%',
            height: '95%',
            backgroundColor: '#1877f2',
            // backgroundColor: '#4267b2',
            marginHorizontal: '10%',
            borderRadius: 20,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Facebook
            style={{
              width: '8%',
            }}
          />
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
                fontSize: 15,
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                fontWeight: '500',
              }}>
              Signin With facebook
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: '3%',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'grey',
          }}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          style={{
            marginHorizontal: '1%',
          }}
          onPress={() => {
            navigation.navigate('UserChoiceScreen');
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'UserChoiceScreen'}],
            // });
            // navigation.dispatch(StackActions.replace('RegisterationScreen'));
          }}>
          <Text
            style={{
              color: '#4267b2',
              justifyContent: 'center',
              alignSelf: 'center',
              fontWeight: '600',
            }}>
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '85%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default FirebaseLogin;
