import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import yelp from '../api/yelp';
import { useNavigation } from '@react-navigation/native';
import { firestore } from './firebase';
import { getIDOfLoggedInUser, addToPlacedOrders } from '../utils';

// const confirmOrderDetails = (storeID, imageURLOfFoodItem) => {
// navigation.navigate('ConfirmOrder',{ storeID, imageURLOfFoodItem })}
const ConfirmOrderScreen = ({ route }) => {
    const navigation = useNavigation();
    // Generate a unique order ID and add data to the order document
    const createOrder = async () => {
        const ordersCollection = firestore.collection('orderList');
        const newOrderRef = ordersCollection.doc();
        const orderID = newOrderRef.id;
      
        const uid = await getIDOfLoggedInUser();
        const userRef = firestore.collection('users').doc(uid);
        const userSnapshot = await userRef.get();
      
        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          const placedUserName = userData.name;
          const location = userData.location || "Location unspecified";
      
          const orderData = {
            address: address,
            imageURLOfFoodItem: imageURLOfFoodItem,
            overallRating: overallRating,
            priceOfItem: priceOfItem,
            storeID: storeID,
            storeName: storeName,
            placedUserID: uid,
            placedUserName: placedUserName,
            acceptedUserID: null,
            acceptedUserName: null,
            location: location,
          };
      
          await newOrderRef.set(orderData);
          await addToPlacedOrders(uid, orderID);
        } else {
          console.log('User document does not exist.');
        }
      };
      
    const [storeName, setStoreName] = useState("nothing");
    const [priceOfItem, setPriceOfItem] = useState(null);
    const [address, setAddress] = useState(null);
    const [overallRating, setOverallRating] = useState(null);
    //assumes that the parameters passed to the screen include these two keys
    const {storeID, imageURLOfFoodItem} = route.params;
    const [result, setResult] = useState(null);


    const getResult = async (storeID) => {
        const response = await yelp.get(`/${storeID}`);
        setResult(response.data);
        setPriceOfItem(response.data.price);
        setAddress(response.data.location.display_address);
        setStoreName(response.data.name);

        if (response.data.price == '$') {
            setPriceOfItem(2.50);
        } else if (response.data.price == '$$') {
            setPriceOfItem(5.00);
        } else if (response.data.price == '$$$') {
            setPriceOfItem(7.50);
        }

        setOverallRating(response.data.rating);
    };

    useEffect(() => {
        getResult(storeID);
    }, []);

    if (!result) {
        return null;
    }


    return (
        <View>
            <View style={styles.box1}>
                <Text style={styles.headerTitle}>Ordering from: {storeName}</Text>
                <Text style={styles.text}>Price: $ {priceOfItem}</Text>
                <Image style={styles.styleImage} source={{ uri: imageURLOfFoodItem }} />
                <Text style={styles.text}>Overall rating of store (out of 5 stars): {overallRating}</Text>
                <Text style={styles.text}>Address:</Text>
                <Text style={styles.text}>{address}</Text>
            </View>
            <Text style={styles.warningMsg}>Once button below is pressed, order cannot be cancelled!</Text>
            <TouchableOpacity style={styles.placeOrderButton}
                onPress={() => {
                    createOrder();
                    navigation.navigate('Orders');
                }}>
                <Text>Confirm Order</Text>
            </TouchableOpacity>
        </View>
    );

};



const styles = StyleSheet.create({
    box1: {
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 50,
        marginBottom: 20,
        backgroundColor: 'beige',
        borderColor: 'black',
        borderRadius: 40,
        padding: 20,
        borderWidth: 4,
        width: '95%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 20,
        fontFamily: 'Times New Roman',
        fontWeight: 'normal',
        color: 'black',
        marginBottom: 10,
        textAlign: 'center'
    },
    headerTitle: {
        fontSize: 20,
        //fontFamily: 'arial', // Replace with the desired font family
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 20,
        textAlign: 'center'
    },
    styleImage: {
        height: 200,
        width: 300,
        marginBottom: 20
    },
    warningMsg: {
        alignSelf: "center",
        color: "red",
    },
    placeOrderButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
        marginLeft: 110,
        width: '40%',
        borderRadius: 10,
        marginTop: 20,
        padding: 20


    }
});

export default ConfirmOrderScreen;


/**
 * As Yelp only indicates price in a category banding of $, $$, $$$
 * For purposes of testing, 
 * For restaurants tagged with the following number of dollar signs, we will assign a default value
 * $ - $2.50
 * $$ - $5.00
 * $$$ - $7.50
 */


/*
const user = auth.currentUser;
const uid = user.uid;
const userSnapshot = await firestore.collection('users').doc(auth.currentUser.uid).get();
const userData = userSnapshot.data();
const placedUserName = userData.name;
*/


