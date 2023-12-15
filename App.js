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
import NetInfo from "@react-native-community/netinfo";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const registerForPushNotificationsAsync = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.error('Failed to get push token for push notification!');
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    // Send the token to your server
    //sendTokenToServer(token);

    return token;
  } catch (error) {
    console.error('Error getting Expo Push Token:', error);
    return null;
  }
};

const sendTokenToServer = (token) => {
  // Implement your logic to send the token to your server
  // Use a fetch or any other method to send the token
  // Example:
  // fetch('YOUR_SERVER_ENDPOINT', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ token }),
  // });
};

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
      // Handle the notification as needed
      // You can update state, show an alert, etc.
    });

    return () => {
      subscription.remove();
    };
  }, []);

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

  const validateToken = async (token) => {
    // Implement your token validation logic here
    // This may include checking expiration, revocation, etc.
    // You can use server-side validation or decode the token client-side
    // and check the expiration timestamp.
    // Return true if the token is valid, false otherwise.
    return true;
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
