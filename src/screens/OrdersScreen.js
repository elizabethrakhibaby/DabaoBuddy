import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList, Image, ScrollView } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { getIDOfLoggedInUser } from "../utils";
import { firestore } from "./firebase";

const OrdersScreen = function () {
  const isFocused = useIsFocused();
  const [placedOrdersData, setPlacedOrdersData] = useState([]);
  const [acceptedOrdersData, setAcceptedOrdersData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
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

    fetchOrderData();
  }, [isFocused]);

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
    return (
      <View style={styles.boxStylePO}>
        <Text>{item ? "Store name: " + item.storeName : "lol"}</Text>
        <Image style={styles.image} source={{ uri: item.imageURLOfFoodItem }} />
      </View>
    );
  };

  const renderItemAO = ({ item }) => {
    return (
      <View style={styles.boxStyleAO}>
        <Text>{item ? "Being a buddy to: " + item.placedUserName : "lol"}</Text>
        <Text>{item ? "Store name: " + item.storeName : "lol"}</Text>
        <Image style={styles.image} source={{ uri: item.imageURLOfFoodItem }} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>This is the Orders Screen.</Text>
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
    justifyContent: 'space-between',
    width: 200,
    marginLeft: 100
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
    borderWidth: 2,
    backgroundColor: "#f1f7b5",
    padding: 10
  },
  boxStylePO: {
    borderWidth: 2,
    backgroundColor: "#AEC6CF",
    padding: 10
  },
  image: {
    width: 100,
    height: 100
  }
});

export default OrdersScreen;
