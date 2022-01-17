import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

function Index(props) {  

  const { navigation } = props.props

  return (
          <View style={styles.Head}>
            <View>
                <TouchableOpacity  onPress={()=>navigation.goBack() }>
                     <Image
                      style={styles.btn_back}
                      source={require('../src/images/btn_back.png')}
                    />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={{
                     width: 170,
                    backgroundColor:"#0B4E6B",
                    alignItems:"center",
                    justifyContent:"center",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    padding : 5
                    
                }} onPress={()=>console.log(".") }>
                    <Text style={styles.register}>
                        <Text>{props.title}</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity  onPress={()=>navigation.goBack() }>
                     <Image
                      style={styles.btn_back}
                      source={require('../src/images/btn_cancel.png')}
                    />
                </TouchableOpacity>
            </View>
          </View>
  );

}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Head : {
      marginTop : 50,
      flexDirection : "row",
      justifyContent: "space-between",
      width : "100%",
      padding : 10
  },

  register:{
    color:"#fff",
    fontSize: 20
  },
 
  btn_back: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  }

});