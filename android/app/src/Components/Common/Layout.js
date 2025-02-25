import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Screen } from 'react-native-screens';

const Layout = ({ children }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  //const[isloading,setIsLoading]=useState(true); fehfhmfirfh

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name="bars" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/logo-horizontal.png')}
          style={styles.logoHorizontal}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="user-circle-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('SignUpScreen');
                }}>
                  <Text style={styles.modalText}> <Icon name="share-square" size={20} color="#74c0fc" style={{ paddingRight: 10 }} />Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('LoginScreen');
                }}>
                  <Text style={styles.modalText}><Icon name="share-square" size={20} color="#74c0fc" />Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('SignUpScreen');
                }}>
                  <Text style={styles.modalText}> <Icon name="user" size={18} color="#74c0fc" /> Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('NotificationScreen');
                }}>
                  <Text style={styles.modalText}><Icon name="bell" size={18} color="#74c0fc" />Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('NotificationScreen');
                }}>
                  <Text style={styles.modalText}> <Icon name="credit-card" size={20} color="#74c0fc" />Make Payment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('LoginScreen');
                }}>
                  <Text style={styles.modalText}><Icon name="wallet" size={20} color="#74c0fc" />Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('SignUpScreen');
                }}>
                  <Text style={styles.modalText}> <Icon name="trash" size={20} color="#74c0fc" style={{ paddingRight: 10 }} />Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('LoginScreen');
                }}>
                  <Text style={styles.modalText}><Icon name="share-square" size={20} color="#74c0fc" />Sign Out</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>{children}</View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('HomeScreen')}>

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
    shadowOpacity: 0.5,
    shadowRadius: 5,
    zIndex: 1,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

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
    shadowOpacity: 0.5,
    shadowRadius: 5,
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.2)',
  },
  tab: { alignItems: 'center' },
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 50,
    paddingRight: 10
  },
  modalContent: {
    width: 250,
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 5,
    alignItems: 'center',

  },
  modalItem: {
    paddingHorizontal: 10,
    // paddingVertical: 10,
    width: '100%',
    alignItems: 'start',
  },
  modalText: {
    fontSize: 15,
    //fontWeight: 'bold',
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default Layout;
