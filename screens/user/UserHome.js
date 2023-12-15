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
import { BASE_URL } from "../../api/config";
import axios from "axios";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login, logout } from "../../Store/authSlice";
import UserPost from "../../components/UserPost";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { CardFour } from "react-native-card-ui";
import Swiper from "react-native-swiper";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function UserHome({ navigation }) {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  // Refresh Posts
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    getAllPosts(1);
  }, []);

  // Function to fetch all the posts by the profile from the API
  const getAllPosts = async (page) => {
    // Validation passed, proceed with API request
    startLoading();
    // Dispatch the logout action to clear the global state
    dispatch(logout());
    const email = await AsyncStorage.getItem("userEmail");

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/subscription/NewsFeedPosts?Email=${email}&page=${page}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Dispatch the login action to update the global state with the fetched profile data
        dispatch(login(response.data));
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
      console.warn("Here " + error);
      setLoading(false);
    }
  };

  // Function to navigate to the details screen when a post is clicked
  function gotoDetailsComp(post) {
    navigation.navigate("HomescreenDetails", {
      screen: "HomescreenDetails",
      params: post,
    });
  }

  const loadMore = () => {
    const nextPage = currentPage + 1;
    getAllPosts(nextPage);
  };

  const onRefresh = React.useCallback(() => {
    setPosts([]);
    setCurrentPage(1);
    setRefreshing(true);
    getAllPosts(1).then(() => setRefreshing(false));
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
        {/* <Text style={[styles.welcomeText, styles.extraBold]}>CU</Text> */}
        <Text style={[styles.welcomeText, styles.Urdu]}>کامسیٹس منسلک</Text>
        <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <TextInput
            style={styles.regular}
            placeholder="        Search"
            editable={false}
          />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.postsContainer}>
        <Spinner
          size={"large"}
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Getting news feed for you!\n Hold Up..."}
          //Text style of the Spinner Text
          textStyle={styles.buttonText}
        ></Spinner>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore} // Triggered when reaching the end of the list
          onEndReachedThreshold={0.1} // Trigger loadMore when 10% from the bottom
        >
          <Swiper showsButtons={true} showsPagination={false} height={390}>
            <CardFour
              onClicked={() => {}}
              image={require('../../assets/card-2.jpg')}
              date={"Featured"}
              offText={
                "Welcome to COMSATS Musalik, a soial media platform to connect students and campus.\nConnect with your favorite societies/clubs & departments to see what they are doing. Keep your self updated. Never miss any update."
              }
              buttonText={"Coming Soon!"}
            />
            <CardFour
              onClicked={() => {}}
              image={require('../../assets/bg.png')}
              date={"Featured"}
              offText={
                "\nNote: App is in test mode, you can expect bugs/errors/slowness & lags.\nIf you experience any error during the use of this app, please share the error details along its screen shots at this number.\nWhatsApp:(+92 340-6394589)"
              }
              buttonText={"Coming Soon!"}
            />
          </Swiper>
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
            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
              <Text style={[styles.loadMoreButtonText, styles.extraBold]}>
                Load More
              </Text>
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
  Urdu: {
    fontFamily: "Urdu-Font",
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
    width: "35%",
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
    marginLeft: 15,
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
});
