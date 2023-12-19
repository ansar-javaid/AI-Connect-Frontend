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
import NewPost from "../../components/NewPost";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login, logout } from "../../Store/authSlice";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../../api/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native";
import UserPost from "../../components/UserPost";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function ProfileScreen1({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const { profileId, email, profileTitle, profilePicture, profileDescription } =
    route.params;
  const [animationVisible, setAnimationVisible] = useState(false);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    getInitialProfileData();
  }, []);

  // useFocusEffect hook to fetch data whenever the component is in focus
  useFocusEffect(
    React.useCallback(() => {
      setIsDataLoaded(false);
      getInitialProfileData();
      setStatus(false);
      console.log(
        profileId + email,
        +profileTitle,
        profilePicture,
        profileDescription
      );
    }, [])
  );
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [buttonValue, setButtonValue] = useState("");
  const [btnstyle, setbtnstyle] = useState("outlined");

  // State variables to store data fetched from APIs
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  // Function to fetch data from local storage and APIs
  const getInitialProfileData = async () => {
    getFollowStatus(profileId, email);
    getAllPosts(profileId);
  };

  // Function to fetch all the posts by the profile from the API
  const getAllPosts = async (id, page) => {
    // Validation passed, proceed with API request
    startLoading();
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/subscription/SubscribedProfilePosts?profileId=${id}&Email=${email}&page=${page}`,
        { headers: { accept: "*/*", Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        // Store the fetched posts in the state variable
        console.log(response.data);
        if (page === 1) {
          setPosts(response.data);
          setLoading(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
          setLoading(false);
        }
        setCurrentPage(page);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Function to fetch the Following status of a profile from the API
  const getFollowStatus = async (id, email) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/subscription/ProfileStatus?Email=${email}&ProfileId=${id}`,
        { headers: { accept: "*/*", Authorization: `Bearer ${token}` } }
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

  // Function to Follow/Un-follow  of a profile from the API
  const setFollowStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
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
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Followed",
            textBody: "You will start receiving notification from this page!",
          });
          setButtonValue("Following");
        } else if (data.value.status === false) {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Un Followed",
            textBody:
              "You wont receive any notification further from this page!",
          });

          setButtonValue("Follow");
        }
      } else {
      }
    } catch (error) {}
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    getAllPosts(profileId, nextPage);
  };

  const onRefresh = React.useCallback(() => {
    setPosts([]);
    setCurrentPage(1);
    setRefreshing(true);
    getAllPosts(profileId, 1).then(() => setRefreshing(false));
  }, []);
  // Function to navigate to the details screen when a post is clicked
  function gotoDetailsComp(post) {
    navigation.navigate("HomescreenDetails", {
      screen: "HomescreenDetails",
      params: post,
    });
  }

  useEffect(() => {
    getAllPosts(profileId, 1);
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
        <Spinner
          size={"large"}
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Getting news feed for you!\n Hold Up..."}
          //Text style of the Spinner Text
          textStyle={styles.loader}
        ></Spinner>
      </View>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          colors={["#15C7FF", "#01d0ff"]}
          style={styles.backgroundGradeint}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.CuConect}>{profileTitle}</Text>

            <TouchableOpacity>
              <Image
                source={require("../../assets/search.png")}
                style={styles.search}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../assets/bgcard.png")}
              style={styles.pic}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.depicon}
                />
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
                      source={{ uri: profilePicture }}
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
                {profileTitle}
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
              {profileDescription?.length > 130
                ? profileDescription?.slice(0, 180) + "..."
                : profileDescription}
            </Text>
          </View>
          <Text style={styles.postText}>Recent Posts</Text>
        </LinearGradient>
        <View style={styles.postsContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={loadMore} // Triggered when reaching the end of the list
            onEndReachedThreshold={0.1} // Trigger loadMore when 10% from the bottom
          >
            {posts.map((post) => {
              return (
                <View style={styles.post} key={post.postID}>
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
                    profileImage={post.coverPicture.profileImage}
                    reaction={post.reaction}
                    postID={post.postID}
                    totalReactions={post.totalReactions}
                    profileDescription={post.profileDescription}
                  />
                </View>
              );
            })}
            {/* Load More button */}
            {posts.length > 0 && (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={loadMore}
              >
                <Text style={styles.loadMoreButtonText}>Load More</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
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
    fontSize: 25,
    width: "80%",
    height: 40,
    marginLeft: 26,
    marginTop: 37,
    color: "#FFFFFF",
    fontFamily: "kumbh-Bold",
    textAlign: "left",
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
    left: 23,
    top: 25,
    height: 70,
    width: 70,
    padding: 10,
    margin: 5,
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
  loadMoreButton: {
    backgroundColor: "#ddd",
    padding: 10,
    paddingVertical: 20,
    alignItems: "center",
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
  },
  loadMoreButtonText: {
    fontFamily: "kumbh-Bold",
    fontSize: 16,
    color: "#333",
  },
  loader: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});
