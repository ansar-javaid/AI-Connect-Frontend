import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, ToastAndroid } from "react-native";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import AdminHome from "./screens/admin/AdminHome";
import StartUpAnimation from "./screens/StartUpAnimation";
import Cr from "./screens/supperAdmin/Cr";
import CreateProfile from "./screens/supperAdmin/CreateProfile";
import CreateDepartment from "./screens/supperAdmin/CreateDepartment";
import HomescreenDetails from "./screens/admin/HomescreenDetails";
import Resetemail from "./screens/Resetemail";
import Resetpassword from "./screens/Resetpassword";
import Search from "./screens/user/Search.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Store/store";
import UserHome from "./screens/user/UserHome.js";
import TypeScreen from "./screens/Type";
import SuperAdminHome from "./screens/supperAdmin/SuperAdminHome";
import ProfileScreen from "./screens/user/ProfileScreen.js";
import Posted from "./screens/user/Posted.js";
import NotificationScreen from "./screens/user/NotificationsScreen.js";
import MenuScreen from "./screens/user/Menu.js";
import CreatedScreen from "./screens/CreatedScreen.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KumbhSansRegular from "./assets/fonts/KumbhSans-Regular.ttf";
import KumbhSansBold from "./assets/fonts/KumbhSans-Bold.ttf";
import KumbhSansLight from "./assets/fonts/KumbhSans-Light.ttf";
import KumbhSansExtraBold from "./assets/fonts/KumbhSans-ExtraBold.ttf";
import UrduFont from "./assets/fonts/Urdu-font.ttf";
import About from "./screens/user/About";
import ContactUs from "./screens/user/ContactUs";
import PrivacyPolicy from "./screens/user/PrivacyPolicy";
import FollowedAccounts from "./screens/user/FollowedAccounts.js";
import Developers from "./screens/user/Developers.js";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import NetInfo from "@react-native-community/netinfo";
import * as Notifications from "expo-notifications";
import moment from "moment/moment";
import axios from "axios";
import { BASE_URL } from "./api/config.js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [loadImages, setLoadImages] = useState([]);

  //Call Api to load all images
  useEffect(() => {
    console.log("Images Api");
    getAllImages();
  }, []);

  // Call preloadImages when the component mounts or posts change
  // Call preloadImages only if loadImages is available
  useEffect(() => {
    console.log("Images");
    if (loadImages) {
      preloadImages();
    }
  }, [loadImages]);

  useEffect(() => {
    checkAuthentication();
  }, []);

  // Function to fetch all the posts by the profile from the API
  const getAllImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/LoadAllImages`, {
        headers: {
          "Authorization": `Basic MTExNjU1MzU6NjAtZGF5ZnJlZXRyaWFs`,
          accept: "*/*",
        },
      });
      if (response.status === 200) {
        console.log(response.data.value);
        setLoadImages(response.data.value);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // PreloadImages function to prefetch images
  const preloadImages = () => {
    if (loadImages && loadImages.files) {
      loadImages.files.forEach((file) => {
        console.log("Post Images:" + file);
      });
    }

    if (loadImages && loadImages.profileImages) {
      loadImages.profileImages.forEach((profileImage) => {
        console.log("Profile Images:" + profileImage);
      });
    }
  };

  useEffect(() => {
    // Listener for notifications received when the app is in the background or closed
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (
          response &&
          response.notification &&
          response.notification.request
        ) {
          console.log("Background");
          const { title, body } = response.notification.request.content || {};
          saveItemToLocalStorage(title, body);
        }
      });

    // Listener for notifications received when the app is in the foreground
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        if (notification && notification.request) {
          console.log("opened");
          const { title, body } = notification.request.content || {};
          saveItemToLocalStorage(title, body);
        }
      });

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const saveItemToLocalStorage = async (departmentName, text) => {
    // Get the current time using Moment
    const currentTime = moment().format();
    try {
      // Fetch existing saved items from local storage
      const savedItems = await AsyncStorage.getItem("savedNotifications");
      const parsedSavedItems = JSON.parse(savedItems) || [];

      // If not saved, add the new item to the array
      parsedSavedItems.push({
        postID: currentTime,
        departmentName,
        profileImage: "",
        time: currentTime,
        file: "",
        text,
      });
      // Save the updated array back to local storage
      await AsyncStorage.setItem(
        "savedNotifications",
        JSON.stringify(parsedSavedItems)
      );
      //console.log(savedItems);
      ToastAndroid.show("Notification!", ToastAndroid.LONG);
    } catch (error) {}
  };

  const checkAuthentication = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    const storedRole = await AsyncStorage.getItem("role");

    if (storedToken) {
      // If token is present, check its validity and expiration
      const isValidToken = await validateToken(storedToken);

      if (isValidToken) {
        setToken(storedToken);
        setRole(storedRole || "");
        setAuthenticated(true);
      } else {
        // Token is invalid or expired, clear token and role
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");
        setAuthenticated(false);
      }
    } else {
      // No token available
      setAuthenticated(false);
    }

    setLoading(false);
  };

  const validateToken = (token) => {
    try {
      // Decode the token
      const decoded = jwtDecode(token);

      // Check token expiration
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTimestamp) {
        // Token is expired
        return false;
      }

      // Token is valid
      return true;
    } catch (error) {
      console.error(error);
      // Error decoding or parsing the token
      return false;
    }
  };

  //Font Section
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function fetchFonts() {
      await Promise.all([
        Font.loadAsync({
          "kumbh-Regular": KumbhSansRegular,
          "kumbh-Bold": KumbhSansBold,
          "kumbh-ExtraBold": KumbhSansExtraBold,
          "Urdu-Font": UrduFont,
        }),
      ]);
    }

    fetchFonts().then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const Tab = createBottomTabNavigator();

  console.disableYellowBox = true;

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {authenticated ? (
          // If authenticated, render the authenticated stack
          <AuthenticatedStack token={token} role={role} />
        ) : (
          // If not authenticated, render the login stack
          <LoginStack />
        )}
      </SafeAreaView>
    </Provider>
  );
}

const AuthenticatedStack = ({ token, role }) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {/* Existing screens... */}
      {/* Add other screens based on the user's role */}
      {role === "Admin" && (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false, title: "Admin Panel" }}
            name="Home"
            component={AdminHome}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              title: "HomescreenDetails",
              unmountOnBlur: true,
            }}
            name="HomescreenDetails"
            component={HomescreenDetails}
          />
          {/*Shared Navigation Screens*/}
          <Stack.Screen
            options={{
              headerShown: false,
              title: "Logout",
              StackBarStyle: { display: "none" },
            }}
            name="Splash"
            component={StartUpAnimation}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Login" }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Sign Up" }}
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Resetemail" }}
            name="Resetemail"
            component={Resetemail}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Resetpassword" }}
            name="Resetpassword"
            component={Resetpassword}
          />
        </Stack.Navigator>
      )}
      {role === "Supper" && (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false, title: "SuperAdminHome" }}
            name="SuperAdminHome"
            component={SuperAdminHome}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Cr" }}
            name="Cr"
            component={Cr}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "CreateProfile" }}
            name="CreateProfile"
            component={CreateProfile}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "CreateDepartment" }}
            name="CreateDepartment"
            component={CreateDepartment}
          />
          {/*Shared Navigation Screens*/}
          <Stack.Screen
            options={{
              headerShown: false,
              title: "Logout",
              StackBarStyle: { display: "none" },
            }}
            name="Splash"
            component={StartUpAnimation}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Login" }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Sign Up" }}
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Resetemail" }}
            name="Resetemail"
            component={Resetemail}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Resetpassword" }}
            name="Resetpassword"
            component={Resetpassword}
          />
        </Stack.Navigator>
      )}
      {role === "User" && (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false, title: "UserHome" }}
            name="UserHome"
            component={UserHome}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "HomescreenDetails" }}
            name="HomescreenDetails"
            component={HomescreenDetails}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "ProfileScreen" }}
            name="ProfileScreen"
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "PostedScreen" }}
            name="PostedScreen"
            component={Posted}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "NotificationsScreen" }}
            name="NotificationsScreen"
            component={NotificationScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "MenuScreen" }}
            name="MenuScreen"
            component={MenuScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "CreatedScreen" }}
            name="CreatedScreen"
            component={CreatedScreen}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "SearchScreen" }}
            name="SearchScreen"
            component={Search}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "AboutScreen" }}
            name="AboutScreen"
            component={About}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "DevelopersScreen" }}
            name="DevelopersScreen"
            component={Developers}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "PrivacyScreen" }}
            name="PrivacyScreen"
            component={PrivacyPolicy}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "FollowedAccounts" }}
            name="FollowedAccounts"
            component={FollowedAccounts}
          />
          {/*Shared Navigation Screens*/}
          <Stack.Screen
            options={{
              headerShown: false,
              title: "Logout",
              StackBarStyle: { display: "none" },
            }}
            name="Splash"
            component={StartUpAnimation}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Login" }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Sign Up" }}
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Resetemail" }}
            name="Resetemail"
            component={Resetemail}
          />
          <Stack.Screen
            options={{ headerShown: false, title: "Resetpassword" }}
            name="Resetpassword"
            component={Resetpassword}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const LoginStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Existing login and signup screens... */}
        <Stack.Screen
          options={{
            headerShown: false,
            title: "Logout",
            StackBarStyle: { display: "none" },
          }}
          name="Splash"
          component={StartUpAnimation}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "Login" }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "Sign Up" }}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "Resetemail" }}
          name="Resetemail"
          component={Resetemail}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "Resetpassword" }}
          name="Resetpassword"
          component={Resetpassword}
        />

        <Stack.Screen
          options={{ headerShown: false, title: "Admin Panel" }}
          name="Home"
          component={AdminHome}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "SuperAdminHome" }}
          name="SuperAdminHome"
          component={SuperAdminHome}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "Cr" }}
          name="Cr"
          component={Cr}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "CreateProfile" }}
          name="CreateProfile"
          component={CreateProfile}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "CreateDepartment" }}
          name="CreateDepartment"
          component={CreateDepartment}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "UserHome" }}
          name="UserHome"
          component={UserHome}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "ProfileScreen" }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "DevelopersScreen" }}
          name="DevelopersScreen"
          component={Developers}
        />

        <Stack.Screen
          options={{ headerShown: false, title: "PostedScreen" }}
          name="PostedScreen"
          component={Posted}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "NotificationsScreen" }}
          name="NotificationsScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "MenuScreen" }}
          name="MenuScreen"
          component={MenuScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "CreatedScreen" }}
          name="CreatedScreen"
          component={CreatedScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "SearchScreen" }}
          name="SearchScreen"
          component={Search}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "AboutScreen" }}
          name="AboutScreen"
          component={About}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "ContactScreen" }}
          name="ContactScreen"
          component={ContactUs}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "PrivacyScreen" }}
          name="PrivacyScreen"
          component={PrivacyPolicy}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "FollowedAccounts" }}
          name="FollowedAccounts"
          component={FollowedAccounts}
        />
        <Stack.Screen
          options={{ headerShown: false, title: "HomescreenDetails" }}
          name="HomescreenDetails"
          component={HomescreenDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    color: "#7072E0",
  },
});
