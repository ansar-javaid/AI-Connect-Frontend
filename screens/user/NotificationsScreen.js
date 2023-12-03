import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";

const NotificationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    getName();
    fetchNotifications();
  }, []);

  useEffect(() => {
    const loadSavedItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem("savedItems");
        const parsedSavedItems = JSON.parse(savedItems) || [];
        setSavedItems(parsedSavedItems);
      } catch (error) {
        console.error("Error loading saved items from local storage:", error);
      }
    };

    loadSavedItems();
  }, []);

  const fetchNotifications = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem("notifications");
      const parsedNotifications = JSON.parse(savedNotifications);
      if (Array.isArray(parsedNotifications)) {
        setNotifications(parsedNotifications);
        console.log(notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const getName = async () => {
    setName(await AsyncStorage.getItem("userName"));
  };

  // Function to navigate to the details screen when a post is clicked
  function gotoDetailsComp(post) {
    navigation.navigate("HomescreenDetails", {
      screen: "HomescreenDetails",
      params: post,
    });
  }

  return (
    <View style={styles.container}>
      <View>
        {/* Background Blobs Box */}
        <Image
          source={require("../../assets/bg1.png")}
          style={styles.bg1Image}
        />
        <Image
          source={require("../../assets/bg2.png")}
          style={styles.bg2Image}
        />
        {/* Top BOX */}
      </View>
      <LinearGradient
        colors={["#00D1FF", "#0094FF"]}
        style={styles.rectangletop}
      ></LinearGradient>
      <Text style={styles.CuConect}>AI CONNECT</Text>
      <Text style={styles.welcome}>Welcome {name}</Text>
      {/* Notifications */}
      <Text style={styles.Notifications}>Notifications & Saved Items</Text>
      <View style={styles.line}></View>

      {/* Notification Box */}

      {savedItems.map((savedItem) => (
        <TouchableOpacity
          key={savedItem.postID}
          style={styles.Notificationbox}
          onPress={() => gotoDetailsComp(savedItem)}
        >
          <View>
            <Text
              style={{
                left: 70,
                top: 10,
                width: 320,
                fontFamily: "kumbh-Regular",
              }}
            >
              {savedItem.text?.length > 40
                ? savedItem.text?.slice(0, 40) + "..."
                : savedItem.text}
            </Text>
            <Text
              style={{
                alignSelf: "flex-end",
                left: -30,
                top: 35,
                color: "#5C5C5C",
                fontFamily: "kumbh-Regular",
              }}
            >
              {moment(savedItem.time).calendar()}
            </Text>
            <Image
              source={{ uri: savedItem.profileImage }}
              style={styles.depicon}
            />
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.lowborder}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/lgout.png")}
            style={styles.lgout}
          />
          <Text style={{ top: 30, left: 15 }}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../assets/notification.png")}
            style={styles.ntfcnbtn}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../assets/left.png")}
            style={styles.back}
          />
          <Text style={{ top: 30, right: 20 }}>Back</Text>
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
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <AntDesign name="logout" size={23} color="black" />
            <Text style={{ fontFamily: "kumbh-Regular" }}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: -45,
            }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="back" size={23} color="black" style={{}} />
            <Text style={{ fontFamily: "kumbh-Regular" }}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  CuConect: {
    fontSize: 32,
    width: "100%",
    height: 40,
    left: 10,
    top: 40,
    color: "#FFFFFF",
    fontFamily: "kumbh-Bold",
  },
  rectangletop: {
    position: "absolute",
    width: "100%",
    height: 124,
    borderBottomRightRadius: 160,
  },
  welcome: {
    fontSize: 16,
    width: 400,
    height: 21,
    left: 10,
    top: 50,
    color: "#FFFFFF",
    fontFamily: "kumbh-Bold",
  },
  Notifications: {
    color: "#5C5C5C",
    fontFamily: "kumbh-Bold",
    fontSize: 14,
    left: 19,
    top: 70,
  },
  Notificationbox: {
    flex: 0.12,
    flexDirection: "column",
    top: 90,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
  line: {
    top: 80,
    height: 1,
    width: "100%",
    backgroundColor: "#5C5C5C",
  },
  depicon: {
    position: "absolute",
    left: 10,
    height: 50,
    width: 50,
    padding: 10,
    margin: 5,
    top: 10,
    borderRadius: 25,
  },

  bg1Image: {
    position: "absolute",
    right: 0,
    top: 186,
  },
  bg2Image: {
    position: "absolute",
    left: 0,
    top: 700,
  },

  lgout: {
    position: "absolute",
    width: 25,
    height: 25,
    left: 25,
    top: 10,
  },
  back: {
    position: "absolute",
    width: 25,
    height: 25,
    right: 25,
    top: 10,
  },
  ntfcnbtn: {
    width: 86,
    height: 45,
    top: 10,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
