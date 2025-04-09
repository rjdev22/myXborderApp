import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CreateNewAddressURl } from '../../services/apiServices';
import Loader from '../../Components/Modals/Loader';
import { Toast } from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/authContext';
import { set } from 'react-native-reanimated';




const CreateNewAddress = ({ orderUrl,orderSubType,courierType,remark,additems }) => {

    const navigation = useNavigation();
    const { token } = useContext(AuthContext);
    const [id, setId] = useState('');
    console.log('create address url', CreateNewAddressURl)

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        areaCode: '',
        gateCode: '',
        streetAddress: '',
        primaryPhone: '',
        city: '',
        state: '',
        country: '',
        pin: '',
    });
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        let tempErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) tempErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
        });
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };



    const handleSaveButton = async () => {
       // if (!validateForm()) return;
        console.log('formdata', formData)
        console.log('token', token)
       setIsLoading(true);
        try {
            const response = await fetch(CreateNewAddressURl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
                
            });


            // if (!response.ok) {
            //     // API returned an error, log it
            //     const errorText = await response.text();
            //     throw new Error(`HTTP Error ${response.status}: ${errorText}`);
            // }

       console.log("response....",response)     
       setIsLoading(false)
            return
            const data = await response.json();
            console.log('Create address response:', data);
            if (data.status === true) {
                // setIsLoading(false)
                setId(data.data.id)
                console.log('address id', id)

                try {
                    setIsLoading(true);
                    const response = await fetch(orderUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            orderSubType: orderSubType,
                            courierType: courierType,
                            addressId: id,
                            remark: remark,
                            chat: "Please deliver fast",
                            assestedPrice: 3000,
                            additems: additems
                        })
                    });
                    const data = await response.json();
                    console.log('Create order response:', data);
                    if (data.status === true)
                        navigation.navigate('DashBoardScreen')
                    Toast.show(data.message, { type: 'success', style: { width: 500 } });
                    setIsLoading(false)

                } catch (error) {
                    console.error('Error:', error);
                    setIsLoading(false)

                }
            }

        } catch (error) {
            console.error('Error///:', error);
            setIsLoading(false)
        }
    };







    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
        
    <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name*</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter First Name"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
        />
    </View>
         {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
    
    <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name*</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
        />
    </View>
    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

   

    <View style={styles.inputGroup}>
        <Text style={styles.label}> Apt., Suite,Gate Code(optional)</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter Gate Code"
            value={formData.gateCode}
            onChangeText={(value) => handleInputChange('gateCode', value)}
        />
    </View>
   

    <View style={styles.inputGroup}>
        <Text style={styles.label}>Street Address*</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter Street Address"
            value={formData.streetAddress}
            onChangeText={(value) => handleInputChange('streetAddress', value)}
        />
    </View>
    {errors.streetAddress && <Text style={styles.errorText}>{errors.streetAddress}</Text>}

    <View style={styles.inputGroup}>
        <Text style={styles.label}>Primary Phone*</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter Primary Phone"
            value={formData.primaryPhone}
            onChangeText={(value) => handleInputChange('primaryPhone', value)}
        />
    </View>
        {errors.primaryPhone && <Text style={styles.errorText}>{errors.primaryPhone}</Text>}

    <View style={styles.inputGroup}>
        <Text style={styles.label}>City*</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter City"
            value={formData.city}
            onChangeText={(value) => handleInputChange('city', value)}
        />
    </View>
    {errors.city&& <Text style={styles.errorText}>{errors.city}</Text>}

    <View style={styles.inputGroup}>
        <Text style={styles.label}>State*</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter State"
            value={formData.state}
            onChangeText={(value) => handleInputChange('state', value)}
        />
    </View>
    {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

    <View style={styles.inputGroup}>
        <Text style={styles.label}>Country*</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter Country"
            value={formData.country}
            onChangeText={(value) => handleInputChange('country', value)}
        />
    </View>
    {errors.country&& <Text style={styles.errorText}>{errors.country}</Text>}

    <View style={styles.inputGroup}>
        <Text style={styles.label}>Zip Code*</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter Pin Code"
            value={formData.pin}
            onChangeText={(value) => handleInputChange('pin', value)}
        />

</View>
{errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
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
    errorText: { color: 'red', fontSize: 12 }
});

export default CreateNewAddress