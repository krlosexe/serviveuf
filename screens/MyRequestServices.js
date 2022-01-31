import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator, ScrollView} from 'react-native';

import {server, file_server, base_url} from '../Env'    
import axios from 'axios'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'
import { Icon } from 'react-native-eva-icons';

function Index(props) {  


  const { navigation } = props

  function goToScreen(screen, detail_offert, status)
  {     
    if(status == "En proceso" || status == "Procesado"){
      detail_offert.lock = true
      navigation.navigate(screen, {randomCode : Math.random(), detail_offert})
    }


    if(status == "Pendiente por calificar"){
      navigation.navigate("CalificationServiceProvider", {randomCode : Math.random(), detail_offert})
    }


    console.log(status)
  }

    const { UserDetails, setUserDetails } = useContext(UserContext)
    const userDetails                     = useContext(UserContext)

    const [Offerts , setOfferts] = useState([])
    const [Load , setLoad] = useState(false)
    
    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }
    useEffect(() => {
      GetMyServices()
    }, [randomCode])


  function GetMyServices(){
    console.log('Enviando formulario')
      console.log(base_url(server,`requests/services/by/client/${userDetails.id}`))
      setLoad(true)
      axios.get( base_url(server,`requests/services/by/client/${userDetails.id}`)).then(function (response) {
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

      const data = { id_offert, id_service }
      console.log('Enviando formulario')
      console.log(base_url(server,`accept/offert`))
      console.log(data, "DATA")
    
     
      axios.post( base_url(server,`accept/offert`), data).then(function (response) {
        goToScreen("Dashboard", false)
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

    if(props.data.photo == null){
      photo_profile = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
    }else{
      photo_profile = `${file_server}/img/request_services/${props.data.photo_service}`
    }

    const [Load , setLoad] = useState(false)

    return  <TouchableOpacity  onPress={() => goToScreen("RequestOffertsDetails", props.data, props.data.status)}>
              <View style={{borderColor : "#063046",borderBottomWidth : 2, width : "85%", alignSelf : "center"}}>
                <View style={styles.Card}>

                        <View style={{marginRight : 20}}>
                            <Image
                                style={styles.profile}
                                source={{ uri: photo_profile}}
                            />

                            {props.data.status == "Finalizada" &&
                               <View style={styles.Start}>
                                  <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                                  <Text>{props.data.rating}</Text>
                              </View>
                            }


                        </View>
                        <View style={styles.TextCardName}>
                            <Text style={styles.Name}>{props.data.name_category}</Text>
                            <Text style={{fontSize : 10}}>{props.data.address.replace(", Medellín, Antioquia, Colombia", "")}</Text>
                            <Text style={{fontSize : 10}}>{props.data.date}</Text>
                        </View>
                        <View style={styles.TextCardPrice}>

                            {props.data.status == "Pendiente" &&
                              <Text style={{...styles.Price, color : "#FF9700"}}>{props.data.status}</Text>
                            }

                            {props.data.status == "En proceso" &&
                              <Text style={{...styles.Price, color : "#0B4E6B"}}>{props.data.status}</Text>
                            }


                            {props.data.status == "Cancelado" &&
                              <Text style={{...styles.Price, color : "#FF0202"}}>{props.data.status}</Text>
                            }

                          {props.data.status == "Procesado" &&
                              <Text style={{...styles.Price, color : "#39B54A"}}>{props.data.status}</Text>
                            }

                            {props.data.status == "Pendiente por calificar" &&
                              <Text style={{...styles.Price, color : "#063046"}}>Por calificar</Text>
                            }


                            {props.data.status == "Finalizada" &&
                              <Text style={{...styles.Price, color : "#39B54A"}}>{props.data.status}</Text>
                            }



                            

                            <View style={styles.Start}>
                                <Text>{props.data.name_client} {props.data.last_name_client}</Text>
                            </View>

                            


                        </View>
                    </View>
              </View>
            </TouchableOpacity>
  }


  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

         <HeadNavigate title="Mis Servicios" props={props} />


         {Load == true &&
            <ActivityIndicator size="large" color="#0B4E6B" />
        }


          <ScrollView style={{marginBottom : 100}}>
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
      justifyContent : "space-between",
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