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
import DropDown from '../../Components/Common/DropDown';
import { createInternationalShipmentOrder } from '../../services/apiServices';

import Loader from '../../Components/Modals/Loader';
import { Toast } from 'react-native-toast-notifications';





const InternationalShipmentDestinationAddress = ({ navigation, route }) => {

    console.log('final data...', route?.params);
    const token = route?.params?.token;
    console.log('destinatoion data', token);

    const orderType = route?.params?.packageBoxes;

    console.log("orderType", orderType);

    const [isLoading, setIsLoading] = useState(false);

    const [destinationFirstName, setDestinationFirstName] = useState('');
    const [destinationLastName, setDestinationLastName] = useState('');

    const [destinationState, setDestinationState] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [destinationStreet, setDestinationStreet] = useState('');
    const [destinationStreet2, setDestinationStreet2] = useState('');
    const [destinationPin, setDestinationPin] = useState('');
    const [destinationPhone, setDestinationPhone] = useState('');
    const [destinationCountry, setDestinationCountry] = useState('');
    const [destinationRemark, setDestinationRemark] = useState('');

    const [errors, setErrors] = useState({});

    //console.log("0000000000",destinationFirstName,destinationLastName,destinationState,destinationCity,destinationStreet,destinationStreet2,destinationPin,destinationPhone,destinationCountry,destinationRemark);

    const validateForm = () => {
        let newErrors = {};

        if (!destinationFirstName.trim()) newErrors.destinationFirstName = 'First Name is required';
        if (!destinationLastName.trim()) newErrors.destinationLastName = 'Last Name is required';
    
     if (!destinationPhone.trim()) {
            newErrors.destinationPhone = 'Enter a valid mobile number';
        }
        if (!destinationStreet.trim()) newErrors.destinationStreet = 'Street Address is required';
        if (!destinationCity.trim()) newErrors.destinationCity = 'City is required';
        if (!destinationState.trim()) newErrors.destinationState = 'State is required';
        if (!destinationCountry.trim()) newErrors.destinationCountry = 'Country is required';
     
       if (!/^\d{6}$/.test(destinationPin)) {
            newErrors.destinationPin = 'Enter a valid 6-digit pin code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        
            //console.log('final data', route?.params?.destinationData.courierType);
            try {
                setIsLoading(true);
                const response = await fetch(createInternationalShipmentOrder, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({

                        result: [
                            {
                                "orderSubType": route?.params?.pickupData.orderSubType,
                                "courierType": route?.params?.pickupData.courierType,
                                "clientOrderId": route?.params?.pickupData.clientOrderId,
                                "prescription": null,
                                "bill": null,
                                "payLater": "yes",
                                "pickupFirstName":  route?.params?.pickupData.pickupFirstName,
                                "pickupLastName":  route?.params?.pickupData.pickupLastName,
                                "pickupCountry":  route?.params?.pickupData.pickupCountry,
                                "pickupState":  route?.params?.pickupData.pickupState,
                                "pickupCity":  route?.params?.pickupData.pickupCity,
                                "pickupStreet":  route?.params?.pickupData.pickupStreet ,
                                "pickupStreet2":  route?.params?.pickupData.pickupStreet2,
                                "pickupPin":  route?.params?.pickupData.pickupPin,
                                "pickupPhone":  route?.params?.pickupData.pickupPhone,
                                "pickupEmail":  route?.params?.pickupData.pickupEmail,
                                "destinationFirstName": destinationFirstName,
                                "destinationLastName": destinationLastName,
                                "destinationCountry": destinationCountry,
                                "destinationState": destinationState,
                                "destinationCity": destinationCity,
                                "destinationStreet": destinationStreet,
                                "destinationStreet2": destinationStreet2,
                                "destinationPin": destinationPin,
                                "destinationPhone": destinationPhone,
                                "destinationRemark": destinationRemark,
                                "packageBoxes": route?.params?.packageBoxes,
                                "packageWeight": route?.params?.packageWeight,
                                "packageHeight": route?.params?.packageHeight,
                                "packageWidth": route?.params?.PackageWidth,
                                "packageDepth": route?.params?.PackageDepth,
                                "additems": route?.params?.items,
                                "image": ["base64_encoded_image_1", "base64_encoded_image_2"]
                            }
                        ]
                    })
                })
                const data = await response.json();
                console.log('shop n ship response', data);
                if (data.status === true) {
                    navigation.navigate('DashBoardScreen');
                    Toast.show(data.message, { type: 'success',style: { width:500}});
                    setIsLoading(false);
                }
                else {
                    Toast.show(data.error,{ type: 'warning',style: { width:500}});
                    setIsLoading(false);
                }

                setIsLoading(false);
            }
            catch(error) {
                console.log(error);
                setIsLoading(false);
            }
        }


        const handleCreteOrder = () => {
            if (validateForm()) {
                handleSubmit();
            }
        };
    

    return (
        <Layout>
            <View style={styles.container}>

                <ScrollView style={styles.content} shosVerticalScrollIndicator={false}>
                    <View style={styles.topHeader}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Destination Address</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/back.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>


                    <View>
                        <View style={styles.itemContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>First Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter FirstName"
                                    value={destinationFirstName}
                                    onChangeText={(value) => {

                                        setDestinationFirstName(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationFirstName: '' }));
                                        }
                                    }
                                    }

                                />
                            </View>
                            {errors.destinationFirstName && <Text style={styles.errorText}>{errors.destinationFirstName}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Last Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter LastName"
                                    value={destinationLastName}
                                    onChangeText={(value) => {

                                        setDestinationLastName(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationLastName: '' }));
                                        }
                                    }
                                    }


                                />
                            </View>
                            {errors.destinationLastName && <Text style={styles.errorText}>{errors.destinationLastName}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Country*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter country"
                                    value={destinationCountry}
                                    onChangeText={(value) => {

                                        setDestinationCountry(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationCountry: '' }));
                                        }
                                    }
                                    }
                                />
                            </View>
                            {errors.destinationCountry && <Text style={styles.errorText}>{errors.destinationCountry}</Text>}

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>State</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter State"
                                    value={destinationState}
                                    onChangeText={(value) => {

                                        setDestinationState(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationState: '' }));
                                        }
                                    }
                                    }

                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>City*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter city"
                                    value={destinationCity}
                                    onChangeText={(value) => {

                                        setDestinationCity(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationCity: '' }));
                                        }
                                    }
                                    }

                                />
                            </View>
                            {errors.destinationCity && <Text style={styles.errorText}>{errors.destinationCity}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Street Address 1*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter street address 1"
                                    value={destinationStreet}
                                    onChangeText={(value) => {

                                        setDestinationStreet(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationStreet: '' }));
                                        }
                                    }
                                    }


                                />
                            </View>
                            {errors.destinationStreet && <Text style={styles.errorText}>{errors.destinationStreet}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Street Address 2 </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter street address "
                                    value={destinationStreet2}
                                    onChangeText={(value) => {

                                        setDestinationStreet2(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationStreet2: '' }));
                                        }
                                    }
                                    }


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Pin code</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter pin code"
                                    value={destinationPin}
                                    onChangeText={(value) => {

                                        setDestinationPin(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationPin: '' }));
                                        }
                                    }
                                    }


                                />
                            </View>
                            {/* {errors.destinationPin && <Text style={styles.errorText}>{errors.destinationPin}</Text>} */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Mobile Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter mobile number"
                                    value={destinationPhone}
                                    onChangeText={(value) => {

                                        setDestinationPhone(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationPhone: '' }));
                                        }
                                    }
                                    }

                                />
                            </View>
                            {/* {errors.destinationPhone && <Text style={styles.errorText}>{errors.destinationPhone}</Text>} */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Remarks</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Remarks"
                                    value={destinationRemark}
                                    onChangeText={(value) => {

                                        setDestinationRemark(value)
                                        if (value.trim() !== '') {
                                            setErrors((prevErrors) => ({ ...prevErrors, destinationRemark: '' }));
                                        }
                                    }
                                    }

                                />
                            </View>
                            {/* {errors.destinationRemark && <Text style={styles.errorText}>{errors.destinationRemark}</Text>} */}
                        </View>
                        <View style={styles.footer}>
                            <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={handleCreteOrder}>
                                    <LinearGradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        colors={['#d81397', '#0d5cc2']}
                                        style={styles.nextButton}
                                    >
                                        <Text style={styles.nextButtonText}>Submit</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </ScrollView>
                <Loader visible={isLoading} />
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
        alignItems: "left",
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,

    },
    footer: { marginBottom: 20, marginTop: 20, width: "100%" },
    grandTotal: { fontSize: 16 },
    nextButton: { paddingVertical: 5, borderRadius: 5, padding: 10, width: 120 },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText: { color: 'red', fontSize: 12 }


});

export default InternationalShipmentDestinationAddress;
