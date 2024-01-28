import React from 'react';
import {View, Button, Text} from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
const Notifications = () => {
  // const onDisplayRemoteNotification = async () => {
  //   console.log('remotee');
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     //   console.log('Authorization status:', authStatus);
  //     messaging()
  //       .getToken()
  //       .then(fcmToken => {
  //         console.log('FCM Token -> ', fcmToken);
  //       });
  //       // setTimeout(onDisplayNotification, 2000);
  //   } else console.log('Not Authorization status:', authStatus);
  // };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    //     <View>
    //     <Text>Dummy Screen</Text>
    // </View>
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <Button
          title="Display Local Notification"
          onPress={() => onDisplayNotification()}
        />
      </View>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <Button
          title="Display Remote Notification"
          onPress={() => onDisplayRemoteNotification()}
        />
      </View>
    </View>
  );
};
export default Notifications;
