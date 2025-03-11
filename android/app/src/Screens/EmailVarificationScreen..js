import React, { useState } from 'react'
import EmailVarificationLayout from '../Components/Common/EmailVarificationLayout'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { emailVarificationApi,varifyOtpApi} from '../services/apiServices';
import Loader from '../Components/Modals/Loader';
import { useRoute } from '@react-navigation/native';
import { Toast } from 'react-native-toast-notifications';
import {AsyncStorage} from 'react-native';

const EmailVarificationScreen = ({ navigation, route }) => {
    console.log('email verification screen route data', route.params.userEmail);

    const [visibleModal, setVisibleModal] = React.useState(false);
    const [email, setEmail] = React.useState(route.params.userEmail);
    const[otp,setOtp]=useState('');
    console.log("otp",otp);
    const [isEmailSent, setIsEmailSent] = React.useState(false);

    const handleEmailSend = async () => {
        setVisibleModal(true);
        try {
            const response = await fetch(emailVarificationApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            console.log('email verification data', data);
            Toast.show(data.data, Toast.SHORT);

            if (data.status === true) {
                setIsEmailSent(true); // Show OTP field after successful email send
            } else {
                Toast.show(data.error, Toast.SHORT);
            }
        } catch (error) {
            console.log(error);
        }
        setVisibleModal(false);
    };
    const handleOtpVarification = async () => {
        setVisibleModal(true);
        try {
            const response = await fetch(varifyOtpApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email,otp }),
            });
            const data = await response.json();
            console.log('otp verification data', data);
            Toast.show(data.data, Toast.SHORT);
            await AsyncStorage.setItem("token", data.token);

            if (data.status === true) {
                setTimeout(() => {
                    navigation.navigate('DashBoardScreen');
                },500); // Wait 500ms before navigating
            } else {
                Toast.show(data.error, Toast.SHORT);
            }
        } catch (error) {
            console.log(error);
        }
        setVisibleModal(false);
    };
    

    return (
        <EmailVarificationLayout>
            <View>
                <View>
                    <Text style={styles.title}> Email Verification</Text>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="dev@dev.com"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TouchableOpacity onPress={handleEmailSend} >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                            <Text style={styles.buttonText}>{!isEmailSent ? 'Send' : 'Resend'}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {isEmailSent && (
                    <View style={styles.inputGroupOtp}>
                        <TextInput
                            placeholder="Enter OTP"
                            keyboardType='numeric'
                            style={styles.input}
                            onChangeText={setOtp}
                        />
                        <TouchableOpacity onPress={handleOtpVarification}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                                <Text style={styles.buttonText}>Verify</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )}

                <Loader visible={visibleModal} />
            </View>
        </EmailVarificationLayout>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        marginTop: 100,
        marginBottom: 50,
        color: '#d81397',
        textAlign: 'center'
    },
    input: {
        padding: 10,
        borderColor: "#ccc",
        borderRadius: 5,
        fontSize: 16,
    },
    inputGroup: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        borderBottomWidth: 1,
       
        borderColor: '#ccc',
        paddingBottom: 5
    },
    inputGroupOtp: {
        alignItems: 'center', display: 'flex',
        flexDirection: 'row', justifyContent: 'space-between',
        marginTop: 50,
        width: '50%', marginHorizontal: 'auto', borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 5
    },
    button: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        borderRadius: 0,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
})

export default EmailVarificationScreen;
