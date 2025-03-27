ExistaddressList
import React, { useState, useEffect, useContext } from 'react';
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
import Layout from '../../Components/Common/Layout';
import { getExistAddressList } from '../../services/apiServices';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { AuthContext } from '../../Context/authContext';




const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ExistaddressList = ({ navigation, handleCreateOrder }) => {


    const { token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [addressListData, setAddressListData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
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
    }, []);


    return (
        <View>
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

            ) : Array.isArray(addressListData) && addressListData.length > 0 ? (

                addressListData.map((address, index) => (
                    <View key={index} style={styles.orderdetailsContainer}>
                        <View>
                            <Text style={styles.detailText}>
                                <Text style={styles.boldText}>Name:</Text> {address.first_name}
                            </Text>

                            <Text style={styles.detailText}>
                                <Text style={styles.boldText}>Mobile:</Text> {address.primary_phone}
                            </Text>

                            <Text style={styles.detailText}>
                                <Text style={styles.boldText}>Address:</Text>

                                <Text style={{ fontWeight: 'bold' }}> {address.street_address}</Text>
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => handleCreateOrder(address.id)}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#d81397', '#0d5cc2']}
                                style={styles.detailsButton}
                            >
                                <Text style={styles.detailsButtonText}>Continue with this address</Text>
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
        </View>




    );
};

const styles = StyleSheet.create({

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
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1
    },
    noDataImage: {
        width: 180,
        height: 180,
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

export default ExistaddressList;
