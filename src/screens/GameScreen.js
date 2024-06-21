import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Animation,
  ImageBackground,
  Image,
} from 'react-native';
import DisplayText from './DisplayResult';
import Actions from './Actions';
import tapAudio from '../assets/audioFiles/tapaudio.mp3';
import Sound from 'react-native-sound';


const GameScreen = ({ navigation }) => {
  const [userChoice, setUserChoice] = useState(0);
  const [computerChoice, setComputerChoice] = useState(0);
  const [result, setResult] = useState('');
  const [canPlay, setPlay] = useState(true);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const [sound, setSound] = useState();
  useEffect(() => {
    calculateScores();
  });
  useEffect(() => {
    setUserScore(0);
    setComputerScore(0);
    setUserChoice(0);
    setComputerChoice(0);
    setPlay(true);
  }, []);
  const playAudio = async () => {
    const soundFile = new Sound(tapAudio, error => {
      console.log('=============================sound');
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }
      setSound(soundFile);
      console.log('out>>>>.' + JSON.stringify(soundFile));

    });

  };
  const playMusic = async () => {
    if (sound) {
      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Error playing sound');
        }
      });
    }
  }
  const calculateScores = () => {
    console.log('\u{1F600}');
    console.log('user' + userScore + '  ' + 'computer' + computerScore);
    if (userScore == 5 && computerScore != 5) {
      console.log('navigated');
      navigation.navigate('GameResultScreen', {
        userScore: userScore,
        computerScore: computerScore,
      });
    } else if (userScore != 5 && computerScore == 5) {
      console.log('navigated');
      navigation.navigate('GameResultScreen', {
        userScore: userScore,
        computerScore: computerScore,
      });
    }
  };
  const handleButtonClick = () => {
    console.log("button click" + sound + "hi" + !sound);
    const soundFile = new Sound(tapAudio, (error) => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }

      console.log('Sound loaded successfully');
      setSound(soundFile);

      // Play the sound
      soundFile.play((success) => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Error playing sound');
        }
      });
    });
    // }
  };

  function play(choice) {
    handleButtonClick();

    const randomComputerChoice = Math.floor(Math.random() * 3) + 1;
    let resultString = '';
    console.log('result' + randomComputerChoice + ' ' + 'userchoice' + choice);
    if (choice == randomComputerChoice) resultString = 'DRAW';
    else if (choice == 1) {
      resultString = randomComputerChoice == 3 ? 'WIN' : 'LOSE';
      resultString == 'WIN'
        ? setUserScore(userScore + 1)
        : setComputerScore(computerScore + 1);
    } else if (choice == 2) {
      resultString = randomComputerChoice == 1 ? 'WIN' : 'LOSE';
      resultString == 'WIN'
        ? setUserScore(userScore + 1)
        : setComputerScore(computerScore + 1);
    } else {
      resultString = randomComputerChoice == 2 ? 'WIN' : 'LOSE';
      resultString == 'WIN'
        ? setUserScore(userScore + 1)
        : setComputerScore(computerScore + 1);
    }

    setUserChoice(choice);
    setComputerChoice(randomComputerChoice);


    setTimeout(() => {
      setResult(resultString);
    }, 300);

    Animated.sequence([
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setPlay(false);
    setTimeout(() => {
      setPlay(true);
    }, 600);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'white',
            padding: '4%',
            marginTop: '3%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.7,
            }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginRight: '4%',

              }}
              source={require('../assets/pngImages/sponge.png')}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              You:{' '}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              {userScore}
            </Text>
            {/* <Text style={styles.fireEmoji}>🔥</Text> */}
          </View>
          <View
            style={{
              flex: 0.6,
            }}>
            <Text
              style={{
                color: '#A9FF03',
                fontSize: 22,
                fontWeight: 'bold',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              V/S
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              Computer:{' '}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              {computerScore}
            </Text>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                marginLeft: '4%',
              }}
              source={require('../assets/pngImages/patrick.png')}
            />
          </View>
        </View>
        <View style={styles.result}>
          <Animated.Text
            style={[styles.resultText]}>
            {result}
          </Animated.Text>
        </View>
        {computerScore < 5 && userScore < 5 ? (
          <View style={styles.screen}>

            <DisplayText
              userChoice={userChoice}
              computerChoice={computerChoice}
            />
          </View>
        ) : null}
        {computerScore < 5 && userScore < 5 ? (
          <Actions

            play={play}
            canPlay={canPlay}
            userScore={userScore}
            computerScore={computerScore}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242841ff',
  },
  content: {
    flex: 1,
    marginBottom: 5,
  },
  result: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  resultText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    flexDirection: 'row',
  },

  readyText: {
    marginTop: -48,
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default GameScreen;
