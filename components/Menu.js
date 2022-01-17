import React from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Touchable, Alert } from "react-native";

import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'


function Index(props) {
 

  function goToScreen(screen) {
    props.props.navigation.navigate(screen, { randomCode: Math.random() })
  }

  


  return (
   
    <View style={styles.menu}>
        <View>

            <TouchableOpacity onPress={ ()=> goToScreen("Dashboard") } >
                <View style={styles.itemMenu}>
                    <Image style={{width: 30, height: 30, resizeMode: "contain"}} source={require('../src/images/icon_search.png')}/>
                    <Text  style={styles.texMenu}>Buscar</Text>
                </View>
            </TouchableOpacity>
            
        </View>


        <View >
            
            <TouchableOpacity onPress={ ()=> goToScreen("Oraciones") } >
                <View style={styles.itemMenu}>
                    <Image style={{width: 30, height: 30, resizeMode: "contain"}} source={require('../src/images/icon_promos.png')}/>
                    <Text  style={styles.texMenu}>Promos</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View >
              <View style={styles.itemMenuActive}>
                <TouchableOpacity onPress={()=>goToScreen('Evangelio')}>
                    <Image style={{width: 30, height: 30, resizeMode: "contain",alignItems:'center', justifyContent:'center', marginHorizontal:15}} source={require('../src/images/icon_chat.png')}/>
                    <Text  style={styles.texMenu}>Chat</Text>
                </TouchableOpacity>
                
            </View>
        </View>



        <View >
            <TouchableOpacity style={styles.itemMenu} onPress={()=>goToScreen('Profile')}>
                <Image style={{width: 24, height: 30, resizeMode: "contain"}} source={require('../src/images/icon_profile.png')}/>
                <Text  style={styles.texMenu}>Tú perfil</Text>
            </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({

  wrappermenu: {
    position : "relative",
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  menu: {
    padding: 10,
    width: "100%",
    backgroundColor: "#063046",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0
  },





  itemMenu: {
    alignItems: "center"
  },
  texMenu: {
    fontSize:12,
    color: "white",
    textAlign : "center"
  },
  texMenuActive: {
    color: "#0093d9"
  },
});
export default Index;