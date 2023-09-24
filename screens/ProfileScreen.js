import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@react-native-material/core";
import NewPost from "../components/NewPost";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login, logout } from "../Store/authSlice";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../api/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native";
import UserPost from "../components/UserPost";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";

export default function ProfileScreen1({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const { profileId, email } = route.params;
  const [animationVisible, setAnimationVisible] = useState(false);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    getLocalData();
  }, []);

  // useFocusEffect hook to fetch data whenever the component is in focus
  useFocusEffect(
    React.useCallback(() => {
      setIsDataLoaded(false);
      getLocalData();
      setStatus(false);
      console.log(profileId + email);
    }, [])
  );
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [buttonValue, setButtonValue] = useState("Follow");
  const [btnstyle, setbtnstyle] = useState("outlined");

  // State variables to store data fetched from APIs
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [profile, setProfile] = useState();
  //const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Get the title from the global state using the useSelector hook
  const title = useSelector((state) => state.auth.profileTitle);

  // Get the Description from the global state using the useSelector hook
  const description = useSelector((state) => state.auth.description);
  // Get the Image URL from the global state using the useSelector hook
  const image = useSelector((state) => state.auth.profileImage);

  // Function to fetch data from local storage and APIs
  const getLocalData = async () => {
    // Dispatch the logout action to clear the global state
    dispatch(logout());
    try {
      // Fetch the profile data using the profile ID from the API
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${BASE_URL}/profile/GetProfileOnly?id=${profileId}`,
        { headers: { accept: "*/*", Authorization: `Bearer ${token}`, } }
      );
      if (response.status === 200) {
        // Dispatch the login action to update the global state with the fetched profile data
        dispatch(login(response.data));
        // Fetch all the posts by the profile using the profile ID from the API
        getFollowStatus(profileId, email);
        getAllPosts(profileId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch all the posts by the profile from the API
  const getAllPosts = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${BASE_URL}/posts/GetPostsByProfile?id=${id}`,
        { headers: { accept: "*/*", Authorization: `Bearer ${token}`, } }
      );
      if (response.status === 200) {
        // Store the fetched posts in the state variable
        console.log(response.data);
        setPosts(response.data);
      }
    } catch (error) {}
  };

  // Function to fetch the Following status of a profile from the API
  const getFollowStatus = async (id, email) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${BASE_URL}/subscription/ProfileStatus?Email=${email}&ProfileId=${id}`,
        { headers: { accept: "*/*", Authorization: `Bearer ${token}`, } }
      );
      if (response.status === 200) {
        if (response.data.value.status === true) {
          setButtonValue("Following");
        }
        if (response.data.value.status === false) {
          setButtonValue("Follow");
        }
      }
    } catch (error) {}
  };

  const followAnimation=()=>{
    setAnimationVisible(true);
        setTimeout(() => {
          setAnimationVisible(false);
        }, 3000);
  }
  // Function to Follow/Un-follow  of a profile from the API
  const setFollowStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/subscription/FollowProfile`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          profileID: profileId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.value.status === true) {
          try {
            followAnimation();
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync(
              require("../assets/sounds/Followed.mp3")
            );
            await soundObject.playAsync();
          } catch (error) {
            console.log("Error occurred while playing sound:", error);
          }
          setButtonValue("Following");
        } else if (data.value.status === false) {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Un Followed",
            textBody: "Page Unfollowed",
          });
          try {
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync(
              require("../assets/sounds/Unfollowed.mp3")
            );
            await soundObject.playAsync();
          } catch (error) {
            console.log("Error occurred while playing sound:", error);
          }
          setButtonValue("Follow");
        }
      } else {
      }
    } catch (error) {}
  };

  // Function to refresh the screen
  const onRefresh = React.useCallback(() => {
    setPosts([]);
    setRefreshing(true);
    getLocalData().then(() => setRefreshing(false));
  }, []);
  // Function to navigate to the details screen when a post is clicked
  function gotoDetailsComp(post) {
    navigation.navigate("HomescreenDetails", {
      screen: "HomescreenDetails",
      params: post,
    });
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  function gotoDetailsComp(post) {
    navigation.navigate("HomescreenDetails", {
      screen: "HomescreenDetails",
      params: post,
    });
  }

  const stylefunc = () => {
    if (btnstyle === "outlined") {
    } else {
      setbtnstyle("outlined");
    }
  };
  const combinefunc = async () => {
    setFollowStatus();
  };
  return (
    <AlertNotificationRoot>
      <View>
        <Modal
          visible={animationVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setAnimationVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={() => setAnimationVisible(false)}
          >
            <View style={styles.animationContainer}>
              <LottieView
                source={require("../assets/bell.json")}
                autoPlay
                loop={false}
                style={styles.animation}
                speed={0.5}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          colors={["#15C7FF", "#01d0ff"]}
          style={styles.backgroundGradeint}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.CuConect}>CU CONNECT</Text>

            <TouchableOpacity>
              <Image
                source={require("../assets/search.png")}
                style={styles.search}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={require("../assets/bgcard.png")}
              style={styles.pic}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Image source={{ uri: image }} style={styles.depicon} />
              </TouchableOpacity>

              <Modal
                visible={showModal}
                transparent={true}
                onRequestClose={() => setShowModal(false)}
              >
                <TouchableWithoutFeedback
                  style={styles.modalCloseButton}
                  onPress={() => setShowModal(false)}
                >
                  <View style={styles.modalContainer}>
                    <TouchableOpacity
                      onPress={() => setShowModal(false)}
                      style={styles.closeButton}
                    >
                      <MaterialIcons
                        name="close"
                        size={40}
                        color="#ffffff"
                      ></MaterialIcons>
                    </TouchableOpacity>
                    <Image
                      source={{ uri: image }}
                      style={styles.modalImage}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
              <Text
                style={{
                  alignSelf: "center",
                  marginLeft: 40,
                  width: 120,
                  fontFamily: "kumbh-Bold",
                }}
              >
                {title}
              </Text>
              <Button
                title={buttonValue}
                color="white"
                variant={btnstyle}
                pressEffectColor="black"
                onPress={setFollowStatus}
                style={{
                  width: 130,
                  alignSelf: "flex-end",
                  marginBottom: 20,
                  fontFamily: "kumbh-Regular",
                }}
              ></Button>
            </View>
            <Text style={styles.bio}>
              {description?.length > 130
                ? description?.slice(0, 180) + "..."
                : description}
            </Text>
          </View>
          <Text style={styles.postText}>Recent Posts</Text>
        </LinearGradient>
        <View style={styles.postsContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {posts.map((post) => {
              return (
                <View style={styles.post}>
                  <UserPost
                    departmentName={post.profileTitle}
                    time={post.postsCreatedOn}
                    likes={post.likes}
                    views={post.views}
                    shares={post.shares}
                    text={post.postDescription}
                    file={post.filePath}
                    gotoDetails={gotoDetailsComp}
                    profileId={post.profileID}
                    profileImage={image}
                  />
                </View>
              );
            })}
          </ScrollView>
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
                <Text>Logout</Text>
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
                onPress={() => {
                  navigation.navigate("MenuScreen");
                }}
              >
                <Feather name="menu" size={23} color="black" />
                <Text>Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00d1ff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  animationContainer: {
    backgroundColor: "transparent",
  },
  animation: {
    width: 300,
    height: 300,
  },
  backgroundGradeint: {
    flex: 5,
  },
  CuConect: {
    fontSize: 32,
    width: "80%",
    height: 40,
    marginLeft: 26,
    marginTop: 37,
    color: "#FFFFFF",
    fontFamily: "kumbh-Bold",
  },
  search: {
    marginTop: 42,
  },
  pic: {
    height: "100%",
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    paddingHorizontal: 20,
  },
  depicon: {
    left: 32,
    top: 25,
    height: 70,
    width: 70,
    padding: 10,
    margin: 5,
    borderRadius: 50,
  },
  bio: {
    height: "50%",
    width: "60%",
    marginLeft: 120,
    bottom: 10,
    fontWeight: "300",
    fontFamily: "kumbh-Regular",
  },
  postsContainer: {
    flex: 6,
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  post: {
    marginBottom: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomColor: "#f1f2f3",
    borderBottomWidth: 10,
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
  postText: {
    fontSize: 24,
    marginBottom: 5,
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: "kumbh-Regular",
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "black",
  },
  modalImage: {
    width: "90%",
    height: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
});
