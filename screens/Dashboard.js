import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ActivityIndicator, Alert} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'

import UserContext from '../contexts/UserContext'

import Head from '../components/Head'
import Menu from '../components/Menu'


function Index(props) {  

  const { navigation } = props

  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const [Load, setLoad] = React.useState(false);
  const userDetails  = React.useContext(UserContext)

  function goToScreen(screen, service)
  {   
    navigation.navigate(screen, {randomCode : Math.random(), service})
  }
    
    



    React.useEffect(()=>{
      if(userDetails.register){
        goToScreen("StepOne", false)
      }
    },[])








  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />


        <Head/>

        <View style={styles.content_services}>

           <View style = {{marginBottom : 20}}>
              <View style={styles.services_item}>
                  <View style={styles.services_text_right}>
                    <Text style={styles.services_item_text_small}>Servicio de</Text>
                    <Text style={styles.services_item_text_long}>Barberia</Text>
                  </View>
                  <View style={styles.services_image_right}>
                    <Image
                      style={styles.services_right}
                      source={require('../src/images/service_barber.png')}
                    />
                  </View>
               </View>


                <TouchableOpacity style={{
                    width:90,
                    padding : 5,
                    backgroundColor:"#ED6306",
                    borderRadius : 100,
                    alignItems:"center",
                    justifyContent:"center",
                    alignSelf : "center",
                    marginTop : -14
                }} onPress={()=>goToScreen("RequestService", "Barberia") }>
                  <Text style={{color : "white"}}>
                      Comprar
                  </Text>
                </TouchableOpacity>
           </View>



              
           <View style = {{marginBottom : 20}}>
              <View style={styles.services_item}>
                  <View style={styles.services_image_left}>
                    <Image
                      style={styles.services_left}
                      source={require('../src/images/manicure.png')}
                    />
                  </View>
                  <View style={styles.services_text_left}>
                    <Text style={styles.services_item_text_small}>Servicio de</Text>
                    <Text style={styles.services_item_text_long}>Manicure</Text>
                  </View>
              </View>
              <TouchableOpacity style={{
                    width:90,
                    padding : 5,
                    backgroundColor:"#ED6306",
                    borderRadius : 100,
                    alignItems:"center",
                    justifyContent:"center",
                    alignSelf : "center",
                    marginTop : -14
                }} onPress={()=>goToScreen("RequestService", "Manicure") }>
                  <Text style={{color : "white"}}>
                      Comprar
                  </Text>
                </TouchableOpacity>
            </View>


            <View style = {{marginBottom : 20}}>
              <View style={styles.services_item}>
                  <View style={styles.services_text_right}>
                    <Text style={styles.services_item_text_small}>Servicio de</Text>
                    <Text style={styles.services_item_text_long}>Pedicure</Text>
                  </View>
                  <View style={styles.services_image_right}>
                    <Image
                      style={styles.services_right}
                      source={require('../src/images/service_pedicure.png')}
                    />
                  </View>
              </View>

              <TouchableOpacity style={{
                    width:90,
                    padding : 5,
                    backgroundColor:"#ED6306",
                    borderRadius : 100,
                    alignItems:"center",
                    justifyContent:"center",
                    alignSelf : "center",
                    marginTop : -14
                }} onPress={()=>goToScreen("RequestService", "Pedicure") }>
                  <Text style={{color : "white"}}>
                      Comprar
                  </Text>
                </TouchableOpacity>

            </View>

        </View>

        <Menu props={props}/>
        
    </View>
  );

}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content_services : {
    padding: 20
  },
  services_item : {
    flexDirection : "row",
    alignContent : 'space-around'
  },
  services_left : {
    width: "100%",
    height: 100,
    borderTopLeftRadius : 14,
    borderBottomLeftRadius : 14
  },


  services_right : {
    width: "100%",
    height: 100,
    borderTopRightRadius : 14,
    borderBottomRightRadius : 14
  },


  services_image_left:{
    width : "40%"
  },


  services_image_right:{
    width : "40%"
  },


  services_text_left : {
    textAlign : "center",
    alignItems : "center",
    backgroundColor : "#FF9700",
    color : "white",
    width : "60%",
    paddingTop : "10%",
    borderTopEndRadius : 14,
    borderBottomEndRadius : 14
  },


  services_text_right : {
    textAlign : "center",
    alignItems : "center",
    backgroundColor : "#0B4E6B",
    color : "white",
    width : "60%",
    paddingTop : "10%",
    borderTopStartRadius : 14,
    borderBottomStartRadius : 14
  },


  services_item_text_small : {
    color : "white",
    fontSize : 10
  },
  services_item_text_long : {
    color : "white",
    fontSize : 18
  },


  linearGradient: {
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

});