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



const AddInternationalShipmentScreen = ({ navigation }) => {
    
    return (                             

        <Layout>
        <ScrollView style={styles.content}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
             <View style={{marginBottom: 30,marginTop: 20}}>
                <Text style={{fontSize: 16,fontWeight: 'bold'}}>Add Order Details</Text>
             </View>


            <View style={styles.inputGroup}>
                <Text style={styles.label}>Order Type*</Text>
                <TextInput style={styles.input} placeholder="Enter item URL" />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Courier Type*(click here for shipping rates)</Text>
                <TextInput style={styles.input} placeholder="Please select item type" />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Client Order Id</Text>
                <TextInput style={styles.input} placeholder="Enter item name" />
            </View>
            <View >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.nextButton}>
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

    content: { paddingHorizontal: 15 ,backgroundColor: '#fff' },
   
    headerText: {
        fontSize: 16,
        //fontWeight: "bold",
        marginBottom: 10,
    },

    grandTotal: { fontSize: 16 },
    nextButton: {
        paddingVertical: 5,
        borderRadius: 5,
        padding: 10,
        width: 130,
        flex:1,
        alignContent:'right',
        justifyContent:'flex-end',
        alignItems:'right'
    },
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

export default AddInternationalShipmentScreen;
