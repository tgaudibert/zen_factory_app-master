/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
const appUpdateInterest = 'debug-updates';
import analytics from '@segment/analytics-react-native'




  // Initialize notifications
  export const init = async () => {


    await analytics.setup('G7DCJjkSZtS5ysPnA8HJeG13NRWm1twQ', {
      // Record screen views automatically!
      recordScreenViews: true,
      // Record certain application events automatically!
      trackAppLifecycleEvents: true
    })


    // Set your app key and register for push
    //RNPusherPushNotifications.clearAllState()
    RNPusherPushNotifications.setInstanceId(
      'f73d105a-488c-4a3f-b59b-5a3673e80713'
    );


    subscribe('debug-hello');
    // Init interests after registration
    RNPusherPushNotifications.on('registered', () => {
      if (Platform.OS === 'ios') {
        console.log('pusher unitialized ios')
      }else{
        console.log('pusher unitialized android')
      }
    });

    // Setup notification listeners
    RNPusherPushNotifications.on('notification', handleNotification);


    //setPusher()
  };

  // Handle notifications received
  const handleNotification = notification => {
    console.log(notification)

    console.log("handled notif")

  };

  // Subscribe to an interest
  const subscribe = interest => {
    console.log(interest);
    RNPusherPushNotifications.subscribe(
      interest,
      (statusCode, response) => {
        console.error(statusCode, response);
      },
      () => {
        console.log('Success');
      }
    );
  };

  init();

AppRegistry.registerComponent(appName, () => App);
