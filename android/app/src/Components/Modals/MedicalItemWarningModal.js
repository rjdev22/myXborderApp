import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AddItemToOrder } from '../../services/apiServices';




console.log('Api', AddItemToOrder);

const MedicalItemWarningModal = ({ visible, onClose, }) => {


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
                        <Text style={styles.title}>Medical Items</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Image source={require('../../assets/close.png')} style={{ width: 15, height: 15 }}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                    <ScrollView  showsVerticalScrollIndicator={false} style={{ padding: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Myxborder offers International services for bringing Essential medicines from India</Text>

                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Following are tha requirements for shipment of medicines :</Text>

                        <Text style={{ fontSize: 16, marginTop: 10 }}>1. Shipping should be Individual to individual.</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>2. Only Brandred Allopathics and Ayurvedic medicines.(Ayurvedic -it should be Branded,Seal packed/with doctor's prescription).</Text>

                        <Text style={{ fontSize: 16, marginTop: 10 }}>3. Homeopathic medicines are not allowed.</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>4. original Signed medicine bills with medicines batch number, manufacturing date and expiry date.</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>5. original Indian doctor's prescription on doctor's letterhead with doctor's stamp having Reg. No.</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>6. Doctor's prescription should be on tha patient's name(consignee name).</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>7. Maximum 2 months medicines are allowed.</Text>


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

export default MedicalItemWarningModal;
