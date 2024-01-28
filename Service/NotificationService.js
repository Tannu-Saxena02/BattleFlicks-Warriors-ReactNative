import React from 'react';
import { View,Text } from 'react-native';
import notifee from '@notifee/react-native';


class NotificationService{
 static  displayLocalNotification=async(title,body,data)=>{
        
            // Request permissions (required for iOS)
            await notifee.requestPermission()
        
            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
              id: 'default',
              name: 'Notifications',
            });
        
            // Display a notification
            await notifee.displayNotification({
              title: title,
              body: body,
              data:data?data:null,
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
   
};
export default NotificationService;