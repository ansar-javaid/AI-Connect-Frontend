import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "../api/config";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import view from "../assets/view.png";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay"; // for showing a loading spinner
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreatePost(props) {
  const [selectedImages, setSelectedImages] = useState([]); // Showing Selected Images
  const [description, setDescription] = useState(""); // Post Description

  const [loading, setLoading] = useState(false); // initialize a state variable for the loading spinner
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need media library permissions to make this work!");
        }
      }
    })();
  }, []);

  // Loading Animation
  const startLoading = () => {
    // define a function to start the loading spinner animation
    setLoading(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (result.assets == null) {
      setSelectedImages([]);
    } else {
      setSelectedImages(result.assets);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("ProfileID", props.profileId); // replace with your actual ProfileID
    formData.append("Description", description);

    selectedImages.forEach((image, index) => {
      const imageName = `image-${index + 1}.${image.uri.split(".").pop()}`;
      console.log("Size");
      formData.append("Files", {
        name: imageName,
        type: "image/jpeg", //TODO Handle file type
        uri: image.uri,
      });
    });

    const token = await AsyncStorage.getItem('token');
    await axios
      .post(
        `${BASE_URL}/posts/CreatePost`,
        formData,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
        //wating animation
        startLoading() // A function that starts a loading animation to indicate that the login process is in progress
      )
      .then((response) => {
        console.warn(response.data);
        //stoping animation AsyncStorage
        setLoading(false); // Stop the loading animation
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Posted Successfully",
          textBody: "",
          button: "Close",
          onPressButton: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            }),
        });
        props.posted();
      })
      .catch((error) => {
        console.error(error); // Log any errors to the console
        //stoping animation AsyncStorage
        setLoading(false); // Stop the loading animation
        //Dialog
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Failed",
          textBody:
            "Something went wrong! Please Try again or choose smaller size images.",
          button: "close",
          onPressButton: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            }),
        });
      });
  };

  const removeImage = (image) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((prevImage) => prevImage.uri !== image.uri)
    );
  };

  return (
    <View style={styles.container}>
      <Spinner
        size={"large"}
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Uploading..."}
        //Text style of the Spinner Text
        textStyle={{fontFamily:"kumbh-Regular"}}
      ></Spinner>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: props.profileImage }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 25,
              overflow: "hidden",
            }}
          />
          <Text style={styles.departmentName}>{props.departmentName}</Text>
        </View>
        <Text style={styles.postText}>Create Post</Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          placeholder="Type something..."
          style={styles.textInput}
          onChangeText={setDescription}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["#4B277E", "#105DA5"]}
              style={styles.buttonInner}
            >
              <Text style={styles.buttonText}>Post</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickImage}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              colors={["#8e8e8e", "#50555c"]}
              style={styles.buttonInner}
            >
              <Text style={styles.buttonText}>Attach File</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          {selectedImages.map((image) => (
            <View key={image.uri} style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => removeImage(image)}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <FontAwesome
                  name="times-circle"
                  size={24}
                  color="grey"
                  style={styles.removeIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <AlertNotificationRoot></AlertNotificationRoot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#8e8e8e",
    padding: 8,
  },
  departmentName: {
    fontSize: 16,
    fontFamily:"kumbh-Bold",
    marginLeft: 10,
  },
  postText: {
    fontSize: 20,
    color: "#50555c",
    textAlign: "center",
    fontFamily:"kumbh-Regular"
  },
  textInput: {
    textAlignVertical: "top",
    padding: 5,
    fontFamily:"kumbh-Regular"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonInner: {
    borderRadius: 10,
    width: 130,
    padding: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily:"kumbh-Regular"
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'transparent',
  },
});
