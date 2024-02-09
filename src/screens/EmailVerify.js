import React ,{useEffect,useState}from 'react';
import {StyleSheet, Text,View,onChangeText, TouchableOpacity,Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
const EmailVerify = ({navigation}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailShow, setEmailShow] = useState(false);
  const [passwordShow, setPasswordShow] = useState('');
  const [iconShow, setIconShow] = useState(false);


    useEffect(()=>{
        // handleEmailVerify();
    },[])
    const handleValidation = () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      console.log('email>>', email, 'password>>>', password);
      if (reg.test(email) === false) 
      { console.log("Email is Not Correct")
      setEmailError('Please provide valid mail');
      setEmailShow(true);
     }
      if (email == '') {
        setEmailError('Email cannot be empty');
        setEmailShow(true);
      }
     
      if (password == '') {
        setPasswordError('Password cannot be empty');
        setPasswordShow(true);
      }
    
     
      if(email!=''&&password!=''&&reg.test(email))
      handleEmailVerify();
    };
    const handleEmailVerify=async()=>{
    try{
      if(email&&password){
        // const isUserCreated= await auth().createUserWithEmailAndPassword(email,password);
        await auth().currentUser.sendEmailVerification();
        // Alert.alert('Please verify your email check out link in your inbox');
        Alert.alert('Alert', 'Please verify your email check out link in your inbox', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.navigate("AccountScreen") },
        ]);
        console.log("email verify flag set");
  
         }
         else{
           Alert.alert("please enter all data");
           
         }
    }

    catch(error)
    {
      console.log("error is>>>"+"heree",error);
      Alert.alert(error.message)
    }
    }
  return (
    <View style={{flex: 1}}>
        <View style={{flex:0.5,
            // backgroundColor:"red",
            alignItems: 'center',
            justifyContent:"center",

            }}>
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        //   marginTop: '10%',
          fontSize:30,
          color:"green",
          fontWeight:"bold"
        }}>
        Email details
      </Text>
</View>
<View
style={{flex:0.2,
  // backgroundColor:"pink",
  alignItems: 'center',
  justifyContent:"flex-end",

  }}>
<Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        //   marginTop: '10%',
          fontSize:18,
          color:"green",
          fontWeight:"bold"
        }}>
        Enter your email to Verify your profile 
      </Text>
      <Text
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        //   marginTop: '10%',
          fontSize:18,
          color:"green",
          fontWeight:"bold"
        }}>
       information
      </Text>

</View>
    
        <View style={{flex:0.4,
        // backgroundColor:"blue",
        alignItems: 'center',
        justifyContent: 'center',

    }}>
      {/* <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text)=>{setEmail(text)}}
        placeholder={"Email"}
      /> */}
         <View style={{
          flex:0.38,
          width:"100%",
            // backgroundColor:"black"
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
        <View style={{flex:0.35,
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
                marginLeft: '3%',
                fontSize: 12,
              }}>
              {passwordError}
            </Text>
          ) : null}
        </View>
       {/* <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        placeholder={"Enter your password"}
      /> */}
       {/* <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={"Email"}
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={"Password"}
      /> */}
      </View>
      <View style={{flex:0.14,
        // backgroundColor:"pink"
        }}>
      <TouchableOpacity
      // onPress={()=>{navigation.navigate('VerifyOtpScreen')}}
      onPress={()=>{handleValidation()}}
      style={{width:"90%",
      height:"70%",
      backgroundColor:"green",
      marginHorizontal:"10%",
      borderRadius:10,
      alignSelf:"center",
      alignContent:'center',
      justifyContent:"center"}}>
        <Text
        style={{color:"white",fontSize:17,textAlign:"center",
        alignSelf:"center",justifyContent:"center"}}>Continue</Text>
      </TouchableOpacity>
      </View>
      <View style={{flex:0.14,
        // backgroundColor:"pink"
        }}>
      <TouchableOpacity
      onPress={()=>{navigation.goBack();}}
      // onPress={()=>{handleValidation()}}
      style={{width:"90%",
      height:"70%",
      backgroundColor:"#838383",
      marginHorizontal:"10%",
      borderRadius:10,
      alignSelf:"center",
      alignContent:'center',
      justifyContent:"center"}}>
        <Text
        style={{color:"#ffff",fontSize:17,textAlign:"center",
        alignSelf:"center",justifyContent:"center"}}>Previous</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};
const styles=StyleSheet.create({
    input: {
        height: 50,
        width:"85%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
        alignSelf:"center"
      },  
})
export default EmailVerify;
