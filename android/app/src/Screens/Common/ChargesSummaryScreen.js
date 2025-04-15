import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import OrderDetailsLayout from '../../Components/Common/OrderDetailsLayout';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from '@react-navigation/native';
import { get_Bank_detail, create_payment_intent } from '../../services/apiServices';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import BankPaymentModal from '../../Components/Modals/BankPaymentModal';

import { Toast } from 'react-native-toast-notifications';
import { AuthContext } from '../../Context/authContext';

import { Picker } from '@react-native-picker/picker';
import { set } from 'react-native-reanimated';
import { Screen } from 'react-native-screens';


const ChargesSummary = ({ route, navigation }) => {

  console.log('summry', route);
  const { token } = useContext(AuthContext);

  const shippingCost = route.params.TotalPayment
  const orderId = route.params.order.id;
  const orderType = route.params.order.type
  console.log('orderId', orderId);


  const userWalletBalance = route.params.userWalletBalance;
  console.log('userWalletBalance', userWalletBalance);
  const [walletChecked, setWalletChecked] = useState(false);
  const [packageMaterialChecked, setPackageMaterialChecked] = useState(false);
  const [shippingBoxesChecked, setShippingBoxesChecked] = useState(false);
  const [giftWrapChecked, setGiftWrapChecked] = useState(false);
  const [consolidationChecked, setConsolidationChecked] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currency, setCurrency] = useState('AOA');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [currencyList, setCurrencyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openBackPaymentModal, setOpenBackPaymentModal] = useState(false);
  const [bankData, setBankData] = useState([]);
 


  console.log('payment method', selectedPaymentMethod);

  console.log('currency', currency);


  const handleCloseBankPaymentModal = () => {
    setOpenBackPaymentModal(false);
    setLoading(false);
  };


  const handleMakePayment = async () => {
   // setLoading(true);
    // Handle payment logic here
    console.log('Payment method:', selectedPaymentMethod);
    if (selectedPaymentMethod === 'bank') {
      setOpenBackPaymentModal(true);
     // setLoading(false);
      return
    }
    if (selectedPaymentMethod === 'card') {
      payWithStripe();
     // setLoading(false);
      return
    }

  };




  useEffect(() => {
    setLoading(true);
    const chnage_currency_rate = async () => {
      const amount = calculateTotalShippingCost();
      const to = currency;
      try {
        // setAccessToken(token);
        const response = await fetch(`https://api.currencylayer.com/convert?access_key=5c86acadd9c8c730b8bc9892a1a118b3&from=INR&to=${to}&amount=${amount}&format=1`, {

        })
        const data = await response.json();

        console.log('currency api response', data);
        setConvertedAmount(data.result);
        setLoading(false);
      }
      catch {
        console.log(error);
        setLoading(false);

      }
    }

    chnage_currency_rate();
  }, [currency, walletChecked, packageMaterialChecked, shippingBoxesChecked, giftWrapChecked, consolidationChecked]);


  const currencyValues = currencyList.map(item => item.type);



  const baseShippingCost = shippingCost;
  const walletBalance = userWalletBalance;




  const calculateTotalShippingCost = () => {
    let total = Number(baseShippingCost);
    const materialCharge = 200;
    const boxCharge = 200;
    const giftWrapCharge = 200;
    const consolidationCharge = 250;


    if (packageMaterialChecked) total += Number(materialCharge);
    if (shippingBoxesChecked) total += Number(boxCharge);
    if (giftWrapChecked) total += Number(giftWrapCharge);
    if (consolidationChecked) total += Number(consolidationCharge);

    if (walletChecked) total -= walletBalance;

    return total;
  };

  useEffect(() => {
    const fetch_Bank_detail = async () => {

      try {

        // setAccessToken(token);
        const response = await fetch(get_Bank_detail, {

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },

        })
        const data = await response.json();

        console.log('paymentNotification api response', data.data);
        setCurrencyList(data.data);
      }
      catch {
        console.log(error);

      }
    }

    fetch_Bank_detail();
  }, []);


  useEffect(() => {

    const fetch_Bank_detail_by_currency = async () => {
      try {

        // setAccessToken(token);
        const response = await fetch(get_Bank_detail + '/' + currency, {

          headers: {

            'Authorization': `Bearer ${token}`
          },

        })
        const data = await response.json();

        console.log('single bank data', data.data);
        setBankData(data.data);

      }
      catch {
        console.log(error);
      }
    }
    fetch_Bank_detail_by_currency();
  }, [currency]);






  console.log('token', token);
  console.log('convertedAmount', convertedAmount);
  console.log('currency', currency);

  const payWithStripe = async () => {
    setLoading(true);
    try {
      const response = await fetch(create_payment_intent, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: convertedAmount,
          orderId: orderId,
          currency: currency,
          type: orderType,
          couponCode: null,
          facilities: null,
          wallet: "No"
        }),
      });
  
      const result = await response.json();
      console.log('🔐 Stripe data:', result);
  
      const secret = result?.response?.paymentIntent;
      const customer = result?.response?.customer;
  
      if (!secret || !customer) {
        Alert.alert('Missing Stripe data', 'Make sure all required keys are returned from the server.');
        return;
      }
  
      const init = await initPaymentSheet({
        merchantDisplayName: 'My XBorder',
        paymentIntentClientSecret: secret,
        customerId: customer,
        allowsDelayedPaymentMethods: true,
      });
  
      console.log('📦 initPaymentSheet result:', init);
  
      if (init.error) {
        console.error('❌ initPaymentSheet error:', init.error.message);
        Alert.alert('Stripe Init Error', init.error.message);
        setLoading(false);
        return;
      }
  
      // ✅ Keep loading true while opening payment sheet
      const paymentResult = await presentPaymentSheet();
      console.log('💰 Payment result:', paymentResult);
  
      if (paymentResult.error) {
        console.error('❌ Payment failed:', paymentResult.error.message);
        Alert.alert('Payment failed', paymentResult.error.message);
      } else {
        console.log('✅ Payment successful!');
        Toast.show('Your payment is confirmed!', { type: 'success', style: { width: 500 } });
  
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'DashBoardScreen' },
              { name: 'ShopNshipScreen' },
            ],
          })
        );
      }
    } catch (err) {
      console.error('💥 Exception during payment:', err.message);
      Alert.alert('Error', err.message);
    } finally {
      // ✅ Loader always stops here
      setLoading(false);
    }
  };
  

  return (


    <OrderDetailsLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Charges Summary</Text>

        <View style={styles.row}>
          <Text>Shipping cost</Text>
          <Text>{baseShippingCost} Rs.</Text>
        </View>
        {
          userWalletBalance > 0 &&
          <View style={styles.row}>
            <View style={styles.rowInline}>
              <Text>Wallet Balance</Text>
              <Checkbox
                status={walletChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                  const newChecked = !walletChecked;
                  setWalletChecked(newChecked);
                }}
                color="#1e90ff"
              />
            </View>
            <Text>{walletBalance} Rs.</Text>
          </View>
        }


        {/* Packing Options */}
        <View style={styles.packingContainer}>
          <Text style={styles.subHeading}>Packing options</Text>

          <View style={styles.rowInline}>
            <Checkbox
              status={packageMaterialChecked ? 'checked' : 'unchecked'}
              onPress={() => {
                const newChecked = !packageMaterialChecked;
                setPackageMaterialChecked(newChecked);

              }}
              color="#1e90ff"
            />
            <Text>Add extra packing material 200 Rs.</Text>
          </View>

          <View style={styles.rowInline}>
            <Checkbox
              status={shippingBoxesChecked ? 'checked' : 'unchecked'}
              onPress={() => {
                const newChecked = !shippingBoxesChecked;
                setShippingBoxesChecked(newChecked);

              }}
              color="#1e90ff"
            />
            <Text>Ship in original shipping boxes 200 Rs.</Text>
          </View>

          <View style={styles.rowInline}>

            <Checkbox
              status={giftWrapChecked ? 'checked' : 'unchecked'}
              onPress={() => {
                const newChecked = !giftWrapChecked;
                setGiftWrapChecked(newChecked);

              }}
              color="#1e90ff"
            />
            <Text>Gift Wrap 200 Rs.</Text>
          </View>

          <View style={styles.rowInline}>
            <Checkbox
              status={consolidationChecked ? 'checked' : 'unchecked'}
              onPress={() => {
                const newChecked = !consolidationChecked;
                setConsolidationChecked(newChecked);

              }}
              color="#1e90ff"
            />
            <Text>Consolidation service 250 Rs.</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.couponBox}>
          <Text style={styles.couponText}>Apply Coupon?</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>Total Shipping cost</Text>

          <Text>{calculateTotalShippingCost()} Rs.</Text>
        </View>


        <View style={styles.row}>
          <Text>Select Currency</Text>
          <Picker
            selectedValue={currency}
            style={{
              width: 100,
              padding: 0,
              margin: 0,
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              borderWidth: 1,
              borderColor: '#000000'
            }}
            onValueChange={(itemValue) => setCurrency(itemValue)}
          >
            {currencyValues.map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

        <View style={styles.row}>
          <Text>Total Shipping cost ({currency})</Text>
          <Text>{convertedAmount} {currency}</Text>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>


        <View style={styles.rowInline}>
          <TouchableOpacity onPress={() => setSelectedPaymentMethod("card")}>
            <Icon
              name={selectedPaymentMethod === "card" ? "dot-circle-o" : "circle-o"}
              size={20}
              color={selectedPaymentMethod === "card" ? "#4285F4" : "#ccc"}
              style={styles.radioIcon}
            />
          </TouchableOpacity>
          <Text>  Debit/Credit Cards (Payment Gateway Fee 3%)</Text>
        </View>
        {
          (currency == "SGD" || currency == "EUR" || currency == "AUD" || currency == "USD" || currency == "THB" || currency == "CHF" || currency == "SEK" || currency == "RUB" || currency == "GBP" || currency == "PLN"
            || currency == "PHP" || currency == "NOK" || currency == "NZD" || currency == "TWD" || currency == "MXN" || currency == "MYR" || currency == "JPY" || currency == "ILS" || currency == "HUF" || currency == "HKD"
            || currency == "HKD" || currency == "DKK" || currency == "CZK" || currency == "CNY" || currency == "CAD" || currency == "EUR") &&
          <View style={styles.rowInline}>
            <TouchableOpacity onPress={() => setSelectedPaymentMethod("paypal")}>
              <Icon
                name={selectedPaymentMethod === "paypal" ? "dot-circle-o" : "circle-o"}
                size={20}
                color={selectedPaymentMethod === "paypal" ? "#4285F4" : "#ccc"}
                style={styles.radioIcon}
              />
            </TouchableOpacity>
            <Text> PayPal</Text>
          </View>
        }

        {
          currency == "SGD" &&
          <View style={styles.rowInline}>
            <TouchableOpacity onPress={() => setSelectedPaymentMethod("paynow")}>
              <Icon
                name={selectedPaymentMethod === "paynow" ? "dot-circle-o" : "circle-o"}
                size={20}
                color={selectedPaymentMethod === "paynow" ? "#4285F4" : "#ccc"}
                style={styles.radioIcon}
              />
            </TouchableOpacity>
            <Text>  PayNow</Text>
          </View>
        }


        {
          (currency == "SGD" || currency == "EUR") &&
          <View style={styles.rowInline}>
            <TouchableOpacity onPress={() => setSelectedPaymentMethod("bank")}>
              <Icon
                name={selectedPaymentMethod === "bank" ? "dot-circle-o" : "circle-o"}
                size={20}
                color={selectedPaymentMethod === "bank" ? "#4285F4" : "#ccc"}
                style={styles.radioIcon}
              />
            </TouchableOpacity>
            <Text> Bank Payment</Text>
          </View>
        }
        <TouchableOpacity onPress={handleMakePayment} disabled={!selectedPaymentMethod}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#d81397', '#0d5cc2']} style={[styles.paymentButton, !selectedPaymentMethod && { opacity: 0.5 }]}>
            <Text style={styles.paymentButtonText}>Make Payment</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.noteText}>
          <Text style={{ fontWeight: 'bold' }}>Note: </Text>
          Please confirm that you have verified that all items have arrived!
        </Text>
      </ScrollView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      <BankPaymentModal visible={openBackPaymentModal} onClose={handleCloseBankPaymentModal} bank={bankData} />
    </OrderDetailsLayout>

  );
};

export default ChargesSummary;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginBottom: 15,
    marginTop: 15
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  subHeading: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  rowInline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    marginBottom: 5,
  },
  packingContainer: {
    marginTop: 5,
    marginBottom: 5,
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  couponBox: {
    backgroundColor: '#e0f0ff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  couponText: {
    color: '#007bff',
    fontWeight: '500',
  },
  sectionTitle: {
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paymentButton: {
    // backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteText: {
    marginTop: 20,
    color: '#004466',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 999,
    backgroundColor: 'rgba(255,255,255,0.7)', // semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
});
