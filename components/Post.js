// Importing React and several modules from React Native
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Importing a custom component called ImageSlider from a module called react-native-image-slider-banner
import { ImageSlider } from "react-native-image-slider-banner";

// Importing the moment library to format dates and times
import moment from "moment/moment";

// Importing the images used for social media stats
const share = require("../assets/share.png");
const like = require("../assets/like.png");
const view = require("../assets/view.png");

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
}) {
  // Defining a callback function that invokes the gotoDetails function when the user clicks on the post
  const gotoDetailsComponent = useCallback(() => {
    console.log("clicked");
    gotoDetails({ departmentName, time, file, text, views, shares, likes, });
  }, [departmentName, time, file, text, views, shares, likes, gotoDetails]);

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
              {views} <Image source={view} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {shares} <Image source={share} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {likes} <Image source={like} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontFamily:'kumbh-Bold'
  },
  time: {
    fontSize: 11,
    fontFamily:'kumbh-Regular'
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
    fontFamily:'kumbh-Regular',
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
