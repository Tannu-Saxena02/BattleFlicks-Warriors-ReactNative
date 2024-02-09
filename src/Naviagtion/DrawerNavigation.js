import {createDrawerNavigator} from '@react-navigation/drawer';
import FirebaseLogin from '../screens/FirebaseLogin';
import HomeScreen from '../screens/HomeScreen';
import RegisterationScreen from '../screens/RegisterationScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SendOtpScreen from '../screens/SendOtpScreen';
import CustomSideMenu from '../screens/CustomSideMenu';

import Entypo from 'react-native-vector-icons/Entypo';
import ChangePassword from '../screens/ChangePassword';
import EmailVerify from '../screens/EmailVerify';
import CreateScreen from '../screens/CreateScreen';
import GameScreen from '../screens/GameScreen';
import InitialGameScreen from '../screens/InitialGameScreen';
import {Text, TouchableOpacity} from 'react-native';
import CommonHeader from '../screens/CommonHeader';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      drawerContent={props => <CustomSideMenu {...props} />}>
      <Drawer.Screen
        name="InitialGameScreen"
        component={InitialGameScreen}
        options={{
          title: 'Home',
          headerTitleStyle: {
            color: '#fff',
          },
          drawerActiveTintColor: '#6200EE',
          headerStyle: {
            backgroundColor: '#833471',
          },
          drawerIcon: ({focused, size}) => (
            <AntDesign
              name="home"
              size={focused ? 28 : 25}
              color={focused ? '#6200EE' : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="RegisterationScreen"
        component={RegisterationScreen}
        options={{
          title: 'Login',
          drawerActiveTintColor: '#6200EE',
          drawerIcon: ({focused, size}) => (
            <AntDesign
              name="login"
              size={focused ? 28 : 25}
              color={focused ? '#6200EE' : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FirebaseLogin"
        component={FirebaseLogin}
        options={{
          title: 'Logout',
          drawerActiveTintColor: '#6200EE',

          drawerIcon: ({focused, size}) => (
            <AntDesign
              name="logout"
              size={focused ? 28 : 23}
              color={focused ? '#6200EE' : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="VerifyOtpScreen"
        component={SendOtpScreen}
        options={{
          title: 'Share App',
          drawerActiveTintColor: '#6200EE',
          drawerIcon: ({focused, size}) => (
            <Entypo
              name="share"
              size={focused ? 28 : 25}
              color={focused ? '#6200EE' : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
          drawerActiveTintColor: '#6200EE',
          drawerIcon: ({focused, size}) => (
            <Entypo
              name="lock"
              size={focused ? 28 : 25}
              color={focused ? '#6200EE' : '#000'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="EmailVerify"
        component={EmailVerify}
        options={{
          title: 'Change EmailAddress',
          drawerActiveTintColor: '#6200EE',
          drawerIcon: ({focused, size}) => (
            <Entypo
              name="mail"
              size={focused ? 28 : 25}
              color={focused ? '#6200EE' : '#000'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
