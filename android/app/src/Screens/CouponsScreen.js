import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../Components/Common/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';

const CouponsScreen = () => {
    return (
        <Layout>
            <View style={styles.container}>

                <Text style={styles.Headtitle}>My Xborder offers</Text>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.title}>Referral Bonus</Text>
                        <Icon name="clone" size={24} color="white" />
                    </View>
                    <Text style={styles.amount}>250</Text>
                    <Text style={styles.description}>Get Discount of INR 250 by referring to your Friends and family</Text>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.title}>Sign Up Bonus</Text>
                        <Icon name="clone" size={24} color="white" />
                    </View>
                    <Text style={styles.amount}>150</Text>
                    <Text style={styles.description}>150 In your wallet after successful OTP verification</Text>
                </View>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    Headtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },
    card: {
        backgroundColor: '#ff1493',
        padding: 16,
        paddingHorizontal: 20,
        paddingTop: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
       // fontFamily: 'Montserrat',
        color: 'gold',
        marginVertical: 8,
    },
    description: {
        fontSize: 14,
        color: 'white',
    },
});

export default CouponsScreen;
