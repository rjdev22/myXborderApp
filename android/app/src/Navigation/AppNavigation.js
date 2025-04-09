import React from 'react';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications';
import { Image } from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../Context/authContext';
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
import PaymentNotificationScreen from '../Screens/PaymentNotificationScreen';
import WalletHistory from '../Screens/WalletHistory';
import VarifyOtpScreen from '../Screens/VarifyOtpScreen';
import ShopNshipShipmentAddress from '../Screens/ShopNShipShippingAddress';
import AddressBookScreen from '../Screens/AddressBookSreen';
import orderDetailsScreen from '../Screens/OrderDetail/orderDetailScreen';
import ViewOrderDetailScreen from '../Screens/OrderDetail/ViewOrderDetailScreen';
import InternationalShipmentPickupAddress from '../Screens/InternationalShipmentPickupAddress';
import InternationalShipmentDestinationAddress from '../Screens/InternationalShipmentDestinationAddress';
import InternationalShipmentPackageInformation from '../Screens/InternationalShipmentPackageInformation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
  const { token } = useContext(AuthContext);

  const navigation = useNavigation();
  const [isServiceExpand, setIsServiceExpand] = useState(false);
  const [isHowItsWorkExpand, setIsHowItsWorkExpand] = useState(false);


  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff', borderRadius: 5 }}>
      <DrawerItemList {...props} />
      {
        token &&
        <DrawerItem
          label="Address Book"
          style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
          icon={({ color, size }) => <Icon name="address-book" size={14} color={'#000'} />}
          onPress={() => navigation.navigate('Home', { screen: 'AddressBookScreen' })}
        />
      }
      <DrawerItem
        label="About"
        style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
        icon={({ color, size }) => <Icon name="address-book" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://uat.myxborder.com/about-us')}
      />

      <DrawerItem
        label="Services"
        style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
        icon={({ color, size }) => <Icon name="cog" size={14} color={'#000'} />}
        onPress={() => setIsServiceExpand(prevState => !prevState)}
      />


      {isServiceExpand &&

        <>
          <DrawerItem
            label="Shop N Ship"
            style={{ borderRadius: 5, paddingLeft: 25, borderBottomWidth: 1, borderBlockColor: '#dedede' }}

            onPress={() => Linking.openURL('https://uat.myxborder.com/service/shop-n-ship')}
          />
          <DrawerItem
            label="Assisted Shop N Ship"
            style={{ borderRadius: 5, paddingLeft: 25, borderBottomWidth: 1, borderBlockColor: '#dedede' }}

            onPress={() => Linking.openURL('https://uat.myxborder.com/service/assisted-shop-n-Ship')}
          />
          <DrawerItem
            label="Seller Assistance"
            style={{ borderRadius: 5, paddingLeft: 25, borderBottomWidth: 1, borderBlockColor: '#dedede' }}

            onPress={() => Linking.openURL('https://uat.myxborder.com/service/seller-assistance')}
          />
          <DrawerItem
            label="International Shipment"
            style={{ borderRadius: 5, paddingLeft: 25, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
            onPress={() => Linking.openURL('https://uat.myxborder.com/service/international-shippment')}
          />
        </>
      }


      <DrawerItem
        label="Offers"
        style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
        icon={({ color, size }) => <Icon name="gift" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://uat.myxborder.com/offer/list')}
      />
      <DrawerItem
        label="Shipping Rates"
        style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
        icon={({ color, size }) => <Icon name="shipping-fast" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://uat.myxborder.com/shipping-rates')}
      />
      <DrawerItem
        label="How it Works"
        style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
        icon={({ color, size }) => <Icon name="network-wired" size={14} color={'#000'} />}
        onPress={() => setIsHowItsWorkExpand(prevState => !prevState)}
      />
      {

        isHowItsWorkExpand &&
        <>
          <DrawerItem
            label="Shop N Ship"
            style={{ borderRadius: 5, paddingLeft: 25, borderBottomWidth: 1, borderBlockColor: '#dedede' }}

            onPress={() => Linking.openURL('https://uat.myxborder.com/how-it-works/shop-n-ship')}
          />
          <DrawerItem
            label="Assisted Shop N Ship"
            style={{ borderRadius: 5, paddingLeft: 25, borderBottomWidth: 1, borderBlockColor: '#dedede' }}

            onPress={() => Linking.openURL('https://uat.myxborder.com/how-it-works/assisted-shop-n-ship')}
          />
        </>}
      <DrawerItem
        label="Indian Stores"
        style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
        icon={({ color, size }) => <Icon name="store" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://uat.myxborder.com/service/indian-store')}
      />
      <DrawerItem
        label="FAQ"
        style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
        icon={({ color, size }) => <Icon name="question-circle" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://uat.myxborder.com/faqs')}
      />
      <DrawerItem
        label="Duty & Taxes"
        style={{ borderRadius: 5, borderBottomWidth: 1, borderBlockColor: '#dedede' }}
        icon={({ color, size }) => <Icon name="address-book" size={14} color={'#000'} />}
        onPress={() => Linking.openURL('https://uat.myxborder.com/duty-taxes')}
      />
    </DrawerContentScrollView>
  );
}

// Stack Navigator
function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
       headerShown: false ,
       initialRouteName: 'HomeScreen'}}>
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
      <Stack.Screen name="PaymentNotificationScreen" component={PaymentNotificationScreen} />
      <Stack.Screen name="WalletHistory" component={WalletHistory} />
      <Stack.Screen name="EmailVarificationScreen" component={EmailVarificationScreen} />
      <Stack.Screen name="VarifyOtpScreen" component={VarifyOtpScreen} />
      <Stack.Screen name="ShopNshipShipmentAddress" component={ShopNshipShipmentAddress} />
      <Stack.Screen name="AddressBookScreen" component={AddressBookScreen} />
      <Stack.Screen name="orderDetailsScreen" component={orderDetailsScreen} />
      <Stack.Screen name="ViewOrderDetailScreen" component={ViewOrderDetailScreen} />
      <Stack.Screen name="InternationalShipmentPickupAddress" component={InternationalShipmentPickupAddress} />
      <Stack.Screen name="InternationalShipmentPackageInformation" component={InternationalShipmentPackageInformation} />
      <Stack.Screen name="InternationalShipmentDestinationAddress" component={InternationalShipmentDestinationAddress} />
    </Stack.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator() {

  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      //initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: { width: 320 },
        drawerActiveTintColor: 'gray', 
        drawerActiveBackgroundColor: 'transparent',
        drawerItemStyle: {
          marginVertical: 1,
          borderRadius: 5,
          padding: 0,
          borderBottomWidth: 0.5, 
          borderBottomColor: '#ccc'
        },
        hideDrawerStatusBar: true,
        //drawerLabelStyle: { color: 'gray' },
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: 'Home',
          drawerIcon: () => <Icon name="home" color={'#000'} size={14} />,
        }}
        component={StackNavigator}
      >
      </Drawer.Screen>
      {
        token ? (
          <>
            <Drawer.Screen
              name="Dashboard"

              options={{
                drawerLabel: 'Dashboard',

                drawerIcon: () => <Image source={require('../assets/dashboards.png')} style={{ width: 15, height: 15 }} />,
              }}
              component={DashBoardScreen}
            >
            </Drawer.Screen>

            <Drawer.Screen name="Shop N Ship" component={ShopNshipScreen}
              options={{
                drawerIcon: () => <Icon name="ship" color={'#000'} size={14} />,
              }} />
            <Drawer.Screen name="Assisted Shop N Ship" component={AssistedShopNShipScreen}
              options={{

                drawerIcon: () =>
                  <Image source={require('../assets/handshake.png')} style={{ width: 20, height: 20 }} />
              }} />
            <Drawer.Screen name="International Shipment" component={InternationalShipmentScreen}
              options={{

                drawerIcon: () => <Icon name="globe" color={'#000'} size={14} />,
              }}
            />

            <Drawer.Screen name="Coupons" component={CouponsScreen}
              options={{
                drawerIcon: () => <Icon name="ticket-alt" color={'#000'} size={14} />,
              }} />

            <Drawer.Screen name="Help & Support" component={HelpAndSupportScreen}
              options={{

                drawerIcon: () => <Icon name="phone" color={'#000'} size={14} />,
              }} />

          </>
        ) : null}
    </Drawer.Navigator>

  );
}

// Main App Navigation
export default function AppNavigation() {
  return (
    <ToastProvider placement="bottom">
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
