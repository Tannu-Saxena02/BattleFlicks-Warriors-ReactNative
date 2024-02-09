import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, View} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
const CommonHeader = ({navigation}) => {
  return (
    <View style={{width: '100%', backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={{
          marginTop: '3%',
        }}>
        <FontAwesome
          name={'bars'}
          size={30}
          style={{marginLeft: '4%', marginBottom: '2%'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeader;
