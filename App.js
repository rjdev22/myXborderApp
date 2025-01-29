import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './android/app/src/Screens/HomeScreen';
import LoginScreen from './android/app/src/Screens/LoginScreen';
import SignUpScreen from './android/app/src/Screens/SignupScreen';


const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();





export default function App() {


  return (
  
      <PaperProvider>
        <NavigationContainer
        //   ref={(ref) => 
        //     notificationServices.setTopLevelNavigator(ref)
        //   }
        >
          <Stack.Navigator
            initialRouteName={'HomeScreen'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />   
            {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PackagesScreen" component={PackagesScreen} />
            <Stack.Screen name="JetPackagesScreen" component={JetPackagesScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="AddJetAlertScreen" component={AddJetAlertScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="EditJetAlertScreen" component={EditJetAlertScreen} />
            <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
            <Stack.Screen name="VarifyOtpScreen" component={VarifyOtpScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="ConsolidationRequestScreen" component={ConsolidationRequestScreen} />
            <Stack.Screen name="AddConsolidationRequestScreen" component={AddConsolidationRequestScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
   
  );
}
