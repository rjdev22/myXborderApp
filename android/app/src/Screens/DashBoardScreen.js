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
import Toast from 'react-native-simple-toast';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const DashBoardScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    const addressData = {
        Name: "test test2",
        AddressLine1: "66 /16, The Mall Road USR1267",
        Landmark: "Near Police Station",
        Zipcode: "208001",
        State: "Uttar Pradesh",
        City: "Kanpur",
        PhoneNumber: "721170063",
    };

    const copy = (text) => {
        Clipboard.setString(text);
        Toast.show("Copied to clipboard", Toast.SHORT);
    };

    return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Profile Card */}
            <View style={styles.profileCard}>
                <ShimmerPlaceholder visible={!isLoading} style={styles.imagePlaceholder}>
                    <Image source={require('../assets/user.png')} style={styles.profileHorizontal} />
                </ShimmerPlaceholder>
                <View>
                    <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                        <Text style={styles.profileDetails}>test user</Text>
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                        <Text style={styles.profileDetails}>UniqueId: tset@yopmail.com</Text>
                    </ShimmerPlaceholder>
                </View>
            </View>

            {/* Orders Section */}
            <View style={styles.ordersSection}>
                {["Shop N Ship", "Assisted Shop N Ship", "International Shipment"].map((order, index) => (
                    <View key={index} style={styles.orderRow}>
                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                        <Text style={styles.orderText} >Assisted Shop N Ship</Text>
                            <Text style={styles.orderText}>{order}</Text>
                        </ShimmerPlaceholder>
                        <TouchableOpacity onPress={() => navigation.navigate('AddAssistedShopNShipScreen')}>  
                            <LinearGradient colors={['#ff0080', '#1e7fca']} style={styles.orderButton}>
                                <Text style={styles.orderButtonText}>Create Order</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Address Section */}
            <View style={styles.addressCard}>
                <Text style={styles.headerText}>Your Virtual Address</Text>
                {Object.entries(addressData).map(([key, value]) => (
                    <View key={key} style={styles.addressRow}>
                        <ShimmerPlaceholder visible={!isLoading} style={styles.textPlaceholder}>
                            <Text style={styles.addressLabel}>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
                        </ShimmerPlaceholder>
                        <TouchableOpacity onPress={() => copy(value)}>
                            <Icon name="clone" color="black" style={styles.copyIcon} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    profileHorizontal: { width: 70, height: 70, borderRadius: 45, marginRight: 20 },
    imagePlaceholder: { width: 70, height: 70, borderRadius: 45 },
    textPlaceholder: { width: 150, height: 16, marginBottom: 5 },
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
    orderButton: { padding: 5, borderRadius: 5, paddingHorizontal: 20 },
    orderButtonText: { color: 'white', fontWeight: 'bold' },
    addressCard: { backgroundColor: 'white', padding: 10, borderRadius: 5, elevation: 3, marginTop: 10 },
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
    addressLabel: { fontSize: 14, color: "#666" },
    copyIcon: { fontSize: 12, marginLeft: 10 },
    headerText: { fontSize: 16, marginBottom: 10 }
});

export default DashBoardScreen;




// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//    Clipboard
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import LinearGradient from 'react-native-linear-gradient';
// import Layout from '../Components/Common/Layout';
// import Toast from 'react-native-simple-toast';

// const DashBoardScreen = ({ navigation }) => {
//     const addressData = {
//         Name: "test test2",
//         AddressLine1: "66 /16, The Mall Road USR1267",
//         Landmark: "Near Police Station",
//         Zipcode: "208001",
//         State: "Uttar Pradesh",
//         City: "Kanpur",
//         PhoneNumber: "721170063",
//     };

//     const copy = (text) => {
//         Clipboard.setString(text);
//         Toast.show("Copied to clipboard", Toast.SHORT);
//         //alert("Copied to clipboard!");
//     };

//     return (
      
//             <ScrollView style={styles.content}
//                 showsVerticalScrollIndicator={false}
//                 showsHorizontalScrollIndicator={false}>
//                 {/* Profile Card */}
//                 <View style={styles.profileCard}>
//                     <Image
//                         source={require('../assets/user.png')}
//                         style={styles.profileHorizontal}
//                     />

//                     <View>
//                         <Text style={styles.profileDetails}>tset user</Text>
//                         <Text style={styles.profileDetails}>UniqueId: tset@yopmail.com</Text>
//                         <Text style={styles.profileDetails}><Icon name="phone" size={16} color="black" /> 243435</Text>
//                         <Text style={styles.profileDetails}><Icon name="envelope" size={16} color="black" /> tsetset@yopmail.com</Text>
//                     </View>
//                 </View>

//                 {/* Orders Section */}
//                 <View style={styles.ordersSection}>
//                     <View style={styles.orderRow}>

//                         <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'ShopNShipScreen' })}>
//                             <Text style={styles.orderText} >Shop N Ship</Text>
//                             <Text>Total Orders: <Text style={{ color: '#ff0080', }}>(2)</Text></Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AddShopNShipScreen' })}>
//                             <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ff0080', '#1e7fca']} style={styles.orderButton}>
//                                 <Text style={styles.orderButtonText}>Create Order</Text>
//                             </LinearGradient>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.orderRow}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AssistedShopNShipScreen' })}>
//                             <Text style={styles.orderText} >Assisted Shop N Ship</Text>
//                             <Text>Total Orders: <Text style={{ color: '#ff0080', }}>(2)</Text></Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AddAssistedShopNShipScreen' })}>
//                             <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ff0080', '#1e7fca']} style={styles.orderButton}>
//                                 <Text style={styles.orderButtonText}>Create Order</Text>
//                             </LinearGradient>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.orderRowlast}>

//                         <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'InternationalShipmentScreen' })}>
//                             <Text style={styles.orderText} >International Shipment</Text>
//                             <Text>Total Orders: <Text style={{ color: '#ff0080', }}>(2)</Text></Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AddInternationalShipmentScreen' })}>
//                             <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ff0080', '#1e7fca']} style={styles.orderButton}>
//                                 <Text style={styles.orderButtonText}>Create Order</Text>
//                             </LinearGradient>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={styles.addressCard}>
//                     <Text style={styles.headerText}>Your Virtual Address</Text>

//                     {Object.entries(addressData).map(([key, value]) => (
//                         <View key={key} style={styles.addressRow}>
//                             <View>
//                                 <Text style={styles.addressLabel}>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
//                                 <View style={styles.copyRow}>
//                                     <Text style={styles.addressValue}>{value}</Text>
//                                 </View>
//                             </View>
//                             <TouchableOpacity onPress={() => copy(value)}>
//                                 <Icon name="clone" color="black" style={styles.copyIcon} />
//                             </TouchableOpacity>
//                         </View>
//                     ))}
//                 </View>

//             </ScrollView  >
//     );
// };

// const styles = StyleSheet.create({

//     profileHorizontal: { width: 70, height: 70, resizeMode: 'contain', borderRadius: 45, marginRight: 20 },
//     content: { padding: 10 },
//     profileCard: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         padding: 15,
//         borderRadius: 5,
//         elevation: 3,
//         marginBottom: 10,
//     },
//     profileImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: '#ddd',
//         marginRight: 10,
//     },
//     profileName: { fontSize: 18, fontWeight: 'bold' },
//     profileDetails: { fontSize: 14, color: 'black', fontWeight: 'bold' },
//     ordersSection: { backgroundColor: 'white', padding: 10, borderRadius: 5, elevation: 3 },
//     orderRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginVertical: 5,
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//     },
//     orderRowlast: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginVertical: 5,
//         paddingVertical: 10,

//     },
//     orderText: { fontSize: 16, color: 'black' },
//     orderButton: {
//         padding: 5,
//         borderRadius: 5,
//         paddingHorizontal: 20
//     },
//     orderButtonText: { color: 'white', fontWeight: 'bold' },
//     addressCard: {
//         backgroundColor: 'white',
//         padding: 10,
//         borderRadius: 5,
//         elevation: 3,
//         marginTop: 10,
//         marginBottom: 25,
//         paddingBottom: 10,

//     },
//     sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
//     addressText: { fontSize: 14, color: 'gray' },
//     addressValue: { fontSize: 16, color: 'black' },
   
//     tab: { alignItems: 'center' },

//     headerText: {
//         fontSize: 16,
//         //fontWeight: "bold",
//         marginBottom: 10,
//     },
//     addressRow: {
//         marginBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingRight: 10,
//         paddingBottom: 10

//     },
//     addressLabel: {
//         fontSize: 14,
//         color: "#666",
//     },
//     copyRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     addressValue: {
//         fontSize: 16,
//         // fontWeight: "bold",
//     },
//     copyIcon: {
//         fontSize: 12,
//         marginLeft: 10,
//     },
// });

// export default DashBoardScreen;
