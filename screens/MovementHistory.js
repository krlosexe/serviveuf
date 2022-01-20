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

         <HeadNavigate title="Historial movimientos" props={props} />

         <Text style={styles.titleService}>{props.route.params.service}</Text>



         <View style={styles.Card}>
            <View style={styles.TextDate}>
                  <Text style={styles.Day}>22</Text>
                  <Text style={styles.Month}>Mayo</Text>
            </View>
            <View style={styles.TextConcept}>
                <Text style={styles.TextConceptName}>Abono</Text>
                <Text style={{fontSize : 12}}>a la cuenta</Text>
            </View>
            <View style={styles.TextCardPrice}>
                <Text style={styles.Price}>$ 100.000</Text>
            </View>

            <View style={styles.View}>
                <Icon style={{alignSelf : "center"}} name='eye' width={20} height={20} fill='#063046' /> 
                <Text style={styles.ViewText}>Ver más</Text>
            </View>

         </View>


         <View style={styles.Card}>
            <View style={styles.TextDate}>
                  <Text style={styles.Day}>22</Text>
                  <Text style={styles.Month}>Mayo</Text>
            </View>
            <View style={styles.TextConcept}>
                <Text style={styles.TextConceptName}>Abono</Text>
                <Text style={{fontSize : 12}}>a la cuenta</Text>
            </View>
            <View style={styles.TextCardPrice}>
                <Text style={styles.Price}>$ 100.000</Text>
            </View>

            <View style={styles.View}>
                <Icon style={{alignSelf : "center"}} name='eye' width={20} height={20} fill='#063046' /> 
                <Text style={styles.ViewText}>Ver más</Text>
            </View>

         </View>




         <View style={styles.Card}>
            <View style={styles.TextDate}>
                  <Text style={styles.Day}>22</Text>
                  <Text style={styles.Month}>Mayo</Text>
            </View>
            <View style={styles.TextConcept}>
                <Text style={styles.TextConceptName}>Abono</Text>
                <Text style={{fontSize : 12}}>a la cuenta</Text>
            </View>
            <View style={styles.TextCardPrice}>
                <Text style={styles.Price}>$ 100.000</Text>
            </View>

            <View style={styles.View}>
                <Icon style={{alignSelf : "center"}} name='eye' width={20} height={20} fill='#063046' /> 
                <Text style={styles.ViewText}>Ver más</Text>
            </View>

         </View>

         <View style={styles.Card}>
            <View style={styles.TextDate}>
                  <Text style={styles.Day}>22</Text>
                  <Text style={styles.Month}>Mayo</Text>
            </View>
            <View style={styles.TextConcept}>
                <Text style={styles.TextConceptName}>Abono</Text>
                <Text style={{fontSize : 12}}>a la cuenta</Text>
            </View>
            <View style={styles.TextCardPrice}>
                <Text style={styles.Price}>$ 100.000</Text>
            </View>

            <View style={styles.View}>
                <Icon style={{alignSelf : "center"}} name='eye' width={20} height={20} fill='#063046' /> 
                <Text style={styles.ViewText}>Ver más</Text>
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
      paddingHorizontal: 5,
      paddingVertical: 20,
      borderColor : "#063046",
      borderWidth : 2,
      margin : 10,
      borderRadius : 14
  },

  TextDate : {
      alignItems : "center",
      borderRightColor : "#808080",
      borderRightWidth: 1,
      paddingHorizontal : 5,
      paddingRight : 10
  },

  Day : {
      fontSize : 29,
      color : "#FF9700",
      
  },
  Month : {
      fontSize : 12,
      color : "#063046"
  },

  TextConcept : {
      justifyContent : "center",
      paddingRight : 20,
      borderRightColor : "#808080",
      borderRightWidth: 1,
  },
  TextConceptName : {
      color : "black",
      fontSize : 15
  },

  TextCardPrice : {
    justifyContent : "center", 
    borderRightColor : "#808080",
    borderRightWidth: 1,
    paddingRight : 20,
  },

  View : {
      textAlign : "center",
      alignContent : "center",
      justifyContent : "center"
  },
  ViewText : {
      fontSize : 12,
      color : "#063046"
  }


});