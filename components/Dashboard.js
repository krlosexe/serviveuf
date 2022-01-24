import React, {useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Image, ActivityIndicator, Alert} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'

import UserContext from '../contexts/UserContext'

import Head from '../components/Head'
import Menu from '../components/Menu'


function Index(props) {  

  const { navigation } = props

  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const [Load, setLoad] = React.useState(false);
  const [Request, setRequest] = React.useState(false);
  const [RequestStatus, setRequestStatus] = React.useState(false);
  const [RequestCategory, setRequestCategory] = React.useState(false);
  const [RequestDate, setRequestDate] = React.useState(false);
  const [RequestId, setRequestId] = React.useState(false);

  const userDetails  = React.useContext(UserContext)

  function goToScreen(screen, service, id_service)
  {   
    navigation.navigate(screen, {randomCode : Math.random(), service, id_service})
  }
    
  let randomCode 
  if(props.route.params){
      randomCode = props.route.params.randomCode
  }else{
      randomCode = 1
  }

  useEffect(()=>{

    getRequestServices()
  },[randomCode])

  const getRequestServices = () =>{
    setLoad(true)
    console.log(base_url(server,`request/service/by/client/${userDetails.id}`))
    axios.get( base_url(server,`request/service/by/client/${userDetails.id}`)).then(function (response) {
      if(response.data.id){

        setRequest(true)

        setRequestStatus(response.data.status)
        setRequestCategory(response.data.name_category)
        setRequestDate(response.data.date)
        setRequestId(response.data.id)
        console.log(response.data.id)
      }
    })
    .catch(function (error) {

        console.log(error.response.data.message)
        console.log('Error al enviar formularioss')
        setLoad(false)
    })
    .then(function (response) {
        setLoad(false)
    });
  }

  useEffect(()=>{
    if(userDetails.register){
      goToScreen("StepOne", false)
    }
  },[])








  return (
    
    <ScrollView>
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
            }} onPress={()=>goToScreen("RequestService", "Barberia", 1) }>
                <Text style={{color : "white"}}>
                Ordenar
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
                <Text style={styles.services_item_text_long}>Trenzas</Text>
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
            }} onPress={()=>goToScreen("RequestService", "Trenzas", 2) }>
                <Text style={{color : "white"}}>
                Ordenar
                </Text>
            </TouchableOpacity>
        </View>


        <View style = {{marginBottom : 10}}>
            <View style={styles.services_item}>
                <View style={styles.services_text_right}>
                <Text style={styles.services_item_text_small}>Servicio de</Text>
                <Text style={styles.services_item_text_long}>Manicure y Pedicure</Text>
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
            }} onPress={()=>goToScreen("RequestService", "Pedicure", 3) }>
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

        <TouchableOpacity onPress={()=>goToScreen("RequestOfferts", RequestId) }>
            <View style={styles.request}>
            <View style={{flexDirection : "row", justifyContent: "space-between"}}>
                <View>
                <Text>Solicitud: {RequestStatus}</Text>
                <Text>{RequestCategory}</Text>
                <Text>{RequestDate}</Text>
                </View>

                <View>
                <ActivityIndicator size="small" color="#0B4E6B" />

                <Text style={{fontWeight : "bold", textAlign : "center", marginTop : 10}}>3</Text>
                </View>
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

  request : {
    width : "80%",
    alignContent : "center",
    alignSelf : "center",
    padding : 14,
    borderRadius : 4,
    backgroundColor : "#fff",
    borderLeftColor : "#00d763",
    borderLeftWidth : 3,
    marginBottom : 20,
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