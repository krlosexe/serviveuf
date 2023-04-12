import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ToastAndroid} from 'react-native';

import {file_server, server, base_url} from '../Env'   
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu'
import axios from 'axios'
import CheckBox from '@react-native-community/checkbox';

function Index(props) {  

  function goToScreen(screen) {
    props.navigation.navigate(screen, { randomCode: Math.random() })
  }

    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const userDetails  = React.useContext(UserContext)


    const [CheckBarber, setCheckBarber]       = useState(false)
    const [CheckTrenzas, setCheckTrenzas]     = useState(false)
    const [CheckPedicure, setCheckPedicure]   = useState(false)
    const [Load, setLoad]                     = useState(false)
   
    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }
    useEffect(()=>{

    },[randomCode])



    function sendForm(){
        setLoad(true)


        console.log('Enviando formulario')
        console.log(base_url(server,`change/category/client`))

        const data = {
           "barber"    : CheckBarber,
           "trenzas"   : CheckTrenzas,
           "pedicure"  : CheckPedicure,
           "id_client" : userDetails.id
        }
       
        console.log(data)
  
        axios.post( base_url(server,`change/category/client`), data).then(function (response) {
          setLoad(false)
          ToastAndroid.showWithGravity(
                "La solicitud fue enviada debe esperar su aprobacion",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );

            goToScreen("Profile")
        })
        .catch(function (error) {
            console.log('Error al enviar formulario')
          console.log(error.response)
            ToastAndroid.showWithGravity(
              "ha ocurrido un error",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
          );
          setLoad(false)
  
        })
        .then(function () { setLoad(false)});
    }


  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <View>
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


            <View style={styles.ContentCheck}>
                <Text style={{fontWeight : "bold", fontSize : 15, textAlign : "center", marginBottom : 10, backgroundColor : "#0B4E6B", color : "white", padding : 10}}>Pagos por solicitudes completadas</Text>
                <View style={{flexDirection : "row", justifyContent : "space-around", backgroundColor : "#eee", marginBottom : 10}}>
                    <Text>Completadas</Text>
                    <Text>20%</Text>
                </View>
                <View style={{flexDirection : "row", justifyContent : "space-around", backgroundColor : "#eee"}}>
                    <Text>Canceladas</Text>
                    <Text>0%</Text>
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
  BtnMode:{
    width: 100,
    backgroundColor:"#0B4E6B",
    borderRadius:25,
    height:35,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    alignSelf : "center"
  },
  BtnOptions:{
    width:"80%",
    backgroundColor:"#E6E6E6",
    borderRadius:25,
    height:55,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    alignSelf : "center",
    marginBottom : 10
  },

  
  loginText:{
    color:"white",
    textAlign : "center",
    fontSize : 10
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
  },

  HeadProfileImage:{
      width: 90, height: 90, 
      alignSelf : "center",
      justifyContent : "center",
      alignItems : "center",
      borderRadius : 100,
      marginTop: 10
   },
  HeadProfileImageBackgroud : {flex: 1,
    width : 110,
    height : 110,
   },

   HeadProfileText : {
       fontSize : 20,
       color : "#063046",
       textAlign : "center"
   },

   ContentSuport : {
       width : "100%",
       flexDirection : "row",
       justifyContent : "space-around",
       alignItems : "center"
   },

   ContentCheck : {
    width : "80%",
    alignSelf : "center",
    marginTop : "50%"
  },
  itemCheck : {alignItems : "center"},

  loginBtn:{
    width:"55%",
    backgroundColor:"#063046",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:20,
    alignSelf : "center"
  },



});