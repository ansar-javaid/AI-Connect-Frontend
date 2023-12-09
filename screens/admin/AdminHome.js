import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Post from "../../components/Post";
import { FontAwesome } from "@expo/vector-icons";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { BASE_URL } from "../../api/config";
import axios from "axios";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login, logout } from "../../Store/authSlice";
import CreatePost from "../../components/CreatePost";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";

export default function AdminHome({ navigation }) {
  const dispatch = useDispatch();

  // State variables to store data fetched from APIs
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [profile, setProfile] = useState();
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // Refresh Posts
  const [refreshing, setRefreshing] = useState(false);

  // Get the title from the global state using the useSelector hook
  const title = useSelector((state) => state.auth.profileTitle);
  // Get the title from the global state using the useSelector hook
  const id = useSelector((state) => state.auth.profileID);
  // Get the Profile Image from the global state using the useSelector hook
  const profileImage = useSelector((state) => state.auth.profileImage);

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

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    getLocalData();
  }, []);

  // Function to fetch data from local storage and APIs
  const getLocalData = async () => {
    // Dispatch the logout action to clear the global state
    dispatch(logout());
    try {
      const id = await AsyncStorage.getItem("profileId");

      // Fetch the profile data using the profile ID from the API
      const response = await axios.get(
        `${BASE_URL}/profile/GetProfileOnly?id=${id}`,
        { headers: { accept: "*/*" } }
      );
      if (response.status === 200) {
        // Dispatch the login action to update the global state with the fetched profile data
        dispatch(login(response.data));
        // Fetch all the posts by the profile using the profile ID from the API
        getAllPosts(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch all the posts by the profile from the API
  const getAllPosts = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/posts/GetPostsByProfile?id=${id}`,
        { headers: { accept: "*/*" } }
      );
      if (response.status === 200) {
        // Store the fetched posts in the state variable
        setPosts(response.data);
      }
    } catch (error) {
      console.error(error.response.status);
    }
  };

  // Function to navigate to the details screen when a post is clicked
  function gotoDetailsComp(post) {
    navigation.navigate("HomescreenDetails", {
      screen: "HomescreenDetails",
      params: post,
    });
  }

  // Function to refresh the screen
  const onRefresh = React.useCallback(() => {
    setPosts([]);
    setRefreshing(true);
    getLocalData().then(() => setRefreshing(false));
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
      <StatusBar style="auto" />
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={["#0094ff", "#00d1ff"]}
        style={styles.searchContainer}
      >
        <TextInput style={styles.search} placeholder="Search" />
        <FontAwesome name={"search"} size={22} style={styles.searchIcon} />
        <Text style={styles.welcomeText}>{title}</Text>
      </LinearGradient>
      <View style={styles.welcomeContainer}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View pointerEvents="none">
            <TextInput
              style={styles.welcomeInput}
              placeholder="Type Something"
            />
          </View>
        </Pressable>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["#4B277E", "#105DA5"]}
            style={styles.buttonInner}
          >
            <Text style={styles.buttonText}>Post</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        <Text style={styles.postText}>Recent Posts</Text>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {posts
            .map((post) => {
              return (
                <View style={styles.post} key={post.postID}>
                  <Post
                    departmentName={post.profileTitle}
                    time={post.postsCreatedOn}
                    likes={post.likes}
                    views={post.views}
                    shares={post.shares}
                    text={post.postDescription}
                    file={post.filePath}
                    gotoDetails={gotoDetailsComp}
                    profileImage={profileImage}
                  />
                </View>
              );
            })
            .reverse()}
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
                Logout();
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
              onPress={() => setModalVisible(true)}
            >
              <AntDesign
                name="pluscircleo"
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
            <View></View>
          </View>
        </View>
      </View>
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
            <CreatePost
              departmentName={title}
              profileId={id}
              profileImage={profileImage}
              posted={() => {
                onRefresh();
              }}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },
  searchContainer: {
    flex: 3,
    justifyContent: "flex-end",
    position: "relative",
    backgroundColor: "#00d1ff",
    borderBottomRightRadius: 120,
    padding: 10,
  },
  search: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    textAlign: "center",
    fontFamily: "kumbh-Regular",
  },
  searchIcon: {
    position: "absolute",
    top: "54%",
    left: 55,
  },
  welcomeContainer: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 28,
  },
  welcomeText: {
    fontSize: 25,
    fontFamily: "kumbh-Bold",
    marginLeft: 20,
    color: "#fff",
  },
  welcomeInput: {
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 16,
    fontFamily: "kumbh-Regular",
  },
  buttonInner: {
    width: "25%",
    borderRadius: 10,
    padding: 5,
    marginLeft: "auto",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "kumbh-Regular",
  },
  postsContainer: {
    flex: 14,
  },
  post: {
    marginBottom: 10,
  },
  postText: {
    fontSize: 24,
    marginBottom: 5,
    marginLeft: 20,
    fontFamily: "kumbh-Bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",

    width: "85%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    alignItems: "center",
  },
});
