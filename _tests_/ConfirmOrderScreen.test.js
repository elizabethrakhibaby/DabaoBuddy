import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from './firebase';
import ConfirmOrderScreen from './ConfirmOrderScreen';

// Mock the useNavigation hook to provide a dummy navigation object
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Mock the Firestore collection and document functions
jest.mock('./firebase', () => ({
  firestore: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        id: 'fakeOrderId',
        set: jest.fn(),
      })),
    })),
  },
}));

describe('ConfirmOrderScreen', () => {
  it('creates an order document when the "Confirm Order" button is pressed', async () => {
    const navigation = useNavigation();

    const { getByText } = render(<ConfirmOrderScreen route={{ params: { storeID: 'fakeStoreId', imageURLOfFoodItem: 'fakeImageURL' } }} />);
    const confirmOrderButton = getByText('Confirm Order');

    // Mock the getIDOfLoggedInUser function from utils.js to return a fake user ID
    jest.mock('../utils', () => ({
      getIDOfLoggedInUser: jest.fn(() => 'fakeUserId'),
      addToPlacedOrders: jest.fn(),
    }));

    // Press the "Confirm Order" button
    fireEvent.press(confirmOrderButton);

    // Check if Firestore collection and document functions were called with the correct data
    expect(firestore.collection).toHaveBeenCalledWith('orderList');
    expect(firestore.collection('orderList').doc).toHaveBeenCalledWith('fakeOrderId');
    expect(firestore.collection('orderList').doc().set).toHaveBeenCalledWith({
      address: expect.any(String),
      imageURLOfFoodItem: 'fakeImageURL',
      overallRating: expect.any(Number),
      priceOfItem: expect.any(Number),
      storeID: 'fakeStoreId',
      storeName: expect.any(String),
      placedUserID: 'fakeUserId',
      placedUserName: expect.any(String),
      acceptedUserID: null,
      acceptedUserName: null,
      location: expect.any(String),
    });

    // Check if navigation.navigate was called with the correct screen name
    expect(navigation.navigate).toHaveBeenCalledWith('Orders');
  });
});
