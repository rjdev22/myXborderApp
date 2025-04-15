import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../Components/Common/Layout';
import { Toast } from 'react-native-toast-notifications';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { SvgUri } from 'react-native-svg';
import { getUserProfile, get_item_types } from '../services/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import EditProfileModal from '../Components/Modals/EditProfileModal';
import { AuthContext } from '../Context/authContext';
import VirtualAddressInfo from '../Components/Modals/VirtualAddressInfo';



const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const DashBoardScreen = ({ navigation }) => {

    const { token, pageRefresh, setPageRefresh } = useContext(AuthContext);
    console.log('token', token);

    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [itemData, setItemData] = useState({});
    const [courierData, setCourierData] = useState({});
    const [orderData, setOrderData] = useState({});
    const [accessToken, setAccessToken] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    

const openModal = () => {
    setOpenInfoModal(true);
}
const closeModal = () => {
    setOpenInfoModal(false);
}



    const get_all_item = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            setAccessToken(token);
            const response = await fetch(get_item_types, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

            })
            const data = await response.json();
            setItemData(data.data);
            console.log('item api response', data);

        }
        catch {
            console.log(error);

        }
    }


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(getUserProfile,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${token}`
                        },
                    },
                );
                const data = await response.json();
                console.log('user data', data);
                setUserData(data.data);
                if (!data.data.first_name && !data.data.last_name) {
                    setOpenEditModal(true);
                }
                // setPageRefresh(false);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
                // setPageRefresh(false);
            }
        };
        fetchUserData();
        get_all_item();
        //courier_types();
        //order_types();

    }, [pageRefresh]);

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };


    const addressData = {
        Name: userData?.virtualAddress?.name,
        AddressLine1: userData?.virtualAddress?.address1,
        Landmark: userData?.virtualAddress?.landmark,
        Zipcode: userData?.virtualAddress?.pincode,
        State: userData?.virtualAddress?.state,
        City: userData?.virtualAddress?.city,
        PhoneNumber: userData?.phone2,
    };

    const copy = (text) => {
        Clipboard.setString(text);
        Toast.show("Copied to clipboard", { type: 'success', style: { width: 500 } });
        //alert("Copied to clipboard!");
    };


    return (
        <Layout>
            <ScrollView style={styles.content}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <ShimmerPlaceholder visible={!isLoading} style={styles.imagePlaceholder}>

                        <SvgUri
                            uri={userData.image}
                            width={'100%'}
                            height={'100%'}
                            style={styles.profileHorizontal}
                        />

                    </ShimmerPlaceholder>
                    <View>
                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                            <TouchableOpacity onPress={() => setPageRefresh(true)}>
                            <Text style={styles.profileDetails}>{userData.first_name} {userData.last_name}</Text>
                            </TouchableOpacity>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                            <Text style={styles.profileDetails}>UniqueId: {userData.user_id}</Text>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                            <Text style={styles.profileDetails}><Icon name="phone" size={16} color="black" /> {userData.phone}</Text>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                            <Text style={styles.profileDetails}><Icon name="envelope" size={16} color="black" /> {userData.email}</Text>
                        </ShimmerPlaceholder>
                    </View>
                </View>


                {/* Orders Section */}
                <View style={styles.ordersSection}>
                    <View style={styles.orderRow}>

                        <TouchableOpacity onPress={() =>

                            navigation.navigate('Home', {
                                screen: 'ShopNshipScreen',
                                params: {
                                    orderData: orderData,
                                    itemData: itemData
                                }
                            })
                        }>
                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                <Text style={styles.orderText} >Shop N Ship</Text>
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                <Text>Total Orders: <Text style={{ color: '#d81397', }}>({userData.shopNshipOrderCount})</Text></Text>
                            </ShimmerPlaceholder>
                        </TouchableOpacity>
                        {
                            !isLoading &&
                            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AddShopNShipScreen', params: { itemData: itemData, orderData: orderData, courierData: courierData } })}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.orderButton}>
                                    <Text style={styles.orderButtonText}>Create Order</Text>
                                </LinearGradient>
                            </TouchableOpacity>}
                    </View>

                    <View style={styles.orderRow}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AssistedShopNShipScreen' })}>
                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                <Text style={styles.orderText} >Assisted Shop N Ship</Text>
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                <Text>Total Orders: <Text style={{ color: '#d81397', }}>({userData.
                                    assistedShopNshipOrderCount
                                })</Text></Text>
                            </ShimmerPlaceholder>
                        </TouchableOpacity>
                        {
                            !isLoading &&
                            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AddAssistedShopNShipScreen' })}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.orderButton}>
                                    <Text style={styles.orderButtonText}>Create Order</Text>
                                </LinearGradient>
                            </TouchableOpacity>}
                    </View>

                    <View style={styles.orderRowlast}>

                        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'InternationalShipmentScreen' })}>
                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                <Text style={styles.orderText} >International Shipment</Text>
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                <Text>Total Orders: <Text style={{ color: '#d81397', }}>({userData.internationalOrderCount})</Text></Text>
                            </ShimmerPlaceholder>
                        </TouchableOpacity>
                        {
                            !isLoading &&
                            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AddInternationalShipmentScreen' })}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.orderButton}>
                                    <Text style={styles.orderButtonText}>Create Order</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        }
                    </View>
                </View>

                <View style={styles.addressCard}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={styles.headerText}>Your Virtual Address</Text>
                        <TouchableOpacity onPress={openModal} > <Icon name="info-circle" size={14} color="#d81397" style={styles.icon} /></TouchableOpacity>
                     
                    </View>

                    {Object.entries(addressData).map(([key, value]) => (
                        <View key={key} style={styles.addressRow}>
                            <View>
                                <ShimmerPlaceholder visible={!isLoading} style={styles.addressPlaceholder}>
                                    <Text style={styles.addressLabel}>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
                                </ShimmerPlaceholder>
                                <View style={styles.copyRow}>
                                    <ShimmerPlaceholder visible={!isLoading} style={styles.addressPlaceholder}>
                                        <Text style={styles.addressValue}>{value}</Text>
                                    </ShimmerPlaceholder>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => copy(value)}>
                                <Icon name="clone" color="black" style={styles.copyIcon} />
                            </TouchableOpacity>
                        </View>
                    ))}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openEditModal}
                        onRequestClose={handleCloseEditModal}
                    >
                        <EditProfileModal onClose={handleCloseEditModal} userData={userData} />
                    </Modal>
                </View>
            <VirtualAddressInfo onClose={closeModal} visible={openInfoModal}  />
            </ScrollView  >
        </Layout>
    );
};

const styles = StyleSheet.create({

    profileHorizontal: { width: 70, height: 70, resizeMode: 'contain', borderRadius: 45, marginRight: 20 },
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
    orderRowlast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 10,

    },
    orderText: { fontSize: 16, color: 'black' },
    orderButton: {
        padding: 5,
        borderRadius: 5,
        paddingHorizontal: 20
    },
    orderButtonText: { color: 'white', },
    addressCard: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 3,
        marginTop: 10,
        marginBottom: 25,
        paddingBottom: 10,

    },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    addressText: { fontSize: 14, color: 'gray' },
    addressValue: { fontSize: 16, color: 'black' },

    tab: { alignItems: 'center' },

    headerText: {
        fontSize: 16,
        //fontWeight: "bold",
        marginBottom: 10,
    },
    addressRow: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10,
        paddingBottom: 10

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
    icon: {
        marginLeft:0,
        bottom: 8
    },
    imagePlaceholder: { width: 70, height: 70, borderRadius: 45 },
    textPlaceholder: { width: '100%', marginBottom: 2, marginLeft: 10 },
    addressPlaceholder: { marginBottom: 2, marginLeft: 10 }
});

export default DashBoardScreen;
