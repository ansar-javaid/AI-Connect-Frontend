import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { BASE_URL } from "../api/config";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

class SignalRService {
  constructor() {
    this.connection = null;
  }

  startConnection = async (token) => {
    this.connection = new HubConnectionBuilder()
      .withUrl(BASE_URL.concat("/notifications"), {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    try {
      await this.connection.start();
      this.connection.on("notification", async (message) => {
        await this.showNotification(message); // Call the showNotification method
      });
    } catch (error) {
      console.error("Error connecting to SignalR hub:", error);
    }
  };

  stopConnection = () => {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  };

  showNotification = async (message) => {
    await this.setNotificationHandler();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification! 🎉",
        body: message,
        sound: true, // Play the default notification sound
        android: {
          icon: require('../assets/app.png'), // Specify the path to your custom notification icon
        },
      },
      trigger: null,
      ios: {
        _displayInForeground: true,
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      },
      android: {
        vibrate: true,
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      },
    });
    try {
      const savedNotifications = await AsyncStorage.getItem("notifications");
      const notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
      notifications.push(message);
      await AsyncStorage.setItem("notifications", JSON.stringify(notifications));
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  };

  setNotificationHandler = async () => {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };
  
  
  
  
}

const signalRService = new SignalRService();
export default signalRService;