import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import BuddyScreen from './BuddyScreen';

// Mock the useNavigation hook to provide a dummy navigation object
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Mock the firestore.collection().get() function to return dummy data
const mockCollectionGet = jest.fn(() => ({
  docs: [
    {
      id: 'fakeOrderId1',
      data: () => ({
        placedUserID: 'fakeUserId1',
        acceptedUserID: null,
      }),
    },
    {
      id: 'fakeOrderId2',
      data: () => ({
        placedUserID: 'fakeUserId2',
        acceptedUserID: 'fakeAcceptedUserId',
      }),
    },
  ],
}));

jest.mock('./firebase', () => ({
  firestore: {
    collection: jest.fn(() => ({
      get: mockCollectionGet,
    })),
  },
}));

describe('BuddyScreen', () => {
  it('displays only orders placed by other users and not accepted by any user', async () => {
    const { findAllByText, queryByText } = render(<BuddyScreen />);
    const orderItems = await findAllByText(/Takeaway from:/);

    expect(orderItems).toHaveLength(1); // Should display 1 order as the other one is accepted by a user
    expect(queryByText('fakeOrderId1')).toBeTruthy();
    expect(queryByText('fakeOrderId2')).toBeNull();
  });
});
