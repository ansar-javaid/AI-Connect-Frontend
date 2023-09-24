// Importing React and several modules from React Native
import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Share,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
// Importing a custom component called ImageSlider from a module called react-native-image-slider-banner
import { ImageSlider } from "react-native-image-slider-banner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importing the moment library to format dates and times
import moment from "moment/moment";
import { Reaction } from "react-native-reactions";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import axios from "axios";
import { BASE_URL } from "../api/config";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

// Importing the images used for social media stats
const share = require("../assets/share.png");
const like = require("../assets/like.png");
const view = require("../assets/view.png");

// Defining the Post component
export default function UserPost({
  departmentName,
  time,
  likes,
  views,
  shares,
  text,
  file,
  gotoDetails,
  profileId,
  profileImage,
  reaction,
  postID,
  totalReactions,
}) {
  const [status, setStatus] = useState(false);
  const [isLiked, setIsLiked] = useState(reaction);
  const [animationVisible, setAnimationVisible] = useState(false);

  const handleLike = async () => {
    try {
      setIsLiked((prevIsLiked) => !prevIsLiked); // Update isLiked immediately

      const token = await AsyncStorage.getItem("token");
      const email = await AsyncStorage.getItem("userEmail");
      const response = await axios.post(
        `${BASE_URL}/subscription/ReactOnPost`,
        {
          email: email,
          postID: postID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.value && data.value.status) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      if (!isLiked) {
        setAnimationVisible(true);
        setTimeout(() => {
          setAnimationVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sharePost = async () => {
    try {
      const message = `Check out this post: ${text}`;
      const imageUrls = file.map((url) => url.path);

      const shareOptions = {
        message: `${message}\n\n${imageUrls.join("\n")}`,
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Post shared successfully
        } else {
          // Post shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Share cancelled
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // State variables to store data fetched from APIs
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  // useFocusEffect hook to fetch data whenever the component is in focus
  useFocusEffect(
    React.useCallback(() => {
      setIsDataLoaded(false);

      setStatus(false);
    }, [])
  );

  const navigateToProfile = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    navigation.navigate("ProfileScreen", {
      profileId: profileId,
      email: email,
    });
  };

  // Defining a callback function that invokes the gotoDetails function when the user clicks on the post
  const gotoDetailsComponent = useCallback(() => {
    console.log("clicked");
    gotoDetails({ departmentName, time, file, text, views, shares, likes });
  }, [departmentName, time, file, text, views, shares, likes, gotoDetails]);

  const gotoDepartmentDetail = useCallback(() => {
    /* 1. Navigate to the Details route with params */
    navigation.navigate("ProfileScreen");
    getLocalData();
  });
  function gotoDetailsComp() {
    navigation.navigate("UserHome", {
      screen: "UserHome",
    });
  }

  // Defining a memoized function that returns different content depending on whether the post has an image, text, or both
  const postContent = React.useMemo(() => {
    if (file && text) {
      return (
        <View>
          <Text style={styles.postText}>{text}</Text>
          <ImageSlider
            data={file.map((url) => ({ img: url.path }))}
            autoPlay={true}
            closeIconColor="#fff"
            caroselImageStyle={{ resizeMode: "cover" }}
            preview={true}
          />
        </View>
      );
    } else if (file) {
      return <ImageContainer images={file} />;
    } else if (text) {
      return (
        <View>
          <Text style={styles.postText}>{text}</Text>
        </View>
      );
    }
  }, [file, text]);

  // Rendering the component
  return (
    <View>
      <View style={styles.headingContainer}>
        <View style={styles.departmentImgContainer}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image
              source={{ uri: profileImage }}
              style={{
                width: 50,
                height: 50,
                marginRight: 10,
                borderRadius: 25,
                overflow: "hidden",
              }}
            />
          </TouchableOpacity>
          <Modal
            visible={showModal}
            transparent={true}
            hasBackdrop={false}
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
                  source={{ uri: profileImage }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <View>
            <TouchableOpacity onPress={navigateToProfile}>
              <Text style={styles.departmentName}>{departmentName}</Text>
              <Text style={styles.time}>{moment(time).calendar()}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color="black"
        />
      </View>

      <TouchableOpacity onPress={gotoDetailsComponent}>
        {postContent}
      </TouchableOpacity>
      <View style={styles.statesContainer}>
        <TouchableOpacity>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleLike}>
              <View style={styles.likeContainer}>
                {isLiked ? (
                  <Ionicons name="heart" size={24} color="red" />
                ) : (
                  <FontAwesome5 name="heart" size={24} color="black" />
                )}
                {isLiked ? (
                  <Text style={styles.likeText}>{totalReactions}</Text>
                ) : (
                  <Text style={styles.likeText}>{totalReactions}</Text>
                )}
              </View>
            </TouchableOpacity>

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
                    source={require("../assets/love1.json")}
                    autoPlay
                    loop={false}
                    style={styles.animation}
                    speed={0.5}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={sharePost}>
          <Text>
            {shares} <FontAwesome5 name="share" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Defining a memoized component called ImageContainer that displays an ImageSlider component with the images passed as props
const ImageContainer = React.memo(({ images }) => {
  return (
    <View>
      <ImageSlider
        data={images.map((url) => ({ img: url.path }))}
        autoPlay={true}
        closeIconColor="#fff"
        caroselImageStyle={{ resizeMode: "cover" }}
        preview={true}
      />
    </View>
  );
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeText: {
    marginLeft: 5,
    fontFamily: "kumbh-Regular",
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
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "kumbh-Bold",
  },
  time: {
    fontWeight: "500",
    fontFamily: "kumbh-Regular",
  },
  imageContainer: {
    maxHeight: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  postText: {
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontFamily: "kumbh-Regular",
    fontWeight: "600",
    fontSize: 16,
  },
  statesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  multiImgContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  departmentImgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  multiImg: {
    width: "45%",
    height: 200,
    margin: 5,
  },
  overlay: {
    fontSize: 40,
    position: "absolute",
    bottom: 135,
    right: "20%",
    color: "#fff",
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
