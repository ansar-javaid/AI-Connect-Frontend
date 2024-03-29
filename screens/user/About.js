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
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
export default function About({ navigation }) {
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
        Welcome to COMSATS Munsalik, the social media app designed exclusively for
        COMSATS students!{"\n"}{"\n"}
        This app is an initiative of ILO (Industrial Liaison Office).{"\n"}
        The ILO serves as a bridge between the academic community and industry. 
        It helps collaboration, partnerships, and linkages between the university and various industrial sectors{"\n"}
        Email: sajid@cuiatd.edu.pk
      </Text>
      <Text style={[styles.bold]}>All rights reserved ILO, CUI, Abbottabad{"\n"}</Text>
      <Text style={[styles.bold]}>ILO Team</Text>
      <View style={[styles.group]}>
        <View style={styles.imageContainer}>
          <Text style={{ fontFamily: "kumbh-ExtraBold", marginBottom: 5 }}>
            Mr. Sajid Naeem
          </Text>
          <Image
            source={require("../../assets/incharge.jpg")}
            style={styles.image}
          />
          <Text style={{ fontFamily: "kumbh-Regular", marginTop: 10 }}>
            Additional Registrar
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Text style={{ fontFamily: "kumbh-ExtraBold", marginBottom: 5 }}>
            Mr. Asim
          </Text>
          <Image
            source={require("../../assets/ldc.jpg")}
            style={styles.image}
          />
          <Text style={{ fontFamily: "kumbh-Regular", marginTop: 10 }}>
            LDC
          </Text>
        </View>
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
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginTop: 20,
  },
  image: {
    width: 90,
    height: 90,
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
    height: 90,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
