import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AuthLayout from "../Components/Common/AuthLayout";
import { registerApi, get_all_country } from "../services/apiServices";
import Loader from "../Components/Modals/Loader";
import { CommonActions } from '@react-navigation/native'
import { ReCaptchaV3 } from '@haskkor/react-native-recaptchav3';
import { Picker } from "@react-native-picker/picker";

const SignupScreen = ({ navigation }) => {



    const [countryList, setCountryList] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    console.log('list', countryList)

    useEffect(() => {
        const getCountryies = async () => {
            try {
                const response = await fetch(get_all_country, {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
                    },
                })
                const data = await response.json();
                console.log('country api response', data);
                setCountryList(data.data);

            }
            catch {
                console.log(error);

            }
        }
        getCountryies()
    }, [])


    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); // Default to India
    const [visibleModal, setVisibleModal] = useState(false);



    const [recaptcha, setRecaptcha] = React.useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleSignup = async () => {
        setEmailError("");
        setPhoneError("");
        console.log("selectedCountry", selectedCountry.phone_code, email, phone);

        if (!email) {
            setEmailError("Email field is required");
        }

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        if (!phone) {
            setPhoneError("Phone field is required");
        }

        if (!email || !phone) {
            return;
        }

        setVisibleModal(true);
        try {
            const response = await fetch(registerApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    phone: phone,
                    countryCode: selectedCountry.phone_code
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
                        { name: emailVerification === 'True' ? 'DashBoardScreen' : 'EmailVarificationScreen', params: { userEmail: userEmail } },
                    ],

                })
            );
            setVisibleModal(false);
        } catch (error) {
            console.error("Error registering user:", error);
            setVisibleModal(false);
        }
    };


    const handleCountryChange = (itemValue) => {
        const country = countryList.find((c) => c.code === itemValue);
        setSelectedCountry(country);
        // setPhone(country.phone_code); // Update phone input with selected country code
    };
    const onMessage = (event) => {
        const token = event.nativeEvent.data;
        if (token) {
            setCaptchaVerified(true);
            setCaptchaToken(token);
        }
    }; const getFlagEmoji = (countryCode) => {
        return countryCode
            .toUpperCase()
            .split('')
            .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
            .join('');
    };

    return (
        <AuthLayout>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>

                <Text style={styles.label}>Phone</Text>

                <Picker
                    selectedValue={selectedCountry ? selectedCountry.phone_code : ""}
                    style={styles.picker}
                    onValueChange={handleCountryChange}
                >
                    {countryList.map((country) => (
                        <Picker.Item
                            key={country.phone_code}
                            label={`${getFlagEmoji(country.code)} ${country.name} (${country.phone_code})`}
                            value={country.code}
                        />
                    ))}
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="1234567890"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(text) => {
                        setPhone(text.replace(/\D/g, ""));
                        if (text) setPhoneError("");
                    }}
                />
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

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
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 0
    },

});

export default SignupScreen;
