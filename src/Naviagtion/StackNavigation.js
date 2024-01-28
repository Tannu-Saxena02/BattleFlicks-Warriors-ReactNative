import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import ReadFromFirebase from '../screens/ReadFromFirebase';
import {NavigationContainer} from '@react-navigation/native';
import RealtimeDatabasePractise from '../screens/RealtimeDatabasePractise';
import CreateScreen from '../screens/CreateScreen';
import RegistrationScreen from '../screens/RegisterationScreen';
import FirebaseLogin from '../screens/FirebaseLogin';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import RegisterationScreen from '../screens/RegisterationScreen';
import SendOtpScreen from '../screens/SendOtpScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import DrawerNavigation from './DrawerNavigation';
import EmailVerify from '../screens/EmailVerify';
import AccountScreen from '../screens/AccountScreen';
import ChangePassword from '../screens/ChangePassword';
import BottomModal from '../screens/BottomModal';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';
import Notifications from '../screens/Notifications';


const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        

              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Notifications" component={Notifications} />
         
              {/* <Stack.Screen name="BottomModal" component={BottomModal} /> */}
              <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />

              <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
              <Stack.Screen name="AccountScreen" component={AccountScreen} />  
           <Stack.Screen name="ChangePassword" component={ChangePassword} />
               
           <Stack.Screen name="EmailVerify" component={EmailVerify} /> 
           <Stack.Screen name="SendOtpScreen" component={SendOtpScreen} />

           <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
           <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FirebaseLogin" component={FirebaseLogin} />
        
    
        {/* <Stack.Screen name="SendOtpScreen" component={SendOtpScreen} /> */}
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen
          name="RegisterationScreen"
          component={RegisterationScreen}
        />
       
        <Stack.Screen name="CreateScreen" component={CreateScreen} />
        <Stack.Screen
          name="RealtimeDatabasePractise"
          component={RealtimeDatabasePractise}
        />
        <Stack.Screen name="ReadFromFirebase" component={ReadFromFirebase} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        {/* <Stack.Screen name="RealtimeDatabasePractise" component={RealtimeDatabasePractise} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
