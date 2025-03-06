import React, { useState, useCallback, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AuthLayout from "../Components/Common/AuthLayout";
import { loginApi } from "../services/apiServices";
import { CommonActions } from "@react-navigation/native";
import Loader from "../Components/Modals/Loader";
import Toast from "react-native-simple-toast";
import { useToast } from "react-native-toast-notifications";
import Recaptcha, { RecaptchaRef } from 'react-native-recaptcha-that-works';
import { AuthContext } from '../Context/authContext';


const LoginScreen = ({ navigation }) => {

    const toast = useToast();
    const [email, setEmail] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const size = 'invisible';
    const [token, setToken] = useState('<none>');

    const $recaptcha = useRef < RecaptchaRef | null > (null);

    const handleOpenPress = useCallback(() => {

        $recaptcha.current?.open();
    }, []);

    const handleClosePress = useCallback(() => {
        $recaptcha.current?.close();
    }, []);



    const handleLogin = async () => {
        if (!email) {
            Toast.show('Please enter email', Toast.SHORT);
            return
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            Toast.show('Please enter valid email', Toast.SHORT);
            return
        }

        else {
            try {
                setVisibleModal(true);
                const response = await fetch(loginApi, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        isChecked: isChecked,
                    }),
                });
                const data = await response.json();
                console.log('login user data', data);

                if (data.status === false) {
                    Toast.show(data.exception, Toast.SHORT);
                    // toast.show(data.exception,{
                    //     type: " warning",
                    //     placement: "Top",
                    //     duration: 4000,
                    //     offset: 30,
                    //     animationType: "slide-in ",
                    // });
                    setVisibleModal(false);
                    return
                }
         
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'HomeScreen' },
                            { name: 'DashBoardScreen', params: data },
                        ],
                    })
                );
            } catch (error) {
                console.error("Error logging in user:", error);
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
                    onChangeText={setEmail}
                />


                <Text style={{ color: 'red', marginBottom: 10, fontSize: 12 }}>Please enter email</Text>
                <View style={styles.container}>
                    <Button onPress={handleOpenPress} title="Open" />
                    {/* <Text>Token: {token}</Text>
                    <Text>Size: {size}</Text> */}
                </View>
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
        borderWidth: 1,
        borderColor: "#ccc",
        marginTop: 10,
        backgroundColor: "#fff",
    },
    socialText: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default LoginScreen;