import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator, BackHandler} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'


import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'


function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   

    navigation.navigate(screen, {randomCode : Math.random()})
  }
    
    const [notificationToken , setNotificationToken] = React.useState('')
    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const [editable, setEditable] = React.useState(false)
    const [Load, setLoad] = React.useState(false);
    const userDetails  = React.useContext(UserContext)



    useEffect(() => {

      console.log(userDetails, "SUERS")


      const backAction = () => {
        //goToBack()
        console.log(".1.")
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, []);



    
    React.useEffect(()=>{
      setTimeout(() => {
        setEditable(true)
      }, 100)
    },[])


    const [formInfo , setFormInfo]       = React.useState({
      email     : '',
      password  : ''
  })



    React.useEffect(()=>{
      async function getToken(){
          const fcmToken = await messaging().getToken();
        
          if (fcmToken)
              {setNotificationToken(fcmToken)} 
          else
          {console.log('user doesnt have a device token yet')}

          console.log(fcmToken, "TOKEN")
        }
        getToken()
    },[])



    const _storeData = async (data) => {

      data.register = false

      if(data.service_provider_status == "Active"){
        data.mode_service_provider = true
      }else{
        data.mode_service_provider = false
      }
      
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify(data) );
          //console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...data})
          props.navigation.navigate("Home")
      }
      catch (error) {
        // Error saving data
      }
    }







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
     
      data.fcmToken = notificationToken

      if( data.email === '' || data.password === ''){

        ToastAndroid.showWithGravity(
            "Introduce tus datos de acceso",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoad(false)
        return false;
      }


      console.log('Enviando formulario')
      console.log(base_url(server,`authApp`))
      console.log(data)

      axios.post( base_url(server,`authApp`), data ).then(function (response) {
        console.log(response.data, "RESPONSE")
        _storeData(response.data)
        setLoad(false)
      })
      .catch(function (error) {
          console.log('Error al enviar formulario')
        console.log(error)
          ToastAndroid.showWithGravity(
            "Correo o clave invalida",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

        setLoad(false)

      })
      .then(function () {


      });
     
    }


  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <View style={{
            //  flexDirection  : "row",
           }}>
              <Image
                      style={{resizeMode: "contain",width: 95, height: 95, position: "absolute", marginLeft: "25%", top:30, left: -100}}
                  source={require('../src/images/doble_roun.png')}
              />
              <Image
                      style={{resizeMode: "contain",width: 150, height: 150, position: "absolute", marginLeft: "25%", top: -70}}
                  source={require('../src/images/round_top_center.png')}
              />
              <Image
                      style={{width: 140, height: 140, position: "absolute", right: -60, top: -20}}
                  source={require('../src/images/round_top.png')}
              />

          </View>



          <View style={{width : "100%",alignItems: 'center', marginTop: 230}}>

            
            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Correo electrónico" 
                placeholderTextColor="#777"
                keyboardType={'email-address'}

                editable={editable}
                onChangeText={text => onChangeText(text, 'email')}/>
            </View>
            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Contraseña" 
                placeholderTextColor="#777"
                onChangeText={text => onChangeText(text, 'password')}/>
            </View>

             <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}>
              <Text style={styles.loginText}>
                    {Load &&
                        <ActivityIndicator size="large" color="#fff" />
                    }
                    {!Load &&
                        <Text>Iniciar sesión</Text>
                    }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>goToScreen('Forgout') }>
              <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={{
               width:"70%",
                backgroundColor:"#0B4E6B",
                borderRadius : 40,
                height:60,
                alignItems:"center",
                justifyContent:"center",
                marginTop:25,
                marginBottom:20
            }} onPress={()=>goToScreen('Register') }>
              <Text style={styles.register}>Quiero registrarme</Text>
            </TouchableOpacity>
          </View>


      

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
    backgroundColor:"#E6E6E6",
    
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    textAlign: "center",
    borderRadius: 100
  },
  inputText:{
    height:50,
    color:"#777"
  },
  forgot:{
    color:"#000000",
    fontSize:12
  },
  loginBtn:{
    width:"55%",
    backgroundColor:"#063046",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:20
  },
  loginText:{
    color:"white"
  },

  register:{
    color:"#fff"
  },

  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  }


});