import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, Image, ScrollView, Button } from "react-native";
import { useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native';
import { getIDOfLoggedInUser, removeFromPlacedOrders, removeFromAcceptedOrders } from "../utils";
import { firestore } from "./firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";



//orderId => INDIVIDUAL document reference number of 'orderList'

const OrdersScreen = function () {
  const isFocused = useIsFocused();
  const [placedOrdersData, setPlacedOrdersData] = useState([]);
  const [acceptedOrdersData, setAcceptedOrdersData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const navigation = useNavigation();

  const handleContactPress = async (orderId) => {
    console.log('orderId:', orderId);
    try {
      // Fetch the order document from Firestore using the orderId
      const orderRef = firestore.collection('orderList').doc(orderId);
      const orderSnapshot = await orderRef.get();

      if (orderSnapshot.exists) {
        // Order document exists, navigate to the "MessengerScreen"
        navigation.navigate('Messenger', { orderId: orderId });
        console.log('Successfully navigated to Messaging Screen','orderId:', orderId );
      } else {
        console.log('Order does not exist in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    let isUnmounted = false;
    let timeoutId;

    if (isFocused && !isUnmounted) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchOrderData(); //function call
      }, 100); // Delay to avoid rapid calls

      return () => {
        clearTimeout(timeoutId);
        isUnmounted = true;
      };
    }
  }, [isFocused]);

  const fetchOrderData = async () => {
    try {
      const uid = await getIDOfLoggedInUser();
      const userDoc = await firestore.collection('users').doc(uid).get();
      if (userDoc.exists) {
        const placedOrdersArray = userDoc.data().placedOrdersArray;
        setPlacedOrdersData(placedOrdersArray);
        const acceptedOrdersArray = userDoc.data().acceptedOrdersArray;
        setAcceptedOrdersData(acceptedOrdersArray);
        fetchOrderDetails([...placedOrdersArray, ...acceptedOrdersArray]);
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching data of accepted/placed orders:', error);
    }
  };

  const fetchOrderDetails = async (orderIds) => {
    try {
      const orderDocuments = await Promise.all(
        orderIds.map(async (orderId) => {
          const documentRef = firestore.collection('orderList').doc(orderId);
          const documentSnapshot = await documentRef.get();
          if (documentSnapshot.exists) {
            return {
              id: orderId,
              ...documentSnapshot.data()
            };
          } else {
            console.log(`Order ${orderId} does not exist`);
            return null;
          }
        })
      );

      setOrderData(orderDocuments);
    } catch (error) {
      console.error('Error retrieving order data:', error);
    }
  };

  const renderItemPO = ({ item }) => {
    const handleRemoveItem = async () => {
      try {
        Alert.alert(
          "Confirmation",
          "Upon clicking Done you will no longer have access to the chat. Are you sure you want to proceed?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                console.log("tryna remove");
                // Remove the order from Firestore by calling the removeFromPlacedOrders function
                const uid = await getIDOfLoggedInUser()
                await removeFromPlacedOrders(uid, item?.id); // Replace "userId" with the actual user ID of the current user
  
                // Update the local state to remove the order from placedOrdersData
                const updatedOrdersData = placedOrdersData.filter((orderId) => orderId !== item?.id);
                setPlacedOrdersData(updatedOrdersData);
              },
            },
          ]
        );
      } catch (error) {
        console.error('Error removing order:', error);
      }
    };
  

    return (
      <View style={styles.boxStylePO}>
        {/* Place text elements above the image */}
        <View style={styles.textContainer}>
          <Text>{item ? "Store name: " + item.storeName : "lol"}</Text>
          <Text>{item ? "Delivery Location: " + item.location : "lol"}</Text>
        </View>
        {/* Wrap image and buttons in a container with flexDirection: 'row' */}
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: item.imageURLOfFoodItem }} />
          {/* Buttons are now placed beside the image */}
          <TouchableOpacity style={styles.touchableOpacityStylePO} onPress={() => handleContactPress(item?.id)}>
            <Text>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacityStylePO} onPress={handleRemoveItem}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };



  const renderItemAO = ({ item }) => {
    const handleRemoveItem = async () => {
      try {
        Alert.alert(
          "Confirmation",
          "Upon clicking Done you will no longer have access to the chat. Are you sure you want to proceed?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                console.log("tryna remove");
                // Remove the order from Firestore by calling the removeFromAcceptedOrders function
                const uid = await getIDOfLoggedInUser()
                await removeFromAcceptedOrders(uid, item?.id); // Replace "userId" with the actual user ID of the current user
  
                // Update the local state to remove the order from acceptedOrdersData
                const updatedOrdersData = acceptedOrdersData.filter((orderId) => orderId !== item?.id);
                setAcceptedOrdersData(updatedOrdersData);
              },
            },
          ]
        );
      } catch (error) {
        console.error('Error removing order:', error);
      }
    };

    return (
      <View style={styles.boxStyleAO}>
        {/* Place text elements above the image */}
        <View style={styles.textContainer}>
          <Text>{item ? "Being a buddy to: " + item.placedUserName : ""}</Text>
          <Text>{item ? "Delivery Location: " + item.location : "lol"}</Text>
          <Text>{item ? "Store name: " + item.storeName : "lol"}</Text>
        </View>
        {/* Wrap image and buttons in a container with flexDirection: 'row' */}
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: item.imageURLOfFoodItem }} />
          {/* Buttons are now placed beside the image */}
          <TouchableOpacity style={styles.touchableOpacityStyleAO} onPress={() => handleContactPress(item?.id)}>
            <Text>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacityStyleAO} onPress={handleRemoveItem}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.textStyle}>Orders you placed:</Text>

      <FlatList
        data={orderData.filter(item => placedOrdersData.includes(item?.id))}
        renderItem={renderItemPO}
        keyExtractor={(item) => item?.id}
      />

      <Text style={styles.textStyle}>Orders you accepted:</Text>

      <FlatList
        data={orderData.filter(item => acceptedOrdersData.includes(item?.id))}
        renderItem={renderItemAO}
        keyExtractor={(item) => item?.id}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Spread items horizontally with equal space
    paddingHorizontal: 10, // Add horizontal padding to create space between image and buttons
    marginBottom: 10, // Add margin at the bottom to separate each item
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  textStyle: {
    fontSize: 30,
  },
  boxStyleAO: {
    borderWidth: 1,
    backgroundColor: "#f1f7b5",
    padding: 5,
  },
  boxStylePO: {
    borderWidth: 1,
    backgroundColor: "#D5E3F0",
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10, // Add margin to the right of the image to separate it from text
  },
  touchableOpacityStyleAO: {
    backgroundColor: '#D5E3F0',
    padding: 10,
    borderRadius: 5,
  },
  touchableOpacityStylePO: {
    backgroundColor: '#f1f7b5',
    padding: 10,
    borderRadius: 5,
  },
});

export default OrdersScreen;

