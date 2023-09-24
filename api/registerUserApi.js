import { BASE_URL } from "./config";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useState } from "react";
import { Modal, Pressable, } from "react-native";

export const registerUser = async (firstName,lastName,gender,email,password) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modelMsg,setModelMsg]=useState([]);
    let startLoading = () => {
        setLoading(true);
    };

  await axios(
    {
      method: "POST",
      url: BASE_URL.concat("/auth/Register"),
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      data: {
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        email: email,
        password: password,
      },
    },
    startLoading()
  )
    .then((response) => {
      if (response.status == 200) {
        setLoading(false);
        setModelMsg(["Login Successful!: ", "Continue"]);
        MyModal("", "", modalVisible, setModalVisible(true));
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
      }
      console.warn(response.status);
      console.warn(response.data);
    })
    .catch((error) => {
      setLoading(false);
      setModelMsg(["User Not Found!: " + error.response.status, "Try Again!"]);
      console.warn(error.response.status);
      MyModal("", "", modalVisible, setModalVisible(true));
    });

return (
  <View>

    <Spinner
      size={"large"}
      //visibility of Overlay Loading Spinner
      visible={loading}
      //Text with the Spinner
      textContent={"Signing in..."}
      //Text style of the Spinner Text
      textStyle={styles.spinnerTextStyle}
    ></Spinner>
    <MyModal tittle={modelMsg[0]} msg={modelMsg[1]} modalVisible={modalVisible} setModalVisible={setModalVisible}></MyModal>
  </View>
)
};

const MyModal=({tittle,msg,modalVisible,setModalVisible})=>{
    return(
        <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{tittle}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>{msg}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
