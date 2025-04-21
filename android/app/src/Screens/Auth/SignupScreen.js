import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AuthLayout from "../../Components/Common/AuthLayout";
import { registerApi, get_all_country } from "../../services/apiServices";
import Loader from "../../Components/Modals/Loader";
import { CommonActions } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import { Toast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";
import ReCaptcha from 'react-native-recaptcha-that-works';

const ReCaptchaKey = process.env.RECHAPCHA__SITE_KEY;
const app_url = process.env.APP_DOMAIN;
const SignupScreen = ({ navigation }) => {
    const recaptchaRef = useRef(null);

    const [countryList, setCountryList] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
    const [secureConfirmPasswordEntry, setSecureConfirmPasswordEntry] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ code: 'AF', code2: 'AFG', phone_code: '+93' });
    const [chapchaToken, setChapchaToken] = useState('');
    const [checkBoxError, setCheckBoxError] = useState(false);
    const [checked, setChecked] = useState(false);
    

    useEffect(() => {
        const getCountryies = async () => {
            try {
                const response = await fetch(get_all_country, {

                    headers: {
                        'Content-Type': 'application/json',
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



    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    };
    const handleSignup = async () => {
        console.log('selected country', selectedCountry.phone_code);
        if (!phone) {
            setPhoneError("Phone field is required");
        }
        if (!checked) {
            setCheckBoxError(true);
        }
        if (!password) {
            setPasswordError("Password field is required");
        }
        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password field is required");
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Password and Confirm Password does not match");
        }
        if (!email) {
            setEmailError("Email field is required");
        }

        else if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");

        } else {
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
                        password: password,
                        countryCode: selectedCountry.phone_code,
                    }),
                });
                const data = await response.json();
                console.log("register user data", data);

                // const emailVerification = data?.data?.emailVerification;
                const userEmail = data?.data?.email;

                if (data.status === false) {

                    Toast.show(data.error, { type: 'danger', style: { width: 500 } });
                    setVisibleModal(false);
                    return;
                }



                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'HomeScreen' },
                            { name: 'EmailVarificationScreen', params: { userEmail: userEmail } },
                        ],

                    })
                );

            } catch (error) {
                setVisibleModal(false);
                console.error("Error registering user:", error);
                Toast.show('Something went wrong,Please try again', { type: 'danger', });
            }
        }
    };

    const onVerify = (token) => {
        console.log('reCAPTCHA token:', token);
        setChapchaToken(token);
        setCheckBoxError(false);

    };

    const handleCountryChange = (itemValue) => {
        const country = countryList.find((c) => c.code === itemValue);
        setSelectedCountry(country);
        console.log('country', selectedCountry);
        // setPhone(country.phone_code); 
    };

    const getFlagEmoji = (countryCode) => {
        return countryCode
            .toUpperCase()
            .split('')
            .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
            .join('');
    };

    return (
        <AuthLayout>
            <ScrollView showsVerticalScrollIndicator={false}  >
                <View style={styles.container}>
                    <Text style={styles.title}>Sign Up</Text>
                    <Text style={styles.label}>Phone</Text>
                    <View style={styles.phoneContainer}>
                        <Picker
                            selectedValue={selectedCountry}
                            style={styles.picker}
                            onValueChange={handleCountryChange}
                        >
                            {countryList.map((country) => (
                                <Picker.Item
                                    key={country.phone_code}
                                    label={`${getFlagEmoji(country.code)} ${country.phone_code} ${country.name}`}
                                    value={country.code}
                                />
                            ))}
                        </Picker>
                        <View style={styles.divider} />
                        <TextInput
                            // style={styles.input}
                            placeholder="1234567890"
                            keyboardType="numeric"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
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
                    <Text style={styles.label}>Confirm Password</Text>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="**********"
                            keyboardType="password"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                if (text) setConfirmPasswordError(""); // Clear error on typing
                            }}
                            secureTextEntry={secureConfirmPasswordEntry}
                        />
                        <TouchableOpacity style={{ position: 'absolute', right: 20, top: 10 }} onPress={() => setSecureConfirmPasswordEntry(!secureConfirmPasswordEntry)}>
                            <Icon name={secureConfirmPasswordEntry ? "eye-slash" : "eye"} size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}



                    <View style={styles.captchaBox}>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => {
                                setChecked(true);
                                checked && recaptchaRef.current.open()

                            }}
                        >
                            {chapchaToken && <Image source={require('../../assets/check.png')} style={styles.checkboxImage} />}
                        </TouchableOpacity>
                        <Text style={styles.text}>I'm not a robot</Text>
                        <Image
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/1280px-RecaptchaLogo.svg.png' }}
                            style={styles.logo}
                            resizeMode="contain"
                        />

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
                        theme="light"
                    />

                    <TouchableOpacity onPress={handleSignup}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#d81397", "#0d5cc2"]} style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.signUpText}>
                        Already have an account? <Text style={styles.signUpLink} onPress={() => navigation.navigate("LoginScreen")}>Sign In</Text>
                    </Text>
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
            </ScrollView>
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
    // label: {
    //     fontSize: 16,
    //     marginBottom: 5,
    // },
    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        padding: 0,
        borderColor: "#ccc",
        borderRadius: 8,
        height: 45,
        // paddingHorizontal: 10,
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: "#ccc",
        marginHorizontal: 10,
    },
    picker: {
        width: 150, // Adjust the width as needed0,
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
        borderWidth: 1,
        borderColor: '#555',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxImage: {
        width: 24,
        height: 24,
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
    }

});

export default SignupScreen;
