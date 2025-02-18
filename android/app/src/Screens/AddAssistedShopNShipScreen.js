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



const AddAssistedShopNShipScreen = ({ navigation }) => {

    return (
        <Layout>
        <ScrollView style={styles.content}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>

            <View style={{ backgroundColor: '#f5f5f5', marginTop: 10, marginBottom: 20 }}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Item URL*/Local Store Name*</Text>
                    <TextInput style={styles.input} placeholder="Enter item URL" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Item Type*</Text>
                    <TextInput style={styles.input} placeholder="Please select item type" />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Item Name</Text>
                    <TextInput style={styles.input} placeholder="Enter item name" />
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
                    <Text style={styles.label}> Single Item Price*(INR)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="0" />
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

            <View >
                <Text style={styles.grandTotal}>Grand Total: 0</Text>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ff0080', '#1e7fca']} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>
                        Next
                    </Text>
                </LinearGradient>
            </View>
        </ScrollView>
    </Layout>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        height: 60
    },
    logoHorizontal: { width: 150, height: 35, resizeMode: 'contain' },
    content: { paddingHorizontal: 15 },
    ordersSection: { backgroundColor: 'white', padding: 10, borderRadius: 10, elevation: 3 },
    addItemButton: { alignSelf: "flex-end", marginTop: 5 },
    addItemText: { color: "#ff0080", fontSize: 16, fontWeight: "bold" },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    tab: { alignItems: 'center' },

    headerText: {
        fontSize: 16,
        //fontWeight: "bold",
        marginBottom: 10,
    },

    grandTotal: { fontSize: 16 },
    nextButton: { paddingVertical: 5, borderRadius: 8, padding: 10 },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 12, color: "#000", marginBottom: 5 },
    input: {
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
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

export default AddAssistedShopNShipScreen;
