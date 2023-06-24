/**
 * Following software engineering best practices to promote modularity and code organization,
 * reusable functions are stored in this utils.js file. 
 * This is to consolidate commonly used functions in a single location,
 * making it easier to maintain and reuse code across different parts of our application.
 */

import { auth, firestore } from './screens/firebase';
import { getFirestore, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';


// Function to check if a number is even
export const isEven = (num) => {
  return num % 2 === 0;
};

// Function to check to retrieve name of currently logged in user
export const getNameOfLoggedInUser = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      const snapshot = await userRef.get();
      if (snapshot.exists) {
        const name = snapshot.data().name;
        //console.log(name); // Log the name directly inside the function
        return name;
      } else {
        console.log('User profile does not exist');
      }
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error);
  }
};


// Function to retrieve ID of currently logged in user
export const getIDOfLoggedInUser = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userRef = firestore.collection('users').doc(user.uid);
      const snapshot = await userRef.get();
      if (snapshot.exists) {
        return snapshot.id;
      } else {
        console.log('User profile does not exist');
      }
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error);
  }
};

// Function to add order to placedOrdersArray of currently logged in user


export const addToPlacedOrders = async (userId, orderToAdd) => {
  try {
    const documentRef = firestore.collection('users').doc(userId);

    await updateDoc(documentRef, {
      placedOrdersArray: arrayUnion(orderToAdd),
    });

    console.log('Order successfully added to placedOrdersArray');
  } catch (error) {
    console.error('Error adding order to placedOrdersArray:', error);
  }
};



// Function to remove order to placedOrdersArray of currently logged in user

export const removeFromPlacedOrders = async (userId, orderToRemove) => {
  try {
    const documentRef = firestore.collection('users').doc(userId);

    await updateDoc(documentRef, {
      placedOrdersArray: arrayRemove(orderToRemove),
    });

    console.log('Order successfully removed from placedOrdersArray');
  } catch (error) {
    console.error('Error removing order from placedOrdersArray:', error);
  }
};

// Function to add order to acceptedOrdersArray of currently logged in user

export const addToAcceptedOrders = async (userId, orderToAdd) => {
  try {
    const documentRef = firestore.collection('users').doc(userId);

    await updateDoc(documentRef, {
      acceptedOrdersArray: arrayUnion(orderToAdd),
    });

    console.log('Order successfully added to acceptedOrdersArray');
  } catch (error) {
    console.error('Error adding order to acceptedOrdersArray:', error);
  }
};

// Function to remove order from acceptedOrdersArray of currently logged in user

export const removeFromAcceptedOrders = async (userId, orderToRemove) => {
  try {
    const documentRef = firestore.collection('users').doc(userId);

    await updateDoc(documentRef, {
      acceptedOrdersArray: arrayRemove(orderToRemove),
    });

    console.log('Order successfully removed from acceptedOrdersArray');
  } catch (error) {
    console.error('Error removing order from acceptedOrdersArray:', error);
  }
};
