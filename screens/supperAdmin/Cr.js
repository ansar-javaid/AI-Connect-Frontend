import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import RBSheet from "react-native-raw-bottom-sheet";
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';



export default function Cr({ navigation }) {

  //Sliding Sheet
  const refRBSheet = useRef();
  //Popping the sheet after every 2 seconds
  useFocusEffect(() => {
    refRBSheet.current.open()
  });


  return (
    <View style={{ backgroundColor: '#10c6ff', flex: 1 }}>

      <RBSheet
        ref={refRBSheet}
        height={Dimensions.get('window').height - 50}
        closeOnDragDown={true}
        closeOnPressMask={false}
        dragFromTopOnly={true}

        minClosingHeight={300}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            paddingBottom: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 10,
            backgroundColor: "#f1f2f3",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        openDuration={600}
      >
        <CrView navigation={navigation} />
      </RBSheet>

    </View>
  )
}

function CrView({ navigation }) {
  const [CreateProfile, setDepartment] = useState();
  const [selectedImage, setSelectedImage] = useState();
  // Function to select Image from Mobile Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.assets == null) {
      setSelectedImage(null)
    } else {
      setSelectedImage(result.assets);
    }
  };


  return (
    <View style={styles.signupContent}>
      <ScrollView style={{ backgroundColor: '#f1f2f3' }}>
        <Image source={require('../../assets/bg1.png')} style={styles.bg1Image} />
        <Image source={require('../../assets/bg2.png')} style={styles.bg2Image} />
        <Text style={styles.mainHeading}>Create CR Profile</Text>
        <TextInput style={styles.input} placeholder='CR Name' placeholderTextColor={'#333'} />
        <TextInput style={styles.input} placeholder='Email (@CUIATD.EDU.PK)' placeholderTextColor={'#333'} />
        <Picker
          style={styles.input}
          selectedValue={CreateProfile}
          onValueChange={(itemValue, itemIndex) =>
            setDepartment(itemValue)
          }>
          <Picker.Item label="CS" value="cs" />
          <Picker.Item label="SE" value="se" />
          <Picker.Item label="EE" value="EE" />
          <Picker.Item label="ES" value="ES" />

        </Picker>
        <TextInput style={styles.input} placeholder='Section Name' placeholderTextColor={'#333'} />
        <TextInput style={styles.input} placeholder='Semester' placeholderTextColor={'#333'} />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Select Picture"
            placeholderTextColor={"#333"}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={pickImage}>
            <FontAwesome name={"image"} size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('Home') }}
          >
            <LinearGradient
              start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
              colors={['#4B277E', '#105DA5']} style={styles.buttonInner}>
              <Text style={styles.buttonText}>Create</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <View style={styles.lowborder}>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onPress={()=>{navigation.navigate('Login')}}>
            <AntDesign name="logout" size={23} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onPress={()=>{navigation.goBack()}}>
            <AntDesign name="back" size={23} color="black" />
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  topImage: {
    position: 'absolute',
    top: 0
  },
  signupContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 'auto',
    marginBottom: -30
  },
  mainHeading: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15
  },
  bg1Image: {
    position: 'absolute',
    right: 0,
    top: 30
  },
  bg2Image: {
    position: 'absolute',
    left: 0,
    top: 400
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 7,
    color: '#333'
  },
  eyeIcon: {
    position: "absolute",
    top: 20,
    right: 65,
  },
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '32%'
  },
  buttonInner: {
    borderRadius: 10
  },
  buttonText: {
    paddingHorizontal: 130,
    paddingVertical: 15,
    color: '#fff'
  },
  lowborder: {

    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: "#ddd",
    width: "100%",
    height: 70,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    paddingHorizontal: 20,
    justifyContent: 'space-between',


  },
  lgout: {
    position: "absolute",
    width: 25,
    height: 25,
    top: 10,
    left: 0
  },
  menuContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})