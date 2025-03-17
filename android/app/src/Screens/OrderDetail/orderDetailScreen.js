import React, { useState } from 'react';
import OrderDetailsLayout from '../../Components/Common/OrderDetailsLayout';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const items = {
    id: '1',
    name: 'tzt',
    type: 'Cosmetic',
    store: 'Amazon',
    itemPrice: 20,
    itemStatus: 'Pending',
    quantity: 12,
    size: 2
};


const OrderDetailsScreen = ({ navigation, route }) => {


    const items = route?.params?.order.item;

    const address = route?.params?.order.deliveryAddress;

    console.log('address', address);
    console.log('items', items);
    const [activeTab, setActiveTab] = useState('Items');
    const [ShowAddress, setShowAddress] = useState(false)
    const [ShowMessage, setShowMessage] = useState(false)
    const [ShowItem, setShowItem] = useState(true)


    const handleTabPress = (tab) => {
        setActiveTab(tab);
        if (tab === 'Address') {
            setShowAddress(true);
            setShowMessage(false);
            setShowItem(false);
        } else if (tab === 'Messag...') {
            setShowMessage(true);
            setShowAddress(false);
            setShowItem(false);
        } else if (tab === 'Items') {
            setShowItem(true);
            setShowAddress(false);
            setShowMessage(false);
        }
    };

    return (
        <OrderDetailsLayout>


            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    {/* Tabs */}
                    <View style={styles.tabs}>
                        {['Items', 'Messag...', 'Address'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, activeTab === tab && styles.activeTab]}
                                onPress={() => handleTabPress(tab)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {
                        ShowItem &&
                        <TextInput style={styles.searchInput} placeholder="Search" />}
                </View>

                {ShowAddress &&
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.itemDetailsHeader}>Delivery Address</Text>
                        </View>
                        <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.itemTitleLeft}>Name</Text>
                            <Text>:</Text>
                            <Text style={styles.itemTitleRight}>{address.first_name} {address.last_name}</Text>
                        </View>
                        <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.itemTitleLeft}>Mobile</Text>
                            <Text>:</Text>
                            <Text style={styles.itemTitleRight}>{address.primary_phone}</Text>
                        </View>
                        <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.itemTitleLeft}>Address</Text>
                            <Text>:</Text>
                            <Text style={styles.itemTitleRight}>{address.street_address}</Text>
                        </View>
                        <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.itemTitleLeft}>Apt,Suit,Bdlg</Text>
                            <Text>:</Text>
                            <Text style={styles.itemTitleRight}>{address.street2}</Text>
                        </View>
                        <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.itemTitleLeft}>City</Text>
                            <Text>:</Text>
                            <Text style={styles.itemTitleRight}>{address.city}</Text>
                        </View>
                    
                        <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.itemTitleLeft}>Country</Text>
                            <Text>:</Text>
                            <Text style={styles.itemTitleRight}>{address.country}</Text>
                        </View>
                        <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.itemTitleLeft}>PinCode</Text>
                            <Text>:</Text>
                            <Text style={styles.itemTitleRight}>{address.pin}</Text>
                        </View>

                    </View>
                }
                {ShowMessage && <Text>Message Section</Text>}
                {ShowItem && (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.addButton}>
                                <Text style={styles.addButtonText}>+ Add Items</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )}

                {ShowItem && items &&
                    items.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.itemTitle}>Item Name: {item.name}</Text>
                            <Text style={{ color: 'gray' }}>Item Type: {item.item_type}</Text>
                            <Text style={{ color: 'gray' }}>Quantity: {item.quantity}</Text>
                            <Text style={{ color: 'gray' }}>Size: {item.size}</Text>
                            <View style={styles.actions}>
                                <TouchableOpacity>
                                    <Text style={styles.actionText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'ViewOrderDetailScreen',params:{item:item} })}>
                                    <Text style={styles.actionText}>View</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }

            </View>
        </OrderDetailsLayout >
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff', flex: 1 },
    tabContainer: {
        marginBottom: 20,
        borderRadius: 5,
        boxShadow: '0px 1px 2pxrgba(0, 0, 0, 0.30)',
    },
    tabs: { flexDirection: 'row', marginBottom: 10 },
    tab: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    activeTab: {
        experimental_backgroundImage: 'linear-gradient(to right, #d81397, #0d5cc2)',

    },
    activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tabText: { fontWeight: 'bold', color: '#d81397' },
    searchInput: { borderWidth: 0.5, padding: 8, marginBottom: 10, marginLeft: 10, marginRight: 10 },
    addButton: {
        backgroundColor: '#4A00E0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        width: 130,
    },
    addButtonText: { color: '#fff', fontWeight: 'bold' },
    card: {
        padding: 16,
        borderRadius: 5,
        marginTop: 20,
        boxShadow: '0px 1px 2pxrgba(0, 0, 0, 0.30)',
        borderRadius: 5,
    },
    itemTitle: { fontWeight: 'bold' },
    actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    actionText: { color: '#d81397', fontWeight: 'bold' },
    itemTitleLeft: {
        color: '#000',
        fontSize: 16,
        width: '40%',
    },
    itemTitleRight: {
        color: '#000',
        fontSize: 16,
        width: '40%',
        textAlign: 'right'
    },
    itemDetailsHeader: {
        fontWeight: 'bold',
        color: '#d81397',
        fontSize: 16,
        borderBottomColor: '#dedede',
        borderBottomWidth: 0.7,
        paddingBottom: 15,
        marginBottom: 15
    }

});

export default OrderDetailsScreen;
