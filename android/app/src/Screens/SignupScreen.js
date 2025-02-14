import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const{phone, setPhone} = useState("");
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
          
            <Text style={styles.title}>Sign Up</Text>

            {/* Email Input */}

            <Text style={styles.label}>Phone</Text>
            <TextInput
                style={styles.input}
                placeholder="1234567890"
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

            {/* reCAPTCHA Checkbox */}
            {/* <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)}>
                <Icon name={isChecked ? "check-square" : "square-o"} size={24} color="black" />
                <Text style={styles.checkboxText}>I'm not a robot</Text>
            </TouchableOpacity> */}

            {/* Sign In Button */}
            {/* <LinearGradient colors={["#a500ff", "#ff0080"]} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </LinearGradient> */}
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ff0080','#1e7fca']} style={styles.button}>
                <Text style={styles.buttonText}>
                    Sign Up
                </Text>
            </LinearGradient>

            {/* Sign Up Link */}
            <Text style={styles.signUpText}>
                Already have an account? <Text style={styles.signUpLink}  onPress={() => navigation.navigate("LoginScreen")}>Sign In</Text>
            </Text>               

            {/* Social Login Buttons */}
            <TouchableOpacity style={styles.socialButton}>
                {/* <Icon name="google" size={20} color="black" /> */}
                <Image source={require("../assets/google.png")} style={{ width: 30, height: 30 }} />
                <Text style={styles.socialText}> Sign Up With Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
                {/* <Icon name="facebook" size={20} color="black" /> */}
                <Image source={require("../assets/facebook.webp")} style={{ width: 30, height: 30 }}   />
                <Text style={styles.socialText}> Sign Up With Facebook</Text>
            </TouchableOpacity>
        </View>
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
        color: "#1e7fca",
        fontWeight: "bold",
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

export default SignupScreen;