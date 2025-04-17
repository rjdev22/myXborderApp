import React from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native';
import Layout from '../../Components/Common/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';

const HelpAndSupportScreen = () => {

  // const phoneNumber = '7876767878'; 
  // const message = 'Hello from my React Native app!'; 
  // const encodedMessage = encodeURIComponent(message); 
  // const url = `whatsapp://send?text=${encodedMessage}&phone=${phoneNumber}`;




  // Linking.openURL(url)
  // .then((data) => {
  //   console.log('WhatsApp opened successfully');
  // })
  // .catch((err) => {
  //   console.error('An error occurred', err);
  // });
  
  
  const handleChat = () => {

const url="https://api.whatsapp.com/send?phone=6588061140&text=Hello,%20I%20have%20a%20question%20about"
Linking.openURL(url);

  }






  return (
    <Layout>
      <View style={{ alignItems: 'center', padding: 20}}>
        <Image 
        source={require('../../assets/customer_support.png')}
          style={{ width: 140, height: 140, marginBottom: 20 }} 
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          How we can help you?
        </Text>
        <Text style={{ textAlign: 'center', marginVertical: 10,fontSize: 18 }}>
          It looks like you are experiencing problems with our process.
          We are here to help, so please get in touch with us.
        </Text>
        <TouchableOpacity 
          style={styles.whatsappCard}
          onPress={handleChat}
        >
         <Icon name="whatsapp" size={35} color="green" />
         <Text style={{color:'#000000',fontSize:16,fontWeight:'bold'}}>Chat on Whatsapp</Text>
        </TouchableOpacity>
      </View>
      </Layout>
  
  );
};

const styles = StyleSheet.create({  
    whatsappCard: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 15,
        backgroundColor: 'white',
        //    backgroundColor: 'linear-gradient(to right, #0d5cc2 #e12d82)',
        borderRadius: 5,
        elevation: 3,
        width:'100%',
        height:'30%'
      },
    })


export default HelpAndSupportScreen;
