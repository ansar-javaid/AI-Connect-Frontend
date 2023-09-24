import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
export default function PrivacyPolicy({ navigation }) {

    return (
        <ScrollView
        
        style={styles.container}>
            <StatusBar style="auto" />
            <Image source={require('../assets/bg1.png')} style={styles.bg1Image} />
            <Image source={require('../assets/bg2.png')} style={styles.bg2Image} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled={false}
            ></KeyboardAvoidingView>

            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={["#0094ff", "#00d1ff"]}
                style={styles.searchContainer}
            >
                <Text style={[styles.welcomeText, styles.extraBold]}>CU CONNECT</Text>
            </LinearGradient>
            <Text style={[styles.content]}>At Cu-Connect, we value your privacy and are committed to protecting your personal information. {"\n"}This privacy policy outlines the type of information we collect, how we use it, and the measures we take to ensure its security.{"\n"}{"\n"}
                1. Information we collect:{"\n"}{"\n"}
                a. Personal information such as your name, email address, and university information.{"\n"}
                b. Usage information such as log data, device information, and location information.{"\n"}
                c. Other information that you voluntarily provide to us.{"\n"}{"\n"}
                2. How we use your information:{"\n"}{"\n"}
                a. To provide and improve our app services to you.{"\n"}
                b. To personalize your experience and provide relevant content and recommendations.{"\n"}
                c. To communicate with you regarding our app updates, news, and promotional offers.{"\n"}
                d. To comply with legal and regulatory obligations.{"\n"}{"\n"}
                3. Information sharing:{"\n"}{"\n"}
                a. We do not sell or share your personal information with third parties for their own marketing purposes.{"\n"}
                b. We may share your information with our trusted third-party service providers who help us operate our app and provide services to you.{"\n"}
                c. We may share your information in response to a legal request, to protect our rights and property, or to protect the safety of our users.{"\n"}{"\n"}
                4. Data retention:{"\n"}{"\n"}
                a. We will retain your personal information for as long as necessary to provide our app services to you and as required by law.{"\n"}{"\n"}
                5. Security:{"\n"}{"\n"}
                a. We take appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, or destruction.{"\n"}

                {"\n"}By using our app, you agree to the terms of this privacy policy. We may update this policy from time to time, and we will notify you of any significant changes. If you have any questions or concerns about our privacy practices, please contact us at support@cu-connect.com.</Text>

                <View style={styles.lowborder}>
                <View style={styles.menuContainer}>
                  
                    <TouchableOpacity
                        style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => navigation.navigate("NotificationsScreen")}
                    >
                        <MaterialIcons
                            name="notifications"
                            size={23}
                            color="white"
                            style={{
                                backgroundColor: "#105da5",
                                paddingHorizontal: 28,
                                paddingVertical: 10,
                                borderRadius: 30,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            navigation.navigate("MenuScreen");
                        }}
                    >
                        <Feather name="menu" size={23} color="black" />
                        <Text style={styles.regular}>Menu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1

    },

    searchContainer: {
        borderBottomRightRadius: 120,
        padding: 30,
    },
    extraBold: {
        fontFamily: 'kumbh-ExtraBold',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: "600",
        color: "#fff",
        marginTop: 20
    },
    content: {
        margin: 10,
        fontFamily: 'kumbh-Regular',
        fontSize: 15,
        paddingBottom: 80
    },
    // menuContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'

    // },
    bg1Image: {
        position: 'absolute',
        right: 0,
        top: 168
    },
    bg2Image: {
        position: 'absolute',
        left: 0,
        top: 587.35,

    },
    menuContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

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

})