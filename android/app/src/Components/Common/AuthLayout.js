import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Screen } from 'react-native-screens';

const AuthLayout = ({ children }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={{position:'absolute',left:10}} onPress={() => navigation.goBack()}>
          {/* <Icon name="arrow-left" size={24} color="black" /> */}
          <Image source={require('../../assets/back_arrow.png')} style={{ width: 60, height: 60 }} />

        </TouchableOpacity>

        <Image
          source={require('../../assets/logo-horizontal.png')}
          style={styles.logoHorizontal}
        />
        {/* <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Icon name="user-circle-o" size={24} color="black" />
        </TouchableOpacity> */}
      </View>

      {/* Main Content */}
      <View style={styles.content}>{children}</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
   justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    height: 60,
    elevation: 3,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    zIndex: 1,
    textAlign:'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

  },
  logoHorizontal: {
    width: 150,
     height: 35,
      resizeMode: 'contain',
      alignItems: 'center',
      justifyContent:'center'
  },
  content: { flex: 1 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    elevation: 3,
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  tab: { alignItems: 'center' },
});

export default AuthLayout;
