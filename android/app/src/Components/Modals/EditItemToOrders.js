import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropDown from '../Common/DropDown';

const EditItemModal = ({ visible, onClose, itemTypes,item }) => {
    console.log("itemedit", item)    
    const [storeId, setStoreId] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [price, setPrice] = useState('');
    const [selectedOrderType, setSelectedOrderType] = useState('');

    const DropDownValues = itemTypes.map((item) => item.itemType);
    console.log("DropDownValues", DropDownValues)


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
                        <Text style={styles.title}>Edit Item</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Image source={require('../../assets/close.png')} style={{ width: 15, height: 15 }}></Image>
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 15 }} >

                        <Text style={styles.label}>Item Type*</Text>
                        <DropDown
                            items={DropDownValues}
                            label="Please select Order Type"
                            initialValue={selectedOrderType}
                            onChange={(value) => setSelectedOrderType(value)} // This now holds the ID
                        />
                        <Text style={styles.label}>Item Name*</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Item Name"
                            value={color}
                            onChangeText={setColor}
                        />
                        <Text style={styles.label}>Online Store*</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter store "
                            value={storeId}
                            onChangeText={setStoreId}
                        />

                        <Text style={styles.label}>Size</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Size"
                            value={size}
                            onChangeText={setSize}
                        />

                        <Text style={styles.label}>Quantity*</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />

                        <Text style={styles.label}>Price*(INR)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Price"
                            value={price}
                            onChangeText={setPrice}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.Button} >
                                    <Text style={styles.buttonText}>Save</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onClose}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.Button} >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
    ButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EditItemModal;
