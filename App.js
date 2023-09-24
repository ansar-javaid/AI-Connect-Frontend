import { StatusBar } from "expo-status-bar";
import {
  Alert,
  AppState,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from "react-native";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import AdminHome from "./screens/AdminHome";
import StartUpAnimation from "./screens/StartUpAnimation";
import Cr from "./screens/Cr";
import CreateProfile from "./screens/CreateProfile";
import CreateDepartment from "./screens/CreateDepartment";
import HomescreenDetails from "./screens/HomescreenDetails";
import Resetemail from "./screens/Resetemail";
import Resetpassword from "./screens/Resetpassword";
import Search from "./screens/Search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./Store/store";
import UserHome from "./screens/UserHome";
import TypeScreen from "./screens/Type";
import SuperAdminHome from "./screens/SuperAdminHome.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import Posted from "./screens/Posted.js";
import NotificationScreen from "./screens/NotificationsScreen.js";
import MenuScreen from "./screens/Menu.js";
import CreatedScreen from "./screens/CreatedScreen.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import KumbhSansRegular from "./assets/fonts/KumbhSans-Regular.ttf";
import KumbhSansBold from "./assets/fonts/KumbhSans-Bold.ttf";
import KumbhSansLight from "./assets/fonts/KumbhSans-Light.ttf";
import KumbhSansExtraBold from "./assets/fonts/KumbhSans-ExtraBold.ttf";
import { Audio } from "expo-av";
import About from "./screens/About";
import ContactUs from "./screens/ContactUs";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import FollowedAccounts from "./screens/FollowedAccounts";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  //Network Connection Status
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      showNotConnectedToast();
    } else {
      showReconnectedToast();
    }
  }, [isConnected]);

  const showNotConnectedToast = () => {
    ToastAndroid.show(
      "You are not connected to the internet 📶❌",
      ToastAndroid.LONG
    );
  };

  const showReconnectedToast = () => {
    ToastAndroid.show("Connected to internet 🌐", ToastAndroid.LONG);
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
  const Stack = createNativeStackNavigator();

  console.disableYellowBox = true;



  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
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
              options={{ headerShown: false, title: "Admin Panel" }}
              name="Home"
              component={AdminHome}
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
              options={{ headerShown: false, title: "CreateDepartment" }}
              name="CreateDepartment"
              component={CreateDepartment}
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
            <Stack.Screen
              options={{ headerShown: false, title: "UserHome" }}
              name="UserHome"
              component={UserHome}
            />
            <Stack.Screen
              options={{ headerShown: false, title: "Type" }}
              name="Type"
              component={TypeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false, title: "SuperAdminHome" }}
              name="SuperAdminHome"
              component={SuperAdminHome}
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    color: "#7072E0",
  },
});
