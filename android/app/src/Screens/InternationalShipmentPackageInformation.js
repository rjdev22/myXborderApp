import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../Components/Common/Layout';
import DropDown from '../Components/Common/DropDown';
import { get_item_types } from '../services/apiServices';


const InternationalShipmentPackageInformation = ({ navigation, route }) => {
    console.log('route data-', route.params);
    const pickupData = route.params;



    const [packageBoxes, setPackageBoxes] = useState(0)
    const [packageWeight, setPackageWeight] = useState(0)
    const [packageHeight, setPackageHeight] = useState(1);
    const [PackageWidth, setPackageWidth] = useState(1);
    const [PackageDepth, setPackageDepth] = useState(1);


    const handleIncrement = (setter) => setter((prev) => prev + 0.5);
    const handleDecrement = (setter) => setter((prev) => (prev > 1 ? prev - 0.5 : prev));

    //const[itemsData,setItemData]=useState([])
    const [remark, setRemark] = useState('');
    const [errors, setErrors] = useState([]);
    const [items, setItems] = useState([
        {
            itemName: '',
            itemType: 0,
            itemPrice: 0,
            itemTotalPrice: 0,
            itemQuantity: 0,

        }
    ]);
    
    
    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        if (field === 'itemPrice' || field === 'itemQuantity') {
            const price = parseFloat(updatedItems[index].itemPrice) || 0;
            const quantity = parseInt(updatedItems[index].itemQuantity) || 0;
            updatedItems[index].itemTotalPrice = price * quantity;
        }
        
        
        
        setItems(updatedItems);
        
        setErrors(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (value) updatedErrors[index] = { ...updatedErrors[index], [field]: '' };
            return updatedErrors;
        });
    };
    
    // Add new item
    const addNewItem = () => {
        setItems([
            ...items,
            {
                // id: items.length + 1,
                itemName: '',
                itemType: 0,
                itemPrice: 0,
                itemTotalPrice:0,
                itemQuantity: 0,

            }
        ]);
    };
    
    console.log('data', packageBoxes, packageHeight, packageWeight, PackageWidth, PackageDepth, items, pickupData);
    const validateFields = () => {
        let isValid = true;
        const newErrors = items.map(item => {
            let itemErrors = {};
            if (packageBoxes === 0) {
                itemErrors.packageBoxes = "Number of boxes is required";
                isValid = false;
            }

            if (!item.itemName) {
                itemErrors.itemName = "Item name is required";
                isValid = false;
            }
            if (!item.itemType) {
                itemErrors.itemType = "Item type is required";
                isValid = false;
            }
            if (!item.itemQuantity) {
                itemErrors.itemQuantity = "Quantity is required";
                isValid = false;
            }
            if (!item.itemPrice) {
                itemErrors.itemPrice = "Price is required";
                isValid = false;
            }
            return itemErrors;
        });

        setErrors(newErrors);
        return isValid;
    };



    const handleNext = () => {
        if (validateFields()) {
            navigation.navigate('InternationalShipmentDestinationAddress', { packageBoxes, packageHeight, packageWeight, PackageWidth, PackageDepth, items, pickupData });
        }
    };


    return (
        <Layout>
            <View style={styles.container}>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* <View style={styles.inputGroup}>
                        <Text style={styles.heading}>Package Information</Text>
                    </View> */}  <View style={styles.topHeader}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Package Information</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/back.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>No of Boxes*.In number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter item name"
                            value={packageBoxes}
                            //value={item.itemName}
                            onChangeText={(value) => setPackageBoxes(value)}


                        />
                    </View>
                    


                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>weight of Package*.In KG</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter item name"

                            value={packageWeight}
                            onChangeText={(value) => setPackageWeight(value)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Height (in cm):</Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleDecrement(setPackageHeight)} style={styles.button}>
                                <Text style={styles.buttonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.value}>{packageHeight}</Text>
                            <TouchableOpacity onPress={() => handleIncrement(setPackageHeight)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Width(in cm)</Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleDecrement(setPackageWidth)} style={styles.button}>
                                <Text style={styles.buttonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.value}>{PackageWidth}</Text>
                            <TouchableOpacity onPress={() => handleIncrement(setPackageWidth)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Depth(in cm)</Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleDecrement(setPackageDepth)} style={styles.button}>
                                <Text style={styles.buttonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.value}>{PackageDepth}</Text>
                            <TouchableOpacity onPress={() => handleIncrement(setPackageDepth)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    {items.map((item, index) => (
                        <View key={item.id} style={styles.itemContainer}>
                            {/* <View style={styles.inputGroup}>
                                <Text style={styles.label}>Item Type*</Text>
                                <DropDown
                                    style={styles.input}
                                    items={itemTypes}
                                     label="Please select Item Type"
                                    initialValue={item.itemType}
                                    onChange={(value) => handleInputChange(index, 'itemType', value)}
                                />
                            </View>
                                  {errors[index]?.itemType && <Text style={styles.errorText}>{errors[index].itemType}</Text>} */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Item Type*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter item name"
                                    value={item.itemType}
                                    onChangeText={(value) => handleInputChange(index, 'itemType', value)}

                                />
                            </View>
                            {errors[index]?.itemType && <Text style={styles.errorText}>{errors[index].itemType}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Item Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Item Name"
                                    value={item.itemName}
                                    onChangeText={(value) => handleInputChange(index, 'itemName', value)}
                                />

                            </View>
                            {errors[index]?.itemName && <Text style={styles.errorText}>{errors[index].itemName}</Text>}

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Quantity*</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholder="1"
                                    value={item.itemQuantity}
                                    onChangeText={(value) => handleInputChange(index, 'itemQuantity', value)}
                                />
                            </View>
                            {errors[index]?.itemQuantity && <Text style={styles.errorText}>{errors[index].itemQuantity}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Price* (INR)</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    value={item.itemPrice}
                                    onChangeText={(value) =>
                                         handleInputChange(index, 'itemPrice', value)
                
                                        }
                                />
                            </View>

                            {errors[index]?.itemPrice && <Text style={styles.errorText}>{errors[index].itemPrice}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Total Price*</Text>
                                <Text
                                    style={styles.input}
                                >
                                 {item.itemPrice*item.itemQuantity}
                                </Text>

                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.addItemButton} onPress={addNewItem}>

                        <Text style={styles.addItemText}>+ Add More Item</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.label}>Remarks</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Add Remarks"
                        value={remark}
                        onChangeText={setRemark}
                    /> */}

                    <View style={styles.footer}>
                        <Text style={styles.grandTotal}>Total Invoice Value: {items.reduce((total, item) => total + (parseFloat(item.itemPrice) * parseInt(item.itemQuantity || 0)), 0)}</Text>
                        <TouchableOpacity onPress={handleNext}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#d81397', '#0d5cc2']}
                                style={styles.nextButton}
                            >
                                <Text style={styles.nextButtonText}>Next</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', marginTop: 10 },
    content: { paddingHorizontal: 15 },
    heading: { fontSize: 16, fontWeight: 'bold', paddingBottom: 15, paddingTop: 5 },
    inputGroup: { marginBottom: 15, borderBottomColor: '#dedede', borderBottomWidth: 1 },
    label: { fontSize: 12, color: "#000", padding: 10 },
    input: { borderColor: "#ccc", borderRadius: 8, padding: 10, fontSize: 16, borderBottomColor: '#ccc', borderBottomWidth: 0.5 },
    itemContainer: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 5, marginTop: 10, marginBottom: 20 },
    addItemButton: { alignSelf: "flex-end", marginTop: 5 },
    addItemText: { color: "#d81397", fontSize: 14, fontWeight: "bold" },
    footer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, marginTop: 20 },
    grandTotal: { fontSize: 16 },
    nextButton: { paddingVertical: 5, borderRadius: 5, padding: 10, width: 130 },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
    errorText: { color: 'red', fontSize: 12 },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBlockColor: '#dedede',
        borderBottomWidth: 1,
        paddingBottom: 15
        ,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 10,
        width: 150,
    },
    buttonText: {
        color: 'white'
    },
    button: {
        backgroundColor: "#000",
        width: 20,
        height: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default InternationalShipmentPackageInformation;
