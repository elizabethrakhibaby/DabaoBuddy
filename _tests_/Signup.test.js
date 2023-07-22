import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Signup from '../src/screens/Signup';
import { auth } from '../src/screens/firebase';

// Mock the createUserWithEmailAndPassword function from firebase/auth module
jest.mock('./firebase', () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'fakeUserId' } })),
  },
}));

describe('Signup', () => {
  it('should create an account in Firebase if email ends with @u.nus.edu and passwords match', async () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);

    // Fill in email and password fields
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.changeText(emailInput, 'test@u.nus.edu');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'password');

    // Simulate the "SIGN UP" button press
    const signUpButton = getByText('SIGN UP');
    fireEvent.press(signUpButton);

    // Check if createUserWithEmailAndPassword was called with the correct email and password
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@u.nus.edu', 'password');

    // Check if error message is empty
    const errorMessage = getByText('');
    expect(errorMessage).toBeTruthy();

    // Check if navigation.navigate was called with 'Login'
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('should show an error message if email does not end with @u.nus.edu', async () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);

    // Fill in email and password fields
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.changeText(emailInput, 'test@example.com'); // Invalid email
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'password');

    // Simulate the "SIGN UP" button press
    const signUpButton = getByText('SIGN UP');
    fireEvent.press(signUpButton);

    // Check if createUserWithEmailAndPassword was not called
    expect(auth.createUserWithEmailAndPassword).not.toHaveBeenCalled();

    // Check if error message is displayed
    const errorMessage = getByText('Please use your NUS Email');
    expect(errorMessage).toBeTruthy();

    // Check if navigation.navigate was not called
    expect(navigation.navigate).not.toHaveBeenCalled();
  });

  it('should show an error message if passwords do not match', async () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);

    // Fill in email and password fields
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    fireEvent.changeText(emailInput, 'test@u.nus.edu');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'differentpassword'); // Passwords do not match

    // Simulate the "SIGN UP" button press
    const signUpButton = getByText('SIGN UP');
    fireEvent.press(signUpButton);

    // Check if createUserWithEmailAndPassword was not called
    expect(auth.createUserWithEmailAndPassword).not.toHaveBeenCalled();

    // Check if error message is displayed
    const errorMessage = getByText('Passwords do not match');
    expect(errorMessage).toBeTruthy();

    // Check if navigation.navigate was not called
    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
