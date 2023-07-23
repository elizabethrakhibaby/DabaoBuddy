import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../src/screens/HomeScreen';

// Mock the useNavigation hook to provide a dummy navigation object
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ setOptions: jest.fn() }),
}));

// Mock the useResults hook
jest.mock('../hooks/useResults', () => () => {
  const mockResults = [
    { id: '1', name: 'Restaurant 1', price: '$' },
    { id: '2', name: 'Restaurant 2', price: '$$' },
    { id: '3', name: 'Restaurant 3', price: '$$' },
  ];
  return [jest.fn(), mockResults, ''];
});

describe('HomeScreen', () => {
  it('fetches and displays restaurants based on the keyword search', () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);

    // Enter a search term in the search bar
    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'pizza');

    // Submit the search term
    fireEvent.submit(searchInput);

    // Check if the restaurants with prices '$' are displayed
    expect(getByText('Cost Effective ($2.50)')).toBeTruthy();
    expect(getByText('Restaurant 1')).toBeTruthy();

    // Check if the restaurants with prices '$$' are displayed
    expect(getByText('Bit Pricier ($5)')).toBeTruthy();
    expect(getByText('Restaurant 2')).toBeTruthy();
    expect(getByText('Restaurant 3')).toBeTruthy();
  });
});
