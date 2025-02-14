import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../Components/Common/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';


const CouponsScreen = () => {
    return (
            <View style={styles.container}>
                <Text style={styles.Headtitle}>My Xborder offers</Text>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                        <Text style={styles.title}>Referral Bonus</Text>
                        <Icon style={{ position: 'absolute', right: 20 }} name="clone" size={24} color="white" />
                    </View>
                    <Text style={styles.amount}>250</Text>
                    <Text style={styles.description}>Get Discount of INR 250 by referring to your Friends and family</Text>
                </View>
                <View style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                        <Text style={styles.title}>Sign Up Bonus</Text>
                        <Icon style={{ position: 'absolute', right: 20 }} name="clone" size={24} color="white" />
                    </View>
                    <Text style={styles.amount}>150</Text>
                    <Text style={styles.description}>150 In your wallet after successful OTP verification</Text>
                </View>
            </View>
       
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    Headtitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        marginBottom: 10,
        paddingBottom: 5
    },
    card: {
        backgroundColor: '#ff1493',
        paddingVertical: 20,
        borderRadius: 5,
        marginBottom: 10,
        position: 'relative'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    amount: {
        fontSize: 40,
        fontWeight: 'bold',
        // fontFamily: 'poppins',
        color: 'gold',
        marginVertical: 8,
        textAlign: 'center',
       
    },
    description: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 100
    },
});

export default CouponsScreen;
