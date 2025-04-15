import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AppNavigtion from './android/app/src/Navigation/AppNavigation';
import Layout from './android/app/src/Components/Common/Layout';
import { AuthProvider } from './android/app/src/Context/authContext';
import { StripeProvider } from '@stripe/stripe-react-native';
//import messaging from '@react-native-firebase/messaging';
const publishableKey=process.env.STRIPE_PUBLISH_KEY;
console.log('publishableKey',publishableKey)


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
  return (
    <StripeProvider publishableKey={publishableKey}>
    <AuthProvider>
      <AppNavigtion />
    </AuthProvider >
    </StripeProvider>
  );
}
