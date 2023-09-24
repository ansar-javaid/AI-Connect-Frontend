import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
// Importing the moment library to format dates and times
import moment from "moment/moment";

import share from "../assets/share.png";
import like from "../assets/like.png";
import view from "../assets/view.png";

export default function HomescreenDetails({ navigation, route }) {
  const [postDetail, setPostDetail] = useState(route?.params?.params);
  console.log(route.params.params)
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
        <TextInput style={styles.search} placeholder="Search" />
        <FontAwesome name={"search"} size={22} style={styles.searchIcon} />
        <Text style={styles.welcomeText}>
          Welcome {postDetail?.departmentName}
        </Text>
      </LinearGradient>
      <View style={styles.postsContainer}>
        <ScrollView
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            minHeight: "100%",
            marginBottom: 180
          }}
        >
          <View style={styles.headingContainer}>
            <Text style={styles.departmentName}>
              {postDetail?.departmentName}
            </Text>
            <Text style={styles.time}>{moment(postDetail?.time).fromNow()}</Text>
          </View>

          <PostImages image={postDetail?.image} postDetail={postDetail} />
        </ScrollView>

        <ScrollView>
          {/* {posts.map((post) => {
              return (
                <View style={styles.post}>
                  <Post
                    departmentName={post.departmentName}
                    time={post.time}
                    likes={post.likes}
                    views={post.views}
                    shares={post.shares}
                    text={post.text}
                    image={post.image}
                  />
                </View>
              );
            })} */}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

function PostImages({postDetail }) {
  console.log(postDetail)
  if (Array.isArray(postDetail.file)) {
    console.log(postDetail.file)
    return postDetail.file.map((img) => {
      console.log(img)
      return (
        <View style={styles.imgs}>
          <Text style={styles.postText}>{postDetail.text}</Text>
          <Image source={{uri: img.path, width: '100%', height: 250}} resizeMode='cover'></Image>
          <View style={styles.statesContainer}>
            <TouchableOpacity>
              <Text>
                {postDetail?.views} <Image source={view} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                {postDetail?.shares} <Image source={share} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                {postDetail?.likes} <Image source={like} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  } else if (!postDetail.file) {
    return (
      <View style={styles.imgs}>
        <Text style={styles.postText}>{postDetail?.text}</Text>

        <View style={styles.statesContainer}>
          <TouchableOpacity>
            <Text>
              {postDetail?.views} <Image source={view} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {postDetail?.shares} <Image source={share} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {postDetail?.likes} <Image source={like} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.imgs}>
        <Text style={styles.postText}>{postDetail.text}</Text>
        <Image source={postDetail.file[0]}></Image>
        <View style={styles.statesContainer}>
          <TouchableOpacity>
            <Text>
              {postDetail?.views} <Image source={view} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {postDetail?.shares} <Image source={share} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {postDetail?.likes} <Image source={like} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f2f3",
  },
  searchContainer: {
    flex: 2,
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
  },
  searchIcon: {
    position: "absolute",
    top: "52%",
    left: 55,
  },
  welcomeContainer: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 28,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "500",
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
    flex: 12,
    paddingTop: 25,
  },
  post: {
    marginBottom: 10,
  },
  postText: {
    fontSize: 24,
    marginBottom: 5,
    marginLeft: 20,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 15,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: "600",
  },
  time: {
    fontWeight: "500",
  },
  imageContainer: {
    maxHeight: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imgs: {
    marginVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#eee",
  },
  postText: {
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontWeight: "700",
    fontSize: 16,
  },
  statesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
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
