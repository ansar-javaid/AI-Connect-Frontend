import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
export default function PrivacyPolicy({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require("../../assets/bg1.png")} style={styles.bg1Image} />
      <Image source={require("../../assets/bg2.png")} style={styles.bg2Image} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={false}
      ></KeyboardAvoidingView>

      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={["#0094ff", "#00d1ff"]}
        style={styles.searchContainer}
      >
        <Text style={[styles.welcomeText, styles.extraBold]}>
          کامسیٹس منسلک
        </Text>
      </LinearGradient>
      <Text style={[styles.content]}>
        At COMSATS Munsalik, we value your privacy and are committed to
        protecting your personal information.
        {"\n"}
        We do not sell or share your personal information with third parties for
        their own marketing purposes.{"\n"}
        {"\n"}By using our app, you agree to the terms of this privacy policy.
        We may update this policy from time to time, and we will notify you of
        any significant changes. If you have any questions or concerns, please
        contact (+92 340-6394589).
      </Text>
      <View style={styles.lowborder}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("NotificationsScreen")}
          >
            <MaterialIcons
              name="notifications"
              size={23}
              color="white"
              style={{
                backgroundColor: "#105da5",
                paddingHorizontal: 28,
                paddingVertical: 10,
                borderRadius: 30,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("MenuScreen");
            }}
          >
            <Feather name="menu" size={23} color="black" />
            <Text style={styles.regular}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    borderBottomRightRadius: 120,
    padding: 30,
  },
  welcomeText: {
    fontSize: 25,
    color: "#fff",
    marginTop: 20,
    fontFamily: "Urdu-Font",
    textAlign: "left",
  },
  content: {
    margin: 10,
    fontFamily: "kumbh-Regular",
    fontSize: 15,
  },
  bold: {
    fontFamily: "kumbh-Bold",
    textAlign: "center",
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bg1Image: {
    position: "absolute",
    right: 0,
    top: 138,
  },
  bg2Image: {
    position: "absolute",
    left: 0,
    top: 500,
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 50,
    marginTop: 20,
  },
  image: {
    width: 60,
    height: 60,
  },
  imageContainer: {
    alignItems: "center",
  },
  lowborder: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ddd",
    width: "100%",
    height: 70,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
