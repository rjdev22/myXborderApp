import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getExistAddressList,DeleteAddressURl } from '../../services/apiServices';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { AuthContext } from '../../Context/MainContext';
import Layout from '../../Components/Common/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { DeleteAddressURl } from '../../services/apiServices';

import { Toast } from 'react-native-toast-notifications';
import EditAddressModal from '../../Components/Modals/EditAddressModal';
import { set } from 'react-native-reanimated';




const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const AddressBookScreen = ({ navigation, }) => {

    const { token, pageRefresh, setPageRefresh } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [addressListData, setAddressListData] = useState([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({});


    const openModal = (address) => {
       setSelectedAddress(address);
        setOpenEditModal(true);
    }

    const closeModal = () => {
        setOpenEditModal(false);
    }


    useEffect(() => {
        async function fetchData() {
            try {
                if (!pageRefresh) {
                    setIsLoading(true); 
                }
                const response = await fetch(getExistAddressList, {

                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                })
                const data = await response.json();
                console.log('address data', data.data.data);
                setAddressListData(data.data.data);
                setIsLoading(false);

            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        fetchData();
        
    }, [pageRefresh]);


    async function handleDeleteAddress(id) {


        console.log('address id', id)
        //setIsLoading(true);
        try {
            const response = await fetch(DeleteAddressURl + `${id}`, {

                headers: {
                    'authorization': `Bearer ${token}`
                },
            })
            const data = await response.json();
            console.log('delete address response data', data);
            if (data.status === true) {
                Toast.show('Address Deleted from your address book', { type: 'success', style: { width: 500 } })
                setAddressListData(prevList => prevList.filter(address => address.id !== id));
                setPageRefresh(true);
            }
          
        } catch (error) {
            console.log(error);
            Toast.show('something went wrong, please try again', { type: 'success', style: { width: 500 } })
           
        }
    }

    function DeleteAddress(id) {
        Alert.alert(
            "Alert",
            "Are you sure you want to delete this address?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => handleDeleteAddress(id),
                },
            ],
            { cancelable: true }
        );
    }


    return (
        <Layout>
            <View style={styles.container}>
                {isLoading ? (
                    <View>
                        {[...Array(5)].map((_, index) => (
                            <View key={index} style={styles.orderdetailsContainer}>
                                <View>
                                    {[...Array(4)].map((_, i) => (
                                        <ShimmerPlaceholder key={i} visible={!isLoading} style={styles.detailPlaceholder} />
                                    ))}
                                </View>
                                <ShimmerPlaceholder visible={!isLoading} style={styles.buttonPlaceholder} />
                            </View>
                        ))}
                    </View>

                ) : addressListData && Array.isArray(addressListData) && addressListData.length > 0 ? (

                    addressListData.map((address, index) => (
                        <View key={index} style={styles.orderdetailsContainer}>
                            <View>
                                <TouchableOpacity onPress={() => openModal(address)} style={{position:'absolute',right:10, zIndex:9}}>
                                    <Icon name='edit' size={18} color='#D81397' />
                                </TouchableOpacity>
                                <Text style={styles.detailText}>
                                    <Text style={styles.boldText}>Name:</Text> {address.first_name}
                                </Text>

                                <Text style={styles.detailText}>
                                    <Text style={styles.boldText}>Mobile:</Text> {address.primary_phone}
                                </Text>

                                <Text style={styles.detailText}>
                                    <Text style={styles.boldText}>Address:</Text>

                                    <Text> {address.street_address}</Text>
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => DeleteAddress(address.id)}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#d81397', '#0d5cc2']}
                                    style={styles.detailsButton}
                                >
                                    <Text style={styles.detailsButtonText}>Remove</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    ))

                ) : (
                    <View style={styles.noDataContainer}>
                        <Image source={require('../../assets/home-address.png')} style={styles.noDataImage} />
                        <Text style={styles.noDataText}>No Existing Address</Text>
                    </View>
                )}


                {/* <Loader visible={isLoading} /> */}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openEditModal}
                onRequestClose={closeModal}
            >

                <EditAddressModal onClose={closeModal} address={selectedAddress} />
            </Modal>

        </Layout>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10
    },
    ordersSection: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 3
    },

    orderButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    addressCard: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        marginTop: 10,
        paddingBottom: 10,

    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    addressText:
    {
        fontSize: 14,
        color: 'gray'
    },
    addressValue:
    {
        fontSize: 16,
        color: 'black'
    },
    headerText: {
        fontSize: 16,
        //fontWeight: "bold",
        marginBottom: 10,
    },
    addressRow: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',

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
    orderContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        elevation: 3,
        marginBottom: 10,
    },
    orderdetailsContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        elevation: 3,
        marginBottom: 10,
        height: 150,
        marginBottom: 5

    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderCount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    createOrderButton: {
        paddingHorizontal: 20,
        paddingVertical: 4,
        borderRadius: 5,
    },
    createOrderText: {
        color: 'white',
        fontWeight: 'bold',
    },
    orderDetails: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 2,
    },
    detailText: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    detailsButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    detailsButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    detailPlaceholder: {
        marginTop: 3,
        height: 17
    },
    buttonPlaceholder: {
        marginTop: 7,
        height: 30,
        width: '100%'
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
    },
    noDataImage: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    noDataText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 0,
        color: '#2c71bc',
        fontWeight: 'bold'
    },
    AddressCardPlaceholder: {
        height: 150
    }



});

export default AddressBookScreen;
