import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    copyToClipboard,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../Components/Common/Layout';


const AddShopNShipScreen = ({ navigation }) => {

    return (
     <Layout>
        <View style={styles.container}>
            <ScrollView style={styles.content}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.inputGroup}>
                    <Text style={{fontSize: 16,fontWeight: 'bold'}}>Add Order Item</Text>
                </View>
                <View style={{ backgroundColor: '#f5f5f5', marginTop: 10, marginBottom: 20 }}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Item Type*</Text>
                        <TextInput style={styles.input} placeholder="Enter item name" />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Item Name*</Text>
                        <TextInput style={styles.input} placeholder="Enter item name" />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Online Store</Text>
                        <TextInput style={styles.input} placeholder="Amazon, Flipkart" />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Online Store Id</Text>
                        <TextInput style={styles.input} placeholder="Store Id" />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Color</Text>
                        <TextInput style={styles.input} placeholder="Color" />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Size</Text>
                        <TextInput style={styles.input} placeholder="Size" />
                    </View>


                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Quantity*</Text>
                        <TextInput style={styles.input} keyboardType="numeric" placeholder="1" />

                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}> Price* (INR)</Text>
                        <TextInput style={styles.input} keyboardType="numeric" placeholder="0" />
                    </View>
                </View>


                <TouchableOpacity style={styles.addItemButton}>
                    <Text style={styles.addItemText}>+ Add More Item</Text>
                </TouchableOpacity>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Remarks</Text>
                    <TextInput style={styles.input} placeholder="Add Remarks" />
                </View>

                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    <Text style={styles.grandTotal}>Grand Total: 0</Text>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ff0080', '#1e7fca']} style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>
                            Next
                        </Text>
                    </LinearGradient>
                </View>
            </ScrollView>
     
        </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
 
    logoHorizontal: { width: 150, height: 35, resizeMode: 'contain' },
    content: { paddingHorizontal: 15 },
    ordersSection: { backgroundColor: 'white', padding: 10, borderRadius: 10, elevation: 3 },
    addItemButton: { alignSelf: "flex-end", marginTop: 5 },
    addItemText: { color: "#ff0080", fontSize: 14, fontWeight: "bold" },
    headerText: {
        fontSize: 16,
        //fontWeight: "bold",
        marginBottom: 10,
    },

    grandTotal: { fontSize: 16 },
    nextButton: { paddingVertical: 5, borderRadius: 8, padding: 10, width: 130, },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 12, color: "#000", marginBottom: 5, padding: 10, },
    input: {
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        paddingTop: 0,
        fontSize: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
    },
    addressLabel: {
        fontSize: 14,
        color: "#666",
    },
    copyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    addressValue: {
        fontSize: 16,
        // fontWeight: "bold",
    },
    copyIcon: {
        fontSize: 12,
        marginLeft: 10,
    },
    orderContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 10,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    createOrderButton: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 5,
    },
    createOrderText: {
        color: 'white',
        fontWeight: 'bold',
    },
    orderDetails: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 2,
    },
    detailText: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    detailsButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    detailsButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

});

export default AddShopNShipScreen;
