import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform  } from 'react-native';
import { firestore } from "./firebase";
import { useRoute } from '@react-navigation/native';


const MessengerScreen = function({route}) {
  const { orderId } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Set up Firestore collection reference for the specific orderList ID
    const messagesRef = firestore.collection('messages').where('orderId', '==', orderId);

    // Fetch messages from Firestore and update the state
    const unsubscribe = messagesRef.orderBy('timestamp').onSnapshot(
      snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp.toDate().toLocaleString() // Convert to formatted string
        }));
        setMessages(data);
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, [orderId]);

  const sendMessage = async () => {
    if (messageText.trim() !== '') {
      try {
        const messagesRef = firestore.collection('messages');
        await messagesRef.add({
          text: messageText,
          timestamp: new Date(),
          orderId: orderId, // Add the orderList ID to each message for reference
        });
        setMessageText('');
      } catch (error) {
        console.error('Error sending message:', error);
        // You can handle the error here, e.g., show an error message to the user.
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100} // Adjust the offset as needed
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 5,
  },
});

export default MessengerScreen;
