import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect } from "react";
import comsatslogo from "../assets/comsatslogo.png";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EllipsisLoading from "@matheusdearaujo/react-native-loading-ellipsis";
import { StatusBar } from "expo-status-bar";

export default function StartUpAnimation({ navigation }) {
  var spinValue = new Animated.Value(0);

  // First set up animation
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  useFocusEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
      AsyncStorage.clear();
    }, 1000);
  });
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={["#105DA5", "#4B277E"]}
      style={styles.container}
    >
      <Text style={styles.cuconnect}>CU CONNECT</Text>
      <Animated.Image
        source={comsatslogo}
        style={[styles.logo, { transform: [{ rotateY: spin }] }]}
      />
      <StatusBar style="auto" />
      <EllipsisLoading
        styleDot={{
          backgroundColor: "white",
          margin: 5,
        }}
      />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#105DA5",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: "90%",
  },
  cuconnect: {
    color: "#fff",
    fontSize: 40,
    paddingBottom: 35,
    fontFamily:'kumbh-ExtraBold'
  },
});
