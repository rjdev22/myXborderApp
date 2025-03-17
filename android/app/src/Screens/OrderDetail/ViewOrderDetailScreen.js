import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OrderDetailsLayout from '../../Components/Common/OrderDetailsLayout';
import Icon from 'react-native-vector-icons/FontAwesome5';

const items = {
    id: '1',
    name: 'tzt',
    type: 'Cosmetic',
    store: 'Amazon', 
    itemPrice: 20,
    itemStatus: 'Pending',
    quantity: 12, 
    size: 2
};




const ViewOrderDetailScreen = ({route}) => {
  console.log('route/////', route?.params);
  const item = route?.params.item;
    return (
        <OrderDetailsLayout>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomColor: '#dedede',
                        borderBottomWidth: 0.7,
                        paddingBottom: 15,
                        marginBottom: 15
                    }}>
                        <Text style={styles.itemDetailsHeader}>Item Details</Text>
                        <TouchableOpacity>
                            <Icon name='edit' size={20} color='#D81397' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemTitleLeft}>Item Name</Text>
                        <Text>:</Text>
                        <Text style={styles.itemTitleRight}>{item.name}</Text>
                    </View>
                    <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemTitleLeft}>Itenm Type</Text>
                        <Text>:</Text>
                        <Text style={styles.itemTitleRight}>{item.item_type}</Text>
                    </View>
                    <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemTitleLeft}>Store</Text>
                        <Text>:</Text>
                        <Text style={styles.itemTitleRight}>{item.store}</Text>
                    </View>
                    <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemTitleLeft}>Item Price</Text>
                        <Text>:</Text>
                        <Text style={styles.itemTitleRight}>{item.price}</Text>
                    </View>
                    <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemTitleLeft}>Quantity</Text>
                        <Text>:</Text>
                        <Text style={styles.itemTitleRight}>{item.quantity}</Text>
                    </View>
                    <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemTitleLeft}>Size</Text>
                        <Text>:</Text>
                        <Text style={styles.itemTitleRight}>{item.size}</Text>
                    </View>
                    <View style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.itemTitleLeft}>Item Status</Text>
                        <Text>:</Text>
                        <Text style={styles.itemTitleRight}>{item.status}</Text>
                    </View>

                </View>
            </View>
        </OrderDetailsLayout>
    )
}
const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#fff', flex: 1 },
    card: {
        padding: 16,
        borderRadius: 5,
        marginTop: 20,
        boxShadow: '0px 1px 2pxrgba(0, 0, 0, 0.30)',
        borderRadius: 5,
    },
    itemTitleLeft: {
        color: '#000',
        fontSize: 16,
        width: '40%',
    },
    itemTitleRight: {
        color: '#000',
        fontSize: 16,
        width: '40%',
        textAlign: 'right'
    },
    itemDetailsHeader: {
        fontWeight: 'bold',
        color: '#d81397',
        fontSize: 16
    }



})

export default ViewOrderDetailScreen