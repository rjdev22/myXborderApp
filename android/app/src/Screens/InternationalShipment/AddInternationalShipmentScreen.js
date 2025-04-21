import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../../Components/Common/Layout';
import DropDown from '../../Components/Common/DropDown';
import { get_courier_types, get_order_types } from '../../services/apiServices';
import { Checkbox } from 'react-native-paper';
import MedicalItemWarningModal from '../../Components/Modals/MedicalItemWarningModal';
// import DocumentPicker from '@react-native-documents/picker';
import DocumentPicker from '@react-native-documents/picker';
const AddInternationalShipmentScreen = ({ navigation, route }) => {
    const token = route?.params?.token;
    const [errors, setErrors] = useState({});
    const [courierType, setCourierType] = useState([]);
    const [orderType, setOrderType] = useState([]);
    const [selectedOrderType, setSelectedOrderType] = useState(null);
    const [selectedCourierType, setSelectedCourierType] = useState(null)
    const [clientOrderId, setClientOrderId] = useState('');
    const [checked, setChecked] = useState(false);
    const [isMedicalItem, setIsMedicalItem] = useState(false);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);


    const openModal = () => {
        setIsMedicalItem(true);
    }
    const closeModal = () => {
        setIsMedicalItem(false);
    }



    const requestStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: "Storage Permission",
              message: "App needs access to your storage to pick files.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.error("Permission error:", err);
          return false;
        }
      };

    const pickDocument1 = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
          Alert.alert("Permission denied", "Cannot access files without permission.");
          return;
        }
        try {
            console.log("[DEBUG] Attempting to open document picker...");
            const result = await DocumentPicker.pick({ type: ["*/*"] });
            console.log("[DEBUG] Picker result:", result);
            setFile1(result[0]);
          } catch (err) {
            console.error("[DEBUG] Picker error:", err, JSON.stringify(err)); // Detailed error
            if (DocumentPicker.isCancel(err)) {
              console.log("User cancelled picker");
            } else {
              Alert.alert("Error", "Failed to open document picker: " + err.message);
            }
          }
    };
    const pickDocument2 = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles], // Allow all file types
            });
            console.log('Picked file/:', result);
            setFile2(result[0]);
            console.log('file/', file2); // Store the selected file
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled document picker');
            } else {
                console.error('Error picking document:', err);
            }
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courierRes, orderRes] = await Promise.all([
                    fetch(get_courier_types, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    }),
                    fetch(get_order_types, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    })
                ]);

                const courierData = await courierRes.json();
                const orderData = await orderRes.json();
                console.log('Courier api response', courierData, orderData);

                setCourierType(courierData.data || []);
                setOrderType(orderData.data || []);

            } catch (error) {
                console.error("API Fetch Error:", error);
                //Alert.alert("Error", "Failed to load data. Please try again.");
            }
        };

        fetchData();
    }, []);


    const validateFields = () => {
        let newErrors = {};
        if (!selectedOrderType) newErrors.selectedOrderType = "*Order Type is required";
        if (!selectedCourierType) newErrors.selectedCourierType = "*Courier Type is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };

    const handleNext = () => {
        const courierTypeNumber = selectedCourierType;
        const OrderTypeNumber = selectedOrderType;
        console.log('form data', courierTypeNumber, OrderTypeNumber, clientOrderId);
        if (validateFields()) {
            navigation.navigate('InternationalShipmentPickupAddress', {
                courierTypeNumber,
                OrderTypeNumber,
                clientOrderId,
                token,

            });

        }
    };

    return (
        <Layout>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Add Order Details</Text>
                </View>


                <View style={[styles.inputGroup,styles.input]}>
                    <Text style={styles.label}>Order Type*</Text>
                    <DropDown
                   
                        items={orderType.map(item => item.name)} // Ensure names are used
                        initialValue={orderType.find(item => item.id === selectedOrderType)?.name || ""}
                        label="Please select Order Type"
                        onChange={(value) => {

                            const newValue = String(Number(value) + 1);
                            setSelectedOrderType(newValue);
                        }
                        }
                    />
                </View>
                {errors.selectedOrderType && <Text style={styles.errorText}>{errors.selectedOrderType}</Text>}


                <View style={[styles.inputGroup,styles.input]}>
                    <Text style={styles.label}>Courier Type* (Click for rates)</Text>
                    <DropDown
                        items={courierType.map(item => item.name)}
                        initialValue={selectedCourierType}
                        label="Please select Courier Type"
                        onChange={(value) => {

                            const newValue = String(Number(value) + 1);
                            setSelectedCourierType(newValue);
                        }
                        }
                    />

                    {errors.selectedCourierType && <Text style={styles.errorText}>{errors.selectedCourierType}</Text>}
                </View>


                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Client Order ID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Client Order ID"
                        value={clientOrderId}
                        onChangeText={setClientOrderId}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', top: 5, bottom: 10 }}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            const newChecked = !checked;
                            setChecked(newChecked);
                            if (newChecked) {
                                openModal();
                            }
                        }}
                    />
                    <Text style={{ fontSize: 12, color: "#000", marginBottom: 5 }}>Medical items</Text>
                </View>

                {checked &&
                    <View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Upload Indian Prescription</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#dedede', borderBottomWidth: 0.5 }}>
                                <View>
                                    <TouchableOpacity onPress={pickDocument1}>
                                        <Text>Choose file</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text>{file1 ? file1.name : "No file chosen"}</Text>
                                {
                                    file1 &&
                                    <TouchableOpacity onPress={() => setFile1(null)}><Text style={{ color: 'red' }}>*</Text></TouchableOpacity>
                                }

                            </View>

                        </View >
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Upload Indian Bill</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#dedede', borderBottomWidth: 0.5 }}>
                                <TouchableOpacity onPress={pickDocument2}>
                                    <Text>Choose file</Text>
                                </TouchableOpacity>
                                <Text>{file2 ? file2.name : "No file chosen"}</Text>
                               {
                                 file2 &&
                                 <TouchableOpacity onPress={() => setFile2(null)}><Text style={{ color: 'red' }}>*</Text></TouchableOpacity>
                               }
                               

                            </View>
                        </View>
                    </View>
                }

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleNext}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.nextButton}>
                            <Text style={styles.nextButtonText}>Next</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>


                <MedicalItemWarningModal onClose={closeModal} visible={isMedicalItem} />

            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    content: { paddingHorizontal: 15, backgroundColor: 'white', paddingBottom: 50 },
    header: { marginBottom: 30, marginTop: 20 },
    headerText: { fontSize: 16, fontWeight: 'bold', borderColor: "#ccc", borderBottomWidth: 0.5 },
    inputGroup: { marginBottom: 15, },
    label: { fontSize: 12, color: "#000", marginBottom: 5 },
    input: {
        borderColor: "#ccc",
        borderRadius: 8,
        //padding: 10,
        fontSize: 16,
        borderBottomWidth: 0.5
    },
    errorText: { color: 'red', fontSize: 12 },
    buttonContainer: { alignItems: 'flex-end', marginTop: 20 },
    nextButton: {
        paddingVertical: 5, borderRadius: 5, padding: 10, width: 130, alignItems: 'center'
    },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", alignItems: 'center' },
});

export default AddInternationalShipmentScreen;
