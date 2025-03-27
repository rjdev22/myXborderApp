import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { UpdateAddressURl } from '../..//services/apiServices';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from './Loader';
import { AuthContext } from '../../Context/authContext';
import { useContext } from 'react';
import { Toast } from 'react-native-toast-notifications';
import { set } from 'react-native-reanimated';


const EditAddressModal = ({ onClose, address }) => {

    console.log('userData', address);
    const { token, setPageRefresh } = useContext(AuthContext);

    const [firstName, setFirstName] = useState(address.first_name);
    const [lastName, setLastName] = useState(address.last_name);
    const [primaryPhone, setPrimaryPhone] = useState(address.primary_phone);
    const [streetAddress, setStreetAddress] = useState(address.street_address);
    const [gateCode, setGateCode] = useState(address.gate_code);
    const [city, setCity] = useState(address.city);
    const [state, setState] = useState(address.state);
    const [country, setCountry] = useState(address.country);
    const [pin, setPin] = useState(address.pin);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        let newErrors = {};

        if (!firstName.trim()) newErrors.firstName = '*First Name is required';
        if (!lastName.trim()) newErrors.lastName = '*Last Name is required';
        if (!primaryPhone.trim()) {
            newErrors.primaryPhone = '*Enter a valid mobile number';
        }
        if (!streetAddress.trim()) newErrors.streetAddress = '*Street Address is required';
        if (!city.trim()) newErrors.city = '*city is required';
        if (!state.trim()) newErrors.state = '*State is required';
        if (!country.trim()) newErrors.country = '*Country is required';
        if (!pin.trim()) newErrors.pin = '*Pin Code is required';



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleEditAddress = () => {
        if (validateForm()) {
            handleSaveChanges();
        }
    };


    const handleSaveChanges = async () => {

        console.log('address id', address.user_id)
        console.log('token', token)
        setIsLoading(true);

        try {
            const response = await fetch(UpdateAddressURl + '/3370', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    primaryPhone: primaryPhone,
                    streetAddress: streetAddress,
                    gateCode: gateCode,
                    city: city,
                    state: state,
                    country: country,
                    pin: pin
                }),
            });
            const data = await response.json();
            console.log('update address data', data);
            setPageRefresh(true);
            setIsLoading(false);
            onClose();

        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }



    return (
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <View style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', borderBottomColor: '#dedede',
                    borderBottomWidth: 0.7, paddingHorizontal: 15, paddingVertical: 15,
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
                }}>
                    <Text style={styles.header}>Edit Address</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={require('../../assets/close.png')} style={{ width: 15, height: 15 }}></Image>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 15 }}>

                    <Text style={styles.label}>First Name*</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={(value) => {
                            setFirstName(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
                            }
                        }}
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                    <Text style={styles.label}>Last Name*</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={(value) => {
                            setLastName(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
                            }
                        }}
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                    <Text style={styles.label}>Phone number*</Text>
                    <TextInput
                        style={styles.input}
                        value={primaryPhone}
                        onChangeText={(value) => {
                            setPrimaryPhone(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, primaryPhone: '' }));
                            }
                        }}
                    />
                    {errors.primaryPhone && <Text style={styles.errorText}>{errors.primaryPhone}</Text>}
                    <Text style={styles.label}>Street Address*</Text>
                    <TextInput
                        style={styles.input}
                        value={streetAddress}
                        onChangeText={(value) => {
                            setStreetAddress(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, streetAddress: '' }));
                            }
                        }}
                    />
                    {errors.streetAddress && <Text style={styles.errorText}>{errors.streetAddress}</Text>}
                    <Text style={styles.label}>Apt,suit,Bldg,Gate code(Optional)</Text>
                    <TextInput
                        style={styles.input}
                        value={gateCode}
                        onChangeText={(value) => {
                            setGateCode(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, gateCode: '' }));
                            }
                        }}
                    />

                    <Text style={styles.label}>City*</Text>
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={(value) => {
                            setCity(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, city: '' }));
                            }
                        }}
                    />
                    {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
                    <Text style={styles.label}>State*</Text>
                    <TextInput
                        style={styles.input}
                        value={state}
                        onChangeText={(value) => {
                            setState(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, state: '' }));
                            }
                        }}
                    />
                    {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
                    <Text style={styles.label}>Country*</Text>
                    <TextInput
                        style={styles.input}
                        value={country}
                        onChangeText={(value) => {
                            setCountry(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, country: '' }));
                            }
                        }}
                    />
                    {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
                    <Text style={styles.label}>Zipcode*</Text>
                    <TextInput
                        style={styles.input}
                        value={pin}
                        onChangeText={(value) => {
                            setPin(value);
                            if (value.trim() !== '') {
                                setErrors((prevErrors) => ({ ...prevErrors, pin: '' }));
                            }
                        }}
                    />
                    {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handleEditAddress()}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#d81397', '#0d5cc2']}
                                style={styles.gradientButton}>
                                <Text style={styles.buttonText}>Save Change</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#d81397', '#0d5cc2']}
                                style={styles.gradientButton}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Loader visible={isLoading} />
        </View>
    )
}



const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '70%',
        height: '60%',
        padding: 0,
        borderRadius: 5,
        elevation: 10,
    },
    header: {
        fontSize: 18,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    },
    input: {
        borderBottomColor: '#00000',
        borderBottomWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        //marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 30
    },
    button: {
        flex: 1,
        marginHorizontal: 5
    },
    gradientButton: {
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 12
    }
})
export default EditAddressModal