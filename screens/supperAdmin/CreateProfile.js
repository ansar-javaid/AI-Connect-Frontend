import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { BASE_URL } from "../../api/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login, logout } from "../../Store/authSlice";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import Spinner from "react-native-loading-spinner-overlay"; // for showing a loading spinner

export default function CreateProfile({ navigation }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); // initialize a state variable for the loading spinner

  // State variables to store data fetched from APIs
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  // State variables to store data Locally
  const [departmentId, setDepartmentId] = useState();
  const [profileName, setProfileName] = useState();
  const [about, setAbout] = useState();
  // Image Selection Flag
  const [isImageSelected, setIsImageSelected] = useState(false);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    getLocalData();
  }, []);

  // useFocusEffect hook to fetch data whenever the component is in focus
  useFocusEffect(
    React.useCallback(() => {
      setIsDataLoaded(false);
      getLocalData();
    }, [])
  );

  // Loading Animation
  const startLoading = () => {
    // define a function to start the loading spinner animation
    setLoading(true);
  };

  // Function to fetch data from local storage and APIs
  const getLocalData = async () => {
    dispatch(logout());
    try {
      const id = await AsyncStorage.getItem("profileId");

      const token = await AsyncStorage.getItem("token");
      const [departmentResponse, usersResponse] = await Promise.all([
        axios.get(`${BASE_URL}/profile/GetAllDepartment`, {
          headers: { accept: "*/*", Authorization: `Bearer ${token}` },
        }),
        axios.get(`${BASE_URL}/profile/AvailableUsers`, {
          headers: { accept: "*/*", Authorization: `Bearer ${token}` },
        }),
      ]);

      if (departmentResponse.status === 200) {
        setDepartments(departmentResponse.data);
      }

      if (usersResponse.status === 200) {
        setUsers(usersResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch all the posts by the profile from the API
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to select Image from Mobile Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.4,
    });

    console.log(result);

    if (result.assets == null) {
      setSelectedImages([]);
      setIsImageSelected(false);
    } else {
      setSelectedImages(result.assets);
      setIsImageSelected(true);
    }
  };

  // POST Request to create CreateProfile Profile  "multipart/form-data"
  const handleSubmit = async () => {
    // Constructing Request Http Body "multipart/form-data"
    const formData = new FormData();
    formData.append("Email", selectedItem.email);
    formData.append("DepartmentId", departmentId);
    formData.append("Title", profileName);
    formData.append("Description", about);

    selectedImages.forEach((image, index) => {
      const imageName = `image-${index + 1}.${image.uri.split(".").pop()}`;

      formData.append("File", {
        name: imageName,
        type: "image/jpeg", //TODO Handle file type
        uri: image.uri,
      });
    });

    const token = await AsyncStorage.getItem("token");
    await axios(
      // make a POST request using axios()
      {
        method: "POST",
        url: `${BASE_URL}/profile/CreatProfile`,
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      },
      //wating animation
      startLoading() // A function that starts a loading animation to indicate that the login process is in progress
    )
      .then((response) => {
        if (response.data.statusCode === 201) {
          setLoading(false); // Stop the loading animation
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Profile Created Successfully",
            textBody: "",
            button: "Close",
            onPressButton: () => {
              Dialog.hide();
              navigation.navigate("Login");
            },
          });
        }
        if (response.data.statusCode === 400) {
          setLoading(false); // Stop the loading animation
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Failed",
            textBody:
              "Something went wrong! Please Try again. Recheck Details Carefully.",
            button: "close",
            onPressButton: () => Dialog.hide(),
          });
        }
      })
      .catch((error) => {
        console.error(error); // Log any errors to the console
        setLoading(false); // Stop the loading animation
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Failed",
          textBody:
            "Something went wrong! Please Try again. Recheck Details Carefully.",
          button: "close",
          onPressButton: () => Dialog.hide(),
        });
      });
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredList = useMemo(
    () =>
      users
        .filter((item) =>
          item.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((item) => !selectedItem || item.email === selectedItem.email),
    [users, searchQuery, selectedItem]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#10c6ff" }}>
      <Spinner
        size={"large"}
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Creating Profile..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      ></Spinner>
      <View style={styles.signupContent}>
        <ScrollView
          style={{
            backgroundColor: "#f1f2f3",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
          nestedScrollEnabled={true}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          <Image
            source={require("../../assets/bg1.png")}
            style={styles.bg1Image}
          />
          <Image
            source={require("../../assets/bg2.png")}
            style={styles.bg2Image}
          />
          <Text style={styles.mainHeading}>Create Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Profile Name e.g (Computer Science)"
            placeholderTextColor={"#333"}
            onChangeText={setProfileName}
          />

          {selectedItem ? (
            <TouchableOpacity
              style={styles.input}
              onPress={() => setSelectedItem(null)}
            >
              <Text style={{ fontWeight: "bold" }}>{selectedItem.email}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setSearchFocused(true)}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"#333"}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => {
                  setSearchFocused(true);
                  setSelectedItem(null);
                }}
              />
            </TouchableOpacity>
          )}
          {searchFocused && searchQuery && (
            <FlatList
              style={styles.input}
              data={filteredList}
              //horizontal={true}
              //showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={true}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {
                    setSelectedItem(item);
                    setSearchQuery(item.email);
                    setSearchFocused(false);
                  }}
                >
                  <Text>{item.email}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item?.email?.toString()}
            />
          )}
          <Picker
            style={styles.input}
            selectedValue={departmentId}
            onValueChange={(itemValue, itemIndex) => setDepartmentId(itemValue)}
          >
            {departments.map((CreateProfile) => {
              return (
                <Picker.Item
                  key={CreateProfile.departmentId.toString()}
                  label={CreateProfile.name}
                  value={CreateProfile.departmentId}
                />
              );
            })}
          </Picker>
          <View>
            <TouchableOpacity onPress={pickImage}>
              <TextInput
                style={styles.input}
                placeholder={
                  isImageSelected ? "Image is Selected" : "No image Selected"
                }
                placeholderTextColor={"#333"}
                editable={false}
              />
              <TouchableOpacity style={styles.eyeIcon}>
                <FontAwesome name={"image"} size={22} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="About (Max 200 characters)"
            placeholderTextColor={"#333"}
            onChangeText={setAbout}
            multiline={true}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["#4B277E", "#105DA5"]}
                style={styles.buttonInner}
              >
                <Text style={styles.buttonText}>Create</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AlertNotificationRoot></AlertNotificationRoot>
        <View style={styles.lowborder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "kumbh-Regular" }}></Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="back" size={23} color="black" />
              <Text style={{ fontFamily: "kumbh-Regular" }}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topImage: {
    position: "absolute",
    top: 0,
  },
  signupContent: {
    height: "100%",
    width: "100%",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: -70,
  },
  bg1Image: {
    position: "absolute",
    right: 0,
    top: 30,
  },
  bg2Image: {
    position: "absolute",
    left: 0,
    top: 400,
  },
  eyeIcon: {
    position: "absolute",
    top: 20,
    right: 65,
  },
  mainHeading: {
    fontSize: 27,
    fontFamily: "kumbh-Bold",
    textAlign: "center",
    marginVertical: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 7,
    color: "#333",
    fontFamily: "kumbh-Regular",
    flexDirection: "column",
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 10,
    marginTop: "55%",
    marginBottom: "20%",
  },
  buttonInner: {
    borderRadius: 10,
  },
  buttonText: {
    paddingHorizontal: 125,
    paddingVertical: 15,
    color: "#fff",
    fontFamily: "kumbh-Regular",
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
    paddingHorizontal: 20,
    justifyContent: "space-between",
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
  },
  itemContainer: {
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
