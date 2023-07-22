import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../src/screens/ProfileScreen';
import { auth, firestore } from './firebase';

// Mock the firebase module to avoid actual calls to Firestore
jest.mock('./firebase');

// Mock the useNavigation hook to provide a dummy navigation object
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

// Helper function to set the current user and user data in the Firestore mock
const mockUserData = (currentUser, userData) => {
  auth.currentUser = currentUser;
  firestore.collection('users').doc(currentUser.uid).get.mockResolvedValue({
    data: () => userData,
  });
};

describe('ProfileScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates name and location data in Firestore when the "Save" button is pressed', async () => {
    // Mock user data
    const currentUser = { uid: 'testUserId' };
    const userData = { name: 'John Doe', location: 'Test Location' };
    mockUserData(currentUser, userData);

    // Render the component
    const { getByPlaceholderText, getByText } = render(<ProfileScreen />);

    // Input new name and save
    const newName = 'New Name';
    const nameInput = getByPlaceholderText('Enter your new name');
    fireEvent.changeText(nameInput, newName);

    const saveNameButton = getByText('Save');
    fireEvent.press(saveNameButton);

    // Input new location and save
    const newLocation = 'New Location';
    const locationInput = getByPlaceholderText('Enter your delivery location');
    fireEvent.changeText(locationInput, newLocation);

    const saveLocationButton = getByText('Save');
    fireEvent.press(saveLocationButton);

    // Check if Firestore is updated with new name and location
    expect(firestore.collection).toHaveBeenCalledWith('users');
    expect(firestore.collection('users').doc).toHaveBeenCalledWith(currentUser.uid);
    expect(firestore.collection('users').doc().set).toHaveBeenCalledWith(
      { name: newName },
      { merge: true }
    );
    expect(firestore.collection('users').doc().set).toHaveBeenCalledWith(
      { location: newLocation },
      { merge: true }
    );
  });
});
