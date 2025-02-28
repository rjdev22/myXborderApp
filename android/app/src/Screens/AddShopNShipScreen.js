import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../Components/Common/Layout';
import DropDown from '../Components/Common/DropDown';

const AddShopNShipScreen = ({ navigation }) => {
    const [remark, setRemark] = useState('');
    const [items, setItems] = useState([
        {
            id: 1,
            itemName: '',
            itemType: '',
            store: '',
            trackingNumber: '',
            color: '',
            size: '',
            price: '',
            quantity: '',

        }
    ]);
    console.log({ additems: items });
    const itemsData = [
        "Liquid", "Cosmetic", "Toys", "Shoes", "Men Clothing",
        "Women Clothing", "Men Shoe", "Women Dress", "Electronics",
        "Artificial Jewelry", "Women Saree", "Women Gowen",
        "Men Shirts", "Men T-Shirt", "Sandal"
    ];

    // Function to handle input changes
    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    // Add new item
    const addNewItem = () => {
        setItems([
            ...items,
            {
                // id: items.length + 1,
                itemName: '',
                itemType: '',
                store: '',
                trackingNumber: '',
                color: '',
                size: '',
                price: '',
                quantity: '',

            }
        ]);
    };

    // Logging formatted data
    console.log("Formatted Data:", { additems: items });

    return (
        <Layout>
            <View style={styles.container}>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.heading}>Add Order Item</Text>
                    </View>

                    {items.map((item, index) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Item Type*</Text>
                                <DropDown
                                    style={styles.input}
                                    items={itemsData}
                                    initialValue={item.itemType}
                                    onChange={(value) => handleInputChange(index, 'itemType', value)}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Item Name*</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter item name"
                                    value={item.itemName}
                                    onChangeText={(value) => handleInputChange(index, 'itemName', value)}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Online Store</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Amazon, Flipkart"
                                    value={item.store}
                                    onChangeText={(value) => handleInputChange(index, 'store', value)}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Tracking Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tracking Number"
                                    value={item.trackingNumber}
                                    onChangeText={(value) => handleInputChange(index, 'trackingNumber', value)}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Color</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Color"
                                    value={item.color}
                                    onChangeText={(value) => handleInputChange(index, 'color', value)}
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Size</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Size"
                                    value={item.size}
                                    onChangeText={(value) => handleInputChange(index, 'size', value)}
                                />
                            </View>
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
                        </View>
                    ))}

                    <TouchableOpacity style={styles.addItemButton} onPress={addNewItem}>
                        <Text style={styles.addItemText}>+ Add More Item</Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>Remarks</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Add Remarks"
                        value={remark}
                        onChangeText={setRemark}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.grandTotal}>Grand Total: {items.reduce((total, item) => total + (parseFloat(item.price) * parseInt(item.quantity || 0)), 0)} INR</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ShopNshipShipmentAddress', { additems: items, remark: remark })}>
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
    label: { fontSize: 12, color: "#000", marginBottom: 5, padding: 10 },
    input: { borderColor: "#ccc", borderRadius: 8, padding: 10, fontSize: 16, borderBottomColor: '#ccc', borderBottomWidth: 0.5 },
    itemContainer: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 5, marginTop: 10, marginBottom: 20 },
    addItemButton: { alignSelf: "flex-end", marginTop: 5 },
    addItemText: { color: "#d81397", fontSize: 14, fontWeight: "bold" },
    footer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 ,marginTop: 20},
    grandTotal: { fontSize: 16 },
    nextButton: { paddingVertical: 5, borderRadius: 8, padding: 10, width: 130 },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default AddShopNShipScreen;
