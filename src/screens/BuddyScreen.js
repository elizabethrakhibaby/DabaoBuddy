import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { auth, firestore } from './firebase';

const BuddyScreen = function () {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await firestore.collection('orderList').get();
        const images = querySnapshot.docs.map((doc) => doc.data().imageURLOfFoodItem);
        setImageData(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Image style={styles.image} source={{ uri: item }} />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Buddy Mode -- Accept Orders!',
      headerTitleStyle: styles.headerTitle,
    });
  }, [navigation]);

  return (
    <View>
      <Text style={styles.textStyle}>This is where users can see all placed orders.</Text>
      <FlatList
        data={imageData}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default BuddyScreen;
