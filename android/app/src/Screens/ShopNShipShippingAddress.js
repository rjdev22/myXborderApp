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
import { AuthContext } from '../Context/authContext';
import { useContext } from 'react';

const ShopNshipShipmentAddress = ({ navigation, route }) => {

    console.log('route', route?.params);
    const { token } = useContext(AuthContext);
    const [orderType, setOrderType] = useState([]);
    const [courierType, setCourierType] = useState([]);

  //  console.log("0000000000", courierType, token);

    useEffect(() => {

        const courier_types = async () => {
            try {
                const response = await fetch(get_courier_types, {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                })
                const data = await response.json();
                setCourierType(data.data);
                //console.log("laveee", courierData)
                console.log('Courier api response', data);

            }
            catch (error) {
                console.log("error", error);

            }
        }
        const order_types = async () => {
            try {
                const response = await fetch(get_order_types, {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                })
                const data = await response.json();
                setOrderType(data.data);
                console.log('order api response', data);

            }
            catch (error) {
                console.log("erorr", error);

            }
        }
        courier_types();
        order_types();

    }, [])

    const OrderData = orderType?.map(item => item.name);
    const CourierData = courierType?.map(item => item.name);


    //const CourierType = courierType.map(item => item.name);

    const order_url = route?.params?.additems[0]?.trackingNumber ? createShopNShipOrder : createAssistedSopNShipOrder;


    const [goAddress, setGoAddress] = useState(false);
    const [creteAddress, setCreateAddress] = useState(false);

    const [selectedOrderType, setSelectedOrderType] = useState(null);
    const [selectedCourierType, setSelectedCourierType] = useState(null);

    const [isLoading, setIsLoading] = useState(false); // State for order items


    // console.log('selected order type', selectedOrderType)
    // console.log('selected courier type', selectedCourierType)


    const num = Number(selectedOrderType);
   // const initialOrderValue = !isNaN(num) ? num - 1 : 0; // Defaulting to 0 if invalid
    // console.log('Initial value:', initialValue);
    const handleCreateOrder = async (address) => {
        // console.log('address id ', address);



        setIsLoading(true);
        try {
            const response = await fetch(order_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderSubType: selectedOrderType,
                    courierType: selectedCourierType,
                    addressId: address,
                    remark: "Urgent delivery",
                    chat: "Please deliver fast",
                    assestedPrice: 3000,
                    additems: route.params.additems
                })
            })
            const data = await response.json();
            console.log('shop n ship response', data);
            if (data.status === true) {
                navigation.navigate('DashBoardScreen');
                Toast.show(data.message, {type: 'success',style: { width:500}});
                setIsLoading(false);
            }
            else {
                Toast.show(data.error, Toast.SHORT);
            }

            setIsLoading(false);
        }
        catch {
            console.log(error);
            setIsLoading(false);
        }
    }



    return (
        <Layout>
            <View style={styles.container}>

                <ScrollView style={styles.content} shosVerticalScrollIndicator={false}>
                    <View style={styles.topHeader}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Shipping Address</Text>
                        <TouchableOpacity onPress={goAddress ? () => setGoAddress(false) : creteAddress ? () => setCreateAddress(false) : () => navigation.goBack()}>
                            <Image source={require('../assets/back.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>

                    </View>

                    {
                        goAddress ? (
                            <ExistaddressList navigation={navigation} handleCreateOrder={handleCreateOrder} />
                        ) :
                            creteAddress ? (
                                <CreateNewAddress navigation={navigation} />
                            )
                                : (
                                    <View>
                                        <View style={styles.itemContainer}>
                                            <View style={styles.inputGroup}>
                                                <Text style={styles.label}>Order Type*</Text>
                                                <DropDown
                                                    items={OrderData}
                                                    label="Please select Order Type"
                                                    initialValue={String(Number(selectedOrderType) - 1)}
                                                    onChange={(value) => {

                                                        const newValue = String(Number(value) + 1);
                                                        setSelectedOrderType(newValue);
                                                    }
                                                    }
                                                />
                                            </View>
                                            <View style={styles.inputGroup}>
                                                <Text style={styles.label}>Courier Type*(click here for shipping rates)</Text>
                                                <DropDown
                                                    items={CourierData}
                                                    label="Please select Courier Type"
                                                    initialValue={String(Number(selectedCourierType) - 1)}
                                                    onChange={(value) => {

                                                        const newValue = String(Number(value) + 1);
                                                        setSelectedCourierType(newValue);
                                                    }
                                                    }
                                                />
                                            </View>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TouchableOpacity style={{ width: '48%' }} onPress={() => setGoAddress(true)}>
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                                                    <Text style={styles.buttonText}>
                                                        Use Existing Address
                                                    </Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ width: '48%' }} onPress={() => setCreateAddress(true)}>
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                                                    <Text style={styles.buttonText}>
                                                        Create New Address
                                                    </Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>
                                    </View>)
                    }
                </ScrollView>
                <Loader visible={isLoading} />
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
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,

    },



});

export default ShopNshipShipmentAddress;
