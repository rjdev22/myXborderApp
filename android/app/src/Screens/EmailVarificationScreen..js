import React, { useState, useEffect } from 'react';
import EmailVarificationLayout from '../Components/Common/EmailVarificationLayout';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { emailVarificationApi, varifyOtpApi } from '../services/apiServices';
import Loader from '../Components/Modals/Loader';
import { useRoute } from '@react-navigation/native';
import { Toast } from 'react-native-toast-notifications';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import  {AuthContext} from '../Context/authContext';



const EmailVarificationScreen = ({ navigation, route }) => {
    const{setToken}=useContext(AuthContext);

    const [visibleModal, setVisibleModal] = React.useState(false);
    const [email, setEmail] = React.useState(route.params.userEmail);
    const [otp, setOtp] = useState('');
    console.log("otp", otp);
    const [isEmailSent, setIsEmailSent] = React.useState(false);

    const [countdown, setCountdown] = useState(600); // 10 minutes (600 seconds)
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
        let timer;
        if (isCounting && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsCounting(false);
        }
        return () => clearInterval(timer);
    }, [isCounting, countdown]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

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
            
            if (data.status === true) {
                Toast.show(data.data,{ type: 'success',style: { width:500}});
                setIsEmailSent(true);
                setCountdown(600); // Reset countdown
                setIsCounting(true); // Show OTP field after successful email send
            } else {
                Toast.show(data.error,{ type: 'warning',style: { width:500 }});
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
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            
            
            if (data.status === true) {
                Toast.show('Congrats! You are varified user', { type: 'success',style: { width: 500 }});
                console.log('otp verification data', data.data.token);
    
               await AsyncStorage.setItem("token", data.data.token);
               setToken(data.data.token);
                navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'HomeScreen' },
                        {
                            name: 'DashBoardScreen',
                        }

                    ],
                })
            );
            } else {
                Toast.show(data.error, { type: 'warning',style: { width: 500 }});
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
                    <>
                        <Text style={{ color: '#d81397', fontSize: 20, paddingLeft: 170, paddingTop: 20 }}>{formatTime(countdown)}</Text>
                        <View style={styles.inputGroupOtp}>
                            <TextInput
                                placeholder="Enter OTP"
                                keyboardType='numeric'
                                style={styles.input}
                                maxLength={4}
                                onChangeText={setOtp}
                            />
                            <TouchableOpacity onPress={handleOtpVarification}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                                    <Text style={styles.buttonText}>Verify</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </>
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
        paddingVertical: 5
        
    },
    inputGroup: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 5,
        paddingLeft: 18
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
