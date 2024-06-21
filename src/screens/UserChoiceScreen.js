import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const UserChoiceScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RegisterationScreen");
        }}
        style={{
          borderRadius: 10,
          padding: '3.3%',
          backgroundColor: '#1877f2',
          marginHorizontal: '7%',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: '500',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          Signup via  Email
        </Text>
      </TouchableOpacity>
      <View
        style={{ marginVertical: "9%", flexDirection: "row", justifyContent: "center", alignSelf: "center", marginHorizontal: '5%' }}>

        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            flex: 0.3,
            marginBottom: "3%"

          }}
        />
        <Text
          style={{
            color: 'grey',
            fontSize: 15,
            fontWeight: '500',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            textAlignVertical: 'center',
            textAlign: "center",
            marginHorizontal: "4%"
          }}
        >OR</Text>
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            flex: 0.3,
            marginBottom: "3%"
          }}
        />

      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SendOtpScreen")
        }}

        style={{
          borderRadius: 10,
          padding: '3.3%',
          backgroundColor: '#1877f2',
          marginHorizontal: '7%',
          marginBottom: '5%',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: '500',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          Signup via phone
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({

});
export default UserChoiceScreen
