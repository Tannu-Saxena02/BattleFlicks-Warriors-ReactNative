import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChangePassword = ({navigation, route}) => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPassowrd, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [confirmIconShow, setConfirmIconShow] = useState(false);
  const [newPasswordIconShow, setNewPasswordIconShow] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailShow, setEmailShow] = useState(false);
  const [forgotScreenFlag, setforgotScreenFlag] = useState('');

  let {forgotPasswordFlag} =
    route.params != undefined && route.params ? route.params : '';
  let forgotToggleFlag =
    forgotPasswordFlag != undefined ? forgotPasswordFlag : '';

  useEffect(() => {
   setEmail('');
   console.log("forgotpass>>>",forgotPasswordFlag);
   setforgotScreenFlag(forgotPasswordFlag)
  }, []);
  
  const handleValidation = () => {
    if (newPassword == '') {
      setNewPasswordError('New Password cannot be empty');
      setNewPasswordShow(true);
    }
    if (confirmPassowrd == '') {
      setConfirmPasswordError('Confirm Passowrd cannot be empty');
      setConfirmPasswordShow(true);
    }
    if (newPassword != '' && confirmPassowrd != '') {
      ChangePassword();
      console.log('new', newPassword);
    }
  };
  const handleValidationEmail = () => {
    if (email == '') {
      setEmailError('Email cannot be empty');
      setEmailShow(true);
    }
  
    if (email != '' ) {
      forgotPassword();
      console.log('new', newPassword);
    }
  };
  const ChangePassword = () => {
    if (auth().currentUser != '') {
      auth()
        .currentUser.updatePassword(newPassword)
        .then(() => {
          Alert.alert('Password', 'Password Updated', [
            {text: 'OK', onPress: () => navigation.navigate('FirebaseLogin')},
          ]);
        })
        .catch(() => {
          console.log(e);
        });
    }
  };
  const forgotPassword = () => {
    console.log('new password');
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Please check your email, Password reset mail sent please reset your password');
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ffff'}}>
      <View
        style={{
          flex: 0.6,
          backgroundColor: 'purple',
        }}>
        <ImageBackground
          source={require('../assets/pngImages/verifyimage.jpg')}
          resizeMode="cover"
          style={styles.image}></ImageBackground>
      </View>
      {forgotScreenFlag == 'true' ? (
        <View
          style={{
            flex: 0.14,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 23, marginLeft: '4%', fontWeight: '600'}}>
            Forgot Password
          </Text>
        </View>
      ) : (
        <View
          style={{
            flex: 0.14,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 23, marginLeft: '4%', fontWeight: '600'}}>
            Change Password
          </Text>
        </View>
      )}
      {forgotScreenFlag == 'true' ? (
        <View
          style={{
            flex: 0.6,
            
          }}>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
              }}>
              Please enter the email address you'd like your password reset info
              send to
            </Text>
           
          </View>
          <View
            style={{
              flex: 0.3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                label={'Enter Email'}
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
                  width: '93%',
                  height: 50,
                  justifyContent: 'center',
                  alignSelf: 'center',
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
                  marginTop: '6%',
                }}>
                <Entypo name={'mail'} size={23} />
              </View>
            </View>
            {emailShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                 
                }}>
                {emailError}
              </Text>
            ) : null}
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 0.6,
          }}>
          <View
            style={{
              flex: 0.3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                label={'Enter new Pasword'}
                value={newPassword}
                onChangeText={text => {
                  setNewPassword(text);
                  setNewPasswordShow(false);
                }}
                mode={'outlined'}
                placeholderTextColor="#AFAFAF"
                autoCapitalize="none"
                style={{
                  color: '#4D4848',
                  width: '93%',
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
                  marginTop: '6%',
                }}>
                <Entypo
                  name={newPasswordIconShow ? 'eye' : 'eye-with-line'}
                  size={23}
                  onPress={() => {
                    setNewPasswordIconShow(!newPasswordIconShow);
                  }}
                />
              </View>
            </View>
            {newPasswordShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                
                }}>
                {newPasswordError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                label={'Confirm Password'}
                value={confirmPassowrd}
                onChangeText={text => {
                  setConfirmPassword(text);
                  setConfirmPasswordShow(false);
                }}
                mode={'outlined'}
                placeholderTextColor="#AFAFAF"
                autoCapitalize="none"
                style={{
                  color: '#4D4848',
                  width: '93%',
                  height: 50,
                  justifyContent: 'center',
                  alignSelf: 'center',
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
                  marginTop: '6%',
                }}>
                <Entypo
                  name={confirmIconShow ? 'eye' : 'eye-with-line'}
                  size={23}
                  onPress={() => {
                    setConfirmIconShow(!confirmIconShow);
                  }}
                />
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
      )}
      <View
        style={{
          flex: 0.15,
        }}>
        <TouchableOpacity
          onPress={() => {
            {forgotScreenFlag=="true"?handleValidationEmail():handleValidation()}
          }}
          style={{
            width: '90%',
            height: '80%',
            backgroundColor: '#0379FF',
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
               {forgotScreenFlag=="true"?"Request reset link":"Continue"}
            </Text>
          </View>
        </TouchableOpacity>
        
      </View>
      {forgotScreenFlag=="true"?  <View
        style={{
          flex: 0.15,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FirebaseLogin');
            
          }}
          style={{
            width: '90%',
            height: '80%',
            backgroundColor: '#00000029',
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
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'grey',
                fontSize: 18,
                textAlign: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                fontWeight: '500',
              }}>
              Back to login
            </Text>
          </View>
        </TouchableOpacity>
        
      </View>:null}
      
    </View>
  );
};
export default ChangePassword;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
