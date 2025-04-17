import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { OrderHistoryUrl } from '../../services/apiServices';
import { AuthContext } from '../../Context/MainContext';

export const OrderHistory = ({orderHistory,backtodetails }) => {


  const renderItem = ({ item, index }) => {
    const isLast = index === orderHistory.length - 1;

    return (
      <View style={styles.itemContainer}>
        {/* Timeline: icon + line */}
        <View style={styles.timelineContainer}>
          <View style={styles.circle}>
            <Icon name="check-circle" size={20} color="#4CAF50" />
          </View>
          {!isLast && <View style={styles.verticalLine} />}
        </View>

        {/* Text Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.timestamp}>
            {moment(item.created_at).format('DD MMM YYYY, hh:mm A')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity  style={styles.backButton} onPress={backtodetails}>
         <Image source={require('../../assets/back.png')} style={{ width:20, height: 20 }} />
      </TouchableOpacity>

      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
        
        //ListEmptyComponent={<Text>Loading...</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    //backgroundColor: '#F5F5F5',
  },
  backButton: {
    marginVertical: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007BFF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  timelineContainer: {
    alignItems: 'center',
    width: 40,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: -1,
    zIndex: -1,
  },
  content: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,

  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
});

export default OrderHistory;
