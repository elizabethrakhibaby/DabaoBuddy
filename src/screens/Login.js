import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { alignContent, flex, flexDirection, width } from 'styled-system';
import { auth } from './firebase';
//import HomeScreen from './HomeScreen';

function Login() {
  const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


const handleLogin = () => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('Login successful', user.email);
      navigation.navigate("HomeScreen");
      // Proceed to the next screen or handle the authentication success
    })
    .catch(error => {
      console.log('Login failed:', error.message);
      alert('Login failed. Please check your credentials.');
    });
};



  return (
    <View style={styles.container}>

      {/* first two lines */}
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Login</Text>
      </View>
      <View style={styles.text2}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")} ><Text style={styles.signupText}> Sign up</Text></TouchableOpacity>
      </View>

      {/* Username or Email Input Field */}

      <View style={styles.buttonStyleX}>
        <TextInput
          placeholder = "Email"
          value={email}
          onChangeText={text=> setEmail(text)}
          />
      </View>


      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
      <TextInput
          placeholder = "Password"
          value={password}
          onChangeText={text=> setPassword(text)}
          secureTextEntry
          />
      </View>

      {/* Login Button */}
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={handleLogin}>
      <Text>LOGIN</Text>
    </Button>
      </View>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
     
        <Login />
      
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  // Background colour
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  LoginText: {
    marginTop:100,
    fontSize:30,
    fontWeight:'bold',
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5
  },
  signupText:{
    fontWeight:'bold'
  },
  emailField:{
    marginTop:30,
    marginLeft:15
  },
  emailInput:{
    marginTop:10,
    marginRight:5
  },
  buttonStyle:{
    marginTop:30,
    marginLeft:15,
    marginRight:15
  },
  buttonStyleX:{
    marginTop:12,
    marginLeft:15,
    marginRight:15,
    marginBottom: 10
  },
  buttonDesign:{
    backgroundColor:'#FDDB62'
  },
  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
});
