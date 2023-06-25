import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { auth, firestore } from "./firebase";
import Svg, { G, Circle } from "react-native-svg";
import { getIDOfLoggedInUser } from "../utils";

const FinancesScreen = function () {
  const isFocused = useIsFocused();
  const [expenditure, setExpenditure] = useState(0);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    fetchFinanceData();
  }, [isFocused]);

  const fetchFinanceData = async () => {
    try {
      const userID = await getIDOfLoggedInUser();
      const userRef = firestore.collection('users').doc(userID);
      const snapshot = await userRef.get();
      if (snapshot.exists) {
        const userData = snapshot.data();
        const currentEarnings = userData.earnings || 0;
        const currentExpenditure = userData.expenditure || 0;
        setEarnings(currentEarnings);
        setExpenditure(currentExpenditure);
      } else {
        console.log('User profile does not exist');
      }
    } catch (error) {
      console.error('Error fetching finance data:', error);
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


  return (
    <View style={{ backgroundColor: "#FDDB62", flex: 1 }}>
      <Text style={styles.pageTitle}> Finance Tracker</Text>
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
                  stroke="#98FB98"
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
                  stroke="#FAA0A0"
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

