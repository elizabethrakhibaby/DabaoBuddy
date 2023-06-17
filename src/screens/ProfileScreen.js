import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { auth, firestore } from './firebase';

function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
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
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 8,
    
  },
  label: {
    flex: 0,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  value: {
    flex: 1,
    marginLeft: 8,
    textAlign: 'left', // Align the text in the center
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    backgroundColor: '#FDDB62', // Set the background color to yellow
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});

export default ProfileScreen;
