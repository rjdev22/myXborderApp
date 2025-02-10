import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import EditProfileModal from '../Components/Modals/EditProfileModal';
import Layout from '../Components/Common/Layout';



const UserProfileScreen = () => {
    const [OpenEditModal, setOpenEditModal] = useState(false);



    const handleOpenEditModal = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleNotificationOff = () => {
        Alert.alert('Notification off');
    };



    return (
        <Layout>
        <ScrollView style={styles.content}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>

            <View style={styles.card}>
                <Text style={styles.name}>test test2</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Unique Id:</Text>
                    <Text style={styles.value}>USR1267</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Referral Code:</Text>
                    <Text style={styles.value}>USR1267</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Primary mobile number:</Text>
                    <View style={styles.phoneContainer}>
                        <Icon name="phone" size={16} color="black" />
                        <Text style={styles.value}> 916396740386,</Text>
                        <Icon name="whatsapp" size={16} color="green" />
                        <Text style={styles.value}> 916396740386</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Primary Email:</Text>
                    <View style={styles.emailContainer}>
                        <Icon name="envelope" size={16} color="black" />
                        <Text style={styles.value}> test@yopmail.com</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Total Order:</Text>
                    <Text style={styles.value}>2</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => handleOpenEditModal()}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#ff0080', '#1e7fca']}
                            style={styles.gradientButton}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => handleNotificationOff()}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#ff0080', '#1e7fca']}
                            style={styles.gradientButton}>
                            <Text style={styles.buttonText}>Notification off</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={OpenEditModal}
                onRequestClose={handleCloseEditModal}>
                <EditProfileModal onClose={handleCloseEditModal} />
            </Modal>

        </ScrollView>
        </Layout>   
    );
};

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#f5f5f5'
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        width: 140
    },
    value: {
        fontSize: 14,
        color: '#555'
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
});

export default UserProfileScreen;
