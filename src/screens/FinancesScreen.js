import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { auth, firestore } from "./firebase";
import firebase from 'firebase/compat/app';
import Svg, { G, Circle } from "react-native-svg";
//import { background, backgroundColor, justifyContent } from "styled-system";

const FinancesScreen = function () {
  const [expenditure, setExpenditure] = useState(null);
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    getCurrentUserExpenditure();
  }, []);

  const getCurrentUserExpenditure = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const uid = user.uid;
      retrieveUserExpenditure(uid);
    } else {
      console.log('No user is currently logged in.');
    }
  };

  const retrieveUserExpenditure = async (uid) => {
    try {
      const userDoc = await firestore.collection('users').doc(uid).get();

      if (userDoc.exists) {
        const expenditureData = userDoc.data().expenditure;
        setExpenditure(expenditureData);
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error retrieving expenditure data:', error);
    }
  };
  //
  useEffect(() => {
    getCurrentUserEarnings();
  }, []);

  const getCurrentUserEarnings = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const uid = user.uid;
      retrieveUserEarnings(uid);
    } else {
      console.log('No user is currently logged in.');
    }
  };

  const retrieveUserEarnings = async (uid) => {
    try {
      const userDoc = await firestore.collection('users').doc(uid).get();

      if (userDoc.exists) {
        const earningsData = userDoc.data().earnings;
        setEarnings(earningsData);
      } else {
        console.log('User document does not exist.');
      }
    } catch (error) {
      console.error('Error retrieving earnings data:', error);
    }
  };

  /**
   * Measurement for donut pie chart
   */
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
  const total = earnings + expenditure;
  const net = earnings - expenditure;

  const earningsPercentage = (earnings / total) * 100;
  const expenditurePercentage = (expenditure / total) * 100;

  const earningsStrokeDashoffset =
    circleCircumference - (circleCircumference * earningsPercentage) / 100;
  const expenditureStrokeDashoffset =
    circleCircumference - (circleCircumference * expenditurePercentage) / 100;

  const earningsAngle = (earnings / total) * 360;
  const expenditureAngle = (expenditure / total) * 360;

  /* This code will be used when user's order is delivered if user in Dabao mode*/
  const increaseExpenditure = async (valueToAdd) => {
    try {
      const user = firebase.auth().currentUser;

      if (user) {
        const uid = user.uid;
        const userRef = firestore.collection('users').doc(uid);

        // Get the current expenditure value
        const userDoc = await userRef.get();
        const currentExpenditure = userDoc.data().expenditure || 0;

        // Calculate the new expenditure value
        const updatedExpenditure = currentExpenditure + valueToAdd;

        // Update the expenditure field in the user document
        await userRef.update({ expenditure: updatedExpenditure });

        // Update the state to reflect the new expenditure
        setExpenditure(updatedExpenditure);

        console.log('Expenditure increased successfully!');
      } else {
        console.log('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error increasing expenditure:', error);
    }
  };

  /* This code will be used when user's order is delivered if user in Buddy mode*/
  const increaseEarnings = async (valueToAdd) => {
    try {
      const user = firebase.auth().currentUser;

      if (user) {
        const uid = user.uid;
        const userRef = firestore.collection('users').doc(uid);

        // Get the current earnings value
        const userDoc = await userRef.get();
        const currentEarnings = userDoc.data().earnings || 0;

        // Calculate the new earnings value
        const updatedEarnings = currentEarnings + valueToAdd;

        // Update the expenditure field in the user document
        await userRef.update({ earnings: updatedEarnings });

        // Update the state to reflect the new expenditure
        setEarnings(updatedEarnings);

        console.log('Earnings increased successfully!');
      } else {
        console.log('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error increasing earnings:', error);
    }
  };

  const resetValues = async () => {
    try {
      const user = firebase.auth().currentUser;
  
      if (user) {
        const uid = user.uid;
        const userRef = firestore.collection('users').doc(uid);
  
        // Reset the earnings and expenditure values to 0
        await userRef.update({ earnings: 0, expenditure: 0 });
  
        // Update the state to reflect the new values
        setEarnings(0);
        setExpenditure(0);
  
        console.log('Values reset successfully!');
      } else {
        console.log('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error resetting values:', error);
    }
  };
  

  return (
    <View style={{ backgroundColor: "#FDDB62", flex: 1 }}>
      <Text style={styles.pageTitle}> Finance Tracker</Text>

      <Button
        onPress={() => increaseEarnings(10)}
        title="Increase earnings by 10"
        color="green"
      />

      <Button
        onPress={() => increaseExpenditure(10)}
        title="Increase expenditure by 10"
        color="red"
      />

      <Button
              onPress={resetValues}
              title="Reset Values"
              color="gray"
            />

      <View style={styles.graphWrapper}>
        <Svg height="270" width="270" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#83918b"
                fill="transparent"
                strokeWidth="40"
              />
            ) : (
              <>
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#FAA0A0"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={earningsStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />


                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#98FB98"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={expenditureStrokeDashoffset}
                  rotation={earningsAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
              </>
            )
            }
          </G>
        </Svg>
        <Text style={styles.label}>$ {net}</Text>
      </View>

      {/* Overall earnings and expenditure boxes */}
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.box1}>
          <Text style={styles.infoHeading}>Overall Earnings</Text>
          <Text style={styles.infoValue}>${earnings}</Text>
        </View>

        <View style={styles.box2}>
          <Text style={styles.infoHeading}>Overall Expenditure</Text>
          <Text style={styles.infoValue}>${expenditure}</Text>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
  pageTitle: {
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Helvetica"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8ebd5"
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
  },
  box1: {
    width: 170,
    height: 150,
    backgroundColor: "#98FB98",
    borderRadius: 15,
    margin: 20,
    alignItems: 'center',
  },
  box2: {
    width: 170,
    height: 150,
    backgroundColor: "#FAA0A0",
    borderRadius: 15,
    marginTop: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  infoHeading: {
    top: 10,
    fontWeight: 'bold'
  },
  infoValue: {
    top: 35,
    fontSize: 50
  }
});

export default FinancesScreen;






