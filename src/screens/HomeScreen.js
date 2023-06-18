import React, {useState}  from "react";
import { Text, StyleSheet, View, ScrollView} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import HomeScreen from "../DabaoBuddy/src/screens/HomeScreen";
import ProfileScreen from "./ProfileScreen";
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';




const HomeScreen = function() {
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




const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '',
          tabBarInactiveTintColor: 'gray',
        })}
       
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          //options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
  navigatorBar: {
    backgroundColorColor: "#FDDB62"
  }
});

export default HomeScreen;
