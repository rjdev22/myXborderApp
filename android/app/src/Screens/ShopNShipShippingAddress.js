
import React, { useState } from 'react';
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
import Layout from '../Components/Common/Layout';
import DropDown from '../Components/Common/DropDown';
import { createShopNShipOrder } from '../services/apiServices';
const ShopNshipShipmentAddress = ({ navigation,route }) => {
    console.log('ROUTE',route);

    const [selectedOrderType, setSelectedOrderType] = useState(null);
    const [selectedCourierType, setSelectedCourierType] = useState(null);    // State for order items

    const OrderType = [
        "Commercial",
        "Personal\Gift",
        "Sample",

    ]
    const CourierType = [
        "Normal",
        "premium"
    ]

    const handleNextButton = async () => {
        try {
            const response = await fetch(createShopNShipOrder, {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
                },
                body: JSON.stringify({

                    "itemName": "T-Shirt",
                    "itemType": 1,
                    "store": "Flipkart",
                    "trackingNumber": "123456789",
                    "color": "White",
                    "size": "M",
                    "price": 500,
                    "quantity": 2,
                    "itemRemark": "Handle with care"
                })
            })
            console.log('shop n ship response', response.data.data);
            navigation.navigate('ShopNShipShippingAddress')
        }
        catch {
            console.log(error);
        }
    }



    return (
        <Layout>
            <View style={styles.container}>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.topHeader}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold',}}>Shipping Address</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/back.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>

                    </View>


                    <View style={styles.itemContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Order Type*</Text>
                            <DropDown
                                items={OrderType}
                                initialValue={selectedOrderType}
                                onChange={(value) => setSelectedOrderType(value)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Courier Type*(click here for shipping rates)</Text>
                            <DropDown
                                items={CourierType}
                                initialValue={selectedCourierType}
                                onChange={(value) => setSelectedCourierType(value)}
                            />
                        </View>
                    </View>

                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableOpacity style={{width:'48%'}}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Use Existing Address
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'48%'}}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Create New Address
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        marginTop: 20 ,
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
        borderBottomWidth: 1,
        paddingBottom: 0,
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
        fontSize: 14,
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
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,

    },
  
   
   
});

export default ShopNshipShipmentAddress;
