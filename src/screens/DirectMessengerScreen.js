//direct messenger screen
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, FlatList } from "react-native";
import { firestore } from "./firebase";

const DirectMessengerScreen = function() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Set up Firestore collection reference
    const messagesRef = firestore.collection('messages');

    // Fetch messages from Firestore
    const unsubscribe = messagesRef.orderBy('timestamp').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(data);
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (messageText.trim() !== '') {
      try {
        const messagesRef = firestore.collection('messages');
        await messagesRef.add({
          text: messageText,
          timestamp: new Date()
        });
        setMessageText('');
      } catch (error) {
        console.error('Error sending message:', error);
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
            <Text style={styles.timestamp}>{item.timestamp.toDate().toLocaleString()}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
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

export default DirectMessengerScreen;
