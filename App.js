import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useEffect } from 'react';
import AppNavigtion from './android/app/src/Navigation/AppNavigation';
import Layout from './android/app/src/Components/Common/Layout';
import { AuthProvider } from './android/app/src/Context/authContext';
//import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';


// const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Notification permission granted.');
//   } else {
//     Alert.alert(
//       'Allow MyXBorder Notifications',
//       'To stay updated, please allow notifications.',
//       [
//         {
//           text: 'Allow',
//           onPress: () => messaging().requestPermission(),
//         },
//         {
//           text: "Don't Allow",
//           style: 'cancel',
//         },
//       ]
//     );
//   }
// };

export default function App() {

  // useEffect(() => {
  //   requestUserPermission();
  // }, []);
  return (
    <AuthProvider>
      <AppNavigtion />
    </AuthProvider >
  );
}
