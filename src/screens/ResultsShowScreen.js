import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import yelp from '../api/yelp';
import { useNavigation } from '@react-navigation/native';

//route == { id: item.id }
const ResultShowScreen = ({ route }) => {
  const navigation = useNavigation();
  const [result, setResult] = useState(null);
//extract the id parameter from route.params
  const { id } = route.params;

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

//useEffect(function, dependency)
//empty dependency array [] ensures that the effect runs only once after the initial render.
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  const confirmOrderDetails = (storeID, imageURLOfFoodItem) => {
    navigation.navigate('ConfirmOrder',{ storeID, imageURLOfFoodItem });
  }

  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => confirmOrderDetails(id,item)}>
          <Image style={styles.styleImage} source={{ uri: item }} />
          </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  styleImage: {
    height: 200,
    width: 300,
  },
});

export default ResultShowScreen;
