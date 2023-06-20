import React from "react";
import { Text, StyleSheet, View } from "react-native";
import {useNavigation, useFocusEffect } from '@react-navigation/native';

const BuddyScreen = function() {
    const navigation = useNavigation();
    // Update header title when the screen is focused
    useFocusEffect(
      React.useCallback(() => {
        navigation.setOptions({
          headerTitle: 'Buddy Mode -- Accept Orders!',
          headerTitleStyle: styles.headerTitle, // Apply custom styling to header title
        });
      }, [navigation])
    );

    return (
        <View style = {styles.textStyle}>
        <Text >This is where users can see all placed orders.</Text>
        </View>
    );
};



const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green'
  }
});

export default BuddyScreen;