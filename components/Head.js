import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
function App(props) {
  return (
    <View style={styles.wrapper}>
        <Image
          style={styles.icon}
          source={require('../src/images/logo.png')}
        />

        <View style={styles.balance_content}>
            <Text style={styles.balance_text}>Tú saldo</Text>
            <Text style={{...styles.balance_text, fontWeight : "bold"}}>$ 00.00</Text>
        </View>

    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop : 20
  },
  icon: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    marginLeft: "10%"
  },
  balance_content : {
      backgroundColor : "#0B4E6B",
      position : "absolute",
      right : 0,
      top : "25%",
      padding : 10,
      width : "35%",
      borderTopStartRadius : 30,
      borderBottomLeftRadius : 30
  },
  balance_text : {
      color : "white",
      marginLeft : 18,
      fontSize : 15
  }
  
})