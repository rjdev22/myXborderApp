
import React from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native';
import Layout from '../Components/Common/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';

const HelpAndSupportScreen = () => {
  return (
  
      <View style={{ alignItems: 'center', padding: 20}}>
        <Image 
        source={require('../assets/customer_support.png')}
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
        >
          
         <Icon name="whatsapp" size={35} color="green" />
         <Text style={{color:'#000000',fontSize:16,fontWeight:'bold'}}>Chat on Whatsapp</Text>
        </TouchableOpacity>
      </View>
  
  );
};

const styles = StyleSheet.create({  
    whatsappCard: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 15,
        backgroundColor: 'white',
        //    backgroundColor: 'linear-gradient(to right, #1e7fca #e12d82)',
        borderRadius: 5,
        elevation: 3,
        width:'100%',
        height:'30%'
      },
    })


export default HelpAndSupportScreen;
