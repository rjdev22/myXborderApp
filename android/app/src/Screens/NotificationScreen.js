import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../Components/Common/Layout';
import { ScrollView } from 'react-native-gesture-handler';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);


const notifications = [
    {
        id: '1',
        type: 'Image Upload',
        message: 'MyX border team has uploaded image for item: ttjhg',
        timestamp: 'Feb 10, 2025, 6:56:33 PM',
    },
    {
        id: '2',
        type: 'New Order added',
        message: 'MyXBorder Team has created a new shop n ship order: SNS3305',
        timestamp: 'Dec 23, 2024, 9:13:47 PM',
    },
    {
        id: '3',
        type: 'Image Upload',
        message: 'MyX border team has uploaded image for item: cvb',
        timestamp: 'Nov 5, 2024, 1:01:14 PM',
    },
    {
        id: '4',
        type: 'Image Upload',
        message: 'MyX border team has uploaded image for item: babsv',
        timestamp: 'Oct 4, 2024, 3:01:30 PM',
    },
    {
        id: '5',
        type: 'Order Accepted IS3286',
        message: 'MyXBorder team has Accepted your order IS3286',
        timestamp: 'Sep 25, 2024, 2:52:29 PM',
    },
    {
        id: '6',
        type: 'Image Upload',
        message: 'MyX border team has uploaded image for item: gsge',
        timestamp: 'Sep 25, 2024, 1:06:39 PM',
    },
    {
        id: '7',
        type: 'Image Upload',
        message: 'MyX border team has uploaded image for item: test',
        timestamp: 'Sep 25, 2024, 11:49:12 AM',
    },
];

export const NotificationScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    return (
        <Layout>
            <View style={styles.container}>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}

                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={styles.notificationItem}>
                                    <ShimmerPlaceholder visible={!isLoading} style={styles.iconPlaceholder}>
                                        <Icon name="bell" size={24} color="black" style={styles.icon} />
                                    </ShimmerPlaceholder>
                                    <View style={styles.textContainer}>
                                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                            <Text style={styles.title}>{item.type}</Text>
                                        </ShimmerPlaceholder>
                                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>

                                            <Text style={styles.message}>{item.message}</Text>
                                        </ShimmerPlaceholder>
                                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                            <Text style={styles.timestamp}>{item.timestamp}</Text>
                                        </ShimmerPlaceholder>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
{/* 
                </ScrollView> */}
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        marginBottom: 5,
    },


});

export default NotificationScreen;
