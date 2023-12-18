// Importing React and several modules from React Native
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
// Importing a custom component called ImageSlider from a module called react-native-image-slider-banner
import { ImageSlider } from "react-native-image-slider-banner";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../api/config";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { useNavigation } from "@react-navigation/native";

// Importing the moment library to format dates and times
import moment from "moment/moment";

// Defining the Post component
export default function Post({
  departmentName,
  time,
  file,
  text,
  views,
  shares,
  likes,
  gotoDetails,
  profileImage,
  postId,
}) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Loading Animation
  const startLoading = () => {
    // define a function to start the loading spinner animation
    setLoading(true);
  };

  // Defining a callback function that invokes the gotoDetails function when the user clicks on the post
  const gotoDetailsComponent = useCallback(() => {
    console.log("clicked");
    gotoDetails({ departmentName, time, file, text, views, shares, likes });
  }, [departmentName, time, file, text, views, shares, likes, gotoDetails]);

  const deletePostApi = async (postId) => {
    //Start loading Spinner
    startLoading();

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/posts/DeletePost?postId=${postId}`,
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === 200) {
        //Stop Spinner and Show Message Alert
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Deleted Successfully",
          textBody: "",
          button: "Close",
          //Re-Navigate to Admin Home
          onPressButton: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            }),
        });
        console.log(response.data);
      } else if (response.data.statusCode === 404) {
        //Stop Spinner and Show Message Alert
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Something went wrong!",
          textBody: "Cant't Delete the Post.\nPlease try again!",
          button: "Close",
        });
        console.log("Post with Associated Id Not Found!");
        console.log(response.data);
      } else {
        //Stop Spinner and Show Message Alert
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Something went wrong!",
          textBody: "Cant't Delete the Post.\nPlease try again!",
          button: "Close",
        });
        console.error("Failed to delete post");
        // Optionally, you can log the response data for debugging
        console.error(response.data);
      }
    } catch (error) {
      //Stop Spinner and Show Message Alert
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Something went wrong!",
        textBody: "Cant't Delete the Post.\nPlease try again!",
        button: "Close",
      });
      console.error("An error occurred while deleting the post", error);
    }
  };

  // Defining a memoized function that returns different content depending on whether the post has an image, text, or both
  const postContent = React.useMemo(() => {
    if (file && text) {
      return (
        <View>
          <Text style={styles.postText}>{text}</Text>
          <ImageSlider
            data={file.map((url) => ({ img: url.path }))}
            autoPlay={false}
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
    <TouchableOpacity onPress={gotoDetailsComponent}>
      <View>
        <Spinner
          size={"large"}
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Deleting..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        ></Spinner>
        <View style={styles.headingContainer}>
          <View style={styles.departmentImgContainer}>
            <Image
              source={{ uri: profileImage }}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                borderRadius: 25,
                overflow: "hidden",
              }}
            />
            <Text style={styles.departmentName}>{departmentName}</Text>
          </View>
          <Text style={styles.time}>{moment(time).calendar()}</Text>
        </View>
        {postContent}
        <View style={styles.statesContainer}>
          <TouchableOpacity>
            <Text>
              {views} <FontAwesome5 name="heart" size={20} color="#4B277E" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {shares} <FontAwesome5 name="edit" size={20} color="#4B277E" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Delete this Post?",
                "Are you sure you want to Delete this post?",
                [
                  // The "Yes" button
                  {
                    text: "Yes",
                    onPress: () => {
                      deletePostApi(postId);
                    },
                  },
                  // The "No" button
                  // Does nothing but dismiss the dialog when tapped
                  {
                    text: "No",
                  },
                ]
              )
            }
          >
            <Text>
              {likes} <Feather name="trash" size={20} color="#4B277E" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <AlertNotificationRoot></AlertNotificationRoot>
    </TouchableOpacity>
  );
}

// Defining a memoized component called ImageContainer that displays an ImageSlider component with the images passed as props
const ImageContainer = React.memo(({ images }) => {
  return (
    <View>
      <ImageSlider
        data={images.map((url) => ({ img: url.path }.reverse()))}
        autoPlay={false}
        closeIconColor="#fff"
        caroselImageStyle={{ resizeMode: "cover" }}
        preview={true}
      />
    </View>
  );
});

function OverLayedImage({ img, index }) {
  console.log(index);
  if (index == 3) {
    return <Image source={img.path} style={styles.multiImg}></Image>;
  }
  return <Image source={img.path} style={styles.multiImg}></Image>;
}

function ImageOverlay({ img, length }) {
  if (Array.isArray(img) && img.length > 4) {
    return <Text style={styles.overlay}>+{length - 1}</Text>;
  }
}

const styles = StyleSheet.create({
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
    fontFamily: "kumbh-Bold",
  },
  time: {
    fontSize: 11,
    fontFamily: "kumbh-Regular",
  },
  imageContainer: {
    maxHeight: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  departmentImgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postText: {
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontFamily: "kumbh-Regular",
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
});
