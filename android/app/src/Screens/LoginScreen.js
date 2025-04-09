import React, { useState, useCallback, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AuthLayout from "../Components/Common/AuthLayout";
import { loginApi } from "../services/apiServices";
import { CommonActions } from "@react-navigation/native";
import Loader from "../Components/Modals/Loader";
import { Toast } from 'react-native-toast-notifications';
import { useToast } from "react-native-toast-notifications";
import Recaptcha, { RecaptchaRef } from 'react-native-recaptcha-that-works';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../Context/authContext';


const LoginScreen = ({ navigation }) => {

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



    const size = 'invisible';
 

    const $recaptcha = useRef < RecaptchaRef | null > (null);

    const handleOpenPress = useCallback(() => {

        $recaptcha.current?.open();
    }, []);

    const handleClosePress = useCallback(() => {
        $recaptcha.current?.close();
    }, []);

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

        else if (!validateEmail(email)) {
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
                    Toast.show(data.exception, { type: 'success', style: { width: 500 } });
                    setVisibleModal(false);
                    return
                }else{
                    if(data?.data?.token){

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
                Toast.show('Something went wrong,try again', {type:'danger',style:{width:500}});
                setVisibleModal(false);
            }
        }
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

                {/* <View style={styles.container}>
                    <Button onPress={handleOpenPress} title="Open" />
                    {/* <Text>Token: {token}</Text>
                    <Text>Size: {size}</Text> 
                </View> */}
                <Recaptcha
                    //ref={$recaptcha}
                    lang="pt"
                    headerComponent={
                        <Button title="Close modal" onPress={handleClosePress} />
                    }
                    footerComponent={<Text>Footer here</Text>}
                    siteKey="6Ldq6uEqAAAAABlCFfggMUqDhHYKCtV89vtv2AFz"
                    baseUrl="https://uat.myxborder.com"
                    size={size}
                    theme="dark"
                    onLoad={() => Alert.alert('onLoad event')}
                    onClose={() => Alert.alert('onClose event')}
                    onError={(err) => {
                        Alert.alert('onError event');
                        console.warn(err);
                    }}
                    onExpire={() => Alert.alert('onExpire event')}
                    onVerify={(token) => {
                        Alert.alert('onVerify event');
                        setToken(token);
                    }}
                    enterprise={false}
                    hideBadge={false}
                />

                {/* reCAPTCHA Checkbox */}
                {/* <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)}>
                <Icon name={isChecked ? "check-square" : "square-o"} size={24} color="black" />
                <Text style={styles.checkboxText}>I'm not a robot</Text>
            </TouchableOpacity> */}

                {/* Sign In Button */}
                {/* <LinearGradient colors={["#a500ff", "#d81397"]} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </LinearGradient> */}
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
                    <Image source={require("../assets/google.png")} style={{ width: 30, height: 30 }} />
                    <Text style={styles.socialText}> Sign Up With Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require("../assets/facebook.webp")} style={{ width: 30, height: 30 }} />
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
});

export default LoginScreen;