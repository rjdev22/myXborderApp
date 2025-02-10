import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

const EditProfileModal = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
                    <TouchableOpacity style={styles.button} >
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#ff0080', '#1e7fca']}
                            style={styles.gradientButton}>
                            <Text style={styles.buttonText}>Save Change</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#ff0080', '#1e7fca']}
                            style={styles.gradientButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
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