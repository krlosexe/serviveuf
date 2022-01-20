import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, file_server, base_url} from '../Env'    
import axios from 'axios'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'

import { Icon } from 'react-native-eva-icons';
import messaging from '@react-native-firebase/messaging';

function Index(props) {  


  const { navigation } = props

  function goToScreen(screen, detail_offert)
  {     

    console.log(detail_offert, "detail_offert")
    navigation.navigate(screen, {randomCode : Math.random(), detail_offert})
  }

    const { UserDetails, setUserDetails } = useContext(UserContext)
    const userDetails                     = useContext(UserContext)

    const [Offerts , setOfferts] = useState([])
    const [Load , setLoad] = useState(false)

  useEffect(() => {

    GetOfferts(props.route.params.service, true)
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     GetOfferts(props.route.params.service, false)
    });

//     //const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log("notificación en segundo plano")
// //      console.log("noti---->", remoteMessage)
//   //    console.log()
//       setremoteMessage(remoteMessage)
//     });

   // return unsubscribe;
  }, [])


  function GetOfferts(id_service, init){
    console.log('Enviando formulario')
      console.log(base_url(server,`request/offerts/by/service/${id_service}`))

      if(init){
        setLoad(true)
      }
      axios.get( base_url(server,`request/offerts/by/service/${id_service}`)).then(function (response) {
        setLoad(false)
        setOfferts(response.data)
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


  const CardOffert = (props)=>{

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
                  <Text style={{fontSize : 10}}>102 servicios completados</Text>

                  <TouchableOpacity style={{
                          width: 100,
                          backgroundColor:"#063046",
                          borderRadius : 100,
                          alignItems:"center",
                          justifyContent:"center",
                          marginTop: 7,
                          padding : 5
                      }} onPress={()=> goToScreen("RequestOffertsDetails", props.data)}>
                      <Text style={{color : "white"}}>Detalle</Text>
                    </TouchableOpacity>


              </View>
              <View style={styles.TextCardPrice}>
                  <Text style={styles.Price}>{props.price} COP</Text>

                  <View style={styles.Start}>
                      <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                      <Text >4.8</Text>
                  </View>
              </View>
          </View>
  }


  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

         <HeadNavigate title="Servicios" props={props} />


         {Load == true &&
            <ActivityIndicator size="large" color="#0B4E6B" />
        }


          {Offerts.length > 0 &&
            Offerts.map((item, key)=>{
                return <CardOffert
                         name  = {`${item.name_client} ${item.last_name_client}`}
                         price = {item.price}
                         photo = {item.photo_profile}
                         data  = {item}
                      />
            })
          }

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