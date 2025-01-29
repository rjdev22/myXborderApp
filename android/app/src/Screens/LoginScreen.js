import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,ScrollView } from "react-native";
 import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome"; // Import for checkbox and social buttons

const LoginScreen = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+44");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  return (
   
    <View style={styles.container}>
       <View style={styles.header}>
            <TouchableOpacity > 
              <Icon name="bars" size={30} color="black" />
            </TouchableOpacity>
            <Image
              source={require('../assets/logo-horizontal.png')}
              style={styles.logoHorizontal}
            />
            {/* <TouchableOpacity >
              <Icon name="user-circle-o" size={30} color="black" />
            </TouchableOpacity> */}
          </View>
    
      <Text style={styles.title}>Sign In</Text>

      {/* Phone Input with Country Picker */}
      {/* <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedCountryCode}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
        >
          <Picker.Item label="🇬🇧 +44" value="+44" />
          <Picker.Item label="🇺🇸 +1" value="+1" />
          <Picker.Item label="🇮🇳 +91" value="+91" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View> */}

      {/* Email Input */}
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="dev@dev.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Checkbox for reCAPTCHA */}
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)}>
        <Icon name={isChecked ? "check-square" : "square-o"} size={24} color="black" />
        <Text style={styles.checkboxText}>I'm not a robot</Text>
      </TouchableOpacity>

      {/* Sign-Up Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>

      </TouchableOpacity>

      <Text style={styles.signInText}>
       Don't have an account? <Text style={styles.signInLink}>Sign Up</Text>
      </Text>

      {/* Social Login Buttons */}
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#ffffff" }]}>
        <Icon name="google" size={20} color="black" />
        <Text style={styles.socialText}> Sign In With Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#ffffff" }]}>
        <Icon name="facebook" size={20} color="black" />
        <Text style={styles.socialText}> Sign In With Facebook</Text>
      </TouchableOpacity>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logoHorizontal: { width: 150, height: 50, resizeMode: 'contain' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
   // marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    width: 80,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
  },
  button: {
    width: "80%",
    backgroundColor: "#a500ff",
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
  signInText: {
    fontSize: 16,
  },
  signInLink: {
    color: "blue",
    fontWeight: "bold",
  },
  socialButton: {
    flexDirection: "row",
    padding: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
  },
  socialText: {
    color: "#000000",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default LoginScreen;
