import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../Components/Common/Layout';
import { ScrollView } from 'react-native-gesture-handler';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { get_wallet_history } from '../services/apiServices';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const WalletHistory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [walletData, setWalletData] = useState([]);
    useEffect(() => {
        const get_notification = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setAccessToken(token);
                const response = await fetch(get_wallet_history, {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                })
                const data = await response.json();
                setWalletData(data.data);
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
                        
                                        <View style={styles.textContainer}>
                                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>

                                            </ShimmerPlaceholder>
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
                            walletData.length === 0 ? (
                                <View style={styles.emptyCard}>
                                    <Text>You Have<Text style={{ color: '#008000' }}>(Available:0)</Text>Wallet Transaction list</Text>
                                </View>
                            ) :
                                <FlatList
                                    data={notificationData}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity>
                                            <View style={styles.notificationItem}>
                                                <Icon name="bell" size={24} color="black" style={styles.icon} />
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.title}>{item.type}</Text>
                                                    <Text style={styles.message}>{item.message}</Text>
                                                    <Text style={styles.timestamp}>{item.timestamp}</Text>
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
       // backgroundColor: '#f5f5f5',
        padding: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 10,
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
        fontWeight: 'bold',
        marginVertical: 2,
    },
    timestamp: {
        fontSize: 14,
        color: '#555',
        fontWeight: 'bold',
    },
    iconPlaceholder: {
        height: 40,
        width: 40,
        marginRight: 10,
        borderRadius: 50,
    },
    textPlaceholder: {
        marginBottom: 8,
        width:280,
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


});

export default WalletHistory;
