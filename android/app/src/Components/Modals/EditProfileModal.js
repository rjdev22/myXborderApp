import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { updateUserProfile } from '../..//services/apiServices';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from './Loader';
import { AuthContext } from '../../Context/authContext';
import { useContext } from 'react';
import { Toast } from 'react-native-toast-notifications';

console.log('updateUserProfile', updateUserProfile);
const EditProfileModal = ({ onClose, userData }) => {

    console.log('userData', userData);
    const { token, setPageRefresh } = useContext(AuthContext);

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
                    "authorization": `Bearer ${token}`,
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
            setPageRefresh(true);

        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }



    return (
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>

                <View style={{
                    display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', borderBottomColor: '#dedede',
                    borderBottomWidth: 0.7, paddingHorizontal: 15, paddingVertical: 15,
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
                }}>
                    <Text style={styles.header}>Edit Profile</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={require('../../assets/close.png')} style={{ width: 15, height: 15 }}></Image>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 15 }}>
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
                </ScrollView>
            </View>
            <Loader visible={isLoading} />
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
        height: '35%',
        padding: 0,
        borderRadius: 5,
        elevation: 10,
    },
    header: {
        fontSize: 18,

        // marginBottom: 15,
        // borderBlockColor: '#ccc',
        // borderBottomWidth: 0.5
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
        borderBottomWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 30
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