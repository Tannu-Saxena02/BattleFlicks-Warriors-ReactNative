/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Alert } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import NotificationService from './Service/NotificationService';
import notifee from '@notifee/react-native';
// messaging().onMessage(async remoteMessage => {
//     NotificationService.displayLocalNotification(
//         remoteMessage.notification.title,
//         remoteMessage.notification.body,
//         remoteMessage.data
//     )
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  // });
AppRegistry.registerComponent("rnpractise", () => App);
