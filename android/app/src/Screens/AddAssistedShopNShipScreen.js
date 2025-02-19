
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

const AddAssistedShopNShipScreen = ({ navigation }) => {
    const [items, setItems] = useState([{ id: 1 }]); // State for order items

    const addNewItem = () => {
        setItems([...items, { id: items.length + 1 }]); // Add new item
    };

    return (
        <Layout>
            <View style={styles.container}>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.inputGroup}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Add Order Item</Text>
                    </View>

                    {items.map((item, index) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Item Type*</Text>
                                <TextInput style={styles.input} placeholder="Enter item type" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Item Name*</Text>
                                <TextInput style={styles.input} placeholder="Enter item name" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Online Store</Text>
                                <TextInput style={styles.input} placeholder="Amazon, Flipkart" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Online Store Id</Text>
                                <TextInput style={styles.input} placeholder="Store Id" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Color</Text>
                                <TextInput style={styles.input} placeholder="Color" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Size</Text>
                                <TextInput style={styles.input} placeholder="Size" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Quantity*</Text>
                                <TextInput style={styles.input} keyboardType="numeric" placeholder="1" />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Price* (INR)</Text>
                                <TextInput style={styles.input} keyboardType="numeric" placeholder="0" />
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.addItemButton} onPress={addNewItem}>
                        <Text style={styles.addItemText}>+ Add More Item</Text>
                    </TouchableOpacity>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Remarks</Text>
                        <TextInput style={styles.input} placeholder="Add Remarks" />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.grandTotal}>Grand Total: 0</Text>
                        <LinearGradient colors={['#ff0080', '#1e7fca']} style={styles.nextButton}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </LinearGradient>
                    </View>
                </ScrollView>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff',marginTop:10 },
    content: { paddingHorizontal: 15 },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 12, color: "#000", marginBottom: 5, padding: 10 },
    input: {
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
    },
    itemContainer: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20
    },
    addItemButton: { alignSelf: "flex-end", marginTop: 5 },
    addItemText: { color: "#ff0080", fontSize: 14, fontWeight: "bold" },
    footer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    grandTotal: { fontSize: 16 },
    nextButton: { paddingVertical: 5, borderRadius: 8, padding: 10, width: 130 },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});

export default AddAssistedShopNShipScreen;
