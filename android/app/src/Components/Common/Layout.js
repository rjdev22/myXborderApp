import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Screen } from 'react-native-screens';

const Layout = ({ children }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={ ()=> navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name="bars" size={24} color="black" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/logo-horizontal.png')}
          style={styles.logoHorizontal}
        />
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Icon name="user-circle-o" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>{children}</View>


      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate( 'HomeScreen' )}>

          <Icon name="home" size={25} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('UserProfileScreen')}>
          <Icon name="user-circle-o" size={25} color="black" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    height: 60,
    elevation: 3,
    boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)'

  },
  logoHorizontal: {
    width: 150, height: 35, resizeMode: 'contain'
  },
  content: { flex: 1 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    elevation: 3,
    boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)'
  },
  tab: { alignItems: 'center' },
});

export default Layout;
