import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      {/* <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} /> */}
      <Stack.Screen name="ShopNshipScreen" component={ShopNshipScreen} />
      <Stack.Screen name="AddShopNShipScreen" component={AddShopNShipScreen} />
      <Stack.Screen name="AssistedShopNShipScreen" component={AssistedShopNShipScreen} />
      <Stack.Screen name="AddAssistedShopNShipScreen" component={AddAssistedShopNShipScreen} />
      <Stack.Screen name="InternationalShipmentScreen" component={InternationalShipmentScreen} />
      <Stack.Screen name="AddInternationalShipmentScreen" component={AddInternationalShipmentScreen} />
      <Stack.Screen name="CouponsScreen" component={CouponsScreen} />
      <Stack.Screen name="HelpAndSupportScreen" component={HelpAndSupportScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}
      contentContainerStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
    >
      {/* Display default drawer items */}
      <DrawerItemList {...props} />
      {/* Add custom drawer items */}
      <DrawerItem
        label="Address Book"
        icon={({ color, size }) => (
          <Icon name="address-book" size={14} color={'#000'} />
        )}
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        label="About"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        label="Services"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        label="Offers"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />   <DrawerItem
        label="Shipping Rates"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />   <DrawerItem
        label="How it Works"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        label="Indian Stores"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        label="Faq"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        label="Duty & Taxes"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      {/* <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('SettingsScreen')}
      /> */}
      {/* Add more custom items as needed */}
    </DrawerContentScrollView>
  );
}
// Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 320,
        },
        drawerActiveTintColor: '#ff0080',
        drawerItemStyle: { marginVertical: 1, borderRadius: 5, padding: 0 },
        hideDrawerStatusBar: true
      }}
    >

      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Dashboard"
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Icon name="dashboard" color={'#000'} size={14} />
          ),
        }}
        component={DashBoardScreen} />
      <Drawer.Screen name="Shop N Ship" component={ShopNshipScreen} />
      <Drawer.Screen name="Assisted Shop N Ship" component={AssistedShopNShipScreen} />
      <Drawer.Screen name="International Shipment" component={InternationalShipmentScreen} />
      <Drawer.Screen name="Coupons" component={CouponsScreen} />
      <Drawer.Screen name="Help & Support" component={HelpAndSupportScreen} />
      {/* <Drawer.Item name="Logout" onPress={() => navigationRef.navigate('LoginScreen')} /> */}

    </Drawer.Navigator>

  );
}

// Main App Navigation
export default function AppNavigation() {
  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>

        <DrawerNavigator/>

    </NavigationContainer>
    </PaperProvider >
  );
}
