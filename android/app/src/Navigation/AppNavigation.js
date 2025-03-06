import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications';

import { createDrawerNavigator,
 DrawerContentScrollView,
 DrawerItemList,
 DrawerItem } from '@react-navigation/drawer';
import { Linking } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import DashBoardScreen from '../Screens/DashBoardScreen';
import ShopNshipScreen from '../Screens/ShopNshipScreen';
import HelpAndSupportScreen from '../Screens/Help&SupportScreen';
import AssistedShopNShipScreen from '../Screens/AssistedShopNShipScreen';
import InternationalShipmentScreen from '../Screens/InternationalShipmentScreen';
import AddInternationalShipmentScreen from '../Screens/AddInternationalShipmentScreen';
import EmailVarificationScreen from '../Screens/EmailVarificationScreen.';
import AddAssistedShopNShipScreen from '../Screens/AddAssistedShopNShipScreen';
import AddShopNShipScreen from '../Screens/AddShopNShipScreen';
import UserProfileScreen from '../Screens/UserProfileScreen';
import CouponsScreen from '../Screens/CouponsScreen';
import SplashScreen from '../Screens/SplashScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import VarifyOtpScreen from '../Screens/VarifyOtpScreen';
import ShopNshipShipmentAddress from '../Screens/ShopNShipShippingAddress';
import ExistaddressList from '../Screens/Address/ExistaddressList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff', borderRadius: 5 }}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Address Book"
        style={{ borderRadius: 5 }}
        icon={({ color, size }) => <Icon name="address-book" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://mywebsite.com/address-book')}
      />
      {/* <DrawerItem
        label="About"
        onPress={() => Linking.openURL('https://myxborder.com/about-us')}
      /> */}
      <DrawerItem
        label="Services"
        style={{ borderRadius: 5 }}
        icon={({ color, size }) => <Icon name="cog" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://mywebsite.com/services')}
      />
      <DrawerItem
        label="Offers"
        style={{ borderRadius: 5 }}
        icon={({ color, size }) => <Icon name="gift" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://uat.myxborder.com/offer/list')}
      />
      <DrawerItem
        label="Shipping Rates"
        style={{ borderRadius: 5 }}
        icon={({ color, size }) => <Icon name="shipping-fast" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://uat.myxborder.com/shipping-rates')}
      />
      <DrawerItem
        label="How it Works"
        style={{ borderRadius: 5 }}
        icon={({ color, size }) => <Icon name="network-wired" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://mywebsite.com/how-it-works')}
      />
      <DrawerItem
        label="Indian Stores"
        style={{ borderRadius: 5 }}
        icon={({ color, size }) => <Icon name="store" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://mywebsite.com/indian-stores')}
      />
      <DrawerItem
        label="FAQ"
        style={{ borderRadius: 5 }}
        icon={({ color, size }) => <Icon name="question-circle" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://mywebsite.com/faq')}
      />
      <DrawerItem
        label="Duty & Taxes"
        style={{ borderRadius: 5 }}
        icon={({ color, size }) => <Icon name="address-book" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://mywebsite.com/duty-taxes')}
      />
    </DrawerContentScrollView>
  );
}

// Stack Navigator
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
      <Stack.Screen name="ShopNshipScreen" component={ShopNshipScreen} />
      <Stack.Screen name="AssistedShopNShipScreen" component={AssistedShopNShipScreen} />
      <Stack.Screen name="InternationalShipmentScreen" component={InternationalShipmentScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignupScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="AddShopNShipScreen" component={AddShopNShipScreen} />
      <Stack.Screen name="AddAssistedShopNShipScreen" component={AddAssistedShopNShipScreen} />
      <Stack.Screen name="AddInternationalShipmentScreen" component={AddInternationalShipmentScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="EmailVarificationScreen" component={EmailVarificationScreen} />
      <Stack.Screen name="VarifyOtpScreen" component={VarifyOtpScreen} />
      <Stack.Screen name="ShopNshipShipmentAddress" component={ ShopNshipShipmentAddress}/>
      <Stack.Screen name="ExistaddressList" component={ExistaddressList}/>

    </Stack.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      //initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: { width: 320 },
        drawerActiveTintColor: '#d81397',
        drawerItemStyle: { marginVertical: 1, borderRadius: 5, padding: 0 },
        hideDrawerStatusBar: true,
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => <Icon name="home" color={'#000'} size={14} />,
        }}
        component={StackNavigator}
      >
      </Drawer.Screen>
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color, size }) => <Icon name="dashboard" color={'#000'} size={14} />,
        }}
        component={DashBoardScreen}
      >
      </Drawer.Screen>

      <Drawer.Screen name="Shop N Ship" component={ShopNshipScreen}

        options={{

          drawerIcon: ({ color, size }) => <Icon name="ship" color={'#000'} size={14} />,
        }} />
      <Drawer.Screen name="Assisted Shop N Ship" component={AssistedShopNShipScreen}
        options={{

          drawerIcon: ({ color, size }) => <Icon name="handshake-o" color={'#000'} size={14} />,
        }} />
      <Drawer.Screen name="International Shipment" component={InternationalShipmentScreen}
        options={{

          drawerIcon: ({ color, size }) => <Icon name="globe" color={'#000'} size={14} />,
        }} />

      <Drawer.Screen name="Coupons" component={CouponsScreen}
        options={{
          drawerIcon: ({ color, size }) => <Icon name="ticket-alt" color={'#000'} size={14} />,
        }} />

      <Drawer.Screen name="Help & Support" component={HelpAndSupportScreen}
        options={{

          drawerIcon: ({ color, size }) => <Icon name="phone" color={'#000'} size={14} />,
        }} />

    </Drawer.Navigator>

  );
}

// Main App Navigation
export default function AppNavigation() {
  return (
    <ToastProvider>
    <PaperProvider>
      <NavigationContainer>
        <DrawerNavigator>
          <StackNavigator />
        </DrawerNavigator>
      </NavigationContainer>
    </PaperProvider>
    </ToastProvider>
  );
}
