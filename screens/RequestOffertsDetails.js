import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ImageBackground, Image, ToastAndroid, ActivityIndicator, Alert} from 'react-native';

import {file_server, server, base_url} from '../Env'   
import axios from 'axios'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'

import { Icon } from 'react-native-eva-icons';
import { RadioButton } from 'react-native-paper';

import StarRating from 'react-native-star-rating';

function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   
    navigation.navigate(screen, {randomCode : Math.random()})
  }


    function goToChat(screen, receiver, id_service) {
      navigation.navigate(screen, { randomCode: Math.random(), receiver, id_service })
    }



    const { UserDetails, setUserDetails } = useContext(UserContext)
    const userDetails                     = useContext(UserContext)
    const [PhotoProfile, setPhotoProfile] = useState(false)
    const [Load, setLoad] = useState(false);
    const [LoadRating, setLoadRating] = useState(false);
    const [Raiting, setRating] = useState(0);
    const [ReportService, setReportService] = useState(false);
    const [ClientReportService, setClientReportService] = useState(false);
    const [CommentsReportService, setCommentsReportService] = useState(false);
    const [PhotoReportService, setPhotoReportService] = useState(false);
    const [checked, setChecked] = useState('second');

    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }
    
    useEffect(()=>{


      console.log(props.route.params)
      if(props.route.params.detail_offert.photo_profile == null){
        setPhotoProfile('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
      }else{

        console.log(`${file_server}/img/usuarios/profile/${props.route.params.detail_offert.photo_profile}`)
        setPhotoProfile(`${file_server}/img/usuarios/profile/${props.route.params.detail_offert.photo_profile}`)
      }

      GetRating(props.route.params.detail_offert.id_client)
      props.route.params.detail_offert.status


      if (props.route.params.detail_offert.status == "Reportado") {
        GetReportService()
      }


    },[randomCode])



    const GetReportService = () => {
      axios.get(base_url(server, `report/services/${props.route.params.detail_offert.id}`)).then(function (response) {
        setLoad(false)
        console.log(response.data, "DAta")
        setReportService(true)
        setCommentsReportService(response.data.comments)
        setClientReportService(`${response.data.names} ${response.data.last_names}`)
        if(response.data.photo_profile == null){
          setPhotoReportService('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
        }else{
          setPhotoReportService(`${file_server}/img/usuarios/profile/${response.data.photo_profile}`)
        }
  
  
      })
        .catch(function (error) {
          console.log('Error al enviar formulario')
          console.log(error.response.data)
        })
        .then(function () { });
    }



    const GetRating = (id_client)=>{
        setLoadRating(true)
        console.log('Enviando formulario')
        console.log(base_url(server,`get/rating/service/provider/${id_client}`))
    
        axios.get( base_url(server,`get/rating/service/provider/${id_client}`) ).then(function (response) {
          console.log(response.data)
          setRating(response.data)
          setLoadRating(false)
        }).catch(function (error) {
            console.log('Error al enviar formulario')
          console.log(error.response.data)
            ToastAndroid.showWithGravity(
              error.response.data,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
          );
          setLoadRating(false)
        })
      }
    



    const AcceptOffert = (id_offert, id_service)=>{

        const data = { id_offert, id_service }
        console.log('Enviando formulario')
        console.log(base_url(server,`accept/offert`))
        console.log(data, "DATA")
      
        setLoad(true)
        axios.post( base_url(server,`accept/offert`), data).then(function (response) {
          goToScreen("MyRequestServices", false)
          setLoad(false)
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
        goToScreen("RequestOfferts")
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



    const CancelService = (data) => {
      setLoad(true)
      console.log(base_url(server,`client/cancel/request/service/${data.id}`))
      axios.get( base_url(server,`client/cancel/request/service/${data.id}`)).then(function (response) {
        setLoad(false)
        goToScreen("MyRequestServices")
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

  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <HeadNavigate title="Detalle oferta" props={props} />
        
        <View style={styles.Banner}>
            <View>
                <ImageBackground source={require('../src/images/back_profile.png')}
                        style={styles.HeadProfileImageBackgroud}>
                          <Image style={styles.HeadProfileImage} source={{ uri: PhotoProfile}}/>
                </ImageBackground>
                
            </View>

            <View style={{alignItems : "center"}}>
                <Text style={styles.Name}>{props.route.params.detail_offert.name_client} {props.route.params.detail_offert.last_name_client}</Text>
                

                {LoadRating &&
                    <ActivityIndicator size="large" color="#fff" />
                }
                {!LoadRating &&
                   <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={Raiting}
                        starSize = {23}
                        fullStarColor={'#FF9700'}
                        emptyStarColor = {"#fff"}
                        animation = "zoomInUp"
                    />
                }


                <Text style={styles.Price}>Tiempo : {props.route.params.detail_offert.time} </Text>
                <Text style={styles.Price}>Precio : {props.route.params.detail_offert.price} </Text>
            </View>
        </View>


        <View style={{justifyContent : "center", marginTop : 20}}>
            <View style={{
                width: 100,
                backgroundColor:"#063046",
                borderRadius : 100,
                alignItems:"center",
                justifyContent:"center",
                padding : 8,
                alignSelf : "center",
                zIndex : 999
            }}>
                <Text style={{color : "white"}}>Oferta:</Text>
            </View>

            <View style={{
                width : "90%",
                height : 1,
                backgroundColor : "#ED6306",
                position : "absolute",
                zIndex : 10,
                alignSelf : "center"
            }}></View>
        </View>


        <View style={styles.Comments}>
            <Text style={styles.CommentsText}>
              {props.route.params.detail_offert.comments}
            </Text>
        </View>



        {props.route.params.detail_offert.status == "En proceso" &&
            <TouchableOpacity style={{
              color: "black",
              width: "50%",
              alignSelf: "center",
              paddingHorizontal: 20,
              textAlign: "center",
              fontSize: 17,
              borderWidth: 2,
              backgroundColor: "#063046",
              borderRadius: 17,
              paddingVertical: 10,
              marginTop: 20,
              marginBottom: 20
            }} onPress={() => goToChat("Chat", props.route.params.detail_offert.id_service_provider, props.route.params.detail_offert.id)}>
              <Text style={{ color: "white", textAlign: "center" }}><View style={{ flexDirection: "row" }}>
                <Icon style={{ alignSelf: "center" }} name='message-square-outline' width={20} height={20} fill='white' />
                <Text style={{ marginLeft: 10, fontWeight: "bold", color: "white" }}>Chat</Text>
              </View></Text>
            </TouchableOpacity>
          }




        {props.route.params.detail_offert.status == "En proceso" &&
            <TouchableOpacity style={{ ...styles.loginBtn,  alignSelf: "center", width: 120,backgroundColor: "#ED6306" }} onPress={() => CancelService(props.route.params.detail_offert)}>
              <Text style={styles.loginText}>
                {Load &&
                  <ActivityIndicator size="large" color="#fff" />
                }
                {!Load &&
                  <Text style={{ fontSize: 14, color : "#fff" }}>Cancelar</Text>
                }
              </Text>
            </TouchableOpacity>
          }






        
        {props.route.params.detail_offert.lock != true && 
            <View>
                <Text style={{fontSize : 20, color :"#063046", marginTop : 20, textAlign : "center"}}>Medios de pago</Text>
            
                    <View style={styles.MethodPays}>
                        <View style={styles.MethodPaysItems}>
                            <RadioButton
                                value="first"
                                status={ checked === 'first' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('first')}
                                color = "#FF9700"
                                uncheckedColor = "#063046"
                            />
            
                            <Text style={{color: "#4D4D4D"}}>Transaccion electronica</Text>
                        </View>
            
            
                        <View style={styles.MethodPaysItems}>
                            <RadioButton
                                value="second"
                                status={ checked === 'second' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('second')}
                                color = "#FF9700"
                                uncheckedColor = "#063046"
                            />
            
                            <Text style={{color: "#4D4D4D"}}>Efectivo</Text>
            
                        </View>
            
                    </View>
            
            
                    <View style={{flexDirection : "row", justifyContent : "space-between", width : "90%", alignSelf : "center", marginTop : 20}}>

                      <TouchableOpacity style={{
                          width: 150,
                          backgroundColor:"#063046",
                          borderRadius : 100,
                          alignItems:"center",
                          justifyContent:"center",
                          marginTop: 20,
                          padding : 15,
                          alignSelf : "center"
                      }} onPress={()=> [AcceptOffert(props.route.params.detail_offert.id, props.route.params.detail_offert.id_service)]}>
                          
                          {Load &&
                              <ActivityIndicator size="large" color="#fff" />
                          }
                          {!Load &&
                              <Text style={{color : "white"}}>Aceptar</Text>
                          }

                      </TouchableOpacity>



                      <TouchableOpacity style={{
                          width: 150,
                          backgroundColor:"#ED6306",
                          borderRadius : 100,
                          alignItems:"center",
                          justifyContent:"center",
                          marginTop: 20,
                          padding : 15,
                          alignSelf : "center"
                      }} onPress={()=> RefuseOffert(props.route.params.detail_offert.id)}>
                          
                          {Load &&
                              <ActivityIndicator size="large" color="#fff" />
                          }
                          {!Load &&
                              <Text style={{color : "white"}}>Rechazar</Text>
                          }

                      </TouchableOpacity>
                    </View>



            </View>
        }



        {ReportService && userDetails.mode_service_provider && 
            <View>
              <View style={{ justifyContent: "center", marginTop: 20, marginBottom: 20 }}>
                <View style={{
                  width: 210,
                  backgroundColor: "#063046",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  alignSelf: "center",
                  zIndex: 999
                }}>
                  <Text style={{ color: "white", fontSize: 18 }}>Reporte:</Text>
                </View>

                <View style={{
                  width: "90%",
                  height: 1,
                  backgroundColor: "#ED6306",
                  position: "absolute",
                  zIndex: 10,
                  alignSelf: "center"
                }}></View>
              </View>
              <Image style={{
                width: 60, height: 60, 
                alignSelf : "center",
                justifyContent : "center",
                position: "relative",
                borderRadius : 100
              }} source={{ uri: PhotoReportService}}/>


                <Text style={{ fontSize: 15,textAlign: "center", color : "#777", marginTop : 10, marginBottom : 5,fontWeight : "bold"}}>{ClientReportService}</Text>
                <View style={{backgroundColor : "#eee", borderRadius : 14, padding : 20, width : "80%", alignSelf : "center"}}>
                  <Text style={{ textAlign: "center", color : "#777"}}>{CommentsReportService}</Text>
                </View>
              
            </View>
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
  
  Banner : {
      backgroundColor : "#063046",
      width : "100%",
      alignSelf : "center",
      flexDirection : "row",
      justifyContent : "space-around",
      padding : 20,
      paddingBottom : 40
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius : 400
  },

  
  Name : {
      color : "white",
      fontSize : 19,
      textAlign : "center"
  },

  Starts : {
    flexDirection : "row",
    justifyContent : "space-between",
    width : "50%",
    marginTop: 4,
    marginBottom: 8
  },
  Price : {
      color : "#fff",
      marginBottom: 5
  },

  HeadProfileImage:{
    width: 90, height: 90, 
    alignSelf : "center",
    justifyContent : "center",
    borderRadius : 500
 },
    HeadProfileImageBackgroud : {
        alignItems : "center",
        justifyContent : "center",
        width : 110,
        height : 110
    },

    Comments : {
        textAlign : "center",
        width : "80%",
        alignItems : "center",
        alignSelf : "center",
        marginTop : 20
    },

    CommentsText : {
        fontSize : 17,
        textAlign : "center",
        color : "#063046",
        lineHeight : 26
    },
    MethodPays : {
        backgroundColor : "#E6E6E6",
        width : "88%",
        alignSelf : "center",
        borderRadius : 20,
        padding : 5,
        paddingHorizontal : 20,
        marginTop: 20,
        flexDirection : "row",
        justifyContent : "space-between"
    },

    MethodPaysItems : {
        flexDirection : "row",
        alignItems : "center"
    },

    IconCard : {
        width : 30,
        height : 30,
        resizeMode : "contain"
    },

    loginBtn: {
      width: "55%",
      backgroundColor: "#063046",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 20
    }


});