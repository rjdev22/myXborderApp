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


const ShopNshipScreen = ({ navigation }) => {
    const addressData = {
        Name: "test test2",
        AddressLine1: "66 /16, The Mall Road USR1267",
        Landmark: "Near Police Station",
        Zipcode: "208001",
        State: "Uttar Pradesh",
        City: "Kanpur",
        PhoneNumber: "721170063",
    };

    
    const [query, setQuery] = useState('');

    const copy = (text) => {
        copyToClipboard(text);
        alert("Copied to clipboard!");
    };


    return (
        <Layout>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={styles.content}>
                <View style={styles.orderContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        // keyboardType=""
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>
             
                <View style={styles.orderContainer}>
                    <View style={styles.orderHeader}>
                       
                        <Text style={styles.orderCount}>No. of Orders: <Text style={{ color: 'red' }}>(1)</Text></Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddAssistedShopNShipScreen')}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#FF0080', '#1e7fca']}
                            style={styles.createOrderButton}>
                            <Text style={styles.createOrderText}>+ Create Order</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>


                </View>
                <View>
                    <View style={styles.orderContainer}>
                        <View >
                            <Text style={styles.detailText}><Text style={styles.boldText}>Date:</Text> Jan 28, 2025</Text>
                            <Text style={styles.detailText}><Text style={styles.boldText}>MXB-Order Id:</Text> SNS3315</Text>
                            <Text style={styles.detailText}><Text style={styles.boldText}>Order Type:</Text> <Text style={{ fontWeight: 'bold' }}>Personal \ Gift</Text></Text>
                            <Text style={styles.detailText}><Text style={styles.boldText}>Payment Status:</Text> <Text style={{ fontWeight: 'bold' }}>NotCreated</Text></Text>
                        </View>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#FF0080', '#1e7fca']}
                            style={styles.detailsButton}>
                            <Text style={styles.detailsButtonText}>Details</Text>
                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({

  
    content: { padding: 10 },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        elevation: 3,
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ddd',
        marginRight: 10,
    },
    profileName: { fontSize: 18, fontWeight: 'bold' },
    profileDetails: { fontSize: 14, color: 'black', fontWeight: 'bold' },
    ordersSection: { backgroundColor: 'white', padding: 10, borderRadius: 5, elevation: 3 },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    orderText: { fontSize: 16, color: 'black' },
    orderButton: {
        padding: 5,
        borderRadius: 5,
    },
    orderButtonText: { color: 'white', fontWeight: 'bold' },
    addressCard: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        marginTop: 10,
        paddingBottom: 10,

    },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    addressText: { fontSize: 14, color: 'gray' },
    addressValue: { fontSize: 16, color: 'black' },
  

    headerText: {
        fontSize: 16,
        //fontWeight: "bold",
        marginBottom: 10,
    },
    addressRow: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

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
        borderRadius: 5,
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
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 10,
        fontSize: 16,
    },

});

export default ShopNshipScreen;
