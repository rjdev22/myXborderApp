import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Loader from './Loader';
import {updateUserProfile} from '../..//services/apiServices';

console.log('updateUserProfile',updateUserProfile);
const EditProfileModal = ({ onClose,userData}) => {

    console.log('userData',userData);
    const [firstName, setFirstName] = useState(userData.first_name);
    const [lastName, setLastName] = useState(userData.last_name);
    const [isLoading, setIsLoading] = useState(false);
    const handleSaveChanges = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(updateUserProfile, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L215eGJvcmRlci9hcGkvdjEvdmVyaWZ5X2VtYWlsX290cCIsImlhdCI6MTc0MDEzMTM5NiwibmJmIjoxNzQwMTMxMzk2LCJqdGkiOiJzU2trZEJQTDJ0VDRPSXJzIiwic3ViIjoiMTc3MCIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4DIewxHyolVv0u1kB6yToZ0hIeINWPDWBBH_fBNdTHo",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                }),
            });
            const data = await response.json();
            console.log('update profile data', data);
            setIsLoading(false);
            onClose();
           
        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }



    return (
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.header}>Edit Profile</Text>

                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <Text style={styles.label}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#d81397', '#0d5cc2']}
                            style={styles.gradientButton}>
                            <Text style={styles.buttonText}>Save Change</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#d81397', '#0d5cc2']}
                            style={styles.gradientButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader visible={isLoading}/>
        </View>
    )
}



const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '70%',
        padding: 20,
        borderRadius: 5,
        elevation: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        borderBlockColor:'#ccc',
        borderBottomWidth:0.5
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    },
    input: {
        //borderWidth: 1,
        // borderColor: '#ccc',
        borderBottomColor: '#00000',
        borderBottomWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    button: {
        flex: 1,
        marginHorizontal: 5
    },
    gradientButton: {
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    }
})
export default EditProfileModal