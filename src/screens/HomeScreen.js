import React, {useState}  from "react";
import { Text, StyleSheet, ScrollView} from "react-native";
import {useNavigation, useFocusEffect } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const HomeScreen = function() {
  //useNavigation() is used to obtain the navigation object, which allows navigation between screens in a React Navigation stack.
  const navigation = useNavigation();
  // Update header title when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: 'Dabao Mode: Place Orders!',
        headerTitleStyle: styles.headerTitle, // Apply custom styling to header title
      });
    }, [navigation])
  );

  //const [state, setState] = useState(initialValue);
  const[term, setTerm] = useState('');
  //declaring 3 variables. These variables can now be used within the HomeScreen component. 
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
      <ResultsList results={filterResultsByPrice('$')} title="Cost Effective ($2.50)" />
      <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier ($5)" />
      <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender ($7.50)"/>
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
