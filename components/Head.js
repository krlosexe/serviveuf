import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-eva-icons';

const windowWidth = Dimensions.get('window').width;
function App(props) {
  return (
    <View style={styles.wrapper}>
        {/* <Image
          style={styles.icon}
          source={require('../src/images/logo.png')}
        /> */}


        <TouchableOpacity onPress={() => props.OpenMenu()} style={{
                backgroundColor:"#eee",
                borderRadius : 7,
                padding : 14,
                alignItems:"center",
                justifyContent:"center",
                marginTop:25,
                marginLeft : "10%",
                marginBottom:20
            }}>
            
            <Icon name='menu' fill={"#0B4E6B"} width={25} height={25} />
        </TouchableOpacity>

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