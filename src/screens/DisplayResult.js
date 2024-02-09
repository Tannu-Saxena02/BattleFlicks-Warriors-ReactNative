import React from 'react'
import { View,Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DisplayResult = ({userChoice,computerChoice}) => {
  const ICONS=['hand-rock','hand-paper','hand-scissors'];
  return (
    <>
    <View style={styles.column}>
      <FontAwesome5
      name={ICONS[userChoice-1]}
      size={64}
      color={'#f9d835'}
      solid
      style={userChoice===3?styles.scissorLeftIcon:styles.leftIcon}
      />
      <Text style={styles.playerName}>You</Text>
    </View>

    <View style={styles.column}>
      <FontAwesome5
      name={ICONS[computerChoice-1]}
      size={64}
      color={'#f9d835'}
      solid
      style={userChoice===3?styles.scissorRightIcon:styles.rightIcon}
      />
      <Text style={styles.playerName}>Computer</Text>
    </View>
    </>
  )
}
const styles=StyleSheet.create({
  column:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor
  },
  playerName:{
    color:"white",
    fontSize:18,
    marginTop:16,
    fontWeight:"bold"
  },
  leftIcon:{
    transform:[{rotateZ:'80deg'}]
  },
  scissorLeftIcon:{
    transform:[{rotateZ:'180deg'},{rotateX:'180deg'}]
  },
  // rightIcon:{
  //   // transform:[{rotateX:'180deg'},{rotateY:'180deg'},{rotateZ:'180deg'}]

  //   transform:[{rotateZ:'-90deg'}]
  //   // transform:[{rotateZ:'360deg'},{rotateX:'360deg'}]
  // },
  rightIcon:{
     transform:[{rotateX:'180deg'},{rotateY:'180deg'},{rotateZ:'180deg'}]
  }

});
export default DisplayResult;
