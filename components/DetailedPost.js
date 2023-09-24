import { View, Text } from 'react-native'
import React from 'react'

export default function DetailedPost(props) {
  return (
    <View>
      <Text>DetailedPost</Text>
      <Image source={require("../assets/bg.jpg")}></Image>
    </View>
  )
}