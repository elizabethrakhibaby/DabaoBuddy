import React, {useState}  from "react";
import { Text, StyleSheet, View, ScrollView} from "react-native";
import {useNavigation, useFocusEffect } from '@react-navigation/native';
import ProfileScreen from "./ProfileScreen";
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';




const HomeScreen = function() {
  const navigation = useNavigation();
  // Update header title when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: 'Dabao Mode -- Place Orders!',
        headerTitleStyle: styles.headerTitle, // Apply custom styling to header title
      });
    }, [navigation])
  );
  const[term, setTerm] = useState('');
  const[searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
      //price === '$'||'$$'||'$$$'
      return results.filter(result => {
          return result.price === price;
      });
  };

  return <>
      <SearchBar 
      term={term} 
      onTermChange={setTerm} 
      onTermSubmit={() => searchApi(term)}/>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      
      <ScrollView>
      <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" />
      <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
      <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender"/>
      </ScrollView>
  </>
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
  navigatorBar: {
    backgroundColorColor: "#FDDB62"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'maroon'
  }
});

export default HomeScreen;
