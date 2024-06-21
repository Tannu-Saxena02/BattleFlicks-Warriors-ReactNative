import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomModal = ({
  showBottomSheet,
  setBottomSheet,
}

) => {
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
      if (isCameraPermitted && isStoragePermitted) {
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
    <Modal
      animationType={'slide'}
      visible={true}
      transparent={true}
      onRequestClose={!showBottomSheet}
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
                captureImage()
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
            <TouchableOpacity onPress={() => chooseFile()}>
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
  );
}

export default BottomModal;
const styles = StyleSheet.create({
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