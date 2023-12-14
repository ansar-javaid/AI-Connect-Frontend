import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { BASE_URL } from "../api/config";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { LinearGradient } from "expo-linear-gradient";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useFocusEffect } from "@react-navigation/native";

export default function Signup({ navigation }) {
  //Some Use States
  const [gender, setGender] = useState("male");
  const [selectValues] = useState([
    { value: "male", url: require("../assets/male1.png") },
    { value: "female", url: require("../assets/female1.png") },
  ]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modelMsg, setModelMsg] = useState([]);
  const startLoading = () => {
    setLoading(true);
  };

  const registerUser = async () => {
    // Perform validation
    const validationText = validate();

    // If validation fails, show the validation message in the modal
    if (validationText.length > 0) {
      setModelMsg([validationText, "Try Again!"]);
      setModalVisible(true);
      return;
    }

    // Validation passed, proceed with API request
    startLoading();

    try {
      const response = await axios({
        method: "POST",
        url: BASE_URL.concat("/auth/Register"),
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          gender: gender === "male" ? 1 : 0,
          email: email,
          password: password,
        },
      });

      if (response.status === 200) {
        if (response.data.statusCode === 200) {
          setLoading(false);
          setModelMsg(["Account Created Successfully!", "Continue to login"]);
          setModalVisible(true);
          setTimeout(() => {
            navigation.navigate("Login");
            setModalVisible(false);
          }, 3000);
        }
        if (response.data.statusCode === 500) {
          setLoading(false);
          console.log(response.data.value);
          setModelMsg([
            response.data.value.status + " " + response.data.value.message,
            "Try Again!",
          ]);
          setModalVisible(true);
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        setModelMsg([
          "Please Check your Details!: " + error.response.status,
          "Try Again!",
        ]);
      }
      if (error.response && error.response.status === 500) {
        setModelMsg([
          error.response.data.message + " " + error.response.status,
          "Try Again!",
        ]);
        console.log(error.response);
      }
      setModalVisible(true);
    }
  };

  function validate() {
    var validationText = "";

    // Email validation
    if (firstName.length === 0) {
      validationText = "First Name is Required\n";
    }
    if (lastName.length === 0) {
      validationText += "Last Name is Required\n";
    }
    if (email.length === 0) {
      validationText += "Email is Required\n";
    } else if (!isValidEmail(email)) {
      validationText += "Invalid Email\n";
    }

    // Password validation
    if (password.length === 0) {
      validationText += "Password is Required\n";
    } else if (!isValidPassword(password)) {
      validationText += "Invalid Password\n";
    }

    return validationText;
  }

  function isValidEmail(email) {
    // Basic email validation using regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    // Password validation - at least one uppercase letter, one lowercase letter, and one digit
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  return (
    <View>
      <Spinner
        size={"large"}
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Signing in..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      ></Spinner>
      <MyModal
        tittle={modelMsg[0]}
        msg={modelMsg[1]}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      ></MyModal>
      <Image
        style={styles.topImage}
        source={require("../assets/bg.png")}
      ></Image>

      <ScrollView
        style={{
          backgroundColor: "#f1f2f3",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginTop: -40,
          height: "100%",
          paddingTop: 20,
        }}
      >
        <Image source={require("../assets/bg1.png")} style={styles.bg1Image} />
        <Image source={require("../assets/bg2.png")} style={styles.bg2Image} />
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.mainHeading}>Create Account</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
          />
          <View style={styles.genderContainer}>
            {selectValues.map((item) => {
              return (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => setGender(item.value)}
                >
                  <Image
                    source={item.url}
                    style={styles.genderImage}
                    resizeMode="cover"
                  ></Image>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text
            style={{
              textAlign: "center",
              color: "#105da5",
              fontWeight: "bold",
            }}
          >
            {gender === "male" ? "Male" : "Female"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          {/* <TextInput
          style={styles.input}
          placeholder="Confirm Password"
        /> */}

          <Text
            style={styles.loginText}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            ALREADY HAVE AN ACCOUNT?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                registerUser("Ansar", "Ali", 1, "user@example.com", "string");
              }}
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#4B277E", "#105DA5"]}
                style={styles.buttonInner}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const MyModal = ({ tittle, msg, modalVisible, setModalVisible }) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{tittle}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>{msg}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  topImage: {
    top: 0,
    minHeight: "15%",
    flex: 1,
  },
  genderImage: {
    width: 70,
    height: 70,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  signupContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: -70,
  },
  mainHeading: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 7,
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 10,
    marginTop: "15%",
  },
  buttonInner: {
    borderRadius: 10,
  },
  buttonText: {
    paddingHorizontal: 99,
    paddingVertical: 15,
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  loginText: {
    color: "#5252C7",
    textAlign: "center",
    alignItems: "center",
    marginTop: 30,
  },
  bg1Image: {
    position: "absolute",
    right: 0,
    top: 30,
  },
  bg2Image: {
    position: "absolute",
    left: 0,
    top: 400,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
