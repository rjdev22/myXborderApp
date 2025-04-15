import React, { useState,useContext,useEffect} from 'react';
import OrderDetailsLayout from '../../Components/Common/OrderDetailsLayout';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddItemModal from '../../Components/Modals/AddItemToOrder';
import EditItemModal from '../../Components/Modals/EditItemToOrders';
import { set } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import OrderHistory from './OrderHistory';
import { OrderHistoryUrl } from '../../services/apiServices';
import Loader from '../../Components/Modals/Loader';
import { AuthContext } from '../../Context/authContext';

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
    const {token}=useContext(AuthContext)

    console.log('route....', route?.params?.order

    );

    const TotalPayment = route?.params?.order.total_price
    const userWalletBalance = route?.params?.order.userWalletBalance

    const paymentStatus = route?.params?.order.payment_status
    const items = route?.params?.order.item;
    const orderId = route?.params?.order.id
    const address = route?.params?.order.deliveryAddress;
    const itemType = route?.params?.itemData || [];
    console.log('itemType', itemType);
    const DropDownValues = itemType.map((item) => item.itemType);

    // console.log('address', address);
    // console.log('items', items,orderId);
    const [activeTab, setActiveTab] = useState('Items');
    const [selectedOrderType, setSelectedOrderType] = useState('');

    const [ShowAddress, setShowAddress] = useState(false)
    const [ShowMessage, setShowMessage] = useState(false)
    const [ShowItem, setShowItem] = useState(true)
    const [openAddItem, setOpenAddItem] = useState(false)
    const [openEditItem, setOpenEditItem] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showOrderHistory, setShowOrderHistory] = useState(false)
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(false)

    console.log('selectedItem', selectedItem);

    const openAddItemModal = () => { setOpenAddItem(true) }
    const closeAddItemModal = () => { setOpenAddItem(false) }

    const OpenEditItemModal = (item) => {
        setSelectedItem(item)
    }

    const closeEditItemModal = () => { setOpenEditItem(false) }

 const goToDetail=()=>{
     handle_fatch_order_history();
    setShowOrderHistory(true)
 }


    const backtodetails = () => {
        setShowOrderHistory(false)
    }

    const handle_fatch_order_history = async () => {
        setLoading(true)
        try {
            const response = await fetch(OrderHistoryUrl + `/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setOrderHistory(data?.data?.data || []);
            console.log('history',orderHistory)
            setLoading(false)
        } catch (error) {
            console.log('Error fetching order history:', error);
            setLoading(false)
        }

    }



    const handleTabPress = (tab) => {
        setActiveTab(tab);
        if (tab === 'Address') {
            setShowAddress(true);
            setShowMessage(false);
            setShowItem(false);
        } else if (tab === 'Message') {
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
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                   showOrderHistory && !loading ?
                        <OrderHistory backtodetails={backtodetails} orderHistory={orderHistory}  />
                        :

                        <View style={styles.container}>
                            <View style={styles.tabContainer}>
                                {/* Tabs */}
                                <View style={styles.tabs}>
                                    {['Items', 'Message', 'Address'].map((tab) => (
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

                                    {
                                        paymentStatus === 'NotCreated' &&
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginRight: 10, }} onPress={() => openAddItemModal()}>
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.addButton}>
                                                    <Text style={styles.addButtonText}>+ Add Items</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }} onPress={goToDetail} >
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.addButton}>
                                                    <Text style={styles.addButtonText}><Icon name="history" size={14} color="white" /> Order History</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>

                                    }
                                    {paymentStatus === 'Pending' &&

                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }} onPress={() => navigation.navigate('Home', { screen: 'ChargesSummary', params: { TotalPayment: TotalPayment, userWalletBalance: userWalletBalance, order: route?.params?.order } })}>
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.addButton}>
                                                    <Text style={styles.addButtonTextpayment}>Make Payment</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }} onPress={goToDetail} >
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.addButton}>
                                                    <Text style={styles.addButtonText}><Icon name="history" size={14} color="white" /> Order History</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>


                                    }
                                    {(paymentStatus === 'Paid' || paymentStatus === 'Unpaid') &&
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity style={{ marginTop: 10, marginBottom: 10 }} onPress={goToDetail}>
                                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.addButton}>
                                                    <Text style={styles.addButtonText}><Icon name="history" size={14} color="white" /> Order History</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View>


                                    }

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
                                            <TouchableOpacity onPress={() => OpenEditItemModal(item)}>
                                                <Text style={styles.actionText}>Edit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'ViewOrderDetailScreen', params: { item: item } })}>
                                                <Text style={styles.actionText}>View</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            }
                            <EditItemModal visible={openEditItem} onClose={() => closeEditItemModal()} itemTypes={itemType} id={orderId} item={selectedItem} />
                            <AddItemModal visible={openAddItem} onClose={() => closeAddItemModal()} itemTypes={itemType} id={orderId} />
                        </View>
                }

                <Loader visible={loading} />
            </ScrollView>
        </OrderDetailsLayout >

    );
};

const styles = StyleSheet.create({
    container: { padding: 16, flex: 1, backgroundColor: '#fff' },
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
    addButtonTextpayment: { color: '#fff', fontWeight: 'bold' },
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
