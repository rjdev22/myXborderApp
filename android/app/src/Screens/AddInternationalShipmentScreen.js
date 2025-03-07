import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    copyToClipboard,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../Components/Common/Layout';
import DropDown from '../Components/Common/DropDown';
import { get_courier_types,get_order_types } from '../services/apiServices';



const AddInternationalShipmentScreen = ({ navigation }) => {


    const [errors, setErrors] = useState([]);
    const[courierType,setCourierType]=useState([]);
    const[orderType,setOrderType]=useState([]);
    


    useEffect(() => {
        
        const courier_types = async () => {
            try {
                const response = await fetch(get_courier_types, {
                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
                    },
                    
                })
                const data = await response.json();
                setCourierType(data.data);
                //console.log("laveee", courierData)
                console.log('Courier api response', data);
                
            }
            catch(error) {
                console.log(error);
                
            }
        }
        const order_types = async () => {
            try {
                const response = await fetch(get_order_types, {
                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo'
                    },
                    
                })
                const data = await response.json();
                setOrderType(data.data);
                console.log('order api response', data);

            }
            catch(error) {
                console.log(error);
                
            }
        }
        courier_types();
        order_types();
        
    }, [])
    
   
   const [selectedOrderType, setSelectedOrderType] = useState('');
   const[selectedCourierType,setSelectedCourierType]=useState('');
   const[ClientOrderId, setClientOrderId] = useState('');
   


    const validateFields = () => {
        let newErrors = {};

        if (!selectedOrderType) {
            newErrors.selectedOrderType = "*Order Type is required";
        }
        if (!selectedCourierType) {
            newErrors.selectedCourierType = "*Courier Type is required";
        }
        // if (!formData.clientOrderId.trim()) {
        //     newErrors.clientOrderId = "Client Order ID is required";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateFields()) {
            console.log("Form Data:", selectedCourierType,selectedOrderType,ClientOrderId);
            navigation.navigate('InternationalShipmentPickupAddress',{selectedCourierType:selectedCourierType,selectedOrderType:selectedOrderType,ClientOrderId:ClientOrderId});
        }
    };

    return (

        <Layout>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 30, marginTop: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Add Order Details</Text>
            </View>

            {/* Order Type Dropdown */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Order Type*</Text>
                <DropDown
                    items={orderType.map(item => item.name)}
                    initialValue={selectedOrderType}
                    label="Please select Order Type"
                   onChange={(value) => setSelectedOrderType(value)}
                />
                {errors.orderType && <Text style={styles.errorText}>{errors.orderType}</Text>}
            </View>

            {/* Courier Type Dropdown */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Courier Type*(click here for shipping rates)</Text>
                <DropDown
                    items={courierType.map(item => item.name)}
                    initialValue={selectedCourierType}
                    label="Please select Courier Type"
                    onChange={(value) => setSelectedCourierType(value)}
                    //onSelect={(value) => setFormData({ ...formData, courierType: value })}
                />
                {errors.courierType && <Text style={styles.errorText}>{errors.courierType}</Text>}
            </View>

            {/* Client Order ID Input */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Client Order ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Client Order ID"
                    value={ClientOrderId}
                    onChangeText={text => setClientOrderId(text)}
                  
                />
            </View>

            {/* Next Button */}
            <View style={{flex:1,justifyContent:'flex-end'}} >
                <TouchableOpacity onPress={handleNext}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}     colors={['#d81397', '#0d5cc2']} style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </Layout>
    );
};

const styles = StyleSheet.create({

    content: {
        paddingHorizontal: 15,
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 16,
        marginBottom: 10,
    },
    grandTotal: { fontSize: 16 },
    nextButton: {
        paddingVertical: 5,
        borderRadius: 5,
        padding: 10,
        width: 130,
        flex: 1,
        alignContent: 'right',
        justifyContent: 'flex-end',
        alignItems: 'right'
    },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 12, color: "#000", marginBottom: 5 },
    input: {
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
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
        borderRadius: 10,
        elevation: 3,
        marginBottom: 10,
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
    errorText:{
        color:'red',
        fontSize:12
    }

});

export default AddInternationalShipmentScreen;
