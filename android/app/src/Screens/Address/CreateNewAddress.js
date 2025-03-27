import React, { useState,useContext } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CreateNewAddressURl } from '../../services/apiServices';
import Loader from '../../Components/Modals/Loader';
import { Toast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/authContext';




const CreateNewAddress = () => {

    const navigation = useNavigation();
    const {token} = useContext(AuthContext);
    console.log('create address url', CreateNewAddressURl)

    const [isLoading, setIsLoading] = useState(false);

    const handleSaveButton = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(CreateNewAddressURl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: "ved",
                    lastName: "Doe",
                    companyName: "ABC Corp",
                    areaCode: "12345",
                    gateCode: "6789",
                    futherUse: "Office",
                    streetAddress: "123 Main Street",
                    primaryPhone: "9876543210",
                    city: "New York",
                    state: "NY",
                    country: "INDIA",
                    pin: "10001"
                })
            });

            if (!response.ok) {
                // API returned an error, log it
                const errorText = await response.text();
                throw new Error(`HTTP Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Create address response:', data);
            if (data.status === true) {
                setIsLoading(false)
                navigation.navigate('ShopNshipScreen');
                Toast.show('order created successfully', { type: 'success',style: { width:500}})
            }


        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false)
        }
    };







    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                {/* <View style={styles.inputGroup}>
                    <Text style={styles.label}>Item Type*</Text>
                    <DropDown
                        style={styles.input}
                        items={itemsData}
                        initialValue={item.itemType}
                        onChange={(value) => handleInputChange(index, 'itemType', value)}
                    />
                </View> */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>First Name*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter FirstName"
                    // value={item.itemName}
                    //onChangeText={(value) => handleInputChange(index, 'itemName', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Last Name*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter LastName"
                    // value={item.store}
                    //onChangeText={(value) => handleInputChange(index, 'store', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Phone"
                    //value={item.trackingNumber}
                    //onChangeText={(value) => handleInputChange(index, 'trackingNumber', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Street Address*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Street Address"
                    //value={item.color}
                    //onChangeText={(value) => handleInputChange(index, 'color', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Size</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Size"
                    //value={item.size}
                    //onChangeText={(value) => handleInputChange(index, 'size', value)}
                    />
                </View>
                <Text style={{ fontSize: 12, padding: 10 }}>Apt,suit,Bidg,Gate code(Optinol)</Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>City*</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Enter City"
                    // value={item.quantity}
                    //onChangeText={(value) => handleInputChange(index, 'quantity', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>State*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter State"

                    //  value={item.price}
                    //onChangeText={(value) => handleInputChange(index, 'price', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Country*</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Please Select Country"
                    //  value={item.price}
                    //onChangeText={(value) => handleInputChange(index, 'price', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Zipcode*</Text>
                    <TextInput
                        style={styles.input}

                        placeholder="Enter Zipcode"
                    //  value={item.price}
                    //onChangeText={(value) => handleInputChange(index, 'price', value)}
                    />
                </View>
            </View>
            <View style={styles.footer}>

                <TouchableOpacity onPress={handleSaveButton} >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#d81397', '#0d5cc2']}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Loader visible={isLoading} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    //content: { paddingHorizontal: 15 },
    heading: { fontSize: 16, fontWeight: 'bold', paddingBottom: 15, paddingTop: 5 },
    inputGroup: { marginBottom: 10, borderBottomColor: '#dedede', borderBottomWidth: 1 },
    label: { fontSize: 12, color: "#000", marginBottom: 0, padding: 10 },
    input: { borderColor: "#ccc", borderRadius: 8, padding: 10, fontSize: 16, borderBottomColor: '#ccc', borderBottomWidth: 0.5 },
    itemContainer: { padding: 10, borderRadius: 5, marginBottom: 20 },
    addItemButton: { alignSelf: "flex-end", marginTop: 5 },
    addItemText: { color: "#d81397", fontSize: 14, fontWeight: "bold" },
    footer: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 20, },
    grandTotal: { fontSize: 16 },
    saveButton: { paddingVertical: 5, borderRadius: 5, padding: 10, width: 130 },
    saveButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },
});

export default CreateNewAddress