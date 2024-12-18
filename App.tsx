/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './android/app/src/screens/HomeScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'HomeScreen'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}
