import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../../Components/Common/Layout';
import { ScrollView } from 'react-native-gesture-handler';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { get_order_notification } from '../../services/apiServices';
import { AuthContext } from '../../Context/MainContext';


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const NotificationScreen = () => {
    const { token } = useContext(AuthContext);



    const [isLoading, setIsLoading] = useState(true);
    const [notificationData, setNotificationData] = useState([]);
    console.log('notifications', notificationData)
    console.log('length',notificationData.length)



    const latestOrder = notificationData?.length
        ? notificationData.reduce((latest, item) => (new Date(item.createdAt) > new Date(latest.createdAt) ? item : latest), notificationData[0])
        : null;


    useEffect(() => {
        const get_notification = async () => {

            try {

                // setAccessToken(token);
                const response = await fetch(get_order_notification, {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                })
                const data = await response.json();

                console.log('notification api response', data);
                setNotificationData(data.data.data);


            }
            catch {
                console.log(error);

            }
        }

        get_notification();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    return (
        <Layout>
            <View style={styles.container}>
                {

                    isLoading ?
                        (<FlatList
                            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity>
                                    <View style={styles.notificationItem}>
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



                            notificationData.length === 0 ? (
                                <View style={styles.emptyCard}>
                                    <Text>No notifications <Text style={{ color: '#008000' }}>(Available:0)</Text> at tha moment</Text>
                                </View>
                            ) :
                                <FlatList
                                    data={notificationData}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity>
                                            <View style={styles.notificationItem}>
                                                <Image source={require('../../assets/bell.png')} style={styles.icon} />
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
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
    },
    notificationItem: {
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

        borderRadius: 0,
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

export default NotificationScreen;
