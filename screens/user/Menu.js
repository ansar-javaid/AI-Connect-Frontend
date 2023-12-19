import { StyleSheet, Text, TouchableOpacity, View, Image,Alert } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../assets/colors/colors";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MenuScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    setName(await AsyncStorage.getItem("userName"));
  };

  const Logout = async () => {
    AsyncStorage.clear();
    try {
      await Updates.reloadAsync();
    } catch {}
    navigation.reset({
      index: 0,
      routes: [{ name: "Splash" }],
    });
  };
  return (
    <View style={styles.container}>
      {/* Background Blobs Box */}
      <View>
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
      >
        <Text style={styles.CuConect}>کامسیٹس منسلک</Text>
        <Text style={styles.Welcomemsg}>Welcome {name}</Text>
      </LinearGradient>

      <View style={{ top: 5 }}>
        <Text
          style={{ color: colors.greytext, left: 10, fontFamily: "kumbh-Bold" }}
        >
          Account
        </Text>
        <View
          style={{ height: 1, width: "100%", backgroundColor: colors.line }}
        ></View>
      </View>

      <StatusBar style="auto" />

      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.BoxWrapper}
          onPress={() => {
            navigation.navigate("SearchScreen");
          }}
        >
          <Text style={styles.boxtextwrapper}>Search Profiles</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.BoxWrapper}>
          <Text style={styles.boxtextwrapper}>Semester Schedule</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.BoxWrapper} onPress={() => {}}>
        <Text style={styles.boxtextwrapper}>Change Password</Text>
        <Image
          source={require("../../assets/right.png")}
          style={styles.iicon2}
        />
      </TouchableOpacity>
      {/* Second Section */}

      <View style={{ top: 5 }}>
        <Text
          style={{ color: colors.greytext, left: 10, fontFamily: "kumbh-Bold" }}
        >
          Support
        </Text>
        <View
          style={{ height: 1, width: "100%", backgroundColor: colors.line }}
        ></View>
      </View>
      <View style={{ padding: 10 }}></View>
      <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
        <TouchableOpacity
          style={styles.BoxWrapper}
          onPress={() => {
            navigation.navigate("AboutScreen");
          }}
        >
          <Text style={styles.boxtextwrapper}>About</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BoxWrapper}
          onPress={() => {
            navigation.navigate("DevelopersScreen");
          }}
        >
          <Text style={styles.boxtextwrapper}>Developers</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.BoxWrapper}
        onPress={() => {
          navigation.navigate("PrivacyScreen");
        }}
      >
        <Text style={styles.boxtextwrapper}>Privacy Policy</Text>
        <Image
          source={require("../../assets/right.png")}
          style={styles.iicon2}
        />
      </TouchableOpacity>
      <View style={{ top: 5 }}>
        <View
          style={{ height: 1, width: "100%", backgroundColor: colors.line }}
        ></View>
      </View>

      {/* lower Border  */}
      <View style={styles.lowborder}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("UserHome")}
          >
            <AntDesign name="home" size={23} color="black" />
            <Text style={styles.regular}>Home</Text>
          </TouchableOpacity>
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
            onPress={() => Alert.alert(
              "Logout?",
              "All of your saved items in this app will be lost. In Case you Logout.",
              [
                // The "Yes" button
                {
                  text: "Yes",
                  onPress: () => {
                    Logout();
                  },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                  text: "No",
                },
              ]
            )}
          >
            <AntDesign name="logout" size={23} color="black" />
            <Text style={{ fontFamily: "kumbh-Regular" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  BoxWrapper: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    height: 70,
    width: "45%",
    backgroundColor: "white",
    margin: 10,
    shadowColor: "black",
    elevation: 10,
  },
  BoxWrapperLogout: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    height: 50,
    width: "95%",
    backgroundColor: "white",
    margin: 10,
    shadowColor: "black",
    elevation: 10,
    alignSelf: "baseline",
  },
  boxtextwrapper: {
    fontSize: 12,
    padding: 18,
    fontFamily: "kumbh-Regular",
  },
  iicon: {
    height: 30,
    width: 24,
    left: 10,
  },
  iicon2: {
    left: -10,
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
  CuConect: {
    fontSize: 25,
    marginLeft: 15,
    color: "#fff",
    fontFamily: "Urdu-Font",
    top: 30,
    textAlign: "left",
  },
  Welcomemsg: {
    fontSize: 16,
    width: "100%",
    height: 30,
    left: 10,
    color: "#FFFFFF",
    fontFamily: "kumbh-Bold",
    top: 40,
  },

  rectangletop: {
    width: "100%",
    height: 124,
    borderBottomRightRadius: 160,
    right: 0,
  },
  lowborder: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "10%",
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,

    alignContent: "space-between",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  back: {
    position: "absolute",
    width: 25,
    height: 25,
    right: 25,
    top: 10,
  },
  ntfcnbtn: {
    position: "absolute",
    width: 86,
    height: 45,
    left: 165,
    top: 10,
    alignSelf: "center",
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
