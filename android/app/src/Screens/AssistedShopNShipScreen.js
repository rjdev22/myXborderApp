import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../Components/Common/Layout';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { AssistedShopNShipOrders } from '../services/apiServices';



const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const AssistedShopNshipScreen = ({ navigation }) => {

    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState([]);

     useEffect(() => {
           async function fetchData() {
               try {
                   const response = await fetch(AssistedShopNShipOrders, {
                       method: 'POST',
                       headers: {
                           'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
                       },
                   })
                   const data = await response.json();
                   console.log(' assisted shop n ship data', data.data.data);
                   setOrderData(data.data.data);
                   setIsLoading(false);

               } catch (error) {
                   console.log(error);
                   setIsLoading(false);
               }

           }
           fetchData();
       }, []);





    return (
        <Layout>
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.content}>


            <View style={styles.searchContainer}>
                <View style={styles.dropdown}>
                    <Text>All orders </Text>  <Icon name="angle-down" size={20} color="gray" style={styles.searchIcon} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        value={query}
                        onChangeText={setQuery}
                    />
                    <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                </View>
            </View>
            <View style={styles.orderContainer}>
                <View style={styles.orderHeader}>
                    <ShimmerPlaceholder visible={!isLoading} style={{ height: 20 }}  >
                        <Text style={styles.orderCount}>No. of Orders: <Text style={{ color: 'red' }}>({orderData.length})</Text></Text>
                    </ShimmerPlaceholder>
                    <TouchableOpacity onPress={() => navigation.navigate('AddAssistedShopNShipScreen')}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#d81397', '#0d5cc2']}
                            style={styles.createOrderButton}>
                            <Text style={styles.createOrderText}>+ Create Order</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>     
            <View>
                {isLoading ? (
                    <View>
                    {[...Array(4)].map((_, index) => (
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
                  
                ) : Array.isArray(orderData) && orderData.length > 0 ? (
                    orderData.map((order, index) => (
                    <View  key={index} style={styles.orderdetailsContainer}>
                        <View>
                            <Text style={styles.detailText}>
                                <Text style={styles.boldText}>Date:</Text> {order.created_at.split('T')[0]}
                            </Text>

                            <Text style={styles.detailText}>
                                <Text style={styles.boldText}>MXB-Order Id:</Text> {order.order_id}
                            </Text>

                            <Text style={styles.detailText}>
                                <Text style={styles.boldText}>Order Type:</Text>
                                <Text style={{ fontWeight: 'bold' }}> {order.orderSubType}</Text>
                            </Text>

                            <Text style={styles.detailText}>
                                <Text style={styles.boldText}>Payment Status:</Text>
                                <Text style={{ fontWeight: 'bold' }}> {order.payment_status}</Text>
                            </Text>
                        </View>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#d81397', '#0d5cc2']}
                            style={styles.detailsButton}
                        >
                            <Text style={styles.detailsButtonText}>Details</Text>
                        </LinearGradient>
                    </View>
                    ))
                ) : (
                    <View style={styles.noDataContainer}>
                        <Image source={require('../assets/empty_box.png')} style={styles.noDataImage} />
                        <Text style={styles.noDataText}>No Orders Available</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    </Layout>
    );
};

const styles = StyleSheet.create({
    content: { padding: 10,},
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 10,
    },
    dropdown: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        width: "50%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        width: "50%",
        height: 50,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 5,
    },
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
    orderText: { fontSize: 16, color: 'black' },
    orderButton: {
        padding: 5,
        borderRadius: 5,
    },
    orderButtonText: { color: 'white', fontWeight: 'bold' },
    addressCard: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        marginTop: 10,
        paddingBottom: 10,

    },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    addressText: { fontSize: 14, color: 'gray' },
    addressValue: { fontSize: 16, color: 'black' },


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
        height: 175,
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
        height: 20
    },
    buttonPlaceholder: {
        marginTop: 7,
        height: 50,
        width: '100%'
    },
    noDataImage: {
        width: 120,
        height: 120,
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

});

export default AssistedShopNshipScreen;
