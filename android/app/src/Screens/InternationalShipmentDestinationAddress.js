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
import Layout from '../Components/Common/Layout'
import DropDown from '../Components/Common/DropDown';
import { createInternationalShipmentOrder } from '../services/apiServices';

import Loader from '../Components/Modals/Loader';
import { Toast } from 'react-native-toast-notifications';





const InternationalShipmentDestinationAddress = ({ navigation, route }) => {

    console.log('final data', route?.params);

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

    //console.log("0000000000",destinationFirstName,destinationLastName,destinationState,destinationCity,destinationStreet,destinationStreet2,destinationPin,destinationPhone,destinationCountry,destinationRemark);



    const handleSubmit = async () => {
        console.log('final data', route?.params?.pickupData.courierType);
        setIsLoading(true);
        try {
            const response = await fetch(createInternationalShipmentOrder, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
                },
                body: JSON.stringify({
                    
                        result: [
                            {
                                "orderSubType": 1,
                                "courierType":route?.params?.pickupData.courierType,
                                "clientOrderId": route?.params?.pickupData.clientOrderId,
                                "prescription": null,
                                "bill": null,
                                "payLater": "yes",
                                "pickupFirstName": route?.params?.pickupData.pickupFirstName,
                                "pickupLastName": route?.params?.pickupData.pickupLastName,
                                "pickupEmail": route?.params?.pickupData.pickupEmail,
                                "pickupCountry": route?.params?.pickupData.pickupCountry,
                                "pickupState": route?.params?.pickupData.pickupState,
                                "pickupCity": route?.params?.pickupData.pickupCity,
                                "pickupStreet": route?.params?.pickupData.pickupStreet,
                                "pickupStreet2":route?.params?.pickupData.pickupStreet2,
                                "pickupPin": route?.params?.pickupData.pickupPin,
                                "pickupPhone": route?.params?.pickupData.pickupPhone,
                                "destinationFirstName": destinationFirstName,
                                "destinationLastName": destinationLastName,
                                "destinationCountry": destinationCountry,
                                "destinationState":destinationState,
                                "destinationCity": destinationCity,
                                "destinationStreet": destinationStreet,
                                "destinationStreet2": destinationStreet2,
                                "destinationPin":destinationPin,
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
                Toast.show(data.message, Toast.SHORT);
                setIsLoading(false);
            }
            else {
                Toast.show(data.error, Toast.SHORT);
            }

            setIsLoading(false);
        }
        catch {
            console.log(error);
            setIsLoading(false);
        }
    }

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
                                    onChangeText={(value) => setDestinationFirstName(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Last Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter LastName"
                                    value={destinationLastName}
                                    onChangeText={(value) => setDestinationLastName(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Country*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Email"
                                    value={destinationCountry}
                                    onChangeText={(value) => setDestinationCountry(value)}

                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>State</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter State"
                                    value={destinationState}
                                    onChangeText={(value) => setDestinationState(value)}

                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>City*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter city"
                                    value={destinationCity}
                                    onChangeText={(value) => setDestinationCity(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Street Address 1*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter street address 1"
                                    value={destinationStreet}
                                    onChangeText={(value) => setDestinationStreet(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Street Address 2 </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter street address "
                                    value={destinationStreet2}
                                    onChangeText={(value) => setDestinationStreet2(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Pin code*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter pin code"
                                    value={destinationPin}
                                    onChangeText={(value) => setDestinationPin(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Mobile Number*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter mobile number"
                                    value={destinationPhone}
                                    onChangeText={(value) => setDestinationPhone(value)}

                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Remarks*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Remarks"
                                    value={destinationRemark}
                                    onChangeText={(value) => setDestinationRemark(value)}

                                />
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <TouchableOpacity onPress={handleSubmit}>
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
