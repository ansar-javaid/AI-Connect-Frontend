import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { Feather } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
export default function ContactUs({ navigation }) {
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
        <Text style={[styles.welcomeText, styles.extraBold]}>AI CONNECT</Text>
      </LinearGradient>
      <Text style={[styles.content]}>
        Welcome to the Cu-Connect contact us page. We’re always here to help and
        would love to hear from you. If you have any questions, feedback or
        concerns regarding our social media app, feel free to get in touch with
        us through the following channels: {"\n"}
        1. Email: You can email us at support@cu-connect.com with any questions,
        feedback or issues you may have. We will do our best to respond to your
        email as soon as possible.
        {"\n"}2. Social Media: You can also connect with us through our social
        media channels. We are active on Facebook, Twitter, and Instagram, and
        we encourage you to follow us for the latest updates and news about
        Cu-Connect.
        {"\n"}We value your feedback and strive to make our app better every
        day. Please don’t hesitate to reach out to us with any questions or
        concerns, and we will do our best to help you out.
        {"\n"}Thank you for choosing Cu-Connect, and we look forward to hearing
        from you!
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
  extraBold: {
    fontFamily: "kumbh-ExtraBold",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
    marginTop: 20,
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
  // menuContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between'

  // },
  bg1Image: {
    position: "absolute",
    right: 0,
    top: 168,
  },
  bg2Image: {
    position: "absolute",
    left: 0,
    top: 587.35,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
