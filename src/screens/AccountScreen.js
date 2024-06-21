
import React, { useState, useEffect } from 'react';
// import storage from '@react-native-firebase/storage';
//storage and messsing depencies are mremoved due to ios issue,reanimated.
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
const AccountScreen = ({ navigation }) => {
  const [filePath, setFilePath] = useState({});
  const [uri, setUri] = useState('')
  const [fileName, setFileName] = useState('');
  const [showBottomSheet, setBottomSheet] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [firstNameShow, setFirstNamShow] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameShow, setLastNamShow] = useState(false);
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberShow, setPhoneNumberShow] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailShow, setEmailShow] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [addressShow, setAddressShow] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [dobShow, setDobShow] = useState(false);
  const [dobError, setDobError] = useState('');
  const [genderShow, setGenderShow] = useState(false);
  const [genderError, setGenderError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [streetShow, setStreetShow] = useState(false);
  const [zipCodeError, setZipCodeError] = useState('');
  const [zipCodeShow, setZipCodeShow] = useState(false);
  const [cityShow, setCityShow] = useState(false);
  const [cityError, setCityError] = useState('');
  const [CountryShow, setCountryShow] = useState(false);
  const [countryError, setCountryError] = useState('');
  const [noError, setNoError] = useState(false);

  async function UploadImageFirebase(uriResponse) {
    try {
      //firebase rule needs to be updated
      console.log(typeof (filePath), "respinse", uriResponse);
      console.log("file name and uri is>>>", fileName, "drfdg", uri, "uriii", uriResponse.assets);
      // const response=await storage().ref(`/profile/${uriResponse.assets[0].fileName}`).putFile(uriResponse.assets[0].uri);
      // console.log("response to store in firebase>>>",response);
    }
    catch (error) {
      console.log("error in function isss>>>", error);
    }
  }
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
  const handleValidation = async () => {
    if (firstName == '') {
      setFirstNameError('firstname cannot be empty');
      setFirstNamShow(true);
    }

    if (lastName == '') {
      setLastNameError('lastname cannot be empty');
      setLastNamShow(true);
    }
    if (phoneNumber == '') {
      setPhoneNumberError('phonenumber cannot be empty');
      setPhoneNumberShow(true);
    }
    if (emailAddress == '') {
      setEmailError('emailaddress cannot be empty');
      setEmailShow(true);
    }
    if (dob == '') {
      setDobError('DOB cannot be empty');
      setDobShow(true);
    }
    if (gender == '') {
      setGenderError('gender cannot be empty');
      setGenderShow(true);
    }
    if (address == '') {
      setAddressError('address cannot be empty');
      setAddressShow(true);
    }
    if (street == '') {
      setStreetError('street cannot be empty');
      setStreetShow(true);
    }
    if (zipCode == '') {
      setZipCodeError('zipcode cannot be empty');
      setZipCodeShow(true);
    }

    if (city == '') {
      setCityError('city cannot be empty');
      setCityShow(true);
    }
    if (country == '') {
      setCountryError('country cannot be empty');
      setCountryShow(true);
    } else if (uri == '') {
      Alert.alert('Profile photo is required to upload');
      setNoError(true);
    }
    if (
      firstName != '' &&
      lastName != '' &&
      phoneNumber != '' &&
      dob != '' &&
      gender != '' &&
      emailAddress != '' &&
      address != '' &&
      street != '' &&
      zipCode != '' &&
      city != '' &&
      country != '' &&
      uri != ''
    ) {
      console.log('noerror' + firstName + lastName);
      await AsyncStorage.setItem(
        'userNameWithEmail',
        firstName + " " + lastName,
      );
      let data = await AsyncStorage.getItem(
        'userNameWithEmail'
      );
      console.log("data is" + data);
      navigation.navigate('FirebaseLogin');
    }
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
      console.log("log", isCameraPermitted + " " + isStoragePermitted);
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
            setUri(response ? response.assets[0].uri : "tannjhuweyge");
            setFileName(response ? response.assets[0].fileName : "tannu");
            await AsyncStorage.setItem('ImageUri', response?.assets[0].uri);
            // let imageUri = await AsyncStorage.getItem('ImageUri');
            console.log('imageuri on upload issss>>>>', uri, "filename", fileName);
            console.log('response imageuri on upload issss>>>>', response.assets[0].uri, "filename", response.assets[0].fileName);

            UploadImageFirebase(response);
          } else {
            Alert.alert('User cancelled !!!!!');
          }
        });
      }
    }
    catch (error) {
      console.log("errror is>>>", error);
      Alert.alert(error.message);
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
          setFileName(response?.assets[0].fileName);
          await AsyncStorage.setItem('ImageUri', response?.assets[0].uri);
          let imageUri = await AsyncStorage.getItem('ImageUri');

          UploadImageFirebase(response);
        } else {
          Alert.alert('no response');
        }
      });
    }
    catch (error) {
      console.log("errror is>>>", error);
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.titleText}>Account Details</Text>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setBottomSheet(true);
          }}
          style={{}}>
          <Image
            source={uri ? { uri: uri } : require('../assets/pngImages/photo.jpg')}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          flex: 0.7,
        }}>
        <View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="First Name"
              value={firstName}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setFirstName(text);
                setFirstNamShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {firstNameShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {firstNameError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label={"Last Name"}
              value={lastName}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setLastName(text);
                setLastNamShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {lastNameShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {lastNameError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="Phone Number"
              value={phoneNumber}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setphoneNumber(text);
                setPhoneNumberShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {phoneNumberShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {phoneNumberError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="DOB"
              value={dob}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setDob(text);
                setDobShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {dobShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {dobError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="Gender"
              value={gender}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setGender(text);
                setGenderShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {genderShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,

                }}>
                {genderError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="Email Address"
              value={emailAddress}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setEmailAddress(text);
                setEmailShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
                }}>
                {emailError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="Address"
              value={address}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setAddress(text);
                setAddressShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {addressShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {addressError}
              </Text>
            ) : null}
          </View>
          <Text
            style={{
              marginLeft: '5%',
              marginVertical: '4%',
              fontWeight: '700',
              fontSize: 20,
            }}>
            Address
          </Text>

          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="Street"
              value={street}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setStreet(text);
                setStreetShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {streetShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {streetError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="Zip code"
              value={zipCode}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setZipCode(text);
                setZipCodeShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {zipCodeShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {zipCodeError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="City"
              value={city}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setCity(text);
                setCityShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {cityShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {cityError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 0.9,
              marginBottom: '2%',
            }}>
            <TextInput
              label="Country"
              value={country}
              mode={'outlined'}
              placeholderTextColor="#AFAFAF"
              onChangeText={text => {
                setCountry(text);
                setCountryShow(false);
              }}
              style={{
                color: '#4D4848',
                width: '90%',
                height: 48,
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 13,
                fontWeight: "300"
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
            {CountryShow ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: '6%',
                  fontSize: 12,
                }}>
                {countryError}
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flex: 0.15,
        }}>
        <TouchableOpacity
          onPress={() => {
            handleValidation();
          }}
          style={{
            width: '90%',
            height: '85%',
            backgroundColor: '#1877f2',
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
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* {showBottomSheet ? (
        <View
          style={{
            flex: 0.3,
            // position:'absolute',
            // alignSelf:"flex-end",
            borderTopLeftRadius: 20,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            backgroundColor: '#00000029',
            //   backgroundColor:"pink"
          }}>
          <TouchableOpacity
            onPress={() => {
              captureImage('photo');
            }}>
            <View
              style={{
                marginLeft: '4%',
                marginVertical: '5%',
                flexDirection: 'row',
              }}>
              <AntDesign name={'camera'} size={23} />
              <Text style={{color: 'black', fontSize: 16, marginLeft: '6%'}}>
                Capture image from Camera
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => chooseFile('photo')}>
            <View
              style={{
                marginLeft: '4%',
                marginVertical: '5%',
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons name={'view-gallery'} size={23} />
              <Text style={{color: 'black', fontSize: 16, marginLeft: '6%'}}>
                Choose image from gallery
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null} */}
      <Modal
        animationType={'slide'}
        visible={showBottomSheet}
        transparent={true}
      // onRequestClose={toggleUpBottomSheet}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.closeView}
          onPress={() => {
            setBottomSheet(false);
          }}>
          <View
            style={[
              styles.modalContainer,
            ]}>
            <View
              style={[
                styles.mainContainerModal2,
              ]}>
              <TouchableOpacity
                onPress={() => {
                  captureImage('photo');
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
              <TouchableOpacity onPress={() => chooseFile('photo')}>
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
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 130,
    height: 130,
    margin: 5,
    borderRadius: 70,
  },
  closeView: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },

  mainContainerModal2: {
    backgroundColor: '#ffff',
    width: '100%',
    height: '25%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: '1%',
    borderBottomColor: '#F8F8F9',
    borderBottomWidth: 1.5,
  },
});
