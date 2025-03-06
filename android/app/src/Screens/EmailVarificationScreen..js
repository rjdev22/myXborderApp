import React from 'react'
import EmailVarificationLayout from '../Components/Common/EmailVarificationLayout'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { emailVarificationApi } from '../services/apiServices';
import Loader from '../Components/Modals/Loader';
import { useRoute } from '@react-navigation/native';
import { Toast } from 'react-native-toast-notifications';
import { CommonActions } from '@react-navigation/native';


const EmailVarificationScreen = ({ navigation, route }) => {


    console.log('email varification screen route data', route.params.data);

    const [visibleModal, setVisibleModal] = React.useState(false);
    const [email, setEmail] = React.useState(route.params.data.email);

    const handleEmailVarification = async () => {
        setVisibleModal(true);
        try {
            const response = await fetch(emailVarificationApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,

                }),

            });
            const data = await response.json();
            console.log('email varification data', data);
            Toast.show(data.data, Toast.SHORT);
            // if (data.status === true) {
            //     navigation.dispatch(
            //         CommonActions.reset({
            //             index: 1,
            //             routes: [
            //                 { name: 'emailVarificationScreen' },
            //                 { name: 'VarifyOtpScreen', params: data },
            //             ],
            //         })
            //     );
            // }
            // else {
            //     Toast.show(data.error, Toast.SHORT);
            // }
            setVisibleModal(false);
        } catch (error) {
            console.log(error);
            setVisibleModal(false);
        }
    };

    return (
        <EmailVarificationLayout>
            <View>
                <View>
                    <Text style={styles.title} onPress={()=>navigation.navigate('VarifyOtpScreen')}> Email Varification</Text>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="dev@dev.com"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TouchableOpacity onPress={handleEmailVarification} >
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Send
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <Loader visible={visibleModal} />
            </View>
        </EmailVarificationLayout>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        //ontWeight: 'bold',
        marginTop: 100,
        marginBottom: 50,
        color: '#d81397',
        textAlign: 'center'
    },
    input: {
        padding: 10,
        //borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        fontSize: 16,
    },
    inputGroup: {
        alignItems: 'center', display: 'flex',
        flexDirection: 'row', justifyContent: 'space-between',
        width: '90%', marginHorizontal: 'auto', borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 5
    },
    button: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        borderRadius: 0,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        //fontWeight: "bold",
    },

})
export default EmailVarificationScreen