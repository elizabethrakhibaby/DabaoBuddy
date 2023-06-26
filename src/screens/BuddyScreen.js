import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { auth, firestore } from './firebase';
import { getNameOfLoggedInUser, getIDOfLoggedInUser, addToAcceptedOrders, increaseEarnings, increaseExpenditure } from '../utils';




const BuddyScreen = function () {
  //Change default header of BuddyScreen from Buddy to Buddy Mode -- Accept Orders!
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Buddy Mode -- Accept Orders!',
      headerTitleStyle: styles.headerTitle,
    });
  }, [navigation]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [ordersData, setOrdersData] = useState([]);

  //enable re-rendering of screen whenever the the user goes to BuddyScreen as 
  //there would be a change in data after an order is accepted

  useEffect(() => {
    fetchOrderData();
  }, [isFocused]);

  const fetchOrderData = async () => {
    try {
      const querySnapshot = await firestore.collection('orderList').get();
      const dataOfAllOrders = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //console.log(dataOfAllOrders);

      setOrdersData(dataOfAllOrders);
    } catch (error) {
      console.error('Error fetching data of all placed orders:', error);
    }
  };




  const confirmOrderAcceptance = async (item) => {
    try {

      const orderRef = firestore.collection('orderList').doc(item.id);
      const orderID = orderRef.id
      await orderRef.update({
        acceptedUserName: loggedInUserName,
        acceptedUserID: loggedInUserID,
      });

      console.log('Order acceptance confirmed:', item);
      // Immediately refresh the data
      fetchOrderData();

      //add orderID to acceptedOrdersArray of acceptedUser - loggedInUserID
      await addToAcceptedOrders(loggedInUserID, orderID);

      //Update earnings of acceptedUser - loggedInUserID
      await increaseEarnings(loggedInUserID, item.priceOfItem);

      //Update expenditure of placedUser - item.placedUserID
      await increaseExpenditure(item.placedUserID,item.priceOfItem);

      //NAVIGATE TO ORDERS PAGE
      navigation.navigate("Orders");

    } catch (error) {
      console.error('Error confirming order acceptance:', error);
    }
  };

  /** Retrieve loggedInUserID */
  const [loggedInUserID, setLoggedInUserID] = useState('');

  useEffect(() => {
    const fetchLoggedInUserID = async () => {
      try {
        const id = await getIDOfLoggedInUser(); //
        setLoggedInUserID(id);
      } catch (error) {
        console.error('Error fetching logged-in user ID:', error);
      }
    };

    fetchLoggedInUserID();
  }, []);
  /** Retrieve loggedInUserID */

  /** Retrieve loggedInUserName */
  const [loggedInUserName, setLoggedInUserName] = useState('');

  useEffect(() => {
    const fetchLoggedInUserName = async () => {
      try {
        const id = await getNameOfLoggedInUser();
        setLoggedInUserName(id);
      } catch (error) {
        console.error('Error fetching logged-in user Name:', error);
      }
    };

    fetchLoggedInUserName();
  }, []);
  /** Retrieve loggedInUserName */


  const renderItem = ({ item }) => {
    /** 
     * Filter condition is applied to ensure that only orders placed by OTHER users are shown on buddy screen
     * This is to prevent a user from accidentally accepting their OWN order
     * item.placedUserID != loggedInUserID
     * 
     * Filter condition is applied to ensure that only orders that have yet to be accepted are shown on buddy screen.
     * This is to prevent a user from accepting an order that was already accepted by another user
     * item.acceptedUserID == null
     * */
    if (item.placedUserID != loggedInUserID && item.acceptedUserID == null) {
      return (
        <View style={styles.singleOrder}>
          <Image style={styles.image} source={{ uri: item.imageURLOfFoodItem }} />
          <View style={styles.orderDetails}>
            <Text style={styles.boldText}>Takeaway from: </Text>
            <Text> {item.storeName}</Text>
            <Text> <Text style={styles.boldText}>Earn: </Text>$ {item.priceOfItem}</Text>
            <TouchableOpacity style={styles.acceptOrderButton} onPress={() => confirmOrderAcceptance(item)}>
              <Text>ACCEPT ORDER</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      // If the filter condition is not met, return null or an empty View
      return null;
    }
  };


  return (
    <View>
      <Text style={styles.textStyle}>Orders placed by other users are reflected on this screen. Help someone today and be a Buddy!</Text>
      <FlatList
        data={ordersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  acceptOrderButton: {
    borderWidth: 2,
    borderColor: "purple",
    padding: 5,
    margin: 5,
    backgroundColor: "#f1f7b5"
  },
  boldText: {
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10
  },
  singleOrder: {
    backgroundColor: "#AEC6CF",
    borderWidth: 2,
    borderRadius: 25,
    padding: 20,
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  rightText: {
    textAlign: 'right',
  },
});

export default BuddyScreen;
