import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator, ScrollView, Alert} from 'react-native';

import {server, file_server, base_url} from '../Env'    
import axios from 'axios'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'

import { Icon } from 'react-native-eva-icons';
import messaging from '@react-native-firebase/messaging';
import { Pulse } from 'react-native-animated-spinkit'



function Index(props) {  


  const { navigation } = props

  function goToScreen(screen, detail_offert)
  {     


    if(props.route.params.Charge){
      navigation.navigate(screen, {randomCode : Math.random(), detail_offert, charge : true})
    }else{
      navigation.navigate(screen, {randomCode : Math.random(), detail_offert})
    }
   
    
  }


  function startTimer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        setTime(minutes + ":" + seconds)
       // console.log(minutes + ":" + seconds)
        if (--timer < 0) {
            timer = duration;
            CancelService()
        }
    }, 1000);
  }



    const { UserDetails, setUserDetails } = useContext(UserContext)
    const userDetails                     = useContext(UserContext)

    const [Offerts , setOfferts] = useState([])
    const [Load , setLoad] = useState(false)
    const [Time , setTime] = useState(0)
    
    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }
  useEffect(() => {

    GetOfferts(props.route.params.service, true)
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     GetOfferts(props.route.params.service, false)
    });

      console.log(props.route.params.CreatedAt)

  }, [randomCode])




  useEffect(() => {
    startTimer(props.route.params.CreatedAt)

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




  const AcceptOffert = (id_offert, id_service)=>{


      if(props.route.params.Charge){
        Alert.alert("No puedes aceptar ofertas, debes pagar tu cargo pendiente")
        return false
      }

      const data = { id_offert, id_service }
      console.log('Enviando formulario')
      console.log(base_url(server,`accept/offert`))
      console.log(data, "DATA")
     
      axios.post( base_url(server,`accept/offert`), data).then(function (response) {
        goToScreen("MyRequestServices", false)
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


  const AlertCancelService = () =>{
    Alert.alert(
      "Alerta",
      "¿Esta seguro de cancelar su pedido?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Si", onPress: () => CancelService() }
      ]
    );
  }


  
  const CancelService = () =>{
    setLoad(true)
    console.log(base_url(server,`cancel/request/service/${props.route.params.service}`))
    axios.get( base_url(server,`cancel/request/service/${props.route.params.service}`)).then(function (response) {
      setLoad(false)
      goToScreen("Dashboard")
    })
    .catch(function (error) {
        console.log('Error al enviar formulario')
      console.log(error.response.data)
        ToastAndroid.showWithGravity(
          error.response.data.message,
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



    const RefuseOffert = (id, id_service)=>{

      Alert.alert(
        "Alerta",
        "¿Esta seguro de rechazar la oferta?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Si", onPress: () => CancelOffert(id, id_service) }
        ]
      );
    }

    const CancelOffert = (id, id_service) =>{
      setLoad(true)
      console.log(base_url(server,`refuse/request/offert/${id}`))
      axios.get( base_url(server,`refuse/request/offert/${id}`)).then(function (response) {
        setLoad(false)
        GetOfferts(id_service, true)
      })
      .catch(function (error) {
          console.log('Error al enviar formulariosssss')
        console.log(error)
          ToastAndroid.showWithGravity(
            error.response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        setLoad(false)
      })
      .then(function () {});
    } 




    






    const [Load , setLoad] = useState(false)


    return  <View style={{borderColor : "#063046",borderBottomWidth : 2, width : "100%", alignSelf : "center"}}>
              <View style={styles.Card}>
                      <View style={{marginRight : 20}}>
                          <Image
                              style={styles.profile}
                              source={{ uri: photo_profile}}
                          />
                      </View>
                      <View style={styles.TextCardName}>
                          <Text style={styles.Name}>{props.name}</Text>
                          <Text style={{fontSize : 10}}>{props.data.offerts_ready} servicios completados</Text>

                      </View>
                      <View style={styles.TextCardPrice}>
                          <View style={{flexDirection : "row"}}>
                            <Text style={{...styles.Price, marginRight : 20}}>{props.price} COP</Text>
                            <TouchableOpacity onPress={()=> RefuseOffert(props.data.id, props.data.id_service)}>
                              <Icon name='close-square' width={30} height={30} fill='#FF0202' /> 
                            </TouchableOpacity>
                          </View>

                          <View style={styles.Start}>
                              <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                              <Text>{(parseInt(props.data.total_rating) / parseInt(props.data.count_rating)).toFixed(2)}</Text>
                          </View>
                      </View>
                  </View>

                  <View style={{flexDirection : "row", width : "80%", alignSelf : "center",marginTop : 1, marginBottom : 20,justifyContent : "space-around"}}>
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



                    <TouchableOpacity style={{
                          width: 100,
                          backgroundColor:"#39B54A",
                          borderRadius : 100,
                          alignItems:"center",
                          justifyContent:"center",
                          marginTop: 7,
                          padding : 5
                      }} onPress={()=> [AcceptOffert(props.data.id, props.data.id_service), setLoad(true)]}>
                      <Text style={{color : "white"}}>
                        {Load &&
                          <ActivityIndicator size="small" color="#fff" />
                        }
                        {!Load &&
                            <Text>Aceptar</Text>
                        }
                      </Text>
                    </TouchableOpacity>
                  </View>
            </View>
  }


  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

         <HeadNavigate title="Ofertas" props={props} />


         {Load == true &&
            <ActivityIndicator size="large" color="#0B4E6B" />
        }


          <ScrollView style={{marginBottom : 200}}>
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


          {Offerts.length == 0 &&
              <View style={{alignItems :"center", marginTop : 100}}>
                <Text style={{fontSize : 20}}>esperando ofertas de servicios...</Text>
                <Pulse size={200} color="#0B4E6B" />
              </View>
           }


            <TouchableOpacity style={{
               width:"70%",
                backgroundColor:"#0B4E6B",
                borderRadius : 40,
                height:60,
                alignItems:"center",
                justifyContent:"center",
                alignSelf : "center",
                marginTop:50,
                marginBottom:20
            }} onPress={()=>AlertCancelService() }>
              <Text style={styles.register}>
                
                    {Load &&
                        <ActivityIndicator size="large" color="#fff" />
                    }
                    {!Load &&
                        <Text style={{color : "white"}}>Cancelar Pedido {Time}</Text>
                    }
                  </Text>
            </TouchableOpacity>




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
      width : "90%",
      alignSelf : "center",
      flexDirection : "row",
      justifyContent : "space-around",
      padding : 10,
      
      marginBottom : 1
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