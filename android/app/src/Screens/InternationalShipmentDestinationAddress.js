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
import { set } from 'react-native-reanimated';

const InternationalShipmentDestinationAddress = ({ navigation, }) => {

    

    const [destinationFirstName, setDestinationFirstName] = useState('');
    const [destinationLastName, setDestinationLastName] = useState('');

    const [destinationState, setDestinationState] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [destinationStreet, setDestinationStreet] = useState('');
    const [destinationStreet2, setDestinationStreet2] = useState('');
    const [destinationPin, setDestinationPin] = useState('');
    const[destinationPhone, setDestinationPhone] = useState('');
    const [destinationCountry, setDestinationCountry] = useState('');
    const[destinationRemark, setDestinationRemark] = useState('');
 
    


    const handleNext = () => {
        
            navigation.navigate('InternationalShipmentPackageInformation');
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
                                    onChangeText={(value) => setPickupLastName(destinationLastName)}


                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Country*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Email"
                                    value={destinationCountry}
                                    onChangeText={(value) => setPickupEmail(destinationCountry)}

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
                          
                            <TouchableOpacity onPress={handleNext}>
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
        borderBottomWidth: 0.5
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
    footer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, marginTop: 20 },
    grandTotal: { fontSize: 16 },
    nextButton: { paddingVertical: 5, borderRadius: 5, padding: 10, width: 130 },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText:{color:'red',fontSize:12}


});

export default InternationalShipmentDestinationAddress;
