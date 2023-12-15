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
export default function Developers({ navigation }) {
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
        We understand that university can be a challenging and sometimes
        overwhelming experience, which is why we created COMSATS Munsalik as a
        way to support and empower students.{"\n"}
        {"\n"}Thank you for choosing COMSATS Munsalik as your go-to social media
        app for university. We are proud to be part of your journey, and we look
        forward to helping you make the most of your university experience!
        {"\n"}
        {"\n"}
        Note: If you face any problem/error, share the error description and
        screenshots.{"\n"}WhatsApp:(+92 340-6394589){"\n"}
      </Text>
      <Text style={[styles.bold]}>Developed By</Text>
      <View style={[styles.group]}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            Linking.openURL("https://www.ansarjavaid.com/");
          }}
        >
          <Text style={{ fontFamily: "kumbh-ExtraBold", marginBottom: 5 }}>
            Ansar
          </Text>
          <Image
            source={require("../../assets/ansar.jpg")}
            style={styles.image}
          />
          <Text
            style={{ fontFamily: "kumbh-Regular", marginTop: 10, fontSize: 10 }}
          >
            Software Architect
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            Linking.openURL(
              "https://www.linkedin.com/in/rabbaniyeh-neakakhtar/"
            );
          }}
        >
          <Text style={{ fontFamily: "kumbh-ExtraBold", marginBottom: 5 }}>
            Rabbaniyeh
          </Text>
          <Image
            source={require("../../assets/Rabi.jpg")}
            style={styles.image}
          />
          <Text
            style={{ fontFamily: "kumbh-Regular", marginTop: 10, fontSize: 10 }}
          >
            Frontend Developer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            Linking.openURL("https://www.linkedin.com/in/themalikshow/");
          }}
        >
          <Text style={{ fontFamily: "kumbh-ExtraBold", marginBottom: 5 }}>
            Hadi
          </Text>
          <Image
            source={require("../../assets/Hadi.jpg")}
            style={styles.image}
          />
          <Text
            style={{ fontFamily: "kumbh-Regular", marginTop: 10, fontSize: 10 }}
          >
            UI/UX Designer
          </Text>
        </TouchableOpacity>
      </View>
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
