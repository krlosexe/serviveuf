import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator, ScrollView} from 'react-native';

import {server, file_server, base_url} from '../Env'    
import axios from 'axios'
import UserContext from '../contexts/UserContext'

import Menu from '../components/Menu'


import { Icon } from 'react-native-eva-icons';
import messaging from '@react-native-firebase/messaging';


function Index(props) {  


  const { navigation } = props

  function goToScreen(screen, detail_service)
  {     

    navigation.navigate(screen, {randomCode : Math.random(), detail_service})
  }
    const { UserDetails, setUserDetails } = useContext(UserContext)
    const userDetails                     = useContext(UserContext)

    const [Services , setServices] = useState([])
    const [Load , setLoad] = useState(false)
    

    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }

  useEffect(() => {

    GetServices(userDetails.id, true)
 
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     GetServices(userDetails.id, false)
    });
  }, [randomCode])


  function GetServices(id, init){
    console.log('Enviando formulario')
      console.log(base_url(server,`request/service/for/provider/${id}`))

      if(init){
        setLoad(true)
      }
      axios.get( base_url(server,`request/service/for/provider/${id}`)).then(function (response) {
        setLoad(false)
        setServices(response.data)
      })
      .catch(function (error) {
          console.log('Error al enviar formulario')
        console.log(error.response.data)
          ToastAndroid.showWithGravity(
            error.response.data,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        setLoad(false)
      })
      .then(function () {});
  }

  const CardService = (props)=>{

    let photo_profile

    if(props.photo == null){
      photo_profile = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    }else{
      photo_profile = `${file_server}/img/usuarios/profile/${props.photo}`
    }

    return  <View style={styles.Card}>
              <View>
                  <Image
                      style={styles.profile}
                      source={{ uri: photo_profile}}
                  />
              </View>
              <View style={styles.TextCardName}>
                  <Text style={styles.Name}>{props.name}</Text>
                  <Text style={{fontSize : 16, color : "black"}}>{props.name_category}</Text>

                  <TouchableOpacity style={{
                          width: 100,
                          backgroundColor:"#063046",
                          borderRadius : 100,
                          alignItems:"center",
                          justifyContent:"center",
                          marginTop: 7,
                          padding : 5
                      }} onPress={()=> goToScreen("RequestServiceDetail", props.data)}>
                      <Text style={{color : "white"}}>Detalle</Text>
                    </TouchableOpacity>

              </View>
          </View>
  }


  return (

    

    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

         {Load == true &&
            <ActivityIndicator size="large" color="#0B4E6B" />
         }



      


         <ScrollView style={{marginBottom :80}}>
            {Services.length > 0 &&
                Services.map((item, key)=>{
                    return <CardService
                            name  = {`${item.name_client} ${item.last_name_client}`}
                            name_category = {item.name_category}
                            photo = {item.photo_profile}
                            data  = {item}
                        />
                })
            }
         </ScrollView>

          

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


  

  
  Card : {
      width : "85%",
      alignSelf : "center",
      flexDirection : "row",
      justifyContent : "space-around",
      padding : 10,
      borderColor : "#063046",
      borderBottomWidth : 2,
      marginBottom : 10
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius : 400
  },
  TextCardName :{
      justifyContent : "center",
      width: "50%"
  },

  TextCardPrice :{
    justifyContent : "flex-start"
  },
  Name : {
      color : "#063046",
      fontSize : 16
  },
  Price : {
      fontWeight : "bold",
      color : "#39B54A"
  },
  Start : {
     flexDirection : "row",
     justifyContent : "center",
     alignItems : "center",
     marginTop : 15
  }


});