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
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StackActions } from '@react-navigation/native';
export default function About({ navigation }) {

    return (
        <View

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
            <Text style={[styles.content]}>Welcome to Cu-Connect, the social media app designed exclusively for university students! Our team is excited to offer a platform where students can connect with each other. {"\n"}
                We understand that university can be a challenging and sometimes overwhelming experience, which is why we created Cu-Connect as a way to support and empower students.{"\n"}
                Our team is made up of passionate and dedicated individuals who are committed to helping students thrive. We are constantly working to improve our app and to ensure that it meets the evolving needs of our users.
                {"\n"}Thank you for choosing Cu-Connect as your go-to social media app for university. We are proud to be part of your journey, and we look forward to helping you make the most of your university experience!</Text>
            <Text style={[styles.bold]}>Developed By</Text>
            <View style={[styles.group]}>
                <View style={styles.imageContainer}>
                    <Text style={{ fontFamily: 'kumbh-ExtraBold', marginBottom: 5 }}>Ansar</Text>
                    <Image source={require('../assets/ansar.jpeg')} style={styles.image} />
                </View>
                <View style={styles.imageContainer}>
                    <Text style={{ fontFamily: 'kumbh-ExtraBold', marginBottom: 5 }}>Rabbaniyeh</Text>
                    <Image source={require('../assets/Rabi.jpg')} style={styles.image} />
                </View>
                <View style={styles.imageContainer}>
                    <Text style={{ fontFamily: 'kumbh-ExtraBold', marginBottom: 5 }}>Hadi</Text>
                    <Image source={require('../assets/Hadi.jpg')} style={styles.image} />
                </View>
            </View>
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
        </View>
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
    },
    bold: {
        fontFamily: 'kumbh-Bold',
        textAlign: 'center',
    },
    menuContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    bg1Image: {
        position: 'absolute',
        right: 0,
        top: 138
    },
    bg2Image: {
        position: 'absolute',
        left: 0,
        top: 500,

    },
    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 50,
        marginTop: 20
    },
    image: {
        width: 60,
        height: 60
    },
    imageContainer: {
        alignItems: 'center'
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
