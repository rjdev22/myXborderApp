import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
const SplashScreen = ({ navigation }) => {


  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen')
    }, 3000)
  }, [])


  return (
    <View style={styles.container}>
      <View>
        <Image style={{ width: 300, height: 300 }} source={require('../assets/splash.png')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
})

export default SplashScreen