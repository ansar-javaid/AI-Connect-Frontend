import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../api/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//TODO:This is a node module used as a custom module due to custom requirements
import { CardNine } from "../../CustomModules/react-native-card-ui";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [profiles, setProfiles] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getAllProfiles();
  }, [searchText]);

  const getAllProfiles = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/profile/GetAllProfiles`, {
        headers: { accept: "*/*",  "Authorization": `Basic MTExNjU1MzU6NjAtZGF5ZnJlZXRyaWFs` },
      });

      if (response.status === 200) {
        setProfiles(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterData = () => {
    if (searchText.trim() === "") {
      return profiles;
    }

    return profiles.filter(
      (item) =>
        item.profileTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        item.profileDescription.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const navigateToProfile = async (item) => {
    const email = await AsyncStorage.getItem("userEmail");

    navigation.navigate("ProfileScreen", {
      profileId: item.profileID,
      email: email,
      profileTitle: item.profileTitle,
      profilePicture: item.path,
      profileDescription: item.profileDescription,
    });
  };

  const renderItem = (item) => (
    <TouchableOpacity
      key={item.profileID}
      onPress={() => navigateToProfile(item)}
      activeOpacity={0.7}
    >
      {/* <View style={styles.itemContainer}>
        <Image source={{ uri: item.path }} style={styles.image} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.title}>{item.profileTitle}</Text>
          <Text style={styles.description} numberOfLines={3} lineHeight={20}>
            {item.profileDescription}
          </Text>
        </View>
      </View> */}
      <CardNine
        title={item.profileTitle}
        subTitle={item.profileDescription}
        image={{
          uri: item.path,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.searchContainer}>
        <Ionicons
          name="ios-search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Ionicons
          name="ios-close"
          size={20}
          color="#888"
          style={styles.clearIcon}
          onPress={() => setSearchText("")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filterData().map((item) => renderItem(item))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "kumbh-Regular",
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
    fontFamily: "kumbh-Bold",
  },
  description: {
    fontSize: 14,
    color: "#888",
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
    justifyContent: "space-between",

    paddingHorizontal: 20,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
