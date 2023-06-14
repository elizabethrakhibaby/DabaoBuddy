import Signup from './src/screens/Signup';
import Login from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FinancesScreen from './src/screens/FinancesScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import MessengerScreen from './src/screens/MessengerScreen';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// ... code for the stack navigator
function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown: false}} name="Signup" component={Signup} />
      <Stack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeTabNavigator} />
    </Stack.Navigator>
  );
}

// ... code for the bottom tab navigator
function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Finances') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Orders') {
            iconName = focused ? 'ios-cart' : 'ios-cart-outline';
          } else {
            //messenger
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          }


          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Finances" component={FinancesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Messenger" component={MessengerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  );
}

export default App;






