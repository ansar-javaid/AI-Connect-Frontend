import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function Posted({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}></View>

      <StatusBar style="auto" />
      <View>
        <Image source={require("../../assets/bg1.png")} style={styles.bg1Image} />
        <Image source={require("../../assets/bg2.png")} style={styles.bg2Image} />
      </View>

      <View style={styles.lowborder}>
        <View>
          <TouchableOpacity>
            <Image
              source={require("../../assets/lgout.png")}
              style={styles.lgout}
            />
            <Text style={{ top: 30, left: 15 }}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <Image
              source={require("../../assets/notification.png")}
              style={styles.ntfcnbtn}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <Image source={require("../../assets/left.png")} style={styles.back} />
            <Text style={{ top: 30, right: 20 }}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.square}></View>
      <Image
        source={require("../../assets/tick.png")}
        style={{ position: "absolute", alignSelf: "center", top: 450 }}
      />
      <Image
        source={require("../../assets/circle.png")}
        style={{ position: "absolute", alignSelf: "center", top: 425 }}
      />
      <Text style={styles.success}>Posted Succesfully</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["#4B277E", "#105DA5"]}
            style={styles.buttonInner}
          >
            <Text style={styles.buttonText}>Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00C2FF",
  },

  card: {
    width: "100%",
    height: "90%",
    backgroundColor: "#F4F4F4",
    top: 80,
    borderRadius: 28,
    position: "absolute",
  },
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
  lowborder: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 79,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,

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
    top: 10,
    alignSelf: "center",
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 10,
    top: "45%",
  },
  buttonInner: {
    borderRadius: 10,
  },
  buttonText: {
    paddingHorizontal: 130,
    paddingVertical: 15,
    color: "#fff",
  },

  square: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 332,
    height: 277,
    alignContent: "center",
    alignSelf: "center",
    top: "40%",
    flexDirection: "column",
    alignItems: "center",
  },
  success: {
    fontSize: 24,
    fontWeight: "700",
    color: "#404040",
    left: 96,
    top: 290,
  },
});
