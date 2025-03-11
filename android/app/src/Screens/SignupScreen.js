import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AuthLayout from "../Components/Common/AuthLayout";
import { registerApi } from "../services/apiServices";
import Loader from "../Components/Modals/Loader";
import { CommonActions } from '@react-navigation/native'
import { ReCaptchaV3 } from '@haskkor/react-native-recaptchav3';
// import WebView from "react-native-webview";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [visibleModal, setVisibleModal] = useState(false);




    const [recaptcha, setRecaptcha] = React.useState('');
    const handleSignup = async () => {
        console.log('dataaaaaaa',email,phone);
        setVisibleModal(true);
        try {
            const response = await fetch(registerApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    phone:phone,
                }),
            });
            const data = await response.json();
            console.log("register user data", data);

            const emailVerification = data?.data?.emailVerification;
            const userEmail = data?.data?.email;
            
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'HomeScreen' },
                        { name:emailVerification==='True'?'DashBoardScreen':'EmailVarificationScreen',params: {userEmail:userEmail}},
                    ],

                })
            );
            setVisibleModal(false);
        } catch (error) {
            console.error("Error registering user:", error);
            setVisibleModal(false);
        }
    };

    const onMessage = (event) => {
        const token = event.nativeEvent.data;
        if (token) {
            setCaptchaVerified(true);
            setCaptchaToken(token);
        }
    };

    return (
        <AuthLayout>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>

                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="+441234567890"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="dev@dev.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                {/* <WebView>
                    <ReCaptchaV3
                        captchaDomain={'https://yourdomain.com'}
                        siteKey={'YourSiteKey'}
                        onReceiveToken={(token) => setRecaptcha(token)}
                    />
                </WebView> */}
                <TouchableOpacity onPress={handleSignup}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#d81397", "#0d5cc2"]} style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.signUpText}>
                    Already have an account? <Text style={styles.signUpLink} onPress={() => navigation.navigate("LoginScreen")}>Sign In</Text>
                </Text>
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
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
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
        //  fontWeight: "bold",
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

});

export default SignupScreen;
