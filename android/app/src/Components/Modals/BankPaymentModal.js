import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import { AddItemToOrder } from '../../services/apiServices';



const BankPaymentModal = ({ visible, onClose,bank}) => {
    console.log("bank",bank[0])


    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* <View style={{
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between', borderBottomColor: '#dedede',
                        borderBottomWidth: 0.7, paddingHorizontal: 15, paddingVertical: 15,
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
                    }}>
                        <Text style={styles.title}>How to use Virtual Address?</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Image source={require('../../assets/close.png')} style={{ width: 15, height: 15 }}>
                            </Image>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 15 }} >
                            <Text style={{ fontSize: 18, color: "#3f80ea" }}>Please tranfer funds to following bank account and share the transaction id, please mention the order Id in the transaction remarks</Text>

                            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 15 }}>
                                <Text style={{ fontSize: 16, marginTop: 10, color: "#5d5d5d" }}> Bank Name:</Text>
                                <Text style={{ fontSize: 16, marginTop: 10,  }}>{bank[0]?.bank_name}</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 15 }}>
                                <Text style={{ fontSize: 16, marginTop: 10, color: "#5d5d5d" }}>A / C Holder: </Text>
                                <Text style={{ fontSize: 16, marginTop: 10, }}>{bank[0]?.account_holder}</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 15 }}>
                                <Text style={{ fontSize: 16, marginTop: 10, color: "#5d5d5d" }}>A / C Number:</Text>
                            <Text style={{ fontSize: 16, marginTop: 10, }}>{bank[0]?.account_number}</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 15 }}>
                                <Text style={{ fontSize: 16, marginTop: 10, color: "#5d5d5d" }}>Bank Code:</Text>
                                <Text style={{ fontSize: 16, marginTop: 10,}}>{bank[0]?.code}</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 15 }}>
                                <Text style={{ fontSize: 16, marginTop: 10, color: "#5d5d5d" }}>Address:</Text>
                                <Text style={{ fontSize: 16, marginTop: 10, }}>{bank[0]?.address}</Text>
                            </View>


                            <View style={styles.buttonContainer}>

                                <TouchableOpacity onPress={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.Button} >
                                        <Text style={styles.buttonText}>Back</Text>
                                    </LinearGradient>
                                </TouchableOpacity>


                                <TouchableOpacity onPress={onClose}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.Button} >
                                        <Text style={styles.buttonText}>Place Order</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '60%',
        maxHeight: '80%', // Instead of fixed height, allow it to expand
        backgroundColor: 'white',
        padding: 0,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        marginTop: 10,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        padding: 10,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
        columnGap: 10,
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    saveButton: {
        backgroundColor: '#6a11cb',
    },
    cancelButton: {
        backgroundColor: '#b31217',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 4
    },
    Button: {
        backgroundColor: '#4A00E0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        width: 130,
        height: 40
    },
});

export default BankPaymentModal;
