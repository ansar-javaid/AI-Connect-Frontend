import { StyleSheet, Text, View ,Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const TypeScreen = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.postbox}>
        <View style={{flexDirection:'row' , alignContent:'center', alignItems:'center'}}>
         <Image source={require('../assets/depIcon.png')} style={{margin:10}} />
         <Text style={{fontSize:15,fontWeight:'600',color:"#242424"}}>CreateProfile NAME</Text>
        
         </View>
         <View style={{width:"100%", height:1,backgroundColor:'grey'}}></View>
         <Text style={{color:"#50555C",alignSelf:'center',fontSize:20, fontWeight:'500'}}>Create Post</Text>
         <TextInput   multiline  style={{marginLeft:20 , width:"88%",height:"60%"}} placeholder="Type Something"></TextInput>
                       <View style={{flexDirection:'row',  alignItems:'center', justifyContent:"center",position:'absolute',bottom:10}}>       
                        <TouchableOpacity
                            onPress={() => (console.log("POSTED"))}>
                            <LinearGradient
                                start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                                colors={['#4B277E', '#105DA5']} style={styles.buttonInner}>
                                <Text style={styles.buttonText}>Post</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => (console.log("Select Document"))}>
                            <LinearGradient
                                start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                                colors={['#8E8E8E', '#50555C']} style={styles.buttonInner}>
                                <Text style={styles.buttonText}>Attach File</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        
                        </View>      
         </View>
    </View>
  )
}

export default TypeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#262626',
    opacity:1,
  },
  postbox:{
    
    backgroundColor:'white',
    marginTop:70,
    height:"40%",
    width:"90%",
    marginLeft:20,
    marginRight:20,
  },

buttonInner: {
  
  borderRadius: 10,
  height:37,
  width:160,
  alignItems:'center',
  justifyContent:"center",
  marginRight:10,
  marginLeft:10
  
},
buttonText: {
  color: '#fff',
  fontSize:16,
  fontWeight:'500',
 

  
},


})