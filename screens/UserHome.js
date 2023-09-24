import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { BASE_URL } from "../api/config";
import axios from "axios";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login, logout } from "../Store/authSlice";
import UserPost from "../components/UserPost";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

export default function UserHome({ navigation }) {
  const dispatch = useDispatch();

  // State variables to store data fetched from APIs
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [profile, setProfile] = useState();
  const [posts, setPosts] = useState([]);
  // Refresh Posts
  const [refreshing, setRefreshing] = useState(false);

  // Get the title from the global state using the useSelector hook
  const title = useSelector((state) => state.auth.profileTitle);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    getAllPosts();
  }, []);

  // Function to fetch all the posts by the profile from the API
  const getAllPosts = async () => {
    // Dispatch the logout action to clear the global state
    dispatch(logout());
    const email = await AsyncStorage.getItem("userEmail");

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/subscription/SubscribedProfilePosts?Email=${email}`,
        {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Dispatch the login action to update the global state with the fetched profile data
        dispatch(login(response.data));
        // Store the fetched posts in the state variable
        console.log(response.data);
        setPosts(response.data);
      }
    } catch (error) {
      console.warn("Here "+error);
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
    getAllPosts().then(() => setRefreshing(false));
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={["#0094ff", "#00d1ff"]}
        style={styles.searchContainer}
      >
        <Text style={[styles.welcomeText, styles.extraBold]}>CU CONNECT</Text>
        <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <TextInput
            style={styles.regular}
            placeholder="          Search"
            editable={false}
          />
        </TouchableOpacity>
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
                  profileImage={post.coverPicture.profileImage}
                  reaction={post.reaction}
                  postID={post.postID}
                  totalReactions={post.totalReactions}
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
                navigation.dispatch(StackActions.replace("Login"));
              }}
            >
              <AntDesign name="logout" size={23} color="black" />
              <Text style={styles.regular}>Logout</Text>
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
              <Text style={styles.regular}>Menu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

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
  container: {
    flex: 1,
    backgroundColor: "#00d1ff",
  },
  searchContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    width: "40%",
  },
  searchIcon: {
    position: "absolute",
    top: "54%",
    left: "60%",
  },
  welcomeContainer: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 28,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "600",
    marginLeft: 20,
    color: "#fff",
  },
  welcomeInput: {
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 16,
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
  },
  postsContainer: {
    flex: 14,
    backgroundColor: "#fff",
    paddingTop: 30,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 50,
  },
  post: {
    marginBottom: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomColor: "#f1f2f3",
    borderBottomWidth: 10,
  },
  postText: {
    fontSize: 24,
    marginBottom: 5,
    marginLeft: 20,
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
