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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { imageUrl, homeApi, referralAmountApi } from '../services/apiServices';
import { SvgUri } from 'react-native-svg';

const HomeScreen = ({ navigation }) => {
  const [referralAmount, setReferralAmount] = useState(0);
  const [services, setServices] = useState([]);
  const [offers, setOffers] = useState([]);

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
  const goToProfile = () => navigation.navigate('Profile');
  const offerdeals = (offer) => {
    console.log('Selected offer:', offer);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="list" size={30} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../assets/logo-horizontal.png')}
          style={styles.logoHorizontal}
        />
        <TouchableOpacity>
          <Icon name="user-circle-o" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Banner Image */}
        <Image
          source={require('../assets/DxxfKrd9IwwMnBrA.jpg')}
          style={styles.backgroundImage}
        />
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
              onPress={() => offerdeals(item)}
            >
              <Image
                source={{ uri: imageUrl +'/'+ item.image }}
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
              source={{ uri: imageUrl +'/'+ service.image }}
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
                <SvgUri width="100" height="100" uri={imageUrl +'/frontend/images/'+ image} />
                <Text style={styles.howTitle}>
                  {['Sign Up', 'Shop', 'Ship', 'Save', 'Receive'][index]}
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.tab}>
          <Icon name="home" size={25} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Icon name="user-circle" size={25} color="black" />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  logoHorizontal: { width: 150, height: 50, resizeMode: 'contain' },
  backgroundImage: { width: '100%', height: 200, resizeMode: 'cover' },
  content: { padding: 10 },
  referralCard: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
//    backgroundColor: 'linear-gradient(to right, #7e2080, #e12d82)',
    borderRadius: 8,
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
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 150, // Adjust based on your layout
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
  howCard: { width: width / 3.5, alignItems: 'center', marginBottom: 10 },
  howImage: { width: 50, height: 50, marginBottom: 5 },
  howTitle: { fontSize: 14, textAlign: 'center' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  tab: { alignItems: 'center' },
  offerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    padding: 5,
    elevation: 2,
    width: width * 0.6,
  },
  offerImage: {
    width: '100%',
    height: 120, // Set appropriate height
    borderRadius: 10,
    resizeMode: 'cover', // Ensures the image covers the container
  },
  offerTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  offerSubtitle: { fontSize: 14, color: 'gray' },
});

export default HomeScreen;
