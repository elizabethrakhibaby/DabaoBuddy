import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../src/screens/Login';
import { auth } from '../src/screens/firebase';

// Mock the signInWithEmailAndPassword function from firebase/auth module
jest.mock('./firebase', () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
  },
}));

describe('Login', () => {
  it('should log in successfully with valid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    // Fill in email and password fields
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');

    // Simulate the "LOGIN" button press
    const loginButton = getByText('LOGIN');
    fireEvent.press(loginButton);

    // Check if signInWithEmailAndPassword was called with the correct email and password
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password');

    // Check if navigation.navigate was called with 'HomeScreen'
    expect(navigation.navigate).toHaveBeenCalledWith('HomeScreen');
  });

  it('should show an alert message if login fails', async () => {
    // Mock signInWithEmailAndPassword to reject the promise (simulate login failure)
    auth.signInWithEmailAndPassword = jest.fn(() => Promise.reject(new Error('Invalid credentials')));

    const { getByPlaceholderText, getByText } = render(<Login />);

    // Fill in email and password fields
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');

    // Simulate the "LOGIN" button press
    const loginButton = getByText('LOGIN');
    fireEvent.press(loginButton);

    // Check if signInWithEmailAndPassword was called with the correct email and password
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'wrongpassword');

    // Check if an alert message is displayed
    const alertMessage = 'Login failed. Please check your credentials.';
    expect(alert).toHaveBeenCalledWith(alertMessage);

    // Check if navigation.navigate was not called
    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
