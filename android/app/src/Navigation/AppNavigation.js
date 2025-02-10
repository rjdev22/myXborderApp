import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignupScreen';
import DashBoardScreen from '../Screens/DashBoardScreen';
import ShopNshipScreen from '../Screens/ShopNshipScreen';
import AssistedShopNShipScreen from '../Screens/AssistedShopNShipScreen';
import InternationalShipmentScreen from '../Screens/InternationalShipmentScreen';
import AddShopNShipScreen from '../Screens/AddShopNShipScreen';
import AddAssistedShopNShipScreen from '../Screens/AddAssistedShopNShipScreen';
import AddInternationalShipmentScreen from '../Screens/AddInternationalShipmentScreen';
import UserProfileScreen from '../Screens/UserProfileScreen';
import CouponsScreen from '../Screens/CouponsScreen';
import HelpAndSupportScreen from '../Screens/Help&SupportScreen';
import Layout from '../Components/Common/Layout';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export const navigationRef = createNavigationContainerRef();


// Stack Navigator for Screens
function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
  
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
      <Stack.Screen name="ShopNshipScreen" component={ShopNshipScreen} />
      <Stack.Screen name="AddShopNShipScreen" component={AddShopNShipScreen} />
      <Stack.Screen name="AssistedShopNShipScreen" component={AssistedShopNShipScreen} />
      <Stack.Screen name="AddAssistedShopNShipScreen" component={AddAssistedShopNShipScreen} />
      <Stack.Screen name="InternationalShipmentScreen" component={InternationalShipmentScreen} />
      <Stack.Screen name="AddInternationalShipmentScreen" component={AddInternationalShipmentScreen} />


    </Stack.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {

          width: 320,
        },
        drawerActiveTintColor: '#ff0080',
        drawerItemStyle: { marginVertical: 1, borderRadius: 10, padding: 0 },


      }}
    >

      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Dashboard" component={DashBoardScreen} />
      <Drawer.Screen name="Shop N Ship" component={ShopNshipScreen} />
      <Drawer.Screen name="Assisted Shop N Ship" component={AssistedShopNShipScreen} />
      <Drawer.Screen name="International Shipment" component={InternationalShipmentScreen} />
      <Drawer.Screen name="Add Shop N Ship" component={AddShopNShipScreen} />
      <Drawer.Screen name="Coupons" component={CouponsScreen} />
      <Drawer.Screen name="Help & Support" component={HelpAndSupportScreen} />

    </Drawer.Navigator>

  );
}

// Main App Navigation
export default function AppNavigation() {
  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        {/* <Layout> */}
        <DrawerNavigator />
        {/* </Layout> */}
      </NavigationContainer>
    </PaperProvider>
  );
}
