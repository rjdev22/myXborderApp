import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import { AddItemToOrder } from '../../services/apiServices';



const VirtualAddressInfo = ({ visible, onClose, }) => {


    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={{
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
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 15 }} >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>What is this address?</Text>



                            <Text style={{ fontSize: 16, marginTop: 10 }}> This is your Indian Shipping Address, which you can use as a delivery address to shop from ANY Indian online Store.</Text>
                            <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>Why do I need this address?</Text>

                            <Text style={{ fontSize: 16, marginTop: 10 }}>This is needed when you want to shop from Indian Stores & get it shipped to your doorstep abroad(outside India). Most Online Indian stores accept only Indian Addresses for delivering their goods. In such cases you can use this address with the unique locker number as your delivery address.</Text>
                            <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>Ok, So I use this address as the delivery address in a shopping site. What next?</Text>

                            <Text style={{ fontSize: 16, marginTop: 10 }}>Great. Now your items come to our facility in your name and locker number. We will store it in your locker FREE of cost for 20 days, within which you can purchase from other stores as well. Keep accumulating things in your locker and finally when you tell us to ship, we will put them all in 1 box and ship it to your doorstep. This gives you a saving of 60-80% on shipping.</Text>



                            <View style={styles.buttonContainer}>

                                <TouchableOpacity onPress={onClose}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.Button} >
                                        <Text style={styles.buttonText}>OK</Text>
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
        width: '80%',
        height: '70%',
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
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 30
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
    ButtonText: { color: '#fff', fontWeight: 'bold', },
});

export default VirtualAddressInfo;
