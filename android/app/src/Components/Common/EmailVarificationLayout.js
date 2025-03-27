import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const EmailVarificationLayout = ({children}) => {
  return (
 <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo-horizontal.png')}
          style={styles.logoHorizontal}
        />
      </View>
      {/* Main Content */}
      <View style={styles.content}>{children}</View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
   justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    height: 60,
    elevation: 3,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    zIndex: 1,
    textAlign:'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

  },
  logoHorizontal: {
    width: 150,
     height: 35,
      resizeMode: 'contain',
      alignItems: 'center',
      justifyContent:'center'
  },
  content: { flex: 1 },

  tab: { alignItems: 'center' },
});

export default EmailVarificationLayout