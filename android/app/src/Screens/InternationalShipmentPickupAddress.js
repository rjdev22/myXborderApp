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
import { createShopNShipOrder, createAssistedSopNShipOrder } from '../services/apiServices';
import ExistaddressList from './Address/ExistaddressList';
import CreateNewAddress from './Address/CreateNewAddress';
import Loader from '../Components/Modals/Loader';
import { Toast } from 'react-native-toast-notifications';
import { get_courier_types, get_order_types } from '../services/apiServices';

const InternationalShipmentPickupAddress = ({ navigation, route }) => {

    console.log('ROUTE', route?.params);

    const orderSubType = route?.params?.OrderTypeNumber;
    const courierType = route?.params?.courierTypeNumber;
    const clientOrderId = route?.params?.clientOrderId;


    console.log('99999999', orderSubType, courierType, clientOrderId);

    const [pickupFirstName, setPickupFirstName] = useState('');
    const [pickupLastName, setPickupLastName] = useState('');
    const [pickupEmail, setPickupEmail] = useState('');
    const [pickupPhone, setPickupPhone] = useState('');
    const [pickupStreet, setPickupStreet] = useState('');
    const [pickupStreet2, setPickupStreet2] = useState('');
    const [pickupCity, setPickupCity] = useState('');
    const [pickupPin, setPickupPin] = useState('');
    const [pickupState, setPickupState] = useState('');
    const pickupCountry = 'IND'



    console.log("pickupAddress", pickupFirstName, pickupLastName, pickupEmail, pickupPhone, pickupStreet, pickupStreet2, pickupCity, pickupPin, pickupState, pickupCountry, orderSubType, courierType, clientOrderId);

    const handleNext = () => {
        navigation.navigate('InternationalShipmentPackageInformation', { pickupFirstName, pickupLastName, pickupEmail, pickupPhone, pickupStreet, pickupStreet2, pickupCity, pickupPin, pickupState, pickupCountry, orderSubType, courierType, clientOrderId });
    }
    return (
        <Layout>
            <View style={styles.container}>

                <ScrollView style={styles.content} shosVerticalScrollIndicator={false}>
                    <View style={styles.topHeader}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Indian Pick Up Address</Text>
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
                                    value={pickupFirstName}
                                    onChangeText={(value) => setPickupFirstName(value)}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Last Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter LastName"
                                    value={pickupLastName}
                                    onChangeText={(value) => setPickupLastName(value)}

                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Email"
                                    value={pickupEmail}
                                    onChangeText={(value) => setPickupEmail(value)}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Country*</Text>
                                {/* <TextInput
                                    style={styles.input}
                                    placeholder="India"
                                    value={pickupCountry}
                                   // onChangeText={(value) => setPickupCountry(value)}
                                /> */}
                                <Text style={styles.input}>India</Text>
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
                                    onChangeText={(value) => setPickupCity(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Street Address 1*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter street address 1"
                                    value={pickupStreet}
                                    onChangeText={(value) => setPickupStreet(value)}


                                />
                            </View>
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
                                    onChangeText={(value) => setPickupPin(value)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Mobile Number*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter mobile number"
                                    keyboardType='numeric'
                                    value={pickupPhone}
                                    onChangeText={(value) => setPickupPhone(value)}

                                />
                            </View>
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
    errorText: { color: 'red', fontSize: 12 }


});

export default InternationalShipmentPickupAddress;
