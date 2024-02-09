import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Lottie from 'lottie-react-native';
import musicFile from '../assets/audioFiles/winSound.mp3';
import loseSound from '../assets/audioFiles/lose.mp3';
import Sound from 'react-native-sound';

const GameResultScreen = ({route, navigation}) => {
  const {userScore, computerScore} = route.params;
  const [seconds, setSeconds] = useState(10);
  const [sound, setSound] = useState();
  const audio =
    userScore == 5
      ? require('../assets/audioFiles/winaudio.mp3')
      : require('../assets/audioFiles/lose.mp3');
  useEffect(() => {
  
    const music = async () => {
      const soundFile = new Sound(audio, error => {
        console.log('=============================sound');
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        console.log('useEffect sound');
        setSound(soundFile);

        soundFile.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Error playing sound');
          }
        });
      });
      console.log('out>>>>.' + JSON.stringify(soundFile));
    };
    music();
    // return () => {
    //   // backHandler.remove();
    //   if (sound) {
    //     sound.release();
    //   }
    // };
    const backAction = () => {
      BackHandler.exitApp();
      navigation.pop(2);
    }
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
      
  }, []);
  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      {userScore == 5 ? (
        <Lottie
          source={require('../assets/lottieFiles/confetiLottie.json')}
          autoPlay
          loop
        />
      ) : null}
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: '8%',
          color: 'white',
        }}>
        Rock Paper Scissors
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '1%',
          marginTop: '7%',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            borderWidth: 2,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingHorizontal: '6%',
            paddingVertical: '4%',
            marginRight: '3%',
            borderColor: '#6a5300',
            backgroundColor: '#f9d835',
          }}>
          <Text style={{color: '#6a5300', fontWeight: 'bold', fontSize: 15}}>
            You :{' '}
          </Text>
          <Text style={{color: '#6a5300', fontWeight: 'bold', fontSize: 15}}>
            {userScore}
          </Text>
        </View>

        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            borderWidth: 2,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: '4%',
            borderColor: '#6a5300',
            backgroundColor: '#f9d835',
          }}>
          <Text style={{color: '#6a5300', fontWeight: 'bold', fontSize: 14}}>
            Computer :{' '}
          </Text>
          <Text style={{color: '#6a5300', fontWeight: 'bold', fontSize: 14}}>
            {computerScore}
          </Text>
        </View>
      </View>
      {userScore == 5 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: '8%',
              color: 'white',
            }}>
            You won
          </Text>

          <Text style={styles.fireEmoji}>🔥</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: '8%',
              color: 'white',
            }}>
            You lost
          </Text>
          {/* <Text style={styles.exclamationSymbol}>&#x0021;</Text> */}
          {/* <Text style={styles.exclamationSymbol}>❗️</Text> */}
          <FontAwesome5
            name="exclamation"
            color={'red'}
            size={25}
            style={styles.exclamationSymbol}
          />
        </View>
      )}
      <View style={styles.action}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="hand-rock" size={32} color="#6a5300" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="hand-paper" size={32} color="#6a5300" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="hand-scissors" size={32} color="#6a5300" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: '8%',
          color: 'white',
        }}>
        Choose your Weapon !
      </Text>
      {seconds >= 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginTop: '8%',
              color: 'white',
            }}>
            Time left :
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: '8%',
              color: 'white',
            }}>
            {' '}
            {seconds}
          </Text>
        </View>
      ) : null}
      <View
        style={{
          position: 'absolute',
          bottom: -10,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: '5%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'GameScreen'}],
            });
            // navigation.navigate('GameScreen');
          }}
          disabled={seconds >= 0}
          // onPress={navigation.navigate('GameScreen')}
          style={{
            borderRadius: 10,
            padding: '3.3%',
            backgroundColor: '#a9ff03',
            marginHorizontal: '7%',
            marginBottom: '5%',
            // position: 'absolute',
            // bottom: -10,
            // left: 0,
            // right: 0,
            // justifyContent: 'center',
            // alignSelf: 'center',
            // marginBottom: '5%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            Play Again
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={seconds >= 0}
          onPress={() => navigation.navigate('InitialGameScreen')}
          style={{
            borderRadius: 10,
            padding: '3.3%',
            // backgroundColor: '#f9d835',
            marginHorizontal: '7%',
            borderColor: '#9E75CA',
            borderWidth: 2,
            // position: 'absolute',
            // bottom: 0,
            // left: 0,
            // right: 0,
            // justifyContent: 'center',
            // alignSelf: 'center',
            // marginBottom: '5%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 17,
              fontWeight: 'bold',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  action: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: '2%',
  },
  actionButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9d835',
    borderRadius: 32,
  },
  fireEmoji: {
    fontSize: 26,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '7%',
    // backgroundColor:"white"
  },
  exclamationSymbol: {
    fontSize: 26,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '8%',
    marginLeft: '4%',
  },
});
export default GameResultScreen;
