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


const InternationalShipmentPackageInformation = ({ navigation, }) => {



    const [numberOfBoxes, setNumberOfBoxes] = useState(0)
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(1);
    const [width, setWidth] = useState(1);
    const [depth, setDepth] = useState(1);

    const handleIncrement = (setter) => setter((prev) => prev + 0.5);
    const handleDecrement = (setter) => setter((prev) => (prev > 1 ? prev - 0.5 : prev));

    //const[itemsData,setItemData]=useState([])
    const [remark, setRemark] = useState('');
    const [errors, setErrors] = useState([]);
    const [items, setItems] = useState([
        {
            itemName: '',
            itemType: 0,
            price: 0,
            totalPrice: 0,
            quantity: 0,

        }
    ]);


    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
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
                price: 0,
                totalPrice: 0,
                quantity: 0,

            }
        ]);
    };

    const validateFields = () => {
        let isValid = true;
        const newErrors = items.map(item => {
            let itemErrors = {};
            if (numberOfBoxes === 0) {
                itemErrors.numberOfBoxes = "Number of boxes is required";
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
            if (!item.quantity) {
                itemErrors.quantity = "Quantity is required";
                isValid = false;
            }
            if (!item.price) {
                itemErrors.price = "Price is required";
                isValid = false;
            }
            return itemErrors;
        });

        setErrors(newErrors);
        return isValid;
    };



    const handleNext = () => {
        if (validateFields()) {
            navigation.navigate('InternationalShipmentDestinationAddress');
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
                            value={numberOfBoxes}
                            //value={item.itemName}
                            onChangeText={(value) => setNumberOfBoxes(value)}


                        />
                    </View>
                    

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>weight of Package*.In KG</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter item name"

                            value={weight}
                            onChangeText={(value) => setWeight(value)}


                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Height (in cm):</Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleDecrement(setHeight)} style={styles.button}>
                                <Text style={styles.buttonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.value}>{height}</Text>
                            <TouchableOpacity onPress={() => handleIncrement(setHeight)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Width(in cm)</Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleDecrement(setWidth)} style={styles.button}>
                                <Text style={styles.buttonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.value}>{width}</Text>
                            <TouchableOpacity onPress={() => handleIncrement(setWidth)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Depth(in cm)</Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleDecrement(setDepth)} style={styles.button}>
                                <Text style={styles.buttonText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.value}>{depth}</Text>
                            <TouchableOpacity onPress={() => handleIncrement(setDepth)} style={styles.button}>
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
                                    value={item.itemName}
                                    onChangeText={(value) => handleInputChange(index, 'itemName', value)}

                                />
                            </View>
                            {errors[index]?.itemType && <Text style={styles.errorText}>{errors[index].itemType}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Item Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Item Name"
                                    value={item.store}
                                    onChangeText={(value) => handleInputChange(index, 'store', value)}
                                />

                            </View>
                            {errors[index]?.itemName && <Text style={styles.errorText}>{errors[index].itemName}</Text>}

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Quantity*</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholder="1"
                                    value={item.quantity}
                                    onChangeText={(value) => handleInputChange(index, 'quantity', value)}
                                />
                            </View>
                            {errors[index]?.quantity && <Text style={styles.errorText}>{errors[index].quantity}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Price* (INR)</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    value={item.price}
                                    onChangeText={(value) => handleInputChange(index, 'price', value)}
                                />
                            </View>

                            {errors[index]?.price && <Text style={styles.errorText}>{errors[index].price}</Text>}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Total Price*</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholder="0"
                                    value={item.price}
                                    onChangeText={(value) => handleInputChange(index, 'price', value)}
                                />
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
                        <Text style={styles.grandTotal}>Total Invoice Value: {items.reduce((total, item) => total + (parseFloat(item.price) * parseInt(item.quantity || 0)), 0)}</Text>
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
