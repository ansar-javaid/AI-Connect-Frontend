import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import colors from "../../assets/colors/colors";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
const SuperAdminHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Blobs Box */}
      <View>
        <Image source={require("../../assets/bg1.png")} style={styles.bg1Image} />
        <Image source={require("../../assets/bg2.png")} style={styles.bg2Image} />
        {/* Top BOX */}
      </View>

      <LinearGradient
        colors={["#00D1FF", "#0094FF"]}
        style={styles.rectangletop}
      >
        <Text style={styles.CuConect}>Welcome Super Admin</Text>
      </LinearGradient>

      <StatusBar style="auto" />
      <View style={{ padding: 10 }}></View>
      <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
        <TouchableOpacity
          style={styles.BoxWrapper}
          onPress={() => {
            navigation.navigate("CreateDepartment");
          }}
        >
          <Image
            source={require("../../assets/building-07.png")}
            style={styles.iicon}
          />
          <Text style={styles.boxtextwrapper}>Create Department</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.BoxWrapper}
          onPress={() => {
            navigation.navigate("CreateProfile");
          }}
        >
          <Image
            source={require("../../assets/building-06.png")}
            style={styles.iicon}
          />
          <Text style={styles.boxtextwrapper}>Create Profile</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.BoxWrapper}
        onPress={() => {
          navigation.navigate("Cr");
        }}
      >
        <Image
          source={require("../../assets/user-plus-01.png")}
          style={styles.iicon}
        />
        <Text style={styles.boxtextwrapper}>Class Cr. Profile</Text>
        <Image source={require("../../assets/right.png")} style={styles.iicon2} />
      </TouchableOpacity>
      {/* Second Section */}
      <View style={{ padding: 10 }}></View>
      <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
        <TouchableOpacity style={styles.BoxWrapper}>
          <Image
            source={require("../../assets/building-07.png")}
            style={styles.iicon}
          />
          <Text style={styles.boxtextwrapper}>Posts</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.BoxWrapper}>
          <Image
            source={require("../../assets/building-06.png")}
            style={styles.iicon}
          />
          <Text style={styles.boxtextwrapper}>Hide/Lock Post</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.BoxWrapper}>
        <Image
          source={require("../../assets/user-plus-01.png")}
          style={styles.iicon}
        />
        <Text style={styles.boxtextwrapper}>Post Priority</Text>
        <Image source={require("../../assets/right.png")} style={styles.iicon2} />
      </TouchableOpacity>
      {/* Second Section */}
      <View style={{ padding: 10 }}></View>
      <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
        <TouchableOpacity style={styles.BoxWrapper}>
          <Image
            source={require("../../assets/book-closed.png")}
            style={styles.iicon}
          />
          <Text style={styles.boxtextwrapper}>Semester Schedule</Text>
          <Image
            source={require("../../assets/right.png")}
            style={styles.iicon2}
          />
        </TouchableOpacity>
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
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <AntDesign name="logout" size={23} color="black" />
            <Text style={{ fontFamily: "kumbh-Regular" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SuperAdminHome;

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
    elevation: 20,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    shadowOffset: { width: -2, height: 4 },
  },
  boxtextwrapper: {
    fontSize: 12,
    padding: 18,
    fontFamily: "kumbh-Regular",
  },
  iicon: {
    height: 24,
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
    fontSize: 24,
    width: "100%",
    height: 30,
    left: 10,
    color: "#FFFFFF",
    fontFamily: "kumbh-Bold",
    top: 75,
  },
  rectangletop: {
    width: 395,
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
    height: 60,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    paddingHorizontal: 20,
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  lgout: {
    position: "absolute",
    width: 25,
    height: 25,
    left: 25,
    top: 10,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
