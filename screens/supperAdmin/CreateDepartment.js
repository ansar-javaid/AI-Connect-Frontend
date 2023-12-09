import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import Spinner from "react-native-loading-spinner-overlay"; // for showing a loading spinner
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateDepartment({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [loading, setLoading] = useState(false); // initialize a state variable for the loading spinner

  // Loading Animation
  const startLoading = () => {
    // define a function to start the loading spinner animation
    setLoading(true);
  };

  //  Api Handler function
  const Handler = async () => {
    // Api Payload
    const token = await AsyncStorage.getItem('token');
    await axios(
      // make a POST request using axios()
      {
        method: "POST", // set the HTTP method to POST
        url: BASE_URL.concat("/profile/CreatDepartment"), // set the URL for the API endpoint using the base URL and the endpoint path
        headers: {
          // set the request headers
          accept: "*/*", // set the Accept header to text/plain
          "Content-Type": "application/json", // set the Content-Type header to application/json
          Authorization: `Bearer ${token}`
        },
        data: {
          // set the request payload
          name: selectedLanguage,
        },
      },
      //wating animation
      startLoading() // A function that starts a loading animation to indicate that the login process is in progress
    )
      .then((response) => {
        // If the response status is 200 OK
        setLoading(false); // Stop the loading animation
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Created Successfully",
          textBody: "",
          button: "Close",
        });
      })
      .catch((error) => {
        // Stop Loading
        console.error(error);
        setLoading(false); // Stop the loading animation
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Something went wrong!",
          textBody: "",
          button: "Close",
        });
      });
  };

  return (
    <View style={{ backgroundColor: "#10c6ff" }}>
      <Spinner
        size={"large"}
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Creating Department..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      ></Spinner>
      <View style={styles.signupContent}>
        <ScrollView
          style={{
            backgroundColor: "#f1f2f3",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <Image
            source={require("../../assets/bg1.png")}
            style={styles.bg1Image}
          />
          <Image
            source={require("../../assets/bg2.png")}
            style={styles.bg2Image}
          />
          <Text style={styles.mainHeading}>Create Department</Text>
          <TextInput
            style={styles.input}
            placeholder="Name i.e: Computer Science"
            onChangeText={(text) => setSelectedLanguage(text)}
            placeholderTextColor={"#333"}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={Handler}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#4B277E", "#105DA5"]}
                style={styles.buttonInner}
              >
                <Text style={styles.buttonText}>Create</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.lowborder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
       
              <Text style={{fontFamily:'kumbh-Regular'}}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="back" size={23} color="black" />
              <Text style={{fontFamily:'kumbh-Regular'}}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        <AlertNotificationRoot></AlertNotificationRoot>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topImage: {
    position: "absolute",
    top: 0,
  },
  signupContent: {
    height: "100%",
    width: "100%",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: -70,
  },
  mainHeading: {
    fontSize: 27,
    fontFamily:'kumbh-Bold',
    textAlign: "center",
    marginVertical: 15,
  },
  bg1Image: {
    position: "absolute",
    right: 0,
    top: 30,
  },
  bg2Image: {
    position: "absolute",
    left: 0,
    top: 450,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 7,
    color: "#333",
    fontFamily:'kumbh-Regular'
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 10,
    marginTop: "120%",
  },
  buttonInner: {
    borderRadius: 10,
  },
  buttonText: {
    paddingHorizontal: 130,
    paddingVertical: 15,
    color: "#fff",
    fontFamily:'kumbh-Regular'
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
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  lgout: {
    position: "absolute",
    width: 25,
    height: 25,
    top: 10,
    left: 0,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
