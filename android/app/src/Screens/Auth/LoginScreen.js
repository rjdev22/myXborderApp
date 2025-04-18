import React, { useState, useCallback, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AuthLayout from "../../Components/Common/AuthLayout";
import { loginApi } from "../../services/apiServices";
import { CommonActions } from "@react-navigation/native";
import Loader from "../../Components/Modals/Loader";
import { Toast } from 'react-native-toast-notifications';
import { useToast } from "react-native-toast-notifications";

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../../Context/MainContext';
import ReCaptcha from 'react-native-recaptcha-that-works';

const ReCaptchaKey=process.env.RECHAPCHA__SITE_KEY;
const app_url=process.env.APP_DOMAIN;
const LoginScreen = ({ navigation }) => {
    const recaptchaRef = useRef(null);
    const { setToken } = useContext(AuthContext);

    const toast = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
    const [chapchaToken, setChapchaToken] = useState('');
    const [checkBoxError, setCheckBoxError] = useState(false);

    const [checked, setChecked] = useState(false);

    const size = 'invisible';






    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        console.log('password', password);

        if (!email) {
            setEmailError("Email field is required");
        }
        if (!password) {
            setPasswordError("Password field is required");
        }
        // if (!checked) {
        //     setCheckBoxError(true);

        // }

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            // return;
        }

        else {
            setVisibleModal(true);
            try {
                const response = await fetch(loginApi, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        isChecked: isChecked,
                    }),
                });
                const data = await response.json();
                const emailVerification = data?.data?.emailVerification;
                const userEmail = data?.data?.email;
                console.log('data', data);

                if (data.status === false) {
                    Toast.show(data.exception, { type: 'warning', style: { width: 500 } });
                    setVisibleModal(false);
                    return
                } else {
                    if (data?.data?.token) {

                        await AsyncStorage.setItem("token", data?.data?.token);
                        setToken(data.data.token);
                    }

                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: 'HomeScreen' },
                                emailVerification === 'True'
                                    ? { name: 'DashBoardScreen' }
                                    : { name: 'EmailVarificationScreen', params: { userEmail: userEmail } }
                            ]
                        })
                    );

                }

            } catch (error) {
                console.error("Error logging in user:", error);
                Toast.show('Something went wrong,try again', { type: 'danger', style: { width: 500 } });
                setVisibleModal(false);
            }
        }
    };

    const onVerify = (token) => {
        console.log('reCAPTCHA token:', token);
        setChapchaToken(token);
        setCheckBoxError(false);
        // You can now send this token along with your sign in request
    };

    return (
        <AuthLayout>
            <View style={styles.container}>
                <Text style={styles.title}>Sign In</Text>

                {/* Email Input */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="dev@dev.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        if (text) setEmailError(""); // Clear error on typing
                    }}
                />

                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <Text style={styles.label}>Password</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        style={styles.input}
                        placeholder="**********"
                        keyboardType="password"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (text) setPasswordError(""); // Clear error on typing
                        }}
                        secureTextEntry={securePasswordEntry}
                    />
                    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 10 }} onPress={() => setSecurePasswordEntry(!securePasswordEntry)}>
                        <Icon name={securePasswordEntry ? "eye-slash" : "eye"} size={20} color="gray" />
                    </TouchableOpacity>
                </View>

                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                {/* <Button title="Verify Recaptcha" onPress={() => recaptchaRef.current.open()} /> */}

                <View style={styles.captchaBox}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => {
                            setChecked(true);
                            checked && recaptchaRef.current.open()

                        }}
                    >
                        {chapchaToken && <View style={styles.checked} />}
                    </TouchableOpacity>
                    <Text style={styles.text}>I'm not a robot</Text>

                    {/* <Image
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/1280px-RecaptchaLogo.svg.png' }}
                        style={styles.logo}
                        resizeMode="contain"
                        /> */}
                </View>
                {
                    checkBoxError &&
                    <Text style={styles.errorText}>recaptcha is required</Text>
                }


                <ReCaptcha
                    ref={recaptchaRef}
                    siteKey={ReCaptchaKey}
                    baseUrl={app_url}
                    onVerify={onVerify}
                    size="normal"  // <-- change to "normal"
                    theme="light" // this makes it background automatic if you want
                />


                <TouchableOpacity onPress={handleLogin}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                        <Text style={styles.buttonText}>
                            Sign In
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <Text style={styles.signUpText}>
                    Don't have an account? <Text style={styles.signUpLink} onPress={() => navigation.navigate("SignUpScreen")}>Sign Up</Text>
                </Text>

                {/* Social Login Buttons */}
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require("../../assets/google.png")} style={{ width: 30, height: 30 }} />
                    <Text style={styles.socialText}> Sign Up With Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require("../../assets/facebook.webp")} style={{ width: 30, height: 30 }} />
                    <Text style={styles.socialText}> Sign Up With Facebook</Text>
                </TouchableOpacity>
                <Loader visible={visibleModal} />
            </View>
        </AuthLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },

    title: {
        fontSize: 24,
        justifyContent: 'flex-start',
        fontWeight: "bold",
        marginBottom: 20,

    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkboxText: {
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        width: "100%",
        padding: 15,
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    signUpText: {
        fontSize: 16,
        textAlign: "center",
    },
    signUpLink: {
        color: "#0d5cc2",
        //fontWeight: "bold",
    },
    socialButton: {
        flexDirection: "row",
        padding: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "#000",
        marginTop: 10,
        backgroundColor: "#fff",
    },
    socialText: {
        fontSize: 16,
        marginLeft: 10,
    },

    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 0
    },

    captchaBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        borderRadius: 4,
        width: 300,
        marginBottom: 10
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#555',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        width: 12,
        height: 12,
        backgroundColor: '#555',
    },
    text: {
        fontSize: 14,
        flex: 1,
    },
    logo: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    privacyContainer: {
        marginTop: 5,
    },
    privacyText: {
        fontSize: 10,
        color: '#888',
    },
});

export default LoginScreen;