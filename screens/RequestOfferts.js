import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Button, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'

import { Icon } from 'react-native-eva-icons';


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

         <HeadNavigate title="Servicios" props={props} />

         <Text style={styles.titleService}>{props.route.params.service}</Text>



         <View style={styles.Card}>
            <View>
                <Image
                    style={styles.profile}
                    source={require('../src/images/profile_barber.jpeg')}
                />
            </View>
            <View style={styles.TextCardName}>
                <Text style={styles.Name}>Carlos Cardenas</Text>
                <Text style={{fontSize : 10}}>102 servicios completados</Text>


                <TouchableOpacity style={{
                        width: 100,
                        backgroundColor:"#063046",
                        borderRadius : 100,
                        alignItems:"center",
                        justifyContent:"center",
                        marginTop: 7,
                        padding : 5
                    }} onPress={()=> goToScreen("RequestOffertsDetails")}>
                    <Text style={{color : "white"}}>Detalle</Text>
                    </TouchableOpacity>


            </View>
            <View style={styles.TextCardPrice}>
                <Text style={styles.Price}>80000 COP</Text>

                <View style={styles.Start}>
                    <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                    <Text >4.8</Text>
                </View>
            </View>
         </View>




         <View style={styles.Card}>
            <View>
                <Image
                    style={styles.profile}
                    source={require('../src/images/profile.png')}
                />
            </View>
            <View style={styles.TextCardName}>
                <Text style={styles.Name}>Carlos Cardenas</Text>
                <Text style={{fontSize : 10}}>24 servicios completados</Text>


                <TouchableOpacity style={{
                        width: 100,
                        backgroundColor:"#063046",
                        borderRadius : 100,
                        alignItems:"center",
                        justifyContent:"center",
                        marginTop: 7,
                        padding : 5
                    }} onPress={()=> goToScreen("RequestOffertsDetails")}>
                    <Text style={{color : "white"}}>Detalle</Text>
                    </TouchableOpacity>


            </View>
            <View style={styles.TextCardPrice}>
                <Text style={styles.Price}>80000 COP</Text>

                <View style={styles.Start}>
                    <Icon name='star' width={20} height={20} fill='#FF9700' /> 
                    <Text >4.8</Text>
                </View>
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
      justifyContent : "center"
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