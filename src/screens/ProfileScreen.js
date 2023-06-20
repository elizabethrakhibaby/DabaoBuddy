import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { auth, firestore } from './firebase';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const navigation = useNavigation();

  
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userSnapshot = await firestore.collection('users').doc(currentUser.uid).get();

        const userData = userSnapshot.data();
        if (userData) {
          setName(userData.name);
        }

        setUser(currentUser);
      }
    };

    fetchUserData();
  }, []);

  const onSaveName = () => {
    if (name) {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = firestore.collection('users').doc(currentUser.uid);
        userRef
          .set({ name: name }, { merge: true }) // Use set with merge:true to update the document
          .then(() => {
            console.log('Name updated successfully.');
            setName(name); // Update the local state with the new name
          })
          .catch(error => {
            console.log('Failed to update name:', error);
          });
      }
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User logged out successfully.');
        navigation.navigate('Login'); // Navigate back to the login screen
      })
      .catch(error => {
        console.log('Failed to log out:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DabaoBuddy Profile</Text>
      <Image source={require('../../assets/graduated.png')} style={styles.avatar} />

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      )}
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.value}
            placeholder="Enter your new name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TouchableOpacity style={styles.button} onPress={onSaveName}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
     
     <TouchableOpacity style={styles.buttonL} onPress={handleLogout}>
        <Text style={styles.buttonTextL}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.caption}>Created for: </Text>
      <Image source={require('../../assets/NUS.jpeg')} style={styles.logo} />
    </View>
  );
}

//style
const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#FFFFFF',
},

header: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
  textAlign: 'center',
  fontFamily: 'Arial',
},

userInfo: {
  flexDirection: 'row',
  marginBottom: 8,
  backgroundColor: '#F2F2F2',
  padding: 10,
  borderRadius: 5,
},
label: {
  flex: 0,
  fontWeight: 'bold',
  textAlign: 'left',
  fontFamily: 'Arial',
  fontSize: 16,
  marginRight: 10,
},
value: {
  flex: 1,
  textAlign: 'left',
  fontFamily: 'Arial',
  fontSize: 16,
}, 
  button: {
    backgroundColor: '#FDDB62', // Set the background color to yellow
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  buttonTextL: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 5
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonL: {
    backgroundColor: '#4C4CFF', // Set the background color to yellow
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginTop:20,
    height: 30
    
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  logo: {
    width: 150,
    height: 100,
  },
  caption: {
    fontSize: 16,
    fontWeight: '200', // Use a thinner font weight
    fontStyle: 'italic', // Italicize the text
    marginTop: 50, // Adjust the marginTop as desired
  },
  
});

export default ProfileScreen;
