import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ImageBackground, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'

import { Icon } from 'react-native-eva-icons';
import { RadioButton } from 'react-native-paper';

function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   
    navigation.navigate(screen, {randomCode : Math.random()})
  }

    const { UserDetails, setUserDetails } = useContext(UserContext)
    const userDetails                     = useContext(UserContext)
    const [editable, setEditable]         = useState(false)
    const [Load, setLoad]                 = useState(false);
    const [LoadOrder, setLoadOrder]       = useState(true);
    const [date, setDate]                 = useState(new Date)
    const [open, setOpen]                 = useState(false)
    const [DateString, setDateString]     = useState(false)
    const [checked, setChecked] = React.useState(false);
    useEffect(()=>{
      setTimeout(() => {
        setEditable(true)
      }, 100)
    },[])


    const [formInfo , setFormInfo] = useState({
      id_client   : userDetails.id,
      id_category : props.route.params.id_service,
      date        : '',
      phone       : '',
      address     : '',
      comments    : '',
      photo       : ''
  })


    React.useEffect(()=>{
      
    },[])



    function onChangeText(text, key){
      setFormInfo({
          ...formInfo,
          [key] : text
      })
    }

    function sendForm(){
      const data = {
        ...formInfo
      }

    
      setLoad(true)
      setLoadOrder(true)
      if(data.id_client === '' || data.id_category === '' || data.date === '' || data.phone === '' || data.address === '' || data.comments === '' || data.photo === ''){
        ToastAndroid.showWithGravity(
            "Completa todos los campos",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        setLoad(false)
        return false;
      }
      console.log('Enviando formulario')
      console.log(base_url(server,`request/service`))
      console.log(data)

      axios.post( base_url(server,`request/service`), data ).then(function (res) {
        //setLoad(false)
        setLoadOrder(false)
       // _storeData(res.data)
       console.log("SUCCESSFUL")
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


  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <HeadNavigate title="Detalle oferta" props={props} />
        <Text style={styles.titleService}>{props.route.params.service}</Text>

        <View style={styles.Banner}>
            <View>
                <ImageBackground source={require('../src/images/back_profile.png')}
                        style={styles.HeadProfileImageBackgroud}>

                </ImageBackground>
                <Image style={styles.HeadProfileImage} source={require('../src/images/profile_barber.jpeg')}
                />
            </View>

            <View style={{alignItems : "center"}}>
                <Text style={styles.Name}>Carlos Cardenas</Text>
                <View style={styles.Starts}>
                    <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                    <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                    <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                    <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                    <Icon name='star' width={20} height={20} fill='#fff' /> 
                </View>
                <Text style={styles.Price}>Tiempo : 35 Minutos </Text>
                <Text style={styles.Price}>Precio : 35.000 </Text>
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
                ¡Hola! 
                Te ofrecemos nuestro increible
                servicio de manicure totalmente
                gratis, por solicitar nuestro
                servicio de pedicure.
            </Text>
        </View>


        <Text style={{fontSize : 20, color :"#063046", marginTop : 20, textAlign : "center"}}>Medios de pago</Text>
            
        <View style={styles.MethodPays}>
            <View style={styles.MethodPaysItems}>
                <RadioButton
                    value="first"
                    color = "#FF9700"
                    uncheckedColor = "#063046"
                    status={ "unchecked"}
                    onPress={(value) => console.log(value)}
                />

                <Image style={styles.IconCard} source={require('../src/images/card.png')}
                />
            </View>


            <View style={styles.MethodPaysItems}>
                <RadioButton
                    value="first"
                    color = "#FF9700"
                    uncheckedColor = "#063046"
                    status={ "checked"}
                    onPress={(value) => console.log(value)}
                />

                <Text style={{color: "#4D4D4D"}}>Efectivo</Text>

            </View>


            <View style={styles.MethodPaysItems}>
                <RadioButton
                    value="first"
                    color = "#FF9700"
                    uncheckedColor = "#063046"
                    status={ "unchecked"}
                    onPress={(value) => console.log(value)}
                />
                <Text style={{color: "#4D4D4D"}}>Saldo</Text>
            </View>
        </View>


        <TouchableOpacity style={{
            width: 150,
            backgroundColor:"#063046",
            borderRadius : 100,
            alignItems:"center",
            justifyContent:"center",
            marginTop: 20,
            padding : 15,
            alignSelf : "center"
        }} onPress={()=> goToScreen("RequestOffertsDetails")}>
            <Text style={{color : "white"}}>Pagar</Text>
        </TouchableOpacity>






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
      fontSize : 19
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
    position: "relative",
    top : -6,
    borderRadius : 500
 },
    HeadProfileImageBackgroud : {flex: 1,
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
    }


});