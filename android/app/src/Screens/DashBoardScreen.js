import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../Components/Common/Layout';
import Toast from 'react-native-simple-toast';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { SvgUri } from 'react-native-svg';
import { AuthContext } from '../Context/authContext';
import { getUserProfile, get_item_types,get_courier_types,get_order_types } from '../services/apiServices';




const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const DashBoardScreen = ({ navigation, route }) => {


    //console.log('route data----', route.params.data.image)

    //const userData = route.params?.data
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [itemData,setItemData]=useState({});


    const get_all_item = async () => {
        try {
            const response = await fetch(get_item_types, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
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
    const courier_types = async () => {
        try {
            const response = await fetch( get_courier_types, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
                },

            })
            const data = await response.json();
            console.log('Courier api response', data);

        }
        catch {
            console.log(error);

        }
    }
    const order_types= async () => {
        try {
            const response = await fetch(get_order_types, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
                },

            })
            const data = await response.json();
            console.log('order api response', data);

        }
        catch {
            console.log(error);

        }
    }


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(getUserProfile,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo",
                        },
                    },
                );
                const data = await response.json();
                console.log('user data', data);
                setUserData(data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };
        fetchUserData();
        get_all_item();
        courier_types();
        order_types();

    }, []);

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
        Toast.show("Copied to clipboard", Toast.SHORT);
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
                        {/* {/* <Image
                            source={{ uri: userData.image }}
                            style={styles.profileHorizontal}
                        /> */}

                        <SvgUri
                            uri={userData.image}
                            width={'100%'}
                            height={'100%'}
                            style={styles.profileHorizontal}
                        />

                    </ShimmerPlaceholder>

                    <View>
                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                            <Text style={styles.profileDetails}>{userData.first_name !== null ? userData.first_name : "test"} {userData.last_name !== null ? userData.last_name : "User"}</Text>
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

                        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'ShopNshipScreen' })}>
                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                <Text style={styles.orderText} >Shop N Ship</Text>
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                                <Text>Total Orders: <Text style={{ color: '#d81397', }}>({userData.shopNshipOrderCount})</Text></Text>
                            </ShimmerPlaceholder>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>navigation.navigate('Home', { screen: 'AddShopNShipScreen', params: { itemData:itemData } })}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.orderButton}>
                                <Text style={styles.orderButtonText}>Create Order</Text>
                            </LinearGradient>
                        </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AddAssistedShopNShipScreen' })}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.orderButton}>
                                <Text style={styles.orderButtonText}>Create Order</Text>
                            </LinearGradient>
                        </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AddInternationalShipmentScreen' })}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.orderButton}>
                                <Text style={styles.orderButtonText}>Create Order</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.addressCard}>
                    <Text style={styles.headerText}>Your Virtual Address</Text>

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
                </View>

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
    orderButtonText: { color: 'white', fontWeight: 'bold' },
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
    imagePlaceholder: { width: 70, height: 70, borderRadius: 45 },
    textPlaceholder: { width: '100%', marginBottom: 2, marginLeft: 10 },
    addressPlaceholder: { marginBottom: 2, marginLeft: 10 }
});

export default DashBoardScreen;
