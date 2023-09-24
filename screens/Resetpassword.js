import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Animated, Easing, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import comsatslogo from '../assets/comsatslogo.png';
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react/cjs/react.development';

export default function Resetpassword({navigation}) {
    var spinValue = new Animated.Value(0);

// First set up animation 
Animated.timing(
    spinValue,
  {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true  // To make use of native driver for performance
  }
).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
  inputRange: [0, 1], 
  outputRange: ['0deg', '360deg']
})
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function validate() {
        var validationText = ''
        if (username.length == 0) {
            validationText = 'Password is Required\n'
        } if (password.length === 0) {
            validationText += 'Confirm Password is Required\n'
        } 
        if (validationText.length > 0) {
            alert(validationText)   
        } else {
            navigation.navigate('Login')
        }


    }
    return (
        <View style={{backgroundColor: '#fff'}}>
            <Image
                style={styles.topImage}
                source={require('../assets/bg.png')}></Image>
               <Animated.Image
        style={[styles.logoImage, {transform: [{rotateY: spin}]}]}
        source={require("../assets/comsatslogo.png")}
      />
                <Text style={styles.logoText}> CU CONNECT</Text>
            <View style={styles.signupContent}>
                <KeyboardAvoidingView
                 behavior={Platform.OS === "ios" ? "padding" : "height"}
                 enabled={true}>
                <ScrollView style={{ backgroundColor: '#f1f2f3', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                <Image source={require('../assets/bg1.png')} style={styles.bg1Image}/>
                <Image source={require('../assets/bg2.png')} style={styles.bg2Image}/>
                <Text style={styles.mainHeading}>Reset your Password</Text>
                <TextInput style={styles.input} placeholder='Password' onChangeText={(text)=>setUsername(text)}/>
                <TextInput style={styles.input} placeholder='Confirm Password' onChangeText={(text)=>setPassword(text)}/>
           

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    onPress={()=>{validate()}}
                    >
                        <LinearGradient
                            start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                            colors={['#4B277E', '#105DA5']} style={styles.buttonInner}>
                            <Text style={styles.buttonText}>Reset Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{navigation.navigate('Signup')}}
                    >
                        <LinearGradient
                            start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                            colors={['#8E8E8E', '#CDCDCD']} style={styles.buttonInner}>
                            <Text style={styles.buttonTextAccount}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    topImage: {
        top: 0,
    },
    logoImage: {
        position: 'absolute',
        top: 80,
        left: '22%',
        width: 160,
        height: 160,
        left: '50%',
        marginLeft: -80
    },
    bg1Image: {
        position: 'absolute',
        right: 0,
        top: 30
    },
    bg2Image: {
        position: 'absolute',
        left:0,
        top: 220
    },
    signupContent: {
        height: '100%',
        width: '100%',
        marginTop: 'auto',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: -340
    },
    mainHeading: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 50,
        marginVertical: 7
    },
    logoText:{
        color: '#fff',
        fontSize: 30,
        position: 'absolute',
        top: 250,
        width: '100%',
        textAlign: 'center'
    },
    buttonContainer: {
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 200
    },
    buttonInner: {
        borderRadius: 10,
        marginBottom: 15
    }, 
    logoImage: {
        position: "absolute",
        top: 80,
        left: "22%",
        width: 160,
        height: 160,
        left: "50%",
        marginLeft: -80,
      },
    buttonText: {
        paddingHorizontal: 100,
        paddingVertical: 16,
        color: '#fff'
    },
    buttonTextAccount: {
        paddingHorizontal: 135,
        paddingVertical: 15,
        color: '#fff'
    },
    password: {
        color: '#5252C7',
        textAlign: 'center',
        alignItems:'center',
    }
})