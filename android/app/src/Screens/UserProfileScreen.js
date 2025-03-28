
import React, { useState, useEffect, useContext } from 'react';
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
import EditProfileModal from '../Components/Modals/EditProfileModal';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../Components/Common/Layout';
import { getUserProfile } from '../services/apiServices';
import { AuthContext } from '../Context/authContext';


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const UserProfileScreen = () => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});

    const { token, pageRefresh, setPageRefresh } = useContext(AuthContext);
    console.log('token', token);

    useEffect(() => {
        const fetchUserProfile = async () => {
            //setIsLoading(true);

            try {
                const response = await fetch(getUserProfile,
                    {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${token}`,
                        }
                    }
                );
                const data = await response.json();
                setUserData(data.data);

                setPageRefresh(false);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        }

        fetchUserProfile();
        console.log('user data', userData);
    }, [pageRefresh]);


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
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        visible={!isLoading}
                        style={styles.namePlaceholder}
                    >
                        <Text style={styles.name}>{userData.first_name}  {userData.last_name}</Text>
                    </ShimmerPlaceholder>

                    <View style={styles.row}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.labelPlaceholder}
                        >
                            <Text style={styles.label}>Unique Id:</Text>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.valuePlaceholder}
                        >
                            <Text style={styles.value}>{userData.user_id}</Text>
                        </ShimmerPlaceholder>
                    </View>

                    <View style={styles.row}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.labelPlaceholder}
                        >
                            <Text style={styles.label}>Referral Code:</Text>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.valuePlaceholder}
                        >
                            <Text style={styles.value}>{userData.is_referral_code === null ? 'No Referral Code' : userData.referral_code}</Text>
                        </ShimmerPlaceholder>
                    </View>

                    <View style={styles.row}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.labelPlaceholder}
                        >
                            <Text style={styles.label}>Primary mobile number:</Text>
                        </ShimmerPlaceholder>


                        <View style={styles.phoneContainer}>
                            <ShimmerPlaceholder
                                LinearGradient={LinearGradient}
                                visible={!isLoading}
                                style={styles.iconPlaceholder}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="phone" size={16} color="black" />
                                    <Text style={styles.value}> {userData.phone},</Text>
                                </View>
                            </ShimmerPlaceholder>
                            <ShimmerPlaceholder
                                LinearGradient={LinearGradient}
                                visible={!isLoading}
                                style={styles.iconPlaceholder}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="whatsapp" size={16} color="green" />
                                    <Text style={styles.value}> {userData.phone2}</Text>
                                </View>
                            </ShimmerPlaceholder>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.labelPlaceholder}
                        >
                            <Text style={styles.label}>Primary Email:</Text>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.emailPlaceholder}
                        >
                            <View style={styles.emailContainer}>
                                <Icon name="envelope" size={16} color="black" />
                                <Text style={styles.value}> {userData.email}</Text>
                            </View>
                        </ShimmerPlaceholder>
                    </View>



                    <View style={styles.row}>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.labelPlaceholder}
                        >
                            <Text style={styles.label}>Total Order:</Text>
                        </ShimmerPlaceholder>
                        <ShimmerPlaceholder
                            LinearGradient={LinearGradient}
                            visible={!isLoading}
                            style={styles.valuePlaceholder}
                        >
                            <Text style={styles.value}>{userData.shopNshipOrderCount + userData.internationalOrderCount + userData.assistedShopNshipOrderCount}</Text>
                        </ShimmerPlaceholder>
                    </View>
                    {
                        !isLoading &&

                        <View style={styles.buttonContainer}>


                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleOpenEditModal}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#d81397', '#0d5cc2']}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.buttonText}>Edit Profile</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleNotificationOff}
                            >
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    colors={['#d81397', '#0d5cc2']}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.buttonText}>Notification off</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openEditModal}
                    onRequestClose={handleCloseEditModal}
                >
                    <EditProfileModal onClose={handleCloseEditModal} userData={userData} />
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
        marginBottom: 10,
        columnGap: 10
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        width: 140
    },
    labelPlaceholder: {
        width: '50%',
    },
    namePlaceholder: {
        marginBottom: 10,
    },
    value: {
        fontSize: 14,
        color: '#555'
    },
    valuePlaceholder: {
        width: '50%',
    },
    phoneContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%'
    },
    iconPlaceholder: {
        width: '100%',
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emailPlaceholder: {
        width: '50%',
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
export default UserProfileScreen