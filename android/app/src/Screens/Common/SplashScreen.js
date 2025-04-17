import React, { useEffect ,useContext} from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { homeApi } from '../../services/apiServices'
import { AuthContext } from '../../Context/MainContext'
import { set } from 'react-native-reanimated'
const SplashScreen = ({ navigation }) => {


const{setHomeData}=useContext(AuthContext)


  useEffect(() => {
    const getHomeContent = async () => {

      try {
        const response = await fetch(homeApi);
        const data = await response.json();
        navigation.replace('HomeScreen', { data })
        setHomeData(data.data)
       
      } catch (error) {
        console.error('Error fetching home content:', error);

        
      }
    };

    getHomeContent()
  }, [])


  return (
    <View style={styles.container}>
      <View>
        <Image style={{ width: 300, height: 300 }} source={require('../../assets/splash.png')} />
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