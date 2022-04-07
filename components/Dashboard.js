import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { server, base_url } from '../Env'
import axios from 'axios'

import UserContext from '../contexts/UserContext'

import messaging from '@react-native-firebase/messaging';

import BackgroundTimer from 'react-native-background-timer';



function Index(props) {

  const { navigation } = props

  const { UserDetails, setUserDetails } = useContext(UserContext)
  const [Load, setLoad] = useState(false);
  const [Request, setRequest] = useState(false);
  const [RequestStatus, setRequestStatus] = useState(false);
  const [RequestCategory, setRequestCategory] = useState(false);
  const [RequestDate, setRequestDate] = useState(false);
  const [RequestId, setRequestId] = useState(false);
  const [CountOfferts, setCountOfferts] = useState(0);
  const [CreatedAt, setCreatedAt] = useState(0);
  const [Time , setTime] = useState(0)
  const userDetails = useContext(UserContext)

  const [Charge, setCharge] = useState(false);
  const [DataCharge, setDataCharge] = useState(false);

  const [intervalId , setintervalId] = useState(false)

  function goToScreen(screen, service, id_service) {
    
    console.log(Request)
    if(Request && screen == "RequestService"){
      Alert.alert("Ya tienes un servicio pendiente")
    }else{


      if(Charge){
        navigation.navigate(screen, { randomCode: Math.random(), service, id_service, CreatedAt, Charge })
      }else{
        navigation.navigate(screen, { randomCode: Math.random(), service, id_service, CreatedAt })
      }
      
    }
    
  }

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    setRequest(false)
    getRequestServices(true)
    getChargue()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      getRequestServices(false)
    });
    return unsubscribe

    



  }, [randomCode])



  const getChargue = () => {
    console.log(base_url(server, `get/charge/client/${userDetails.id}`))
    axios.get(base_url(server, `get/charge/client/${userDetails.id}`)).then(function (response) {
      console.log(response.data, "response.date")
      setCharge(true)
      setDataCharge(response.data)
    })
      .catch(function (error) {
        setCharge(false)
      })
  }
  const getRequestServices = (init) => {

    if (init) {
      setLoad(true)
    }

    console.log(base_url(server, `request/service/by/client/${userDetails.id}`))
    axios.get(base_url(server, `request/service/by/client/${userDetails.id}`)).then(function (response) {
      if (response.data.id) {
        setRequest(true)
        setRequestStatus(response.data.status)
        setRequestCategory(response.data.name_category)
        setRequestDate(response.data.date)
        setRequestId(response.data.id)
        setCountOfferts(response.data.count_offerts)
        setCreatedAt(response.data.time)
        startTimer(response.data.time, response.data.id)
      }
    })
      .catch(function (error) {

        console.log(error.response.data.message)
        console.log('Error al enviar formularioss')
        setLoad(false)
        setRequest(false)
      })
      .then(function (response) {
        setLoad(false)
      });
  }




  function startTimer(duration, id_service) {

    let minutes = 0

    setintervalId(
      BackgroundTimer.setInterval(() => {
        minutes++
        setTime(parseInt((duration - minutes) / 60))
        console.log((duration - minutes) / 60, 'tic');
        return (duration - minutes) / 60
      }, 1000)
    )

  }


  useEffect(() => {

    if(Time == 0) {
      console.log("CANCEL")
      BackgroundTimer.clearInterval(intervalId);
      CancelService(RequestId)
    }
      console.log(Time, "TIME")
  }, [Time])





  const CancelService = (id_service) =>{
    BackgroundTimer.stop();
    setLoad(true)
    console.log(base_url(server,`cancel/request/service/${id_service}`))
    axios.get( base_url(server,`cancel/request/service/${id_service}`)).then(function (response) {
      setLoad(false)
      setRequest(false)
      getRequestServices(true)
    })
    .catch(function (error) {
        console.log('Error al enviar formulario')
      
      setLoad(false)
    })
    .then(function () {});
  } 




  useEffect(() => {
    if (userDetails.register) {
      goToScreen("StepOne", false)
    }
  }, [])

  return (

    <ScrollView style={{marginBottom: 90}}>



      
      <View style={styles.content_services}>




        {Charge  &&
          <TouchableOpacity onPress={() => navigation.navigate("MethodPay", { amount :  DataCharge.amount, charge : true})}>
              <View style={styles.request}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View>
                    <Text style={{textAlign : "center"}}>Tienes un cargo pendiente por pagar: {RequestStatus}</Text>
                    <Text style={{fontWeight : "bold", fontSize : 20, textAlign : "center"}}>{DataCharge.amount}</Text>
                    
                  </View>
                </View>

              </View>
          </TouchableOpacity>
        }

        


     
        <View style={{flexDirection:"column", marginBottom: 20}}>
        <View style={{ width: "100%", height: 110, alignSelf: "center", borderRadius: 14, flexDirection: "row", overflow: "hidden", justifyContent: "space-around" }}>
          <LinearGradient style={{
            width: "70%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            //opacity: 0.5,
            position: "relative"
          }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#0B4E6B", "#0B4E6B", "#0B4E6B", "#0B4E6B", "#0B4E6B", "#0B4E6B", "#0B4E6B", "transparent"]}
          >
            <Text style={styles.services_item_text_small}>Servicio de</Text>
            <Text style={styles.services_item_text_long}>Barberia</Text>
          </LinearGradient>
          <View style={{
            height: "100%",
            width: "70%"
          }}>
            <Image
              style={{
                width: null,
                height: null,
                flex: 1,
                resizeMode: "cover"
              }}
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
            }} onPress={()=>goToScreen("RequestService", "Barberia", 1) }>
                <Text style={{color : "white"}}>
                Ordenar
                </Text>
            </TouchableOpacity>
        </View>





            <View style={{flexDirection:"column", marginBottom: 20,}}>

              <View style={{ width: "100%", height: 110, alignSelf: "center", borderRadius: 14, flexDirection: "row", overflow: "hidden", justifyContent: "space-around" }}>

                <ImageBackground source={require('../src/images/banner_trenzas.png')}  style={{width : "100%"}}>
                  <View style={{position : "absolute", right : "20%", top : "25%", alignItems : "center"}}>
                    <Text style={styles.services_item_text_small}>Servicio de</Text>
                    <Text style={styles.services_item_text_long}>Trenzas</Text>
                  </View>
                </ImageBackground>
                
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
                }} onPress={()=>goToScreen("RequestService", "Trenzas", 2)}>
                    <Text style={{color : "white"}}>
                    Ordenar
                    </Text>
                </TouchableOpacity>
            </View>


            <View style={{flexDirection:"column", marginBottom: 20}}>

              <View style={{ width: "100%", height: 110, alignSelf: "center", borderRadius: 14, flexDirection: "row", overflow: "hidden", justifyContent: "space-around" }}>

                <ImageBackground source={require('../src/images/banner_unas.png')}  style={{width : "100%"}}>
                  <View style={{alignItems : "center", position : "absolute", left : "1%", top: "20%", height : 50}}>
                    <Text style={styles.services_item_text_small}>Servicio de</Text>
                    <Text style={{...styles.services_item_text_long,  width : "60%", textAlign : "center"}}>Manicure y Pedicure</Text>
                  </View>
                </ImageBackground>
                
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
                }} onPress={()=>goToScreen("RequestService", "Pedicure", 3)}>
                    <Text style={{color : "white"}}>
                    Ordenar
                    </Text>
                </TouchableOpacity>
            </View>


      </View>


      {Load == true &&
        <ActivityIndicator size="large" color="#0B4E6B" />
      }

      {Request &&

        <TouchableOpacity onPress={() => goToScreen("RequestOfferts", RequestId)}>
          <View style={styles.request}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text>Solicitud: {RequestStatus}</Text>
                <Text>{RequestCategory}</Text>
                <Text>{RequestDate}</Text>
              </View>

              <View>
                <ActivityIndicator size="small" color="#0B4E6B" />
                <Text style={{ fontWeight: "bold", textAlign: "center", marginTop: 10, marginBottom : 20 }}>{CountOfferts}</Text>
              </View>
            </View>

            <View>
                <Text>Tiempo Restante : {Time} min</Text>
              </View>

          </View>
        </TouchableOpacity>

      }
    </ScrollView>



  );

}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content_services: {
    padding: 20,
    marginTop : -20
  },

  services_item: {
    flexDirection: "row",
    alignContent: 'space-around',
    borderRadius: 14,
    width: "100%",
    height : 110
  },

  services_left: {
    width: "100%",
    height: 110,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    position: "relative",
    zIndex: 999
  },


  services_right: {
    width: "100%",
    height: 100,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14
  },


  services_image_left: {
    width: "40%",
    height : 110
  },





  services_image_right: {
    width: "60%",
    marginLeft: -30,
    position: "relative",
    zIndex: 10
  },


  services_text_left: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#FF9700",
    color: "white",
    width: "60%",
    paddingTop: "10%",
    borderTopEndRadius: 14,
    borderBottomEndRadius: 14
  },


  services_text_right: {
    textAlign: "center",
    alignItems: "center",
    //backgroundColor : "#0B4E6B",
    color: "white",
    width: "60%",
    paddingTop: "10%",
    borderTopStartRadius: 14,
    borderBottomStartRadius: 14,
    position: "relative",
    zIndex: 999
  },


  services_item_text_small: {
    color: "white",
    fontSize: 10
  },
  services_item_text_long: {
    color: "white",
    fontSize: 18
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

  request: {
    width: "80%",
    alignContent: "center",
    alignSelf: "center",
    padding: 14,
    borderRadius: 4,
    backgroundColor: "#fff",
    borderLeftColor: "#00d763",
    borderLeftWidth: 3,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }

});