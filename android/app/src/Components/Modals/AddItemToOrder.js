import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropDown from '../Common/DropDown';
import Loader from './Loader';
import { AddItemToOrder } from '../../services/apiServices';
import { AuthContext } from '../../Context/authContext';
import { Toast } from 'react-native-toast-notifications';





console.log('Api', AddItemToOrder);

const AddItemModal = ({ visible, onClose, itemTypes, id }) => {
  const [store, setStore] = useState('');
  const [itemName, setItemName] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 

  const DropDownValues = itemTypes.map((item) => item.itemType);
  console.log("DropDownValues", DropDownValues)

  const { token } = useContext(AuthContext);

  const handleAddItem = async () => {
    console.log('id',id)
    try {
      setIsLoading(true);
      const response = await fetch(AddItemToOrder, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({
          orderId: id,
          itemTypeId: 2,
          name: itemName,
          onlineStore: store,
          trackingNumber: trackingNumber,
          price: price,
          color: color,
          size: size,
          quantity: quantity
        })
      })
      const data = await response.json();
      console.log('add item response', data);

      if (data.status === 'true') {
        Toast.success(data.message, { type: 'success', style: { width: 500 } });
        setIsLoading(false);
        onClose();
      } else {
        Toast.warning('Something went wrong,try again', { type: 'error', style: { width: 500 } });
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }


  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={{
                                  display: 'flex', flexDirection: 'row',
                                  justifyContent: 'space-between', borderBottomColor: '#dedede',
                                  borderBottomWidth: 0.7, paddingHorizontal: 15, paddingVertical: 15,
                                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
                              }}>
          <Text style={styles.title}>Add Item</Text>
          <TouchableOpacity onPress={onClose}>
            <Image source={require('../../assets/close.png')} style={{ width: 15, height: 15 }}>
            </Image>
          </TouchableOpacity>
          </View>
          <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false} >
            <Text style={styles.label}>Item Type*</Text>
            <DropDown
              items={DropDownValues}
              label="Please select Order Type"
              initialValue={selectedItemType}

              onChange={(value) => {
                const newValue = String(Number(value) + 1);
                setSelectedItemType(newValue)
              }
              } // This now holds the ID
            />
            <Text style={styles.label}>Item Name*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter item name"
              value={itemName}
              onChangeText={(val) => setItemName(val)}
            />

            <Text style={styles.label}>Online Store*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter store"
              value={store}
              onChangeText={(val) => setStore(val)}
            />
            <Text style={styles.label}>Tracking Number*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter store id"
              value={trackingNumber}
              onChangeText={(val) => setTrackingNumber(val)}
            />

            <Text style={styles.label}>Color</Text>
            <TextInput
              style={styles.input}
              placeholder="Color"
              value={color}
              onChangeText={(val) => setColor(val)}
            />

            <Text style={styles.label}>Size</Text>
            <TextInput
              style={styles.input}
              placeholder="Size"
              value={size}
              onChangeText={(val) => setSize(val)}
            />

            <Text style={styles.label}>Quantity*</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={quantity}
              onChangeText={(val) => setQuantity(val)}
            />

            <Text style={styles.label}>Price*(INR)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Price"
              value={price}
              onChangeText={(val) => setPrice(val)}
            />



            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleAddItem} >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.Button} >
                  <Text style={styles.buttonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={styles.Button} >
                  <Text style={styles.buttonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <Loader visible={isLoading} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '70%',
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    padding: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#6a11cb',
  },
  cancelButton: {
    backgroundColor: '#b31217',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  Button: {
    backgroundColor: '#4A00E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    width: 130,
    height: 40
  },
  ButtonText: { color: '#fff', fontWeight: 'bold', },
});

export default AddItemModal;
