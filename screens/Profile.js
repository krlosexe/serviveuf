import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator, ImageBackground} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'


import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import CheckBox from '@react-native-community/checkbox';

function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   

      ToastAndroid.showWithGravity(
           screen,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
   return false
  }

    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const userDetails  = React.useContext(UserContext)
    
    React.useEffect(()=>{
        
    },[])



  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <View style={{
            //  flexDirection  : "row",
           }}>
                <Image
                      style={{resizeMode: "contain",width: 95, height: 95, position: "absolute", marginLeft: "25%", top:-20, left: -150}}
                         source={require('../src/images/round_blue.png')}
                />

              <Image
                      style={{resizeMode: "contain",width: 150, height: 150, position: "absolute", marginLeft: "24%", top: -40}}
                  source={require('../src/images/triple_round.png')}
              />
              <Image
                      style={{width: 110, height: 110, position: "absolute", right: -50, top: -20}}
                  source={require('../src/images/round_top.png')}
              />
          </View>



          <View style={{width : "100%",alignItems: 'center', marginTop: 130}}>
            
            <View style={styles.HeadProfile}>
                <View style={{backgroundColor : "red"}}>
                    <ImageBackground source={require('../src/images/back_profile.png')}
                            style={{flex: 1,
                                resizeMode: "cover",
                                width : 110,
                                height : 110,
                                justifyContent : "center",
                                alignContent : "center",
                                paddingTop: "2.5%"
                            }}>

                    </ImageBackground>
                    <Image
                        style={{resizeMode: "contain",width: 90, height: 90, alignSelf : "center"}}
                            source={require('../src/images/profile.png')}
                    />
                </View>
                <View>
                    <Text>{userDetails.nombres}</Text>
                    <Text>Saldo $000.000</Text>
                </View>
            </View>

           
            
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
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    textAlign: "center",
    borderRadius: 100,
    borderColor : "#063046",
    borderWidth : 1,
  },
  inputText:{
    height:50,
    color:"#777",
    paddingLeft: 30
  },
  forgot:{
    color:"#000000",
    fontSize:14
  },
  loginBtn:{
    width:"55%",
    backgroundColor:"#063046",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:20
  },
  loginText:{
    color:"white"
  },

  register:{
    color:"#fff",
    fontSize: 20
  },

  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  }
  ,
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop : 20,
  },

  HeadProfile : {
      width : "100%",
    flexDirection : "row",
    justifyContent: "space-around"
  }



});