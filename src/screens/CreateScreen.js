import React from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  onChangeText,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {KeyboardAvoidingView} from 'react-native';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from '../../Service/NotificationService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const CreateScreen = ({navigation}) => {
  const [myData, setMyData] = useState();
  const [list, setList] = useState([]);
  const [inputData, setInputData] = useState();
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState();
  const [arrayList, setArrayList] = useState(['hello', 'Hii', 'Tannu']);
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
    setUserCurrentDate();

    getUserData();
  }, []);
  const setUserCurrentDate = async () => {
    let userDate = '2/3/2023 15:33:12';
    await AsyncStorage.setItem('currentDate', currentDate);
    console.log('current date>>>>>>>>>>>>>', currentDate);
    if (userDate == currentDate)
      NotificationService.displayLocalNotification('hi', 'hello', 'hwww');
  };
  const handleCardPress = (cardIndex, cardValue) => {
    console.log('cardindex>>>>>>>', cardIndex);
    try {
      setIsUpdateData(true);
      setSelectedCardIndex(cardIndex);
      setInputData(cardValue);
    } catch (error) {
      console.log('error>>>>>>>>', error);
    }
  };
  const handleAddData = async () => {
    try {
      if (inputData != '') {
        console.log('list is', list);
        // const index=2;
        const index = list == undefined || list.length == 0 ? 1 : list.length;
        // const index=3;
        console.log('index to add card is>>>>>>>>>>>>>', index);
        const response = await database().ref(`todo/${index}`).set({
          value: inputData,
        });
        setInputData('');
        console.log('response of addcard>>>>>>>>>>>', response);
      } else {
        Alert.alert('Enter Value and try again!!');
      }
    } catch (error) {
      console.log('error>>>', error);
    }
  };
  const handleCardLongPress = (cardIndex, cardValue) => {
    try {
      Alert.alert('Alert', 'Do you want to Delete this item', [
        {
          text: 'cancel',
          onPress: () => {
            console.log('cancel is press');
          },
        },
        {
          text: 'ok',
          onPress: async () => {
            console.log('ok is press');
            try {
              console.log('deletion response and deleted index>>>>', cardIndex);
              const response = await database()
                .ref(`todo/${cardIndex}`)
                .remove();

              setInputData('');
              setIsUpdateData(false);
            } catch (error) {
              console.log('error is' >> error);
            }
          },
        },
      ]);
    } catch (error) {
      console.log('error is>>>>>>>>>', error);
    }
  };
  const handleUpdateData = async () => {
    try {
      if (inputData != '') {
        const response = await database().ref(`todo/${selectedCardIndex}`).set({
          value: inputData,
        });
        setInputData('');
        setIsUpdateData(false);
        // console.log('response is>>>>>>>>>>>', response);
      } else {
        Alert.alert('Enter Value and try again!!');
      }
    } catch (error) {
      console.log('error>>>', error);
    }
  };
  const getUserData = async () => {
    try {
      const data = await database()
        .ref('todo')
        .on('value', tempData => {
          // let listData=[];
          const listData = tempData.val();

          const data = listData
            ? Object.keys(listData).map(key => ({
                //map collection of object into array
                //from database response in object format...key is the index of object 0,1,2,3...in array
                // which i have stored ,listData[key]is the data on that index in object,
                id: key,
                ...listData[key],
              }))
            : [];
          console.log(
            'data from real database is>>>>>>',
            data,
            tempData.val(),
            tempData,
          );
          setList(data);
          console.log(
            'data in getuserdata stateis>>>>>>>>>>>>>>>>>>>>>>>>',
            data,
            typeof list,
          );
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1}}>

        <TouchableOpacity
        onPress={()=>{navigation.openDrawer();}}
          style={{
            flex: 0.2,
            // backgroundColor: 'red',
            marginTop:"5%"
          }}>
          <FontAwesome name={'bars'} size={30} 
          style={{marginLeft: '7%'}} />
        </TouchableOpacity>
        <View
          style={{
            flex: 0.1,
            // backgroundColor:"pink"
          }}>
          <Text style={styles.headerText}>Task List</Text>
        </View>

        <View
          style={{
            flex: 0.2,
            // backgroundColor:"blue"
          }}>
          <TextInput
            style={styles.input}
            onChangeText={value => {
              setInputData(value);
            }}
            value={inputData}
            placeholder={'Enter any task'}
          />
        </View>
        <View
          style={{
            flex: 0.2,

            // marginTop:"3%"
          }}>
          {isUpdateData ? (
            <TouchableOpacity
              onPress={() => {
                handleUpdateData();
              }}
              style={styles.buttonStyles}>
              <MaterialCommunityIcons
                name={'update'}
                size={20}
                color="white"
                style={styles.iconStyle}
              />
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                handleAddData();
              }}
              style={styles.buttonStyles}>
              <Entypo
                name={'add-to-list'}
                size={20}
                color="white"
                style={styles.iconStyle}
              />
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 0.15}}>
          <Text style={styles.todoHeaderText}>Todo App List</Text>
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'pink'
          }}>
          {list.map((item, index) => {
            console.log('map function', item);
            if (item.value != null) {
              return (
                <View key={index} style={styles.outerCard}>
                  <View style={{flex: 0.9}}>
                    <Text style={styles.cardText}>{item.value}</Text>
                  </View>
                  <TouchableOpacity
                    // onLongPress={()=>{handleCardLongPress(item.id,item.value)}}
                    onPress={() => {
                      handleCardLongPress(item.id, item.value);
                    }}
                    style={{
                      flex: 0.1,
                    }}>
                    <AntDesign
                      name={'delete'}
                      size={20}
                      color="black"
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleCardPress(item.id, item.value);
                    }}
                    style={{
                      flex: 0.2,
                      // backgroundColor:"blue"
                    }}>
                    <AntDesign
                      name={'edit'}
                      size={20}
                      color="black"
                      style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }
          })}
          {/* {list!=undefined||list.length>0?
           <FlatList
            data={list}
            renderItem={item => {
              const cardIndex = item.index;
              console.log('item is>>>>>', item);
              if (item.item != null) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleCardPress(cardIndex, item.item.value);
                    }}
                    onLongPress={()=>{handleCardLongPress(cardIndex,item.item.value)}}
                    style={{
                      borderRadius: 20,
                      borderWidth: 0.5,
                      width: '90%',
                      alignSelf: 'center',
                      paddingVertical: '4%',
                      backgroundColor: '#ffff',
                      marginBottom: '3%',
                    }}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        // alignSelf:"center",
                        marginLeft: '4%',
                        fontSize: 16,
                        fontWeight: '300',
                      }}>
                      {item.item}
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
          /> 
          : 
          <Text style={{fontSize:30,color:"black",fontWeight:'bold',justifyContent:'center',
          alignItems:'center'}}>No Data Available</Text>
          } */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'green',
    fontFamily: 'monospace',
    fontWeight: '400',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  input: {
    height: 50,
    width: '85%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  outerCard: {
    borderRadius: 20,
    borderWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: '4%',
    backgroundColor: '#ffff',
    marginBottom: '3%',
    flexDirection: 'row',
  },
  cardText: {
    justifyContent: 'center',
    // alignSelf:"center",
    marginLeft: '8%',
    fontSize: 16,
    fontWeight: '400',
  },
  todoHeaderText: {
    justifyContent: 'center',
    marginLeft: '8%',
    fontSize: 19,
    fontWeight: '600',
    marginVertical: '3%',
  },
  buttonStyles: {
    width: '90%',
    height: '100%',
    backgroundColor: 'green',
    marginHorizontal: '10%',
    borderRadius: 10,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: '2%',
    flexDirection: 'row',
    // padding:"3%"
  },
  iconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: '2%',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerText: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
  },
});
export default CreateScreen;
