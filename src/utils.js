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



//When a user accepts an order, expenditure of placedUser must increase!
export const increaseExpenditure = async (placedUserID, valueToAdd) => {
  try {
    const userRef = firestore.collection('users').doc(placedUserID);
    // Get the current expenditure value
    const userDoc = await userRef.get();
    /**
     * If userDoc.data().expenditure is falsy (e.g., null or undefined),
     * then 0 will be assigned to currentExpenditure as a default value.
     */
    const currentExpenditure = userDoc.data().expenditure || 0;

    // Calculate the new earnings value
    const updatedExpenditure = currentExpenditure + valueToAdd;

    // Update the earnings field in the user document
    await userRef.update({ expenditure: updatedExpenditure });


    console.log('Expenditure have increased');
  } catch (error) {
    console.error('Error increasing expenditure:', error);
  }
};


//When a user accepts an order, earnings of acceptedUser must increase!
export const increaseEarnings = async (acceptedUserID, valueToAdd) => {
  try {
    const userRef = firestore.collection('users').doc(acceptedUserID);

    // Get the current earnings value
    const userDoc = await userRef.get();

    /**
     * If userDoc.data().earnings is falsy (e.g., null or undefined),
     * then 0 will be assigned to currentEarnings as a default value.
     */
    const currentEarnings = userDoc.data().earnings || 0;

    // Calculate the new earnings value
    const updatedEarnings = currentEarnings + valueToAdd;
    // Update the earnings field in the user document
    await userRef.update({ earnings: updatedEarnings });

    /*
    // Fetch the updated user document
    const updatedUserDoc = await userRef.get();
    console.log(updatedUserDoc.data().earnings);
    */

    console.log('Earnings have increased');
  } catch (error) {
    console.error('Error increasing earnings:', error);
  }
};