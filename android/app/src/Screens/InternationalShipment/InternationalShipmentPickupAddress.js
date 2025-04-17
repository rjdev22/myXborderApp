import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../../Components/Common/Layout'
import { Picker } from "@react-native-picker/picker";
import DropDown from '../../Components/Common/DropDown';
import { createShopNShipOrder, createAssistedSopNShipOrder } from '../../services/apiServices';
import ExistaddressList from '../Address/ExistaddressList';
import CreateNewAddress from '../Address/CreateNewAddress';
import Loader from '../../Components/Modals/Loader';
import { Toast } from 'react-native-toast-notifications';
import { get_all_country } from '../../services/apiServices';

const InternationalShipmentPickupAddress = ({ navigation, route }) => {

    console.log('ROUTE', route?.params);

    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('AF');

    const orderSubType = route?.params?.OrderTypeNumber;
    const courierType = route?.params?.courierTypeNumber;
    const clientOrderId = route?.params?.clientOrderId;
    const token = route?.params?.token;


    //console.log('99999999', orderSubType, courierType, clientOrderId);

    const [pickupFirstName, setPickupFirstName] = useState('');
    const [pickupLastName, setPickupLastName] = useState('');
    const [pickupEmail, setPickupEmail] = useState('');
    const [pickupPhone, setPickupPhone] = useState('');
    const [pickupStreet, setPickupStreet] = useState('');
    const [pickupStreet2, setPickupStreet2] = useState('');
    const [pickupCity, setPickupCity] = useState('');
    const [pickupPin, setPickupPin] = useState('');
    const [pickupState, setPickupState] = useState('');
    const pickupCountry = selectedCountry.code || 'AF'
    const [errors, setErrors] = useState({});

    console.log('pickupCountry', pickupCountry);



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
            catch (error) {
                console.log(error);

            }
        }
        getCountryies()
    }, [])


    console.log("pickupAddress", pickupFirstName, pickupLastName, pickupEmail, pickupPhone, pickupStreet, pickupStreet2, pickupCity, pickupPin, pickupState, pickupCountry, orderSubType, courierType, clientOrderId);


    const validateForm = () => {
        let newErrors = {};

        if (!pickupFirstName.trim()) newErrors.pickupFirstName = 'First Name is required';
        if (!pickupLastName.trim()) newErrors.pickupLastName = 'Last Name is required';
        if (!pickupEmail.trim()) {
            newErrors.pickupEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pickupEmail)) {
            newErrors.pickupEmail = 'Enter a valid email address';
        }
        if (!pickupPhone.trim()) {
            newErrors.pickupPhone = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(pickupPhone)) {
            newErrors.pickupPhone = 'Enter a valid 10-digit mobile number';
        }
        if (!pickupStreet.trim()) newErrors.pickupStreet = 'Street Address is required';
        if (!pickupCity.trim()) newErrors.pickupCity = 'City is required';

        if (!pickupCountry.trim()) {
            newErrors.pickupCountry = 'Country is required';
        }
        if (!pickupState.trim()) newErrors.pickupState = 'State is required';
        if (!pickupPin.trim()) {
            newErrors.pickupPin = 'Pin Code is required';
        } else if (!/^\d{6}$/.test(pickupPin)) {
            newErrors.pickupPin = 'Enter a valid 6-digit pin code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };





    const handleNext = () => {
        if (!validateForm()) return;
        navigation.navigate('InternationalShipmentPackageInformation', { pickupFirstName, pickupLastName, pickupEmail, pickupPhone, pickupStreet, pickupStreet2, pickupCity, pickupPin, pickupState, pickupCountry, orderSubType, courierType, clientOrderId, token });
    }

    const handleCountryChange = (itemValue) => {
        const country = countryList.find((c) => c.code === itemValue);
        setSelectedCountry(country);
        // setPhone(country.phone_code); // Update phone input with selected country code
    };



    return (
        <Layout>
            <View style={styles.container}>

                <ScrollView style={styles.content} shosVerticalScrollIndicator={false}>
                    <View style={styles.topHeader}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Indian Pick Up Address</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../assets/back.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.itemContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>First Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter FirstName"
                                    value={pickupFirstName}
                                    onChangeText={(value) => {

                                        setPickupFirstName(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, pickupFirstName: '' }));
                                        }
                                    }
                                    }
                                />
                            </View>
                            {errors.pickupFirstName && <Text style={styles.errorText}>{errors.pickupFirstName}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Last Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter LastName"
                                    value={pickupLastName}
                                    onChangeText={(value) => {
                                        setPickupLastName(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, pickupLastName: '' }));
                                        }
                                    }}

                                />
                            </View>
                            {errors.pickupLastName && <Text style={styles.errorText}>{errors.pickupLastName}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Email"
                                    value={pickupEmail}
                                    onChangeText={(value) => {

                                        setPickupEmail(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, pickupEmail: '' }));
                                        }
                                    }
                                    }

                                />
                            </View>
                            {errors.pickupEmail && <Text style={styles.errorText}>{errors.pickupEmail}</Text>}


                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Country*</Text>

                                <Picker
                                    selectedValue={selectedCountry ? selectedCountry.code : ""}
                                    style={styles.picker}
                                    onValueChange={handleCountryChange}

                                >
                                    <Picker.Item label='Select country' value={null} color="#808080" />
                                    {countryList.map((country) => (

                                        <Picker.Item
                                            key={country.code}
                                            label={` ${country.name}`}
                                            value={country.code}
                                        />
                                    ))}
                                </Picker>
                                {errors.pickupCountry && (
                                    <Text style={styles.errorText}>{errors.pickupCountry}</Text>
                                )}


                                {/* <TextInput
                                    style={styles.input}
                                    placeholder="India"
                                    value={pickupCountry}
                                   // onChangeText={(value) => setPickupCountry(value)}
                                /> */}
                                {/* <Text style={styles.input}>India</Text> */}
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>State</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter State"
                                    value={pickupState}
                                    onChangeText={(value) => setPickupState(value)}

                                />
                            </View>


                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>City*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter city"
                                    value={pickupCity}
                                    onChangeText={(value) => {
                                        setPickupCity(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, pickupCity: '' }));
                                        }
                                    }}


                                />
                            </View>

                            {errors.pickupCity && <Text style={styles.errorText}>{errors.pickupCity}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Street Address 1*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter street address 1"
                                    value={pickupStreet}
                                    onChangeText={(value) => {
                                        setPickupStreet(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, pickupStreet: '' }));
                                        }
                                    }

                                    }


                                />
                            </View>
                            {errors.pickupStreet && <Text style={styles.errorText}>{errors.pickupStreet}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Street Address </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter street address "
                                    value={pickupStreet2}
                                    onChangeText={(value) => setPickupStreet2(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Pin code*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter pin code"
                                    keyboardType='numeric'
                                    value={pickupPin}
                                    onChangeText={(value) => {
                                        setPickupPin(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, pickupPin: '' }));
                                        }
                                    }}
                                />
                            </View>
                            {errors.pickupPin && <Text style={styles.errorText}>{errors.pickupPin}</Text>}

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Mobile Number*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter mobile number"
                                    keyboardType='numeric'
                                    value={pickupPhone}
                                    onChangeText={(value) => {
                                        setPickupPhone(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, pickupPhone: '' }));
                                        }
                                    }}

                                />
                            </View>
                            {errors.pickupPhone && <Text style={styles.errorText}>{errors.pickupPhone}</Text>}
                        </View>
                        <View style={styles.footer}>
                            <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={handleNext}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#d81397', '#0d5cc2']}
                                        style={styles.nextButton}
                                    >
                                        <Text style={styles.nextButtonText}>Next</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </ScrollView>

            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    content: { paddingHorizontal: 15 },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBlockColor: '#dedede',
        borderBottomWidth: 1,
        paddingBottom: 15
        ,
    },
    inputGroup: {
        borderBlockColor: '#dedede',
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        marginBottom: 15
    },
    label: {
        fontSize: 12,
        color: "#000",
        marginBottom: 5,
    },
    input: {
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 0,
        fontSize: 16,
        borderBottomColor: '#ccc',
        // borderBottomWidth: 0.5
    },
    itemContainer: {
        borderRadius: 5,
    },
    button: {
        width: "100%",
        padding: 10,
        alignItems: "center",
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,

    },
    footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, marginTop: 20 },
    grandTotal: { fontSize: 16 },
    nextButton: { paddingVertical: 5, borderRadius: 5, padding: 10, width: 130 },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText: { color: 'red', fontSize: 12, marginBottom: 5 }


});

export default InternationalShipmentPickupAddress;
