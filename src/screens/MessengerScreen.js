import React from "react";
import { Text, StyleSheet, View} from "react-native";


const MessengerScreen = function() {


  return (
    <View>
      <Text>This is the Messenger Screen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
});

export default MessengerScreen;



/**
 * import React, {useState, useEffect} from "react";
import { Text, StyleSheet, View, Button} from "react-native";
import { useIsFocused } from '@react-navigation/native';

const MessengerScreen = function() {
  const [val, setVal] = useState(10);
  const isFocused = useIsFocused();

  useEffect(() => {
    let isUnmounted = false;
    let timeoutId;

    if (isFocused && !isUnmounted) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        makeTheChange();
      }, 100); // Delay to avoid rapid calls

      return () => {
        clearTimeout(timeoutId);
        isUnmounted = true;
      };
    }
  }, [isFocused]);

  const makeTheChange = () => {
    setVal(val + 1);
  };

  return (
    <View>
      <Text>This is the Messenger Screen</Text>
      <Text>The value is {val}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
});

export default MessengerScreen;
 */