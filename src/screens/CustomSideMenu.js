

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Modal,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomModal from '../screens/BottomModal'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const CustomSideMenu = props => {
  const navigation = useNavigation();
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';
  const [openMenu, setOpenMenu] = useState(false);
  const [showBottomSheet, setBottomSheet] = useState(false);
  useEffect(() => {
    getLoginInfo();
    getUploadImage();
  }, []);
  const [uri, setUri] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [userNameEmail, setUserNameEmail] = useState('');
  const [filePath, setFilePath] = useState({});
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [googleInfo, setGoogleInfo] = useState(null);
  const [isFacebookLogin, setIsFacebookLogin] = useState(false);
  const [facebookInfo, setFacebookInfo] = useState();


  let isGoogleSignin = true; let isFacebookSignin;;
  let googleCreds; let facebookCreds;

  const deleteProfilePhoto = async () => {
    Alert.alert('Alert', 'Are you want to delete your Profile Photo', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: async () => {
          setUri("");
          setFilePath("");
          await AsyncStorage.removeItem('ImageUri');
        }
      },
    ]);
  }
  const getLoginInfo = async () => {
    isGoogleSignin = JSON.parse(await AsyncStorage.getItem('isGoogleSignin'));
    isFacebookSignin = JSON.parse(await AsyncStorage.getItem('isFacebookSignin'));
    googleCreds = JSON.parse(await AsyncStorage.getItem('googleCreds'));
    facebookCreds = JSON.parse(await AsyncStorage.getItem('facebookCreds'));
    setIsGoogleLogin(isGoogleSignin);
    setGoogleInfo(googleCreds);
    setIsFacebookLogin(isFacebookSignin);
    setFacebookInfo(facebookCreds);
    console.log("flag>>>" + isGoogleSignin + " >>>::::::::::::::::::::" + JSON.stringify(googleCreds) + "================ " + googleCreds + ">>>>>>>>>" + isGoogleLogin);
    if (isGoogleSignin)
      console.log("hi gooogle");
  }

  const getUploadImage = async () => {

    let imageUri = await AsyncStorage.getItem('ImageUri');
    setUri(imageUri);
    let userEmailId = await AsyncStorage.getItem('email');
    setEmailId(userEmailId);
    let userNameWithEmail = await AsyncStorage.getItem('userNameWithEmail');
    setUserNameEmail(userNameWithEmail);
    let userMobileNumber = await AsyncStorage.getItem('mobileNumberWithCode');
    setMobileNumber(userMobileNumber);
    let userName = await AsyncStorage.getItem('userName');
    setName(userName);
    let isEmailSignin = JSON.parse(await AsyncStorage.getItem('isEmailSignin'));
    setIsEmailLogin(isEmailSignin);
    console.log(
      'image uri is>>>',
      imageUri + ">>>>>" + uri,
      'emailid',
      userEmailId,
      'username withmail',
      userNameEmail,
      'mobile number',
      userMobileNumber,
      'name',
      userName,
      isGoogleLogin,
      "state is",
      isEmailLogin
    );

  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const captureImage = async type => {
    setBottomSheet(false);
    try {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'low',
        durationLimit: 30, //Video max duration in seconds
        saveToPhotos: true,
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      if (isCameraPermitted) {
        launchCamera(options, async response => {
          console.log('response>>>', response);
          if (response != null && response) {

            if (response.didCancel) {
              Alert.alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              Alert.alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              Alert.alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              Alert.alert(response.errorMessage);
              return;
            }
            setFilePath(response ? response : {});
            setUri(response ? response.assets[0].uri : null);
            await AsyncStorage.setItem('ImageUri', response?.assets[0].uri);
          } else {
            Alert.alert('User cancelled !!!!!');
          }
        });
      }
    }
    catch (error) {
      console.log("errror is>>>", error);
      Alert.alert.Alert.alert(error.message);
    }
  };

  const chooseFile = type => {
    setBottomSheet(false);
    try {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, async response => {
        console.log('Response = ', response);
        if (response != null && response) {
          if (response.didCancel) {
            Alert.alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            Alert.alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            Alert.alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            Alert.alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setFilePath(response ? response : {});
          setUri(response?.assets[0].uri);
          await AsyncStorage.setItem('ImageUri', response?.assets[0].uri);

        } else {
          Alert.alert('no response');
        }
      });
    }
    catch (error) {
      console.log("errror is>>>", error);
      Alert.alert.Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>

      <View
        style={{
          backgroundColor: '#704DB6',
          flex: 0.4,
          justifyContent: 'center',
        }}>


        <TouchableOpacity
          onPress={() => { setOpenMenu(true) }}
          style={{
            alignItems: "flex-end",
            marginRight: "4%"
          }}>
          <Entypo
            name={"dots-three-vertical"}
            color={"white"}
            size={23}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 90,
            height: 90,
            marginLeft: '4%',
            borderRadius: 70,
            marginBottom: '3%',
          }}
          onPress={() => {
            navigation.navigate('ProfileDetailsScreen');
          }}>
          <Image
            style={{
              width: 90,
              height: 90,
              backgroundColor: 'green',
              marginLeft: '4%',
              borderRadius: 70,
              marginBottom: '3%',
            }}
            source={uri ? { uri: uri } : require('../assets/pngImages/photo.jpg')}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: '4%',
            color: 'white',
            fontWeight: '500',
            fontSize: 20,
          }}>
          {
            isEmailLogin ?
              emailId :
              isGoogleLogin
                ?
                googleInfo?.name
                :
                isFacebookLogin
                  ?
                  facebookInfo?.name
                  : mobileNumber
          }
        </Text>
        <Text
          style={{
            marginLeft: '4%',
            color: 'white',
            fontWeight: '400',
            fontSize: 14,
          }}>

          {isEmailLogin ?
            userNameEmail :
            isGoogleLogin
              ?
              googleInfo?.email
              :
              isFacebookLogin
                ?
                facebookInfo?.id
                : name
          }
        </Text>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <View
          style={{
            borderWidth: 0.3,
            borderColor: '#B5B5B5',
            marginTop: '4%',
            // margin:10,
          }}
        />

      </DrawerContentScrollView>

      {openMenu ? (
        <View
          style={{
            width: '80%',
            height: '20%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ffff',
            position: 'absolute',
            alignSelf: 'flex-end',
            backgroundColor: 'white',
            paddingLeft: "5%"
          }}>
          <TouchableOpacity
            onPress={() => {
              setOpenMenu(false);
              console.log("helllo");
            }}
            style={{
              alignSelf: "flex-end",
              marginRight: "4%",
              marginVertical: "4%",
            }}>
            <Entypo
              name={"cross"}
              size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setBottomSheet(true);
              setOpenMenu(false)
            }}
            style={{
              marginBottom: '6%',
              flexDirection: 'row',
            }}>
            <MaterialCommunityIcons name="camera-plus" size={25}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft: "10%",
                alignSelf: "center"
              }}>
              Edit Profile Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteProfilePhoto();
              setOpenMenu(false)
            }}
            style={{
              marginBottom: '6%',
              flexDirection: "row"
            }}>
            <AntDesign name="delete" size={25}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft: "10%",
                alignSelf: "center"
              }}>
              Delete Photo
            </Text>
          </TouchableOpacity>
          {/* <View style={{marginBottom: '13%',
        flexDirection:"row",
        // backgroundColor:"red"
        }}>
           <FontAwesome name="edit" size={25}
             />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft:"10%",
                alignSelf:"center"
                // color: 'black',
              }}>
              Edit name
            </Text>
          </View> */}
          {/* <TouchableOpacity
          onPress={()=>{
            setOpenMenu(false);
            navigation.navigate("ProfileDetailsScreen")
          }}
           style={{marginBottom: '6%',
        flexDirection:"row",
        // backgroundColor:"red"
        }}>
           <MaterialCommunityIcons name="account-cog" size={25}
             />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft:"10%",
                alignSelf:"center"
                // color: 'black',
              }}>
              Account Details
            </Text>
          </TouchableOpacity> */}
        </View>

      ) : (null)}
      <Modal
        animationType={'slide'}
        visible={showBottomSheet}
        transparent={true}
        onRequestClose={!showBottomSheet}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            height: "100%",
            width: '100%',
            zIndex: 2,
            justifyContent: "flex-end",
            backgroundColor: '#000000AA',
          }}
          onPress={() => {
            setBottomSheet(false);
          }}>

          <View
            style={[
              styles.mainContainerModal2,
            ]}>
            <TouchableOpacity
              onPress={() => {
                captureImage('photo');
                setBottomSheet(false);
                console.log("hellooooo");
              }}>
              <View
                style={{
                  marginLeft: '4%',
                  marginVertical: '5%',
                  flexDirection: 'row',
                }}>
                <AntDesign name={'camera'} size={23} />
                <Text
                  style={{ color: 'black', fontSize: 16, marginLeft: '6%' }}>
                  Capture image from Camera
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                chooseFile('photo')
                setBottomSheet(false)
              }}>
              <View
                style={{
                  marginLeft: '4%',
                  marginVertical: '5%',
                  flexDirection: 'row',
                }}>
                <MaterialCommunityIcons name={'view-gallery'} size={23} />
                <Text
                  style={{ color: 'black', fontSize: 16, marginLeft: '6%' }}>
                  Choose image from gallery
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeView: {
    width: '100%',
    height: '100%',
    backgroundColor: "green",


  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'green',
  },

  mainContainerModal2: {
    backgroundColor: 'white',
    width: '100%',
    height: '25%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: '1%',
    borderBottomColor: '#F8F8F9',
    borderBottomWidth: 1.5,
    position: "absolute"
  },
});

export default CustomSideMenu;
