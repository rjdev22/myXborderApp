import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { imageUrl, homeApi, referralAmountApi } from '../services/apiServices';
import { SvgUri } from 'react-native-svg';
import Layout from '../Components/Common/Layout';


const HomeScreen = ({ navigation }) => {
  const [referralAmount, setReferralAmount] = useState(0);
  const [services, setServices] = useState([]);
  const [offers, setOffers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  const getHomeContent = async () => {
    try {
      const response = await fetch(homeApi);
      const data = await response.json();
      setServices(data.data.services?.data || []);
      setOffers(data.data.offers?.data || []);
    } catch (error) {
      console.error('Error fetching home content:', error);
    }
  };

  const getReferral = async () => {
    try {
      const response = await fetch(referralAmountApi);
      const data = await response.json();
      setReferralAmount(data.data);
    } catch (error) {
      console.error('Error fetching referral amount:', error);
    }
  };

  useEffect(() => {
    getHomeContent();
    getReferral();
  }, []);

  const goToHome = () => navigation.navigate('Home');
  const goToProfile = () => setModalVisible(true);


  //   const offerdeals = (offer) => {
  //     console.log('Selected offer:', offer);
  //   };

  return (
    <Layout>
    <View>
      {/* Content */}
      <ScrollView
      style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {/* Banner Image */}
        <Image
          source={require('../assets/DxxfKrd9IwwMnBrA.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.content}>
          {/* Referral Bonus */}
          <View style={styles.referralCard}>
            <Text style={styles.bonusTitle}>Referral Bonus</Text>
            <Text style={styles.amount}>{referralAmount} INR</Text>
          </View>

          {/* Exciting Deals */}
          <Text style={styles.sectionTitle}>Exciting Deals</Text>
          <FlatList
            data={offers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.offerCard}
             
              >
                <Image
                  source={{ uri: imageUrl + '/' + item.image }}
                  style={styles.offerImage}
                />
                <Text style={styles.offerTitle}>{item.name}</Text>
                <Text style={styles.offerSubtitle}>{item.off}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Services */}
          <Text style={styles.sectionTitle}>Services</Text>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <Image
                source={{ uri: imageUrl + '/' + service.image }}
                style={styles.serviceImage}
              />
              <Text style={styles.serviceTitle}>{service.name}</Text>
              <Text style={styles.serviceDescription}>{service.title}</Text>
            </View>
          ))}

          {/* How It Works */}
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.howGrid}>
            {['how1.svg', 'how2.svg', 'how3.svg', 'how4.svg', 'how5.svg'].map(
              (image, index) => (
                <View key={index} style={styles.howCard}>
                  <SvgUri width="100" height="100" uri={imageUrl + '/frontend/images/' + image} />
                  <Text style={styles.howTitle}>
                    {['Sign Up', 'Shop', 'Ship', 'Save', 'Receive'][index]}
                  </Text>
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Sign In / Sign Up</Text>

            {/* Add Sign-In / Sign-Up Form Here */}

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </Layout>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    //backgroundColor: 'white',
  },
 
  backgroundImage: {
    width: '100%', height: 200, resizeMode: 'cover'
  },
  content: {
    padding: 10,

  },
  referralCard: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    //    backgroundColor: 'linear-gradient(to right, #1e7fca #e12d82)',
    borderRadius: 5,
    elevation: 3
  },
  bonusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'goldenrod', // White text for better contrast
  },
  amount: {
    fontSize: 24,
    color: 'goldenrod',
    marginTop: 5,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 210, // Adjust based on your layout
    borderRadius: 10,
    resizeMode: 'cover', // Ensures image fits well
  },
  serviceTitle: { fontSize: 18, fontWeight: 'bold' },
  serviceDescription: { fontSize: 14, color: 'gray' },
  howGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  howCard: {
    width: width / 3.5,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    boxShadow: '0px 0px 2px #ff0080',
    borderRadius: 3
  },
  howImage: {
    width: 50, height: 50, marginBottom: 5
  },
  howTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ff0080',
    paddingBottom: 10
  },
 
  offerCard: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 5,
    padding: 5,
    elevation: 2,
    width: width * 0.7,
  },
  offerImage: {
    width: '80%',
    height: 120, // Set appropriate height
    borderRadius: 5,
    resizeMode: 'contain', // Ensures the image covers the container
  },
  offerTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  offerSubtitle: { fontSize: 14, color: 'gray' },

  modalContainer: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 200,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
