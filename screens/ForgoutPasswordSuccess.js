import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ImageBackground} from 'react-native';

import {serverQa, base_url} from '../Env'    
import axios from 'axios'


import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import CheckBox from '@react-native-community/checkbox';

function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   

      ToastAndroid.showWithGravity(
           screen,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
   return false
  }


    
    const [notificationToken , setNotificationToken] = React.useState('')
    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const [editable, setEditable] = React.useState(false)
    const [isSelected, setSelection] = React.useState(false);

    
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
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify(data) );
          //console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...data})
      
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

        ToastAndroid.showWithGravity(
            "LOGIN",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
      
  return false
      data.fcmToken = notificationToken

      if( data.email === '' || data.password === ''){

        ToastAndroid.showWithGravity(
            "Introduce tus datos de acceso",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
           
        return false;
      }


      console.log('Enviando formulario')
      console.log(base_url(serverQa,`auth/app/financing`))
      console.log(data)


      axios.post( base_url(serverQa,`auth/app/financing`), data ).then(function (res) {

        _storeData(res.data)
    
      })
      .catch(function (error) {
          console.log('Error al enviar formulario')
        console.log(error)
          ToastAndroid.showWithGravity(
            "Correo o clave invalida",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );



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

          <View style={{width : "100%",alignItems: 'center', marginTop: 270}}>
              <Text
                style={{
                    fontSize: 20,
                    color : "black",
                    marginBottom: 30,
                    textAlign: "center",
                    width: "90%"
                }}
              >Fue enviado un
              mensaje de recuperación
              a tu correo, no olvides
              revisar tu buzón de spam.</Text>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}>
              <Text style={styles.loginText}>Aceptar</Text>
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
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    textAlign: "center",
    borderRadius: 100,
    backgroundColor:"#E6E6E6",
  },
  inputText:{
    height:50,
    color:"#777",
    textAlign : "center"
  },
  forgot:{
    color:"#000000",
    fontSize:14
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
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color : "#000",
    lineHeight : 20,
    textAlign : "justify"
  }

});