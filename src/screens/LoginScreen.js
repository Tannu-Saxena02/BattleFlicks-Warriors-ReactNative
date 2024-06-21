import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, onChangeText, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  useEffect(() => {

  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        flex: 0.3,
      }}>
        <Text
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: '10%',
            fontSize: 30,
            color: "green",
            fontWeight: "bold"
          }}>
          Firebase
        </Text>

      </View>

      <View style={{
        flex: 0.6,
      }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={"Username"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={"Email"}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={"Password"}
        />
      </View>
      <View style={{
        flex: 0.1,
      }}>
        <TouchableOpacity
          style={{
            width: "90%",
            height: "70%",
            backgroundColor: "green",
            marginHorizontal: "10%",
            borderRadius: 10,
            alignSelf: "center",
            alignContent: 'center',
            justifyContent: "center"
          }}>
          <Text
            style={{
              color: "white", fontSize: 17, textAlign: "center",
              alignSelf: "center", justifyContent: "center"
            }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "85%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center"
  },
})
export default LoginScreen;
