
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';
import { auth, firestore } from './firebase';



function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = () => {
    if (password === confirmPassword && email.endsWith("@u.nus.edu")) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          console.log('Signup successful');
          // Store additional user details in Firestore
          firestore.collection('users').doc(user.uid).set({
            email: user.email,
            earnings: 0,
            expenditure: 0,
            name: ""
          });
          setError(''); // Reset the error message
          navigation.navigate('Login');
        })
        .catch(error => {
          setError(error.message); // Set the error message
          console.log('Signup failed:', error.message);
        });
    } else if (!email.endsWith("@u.nus.edu")) {
      setError('Please use your NUS Email'); // Set the error message
    } else {
      setError('Passwords do not match'); // Set the error message
    }
  };


  return (
    //First 2 lines
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Signup</Text>
      </View>
      <View style={styles.text2}>
        <Text>Already have account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} ><Text style={styles.signupText}> Login </Text></TouchableOpacity>
      </View>

      {/* Username or Email Input Field */}
      <View style={styles.buttonStyleX}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonStyleX}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>

      {/* Signup Button */}
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={handleRegistration}>
          <Text> SIGN UP </Text>
        </Button>
        {/* Error Message */}
        <Text style={styles.errorText}>{error}</Text>
        {/* Rest of your code */}
      </View>

    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>

      <Signup />

    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LoginText: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: 'bold',
  },
  Middle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text2: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5
  },
  signupText: {
    fontWeight: 'bold'
  },
  emailField: {
    marginTop: 30,
    marginLeft: 15
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10
  },
  buttonDesign: {
    backgroundColor: '#FDDB62'
  },
  lineStyle: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center'
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  boxStyle: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around'
  },
  errorText: {
    color: 'red',
  },

});

