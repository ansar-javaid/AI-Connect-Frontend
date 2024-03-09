//LOGIN PAGE
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  ToastAndroid,
} from "react-native";
import { React, useEffect, useState } from "react";
import axios from "axios"; // for making HTTP requests
import AsyncStorage from "@react-native-async-storage/async-storage"; // for storing data locally on the device
import Spinner from "react-native-loading-spinner-overlay"; // for showing a loading spinner
import { LinearGradient } from "expo-linear-gradient"; // for creating gradient backgrounds
import { BASE_URL } from "../api/config"; // import the base URL for the API
import { FontAwesome } from "@expo/vector-icons"; // import icons from FontAwesome
import jwtDecode from "jwt-decode"; // for decoding JSON Web Tokens
import { StatusBar } from "expo-status-bar";

export default function Login({ navigation }) {
  // Some Use States
  const [username, setUsername] = useState(""); // initialize a state variable for the username input
  const [password, setPassword] = useState(""); // initialize a state variable for the password input
  const [loading, setLoading] = useState(false); // initialize a state variable for the loading spinner
  const [modalVisible, setModalVisible] = useState(false); // initialize a state variable for the popup modal
  const [modelMsg, setModelMsg] = useState([]); // initialize a state variable for the popup modal message
  const [showPassword, setShowPassword] = useState(false); // initialize a state variable for showing/hiding the password input

  // Loading Animation
  const startLoading = () => {
    // define a function to start the loading spinner animation
    setLoading(true);
  };

  // Login Api Handler function
  const LoginHandler = async () => {
    // Api Payload
    await axios(
      // make a POST request using axios()
      {
        method: "POST", // set the HTTP method to POST
        url: BASE_URL.concat("/auth/Login"), // set the URL for the API endpoint using the base URL and the endpoint path
        headers: {
          // set the request headers
          "Authorization": `Basic MTExNjU1MzU6NjAtZGF5ZnJlZXRyaWFs`,
          accept: "text/plain", // set the Accept header to text/plain
          "Content-Type": "application/json", // set the Content-Type header to application/json
        },
        data: {
          // set the request payload
          email: username,
          password: password,
        },
      },
      //wating animation
      startLoading() // A function that starts a loading animation to indicate that the login process is in progress
    )
      .then((response) => {
        // If the response status is 200 OK
        if (response.data.statusCode == 200) {
          console.log(response);
          //stoping animation AsyncStorage
          setLoading(false); // Stop the loading animation
          //Clear any previous AsyncStorage
          AsyncStorage.clear();
          console.log("AsyncStorage cleared successfully.");
          //Saving JWT Token in AsyncStorage
          AsyncStorage.setItem("token", response.data.value.token); // Save the JWT token to AsyncStorage after decoding it using jwtDecode
          AsyncStorage.setItem(
            "role",
            jwtDecode(response.data.value.token)[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]
          ); // Save the user's role to AsyncStorage after decoding it from the JWT token
          AsyncStorage.setItem(
            "profileId",
            jwtDecode(response.data.value.token)["Profile"]
          ); // Save the user's profile ID to AsyncStorage after decoding it from the JWT token
          AsyncStorage.setItem(
            "userEmail",
            jwtDecode(response.data.value.token)["Email"]
          ); // Save the user's User Email to AsyncStorage after decoding it from the JWT token

          AsyncStorage.setItem(
            "userName",
            jwtDecode(response.data.value.token)["Name"]
          );
          ScreenNavigator();

          // Popup Dialog Msg
          MyModal("", "", modalVisible, setModalVisible(true)); // Show a popup dialog with the specified message
        }
        //Unauthorize
        else if (response.data.statusCode == 401) {
          setLoading(false); // Stop the loading animation
          console.log(response.data);
          AsyncStorage.clear();
          setModelMsg([
            "Login failed! Invalid email & password!",
            "Try Again!",
          ]); // Set the message for the popup dialog to inform the user that the login was unsuccessful
          MyModal("", "", modalVisible, setModalVisible(true)); // Show a popup dialog with the specified message
        }
      })
      .catch((error) => {
        // Stop Loading
        setLoading(false); // Stop the loading animation
        console.log(error);
        setModelMsg(["Login failed! Invalid email & password!", "Try Again!"]); // Set the message for the popup dialog to inform the user that the login was unsuccessful
        MyModal("", "", modalVisible, setModalVisible(true)); // Show a popup dialog with the specified message
      });
  };

  const ScreenNavigator = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login"); // Navigate to the Login screen if no response data was received
    }
    await AsyncStorage.getItem("role")
      .then((role) => {
        setModelMsg(["Login Successful!", "Continue"]); // Set the message for the popup dialog to inform the user that the login was successful
        if (role == "User") {
          //signalRService.startConnection(token);
          setTimeout(() => {
            navigation.navigate("UserHome"); // Navigate to the Home screen after a delay if the user's role is "User"
            setModalVisible(false); // Hide the popup dialog
          }, 1000);
        }
        if (role == "Supper") {
          setTimeout(() => {
            navigation.navigate("SuperAdminHome"); // Navigate to the Super Admin screen after a delay if the user's role is "Admin"
            setModalVisible(false); // Hide the popup dialog
          }, 1000);
        }
        if (role == "Admin") {
          setTimeout(() => {
            navigation.navigate("Home"); // Navigate to the Super Admin screen after a delay if the user's role is "Admin"
            setModalVisible(false); // Hide the popup dialog
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error); // Log any errors to the console
      });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, height: "100%" }}>
      <StatusBar style="auto" />
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
      <Image
        style={styles.logoImage}
        source={require("../assets/comsatslogo.png")}
      />
      <Text style={[styles.logoText, styles.Urdu]}>کامسیٹس منسلک</Text>

      <ScrollView
        style={{
          backgroundColor: "#f1f2f3",
          paddingTop: 10,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginTop: "-20%",
        }}
      >
        <View
          style={{
            backgroundColor: "#f1f2f3",
            paddingBottom: 30,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            fontFamily: "kumbh-Regular",
          }}
        >
          <Image
            source={require("../assets/bg1.png")}
            style={styles.bg1Image}
          />
          <Image
            source={require("../assets/bg2.png")}
            style={styles.bg2Image}
          />
          <Text style={[styles.mainHeading, styles.text, styles.bold]}>
            Login
          </Text>
          <TextInput
            style={[styles.input, styles.regular]}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <View>
            <TextInput
              style={[styles.input, styles.regular]}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            >
              <FontAwesome name={"eye"} size={22} />
            </TouchableOpacity>
          </View>
          <Text
            style={styles.password}
            onPress={() => ToastAndroid.show("Coming Soon!", ToastAndroid.LONG)}
          >
            FORGOT PASSWORD
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                LoginHandler(navigation);
              }}
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#4B277E", "#105DA5"]}
                style={styles.buttonInner}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#8E8E8E", "#CDCDCD"]}
                style={styles.buttonInner}
              >
                <Text style={styles.buttonTextAccount}>Create Account</Text>
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

// const LoginComponents = ({
//   navigation,
//   loginHandler,
//   setUsername,
//   setPassword,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   return (
//     <ScrollView>
//       <View style={{ backgroundColor: "#f1f2f3", paddingBottom: 40 }}>
//         <Image source={require("../assets/bg1.png")} style={styles.bg1Image} />
//         <Image source={require("../assets/bg2.png")} style={styles.bg2Image} />
//         <Text style={styles.mainHeading}>Login</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           onChangeText={(text) => setUsername(text)}
//         />
//         <View>
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             onChangeText={(text) => setPassword(text)}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={() => {
//               setShowPassword(!showPassword);
//             }}
//           >
//             <FontAwesome name={"eye"} size={22} />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.password}>FORGOT PASSWORD</Text>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={() => {
//               loginHandler();
//             }}
//           >
//             <LinearGradient
//               start={{ x: 1, y: 0 }}
//               end={{ x: 0, y: 0 }}
//               colors={["#4B277E", "#105DA5"]}
//               style={styles.buttonInner}
//             >
//               <Text style={styles.buttonText}>Login</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate("Signup");
//             }}
//           >
//             <LinearGradient
//               start={{ x: 1, y: 0 }}
//               end={{ x: 0, y: 0 }}
//               colors={["#8E8E8E", "#CDCDCD"]}
//               style={styles.buttonInner}
//             >
//               <Text style={styles.buttonTextAccount}>Create Account</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

const styles = StyleSheet.create({
  regular: {
    fontFamily: "kumbh-Regular",
  },
  bold: {
    fontFamily: "kumbh-Bold",
  },
  extraBold: {
    fontFamily: "kumbh-ExtraBold",
  },
  light: {
    fontFamily: "kumbh-Regular",
  },
  Urdu: {
    fontFamily: "Urdu-Font",
  },
  topImage: {
    top: 0,
    minHeight: "50%",
    flex: 1,
  },
  logoImage: {
    position: "absolute",
    top: 80,
    left: "22%",
    width: 160,
    height: 160,
    left: "50%",
    marginLeft: -80,
  },
  eyeIcon: {
    position: "absolute",
    top: 20,
    right: 70,
  },
  logoText: {
    color: "#fff",
    fontSize: 30,
    position: "absolute",
    top: "30%",
    width: "100%",
    textAlign: "center",
    fontFamily: "kumbh-Bold",
  },
  signupContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f1f2f3",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: -250,
  },
  mainHeading: {
    fontSize: 27,
    textAlign: "center",
  },
  bg1Image: {
    position: "absolute",
    right: 0,
    top: 30,
  },
  bg2Image: {
    position: "absolute",
    left: 0,
    top: 220,
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
    borderRadius: 30,
    marginTop: 100,
  },
  buttonInner: {
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    paddingHorizontal: 130,
    paddingVertical: 15,
    color: "#fff",
    fontFamily: "kumbh-Regular",
  },
  buttonTextAccount: {
    paddingHorizontal: 99,
    paddingVertical: 15,
    color: "#fff",
    fontFamily: "kumbh-Regular",
  },
  password: {
    color: "#5252C7",
    textAlign: "center",
    alignItems: "center",
    marginTop: 30,
    fontFamily: "kumbh-Regular",
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
    fontFamily: "kumbh-Regular",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    fontFamily: "kumbh-Regular",
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
    fontFamily: "kumbh-Regular",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "kumbh-Regular",
  },
});
