import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  onChangeText,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ReadFromFirebase = ({navigation}) => {
  const [dataResponse, setDataResponse] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [asyncValue, setAsyncValue] = useState('');


  useEffect(() => {
    // getDatabase();
    // addUser();
  }, []);

  const showUserData = async () => {
    firestore()
      .collection('testing')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(async documentSnapshot => {
          console.log('User data: ', documentSnapshot.data().name, name);

          if (
            documentSnapshot.data().name == name &&
            documentSnapshot.data().email == email &&
            documentSnapshot.data().Password == Password
          ) {
            await AsyncStorage.setItem('username', name);
            await AsyncStorage.setItem('useremail', email);
            await AsyncStorage.setItem('userpassword', Password);
            let userName = await AsyncStorage.getItem('username');
            let userEmail = await AsyncStorage.getItem('useremail');
            let userpassword = await AsyncStorage.getItem('userpassword');
            console.log(
              'data is in read from firebase screen>>>>>>>>' +
                userName +
                userpassword +
                userEmail,
            );

            setAsyncValue(true);
            console.log('matched data: ', documentSnapshot.data().name);
          }
        });
        if (setAsyncValue) navigation.navigate('ProfileScreen');
      });
  };
  const getDatabase = async () => {
    try {
     
      firestore()
       
        .collection('testing')
        
        .update({
          age: 31,
        })
        .where('age', '==', 33)
        // .endAt(30)
        .get()
        .then(() => {
          console.log('User updated!' + doc);
        });
      // .then(querySnapshot => {
      //   // console.log('Total users: ', querySnapshot.size);
      //   querySnapshot.forEach(documentSnapshot => {
      //     console.log(
      //       ' decreasing order: ',
      //       documentSnapshot.id,
      //       documentSnapshot.data(),
      //     );
      //   });
      // });
    } catch (error) {
      console.log('error is>>>>>>>>>>>' + error);
    }
  };

  const addUser = () => {
    console.log('add function execute');
    firestore()
      .collection('testing')
      .add({
        name: name,
        email: email,
        Password: Password,
      })
      .then(() => {
        showUserData();
      });
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.3,
          // backgroundColor:"red"
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
          Firebase
        </Text>
      </View>

      <View
        style={{
          flex: 0.6,
          // backgroundColor:"blue"
        }}>
        <TextInput
          style={styles.input}
          placeholder={'Username'}
          onChangeText={text => {
            setName(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder={'Email'}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setPassword(text);
          }}
          placeholder={'Password'}
        />
      </View>
      <View
        style={{
          flex: 0.1,
          // backgroundColor:"pink"
        }}>
        <TouchableOpacity
          onPress={() => {
            addUser();
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
            Submit
          </Text>
        </TouchableOpacity>
      </View>
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
});
export default ReadFromFirebase;
