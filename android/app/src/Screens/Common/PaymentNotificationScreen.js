import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../../Components/Common/Layout';
import { ScrollView } from 'react-native-gesture-handler';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { get_payment_notification, craete_order_id, orderDetails,get_item_types } from '../../services/apiServices';
import { AuthContext } from '../../Context/MainContext';
import RazorpayCheckout from 'react-native-razorpay';
import Loader from '../../Components/Modals/Loader';


const RAZORPAY_API_KEY = process.env.RAZORPAY_API_KEY;
const RAZORPAY_SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const PaymentpaymentNotificationScreen = ({ navigation }) => {
    const { token } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [paymentNotificationData, setPaymentNotificationData] = useState([]);
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [itemType, setItemType] = useState([]);



    console.log('paymentNotifications', paymentNotificationData)
    console.log('length', paymentNotificationData.length)



    const latestOrder = paymentNotificationData?.length
        ? paymentNotificationData.reduce((latest, item) => (new Date(item.createdAt) > new Date(latest.createdAt) ? item : latest), paymentNotificationData[0])
        : null;


    useEffect(() => {
        const get_paymentNotification = async () => {

            try {

                // setAccessToken(token);
                const response = await fetch(get_payment_notification, {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                })
                const data = await response.json();

                console.log('paymentNotification api response', data);
                setPaymentNotificationData(data.data.data);
                setIsLoading(false);


            }
            catch {
                console.log(error);

            }
        }

        get_paymentNotification();
    }, []);
 useEffect(()=>{
      const get_all_item = async () => {
                try {
    
    
                    const response = await fetch(get_item_types, {
    
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
    
                    })
                    const data = await response.json();
                    setItemType(data.data);
                    console.log('item api response', data);
                }
                catch (error) {
                    console.log(error);
    
                }
            }
            get_all_item();
          
        }, []);



    const handlePress = async (id) => {

        console.log('id', id)

        console.log('token', token)
        setLoadingPayment(true);
        try {
            const response = await fetch(orderDetails + `/${id}`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

            })
            const data = await response.json();

            console.log('order details', data);
            const order = data.data;
            console.log('order', order);
            setLoadingPayment(false);
            navigation.navigate('Home',
                {
                    screen: 'orderDetailsScreen',
                    params:
                    {
                        order: order, token: token,itemData:itemType

                    }
                })
        }
        catch {
            console.log(error);
            setLoadingPayment(false);

        }
    };





    const handlePayment = async () => {
        try {


            const base64Credentials = btoa(`${RAZORPAY_API_KEY}:${RAZORPAY_SECRET_KEY}`);


            const response = await fetch(craete_order_id, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${base64Credentials}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 31247, // in paise = ₹1.00
                    currency: 'INR',
                }),
            });

            const data = await response.json();
            const orderId = data.id; // this is "order_QGXZxZxC6y8vyh"

            // Step 2: Open Razorpay with orderId
            const options = {
                description: 'Shop from INDIA and ship internationally',
                image: 'https://uat.myxborder.com/frontend/images/logo.png',
                currency: 'INR',
                key: RAZORPAY_API_KEY,
                amount: 31247,
                name: 'MyXBorder',
                order_id: orderId,
                prefill: {
                    email: 'gaurav.kumar@example.com',
                    contact: '+91 7505274962',
                    name: 'Gaurav Kumar',
                },
                theme: { color: '#d81397' },
            };

            RazorpayCheckout.open(options)
                .then((paymentData) => {
                    alert(`Success: ${paymentData.razorpay_payment_id}`);
                    // Optionally confirm payment to backend here
                })
                .catch((error) => {
                    console.log('payment error', error);

                });

        } catch (error) {
            console.error('Error fetching order_id', error);

        }
    };



    return (
        <Layout>
            <View style={styles.container}>
                {

                    isLoading ?
                        (<FlatList
                            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                >
                                    <View style={styles.paymentNotificationItem}>
                                        <ShimmerPlaceholder visible={!isLoading} style={styles.iconPlaceholder}>

                                        </ShimmerPlaceholder>
                                        <View style={styles.textContainer}>
                                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>

                                            </ShimmerPlaceholder>
                                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>


                                            </ShimmerPlaceholder>
                                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>

                                            </ShimmerPlaceholder>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />) : (

                            paymentNotificationData.length === 0 ||
                                paymentNotificationData.filter(item => item.paymentStatus !== 'Paid').length === 0 ? (
                                <View style={styles.emptyCard}>
                                    <Text>
                                        No UnRead Payment Notifications{' '}
                                        <Text style={{ color: '#008000' }}>(Available: 0)</Text> at the moment
                                    </Text>
                                </View>
                            ) :


                                <FlatList
                                    data={paymentNotificationData}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity


                                            onPress={() => {
                                                handlePress(item.order_id);
                                            }}
                                        // onPress={() => {
                                        //     var options = {

                                        //         currency: 'INR',
                                        //         key: 'rzp_live_k5XfovIgnUvIWP',
                                        //         amount: '5000',
                                        //         name: 'MyXBorder',
                                        //         image: '/assets/logo-horizontal.png',
                                        //         discription: 'Shop from INDIA and ship internationally',
                                        //         order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
                                        //         prefill: {
                                        //             email: 'gaurav.kumar@example.com',
                                        //             contact: '9191919191',
                                        //             name: 'Gaurav Kumar'
                                        //         },
                                        //         theme: { color: '#53a20e' }
                                        //     }
                                        //     RazorpayCheckout.open(options).then((data) => {
                                        //         // handle success
                                        //         alert(`Success: ${data.razorpay_payment_id}`);
                                        //     }).catch((error) => {
                                        //         // handle failure
                                        //         // alert(`Error: ${error.code} | ${error.description}`);
                                        //         console.log('payment error', error);
                                        //         Toast.show(error.description, { type: 'danger', style: { width: 500 } });
                                        //     });
                                        // }}
                                        >
                                            <View style={styles.paymentNotificationItem}>
                                                <Image source={require('../../assets/atm-card.png')} style={styles.icon} />
                                                <View style={styles.textContainer}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={styles.title}>{item.title}</Text>
                                                        {latestOrder && latestOrder.id === item.id && (
                                                            <TouchableOpacity style={styles.latestButton} onPress={() => console.log("Latest Order Clicked")}>
                                                                <Text style={styles.buttonText}>New</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    </View>
                                                    <Text style={styles.message}>{item.description}</Text>
                                                    <Text style={styles.timestamp}>{item.createdAt.split("T")[0]}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                        )
                }
                <Loader visible={loadingPayment} />

            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical:10,
    },
    paymentNotificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 10,
        height: 30,
        width: 30
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    message: {
        fontSize: 14,
        color: '#555',
        // fontWeight: 'bold',
        marginVertical: 2,
    },
    timestamp: {
        fontSize: 14,
        color: '#555',
        // fontWeight: 'bold',
    },
    iconPlaceholder: {
        height: 40,
        width: 40,
        marginRight: 10,
        borderRadius: 50,
    },
    textPlaceholder: {
        marginBottom: 5,
    },

    emptyCard: {
        justifyContent: 'center',
        alignItems: 'center',
        //margin: 10,
        padding: 15,
        backgroundColor: 'white',

        borderRadius: 5,
        elevation: 3
    },
    latestButton: {
        backgroundColor: "#ff9800",
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },


});

export default PaymentpaymentNotificationScreen;
