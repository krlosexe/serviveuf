import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, base_url} from '../Env'    
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
    const [Load, setLoad] = React.useState(false);

    
    React.useEffect(()=>{
      setTimeout(() => {
        setEditable(true)
      }, 100)
    },[])


    const [formInfo , setFormInfo]       = React.useState({
      names            : '',
      last_names       : '',
      email            : '',
      password         : '',
      repeat_password  : ''
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
        console.log(data, "SUCCESS")
        data.register = true
        data.mode_service_provider = false
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
      data.fcmToken = notificationToken
      setLoad(true)
      if( data.names === '' || data.last_names === '' || data.email === '' || data.password === '' || data.repeat_password === ''){
        ToastAndroid.showWithGravity(
            "Completa todos los campos",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoad(false)
        return false;
      }

      if(data.password != data.repeat_password){
        ToastAndroid.showWithGravity(
            "Las contraseñas no coinciden",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoad(false)
        return false;
      }



      if(!isSelected){
        ToastAndroid.showWithGravity(
            "Debe aceptar los términos y condiciones",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoad(false)
        return false;
      }
      console.log('Enviando formulario')
      console.log(base_url(server,`clients`))
      console.log(data)

      axios.post( base_url(server,`clients`), data ).then(function (res) {
        setLoad(false)
        _storeData(res.data)
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



          <View style={{width : "100%",alignItems: 'center', marginTop: 130}}>
            <View style={styles.inputView} >
                <Image
                      style={{resizeMode: "contain",width: 30, height: 30, position : "absolute", marginLeft: "4%"}}
                  source={require('../src/images/icon_user.png')}
              />
              <TextInput  
                style={styles.inputText}
                placeholder="Nombres" 
                placeholderTextColor="#777"
                editable={editable}
                onChangeText={text => onChangeText(text, 'names')}/>
            </View>


            <View style={styles.inputView} >
                <Image
                      style={{resizeMode: "contain",width: 30, height: 30, position : "absolute", marginLeft: "4%"}}
                  source={require('../src/images/icon_user.png')}
              />
              <TextInput  
                style={styles.inputText}
                placeholder="Apellidos" 
                placeholderTextColor="#777"
                editable={editable}
                onChangeText={text => onChangeText(text, 'last_names')}/>
            </View>


            <View style={styles.inputView} >
                <Image
                      style={{resizeMode: "contain",width: 27, height: 27, position : "absolute", marginLeft: "4%"}}
                  source={require('../src/images/icon_email.png')}
                />
              <TextInput  
                style={styles.inputText}
                placeholder="Email" 
                placeholderTextColor="#777"
                keyboardType={'email-address'}
                editable={editable}
                onChangeText={text => onChangeText(text, 'email')}/>
            </View>


            <View style={styles.inputView} >
                <Image
                      style={{resizeMode: "contain",width: 30, height: 30, position : "absolute", marginLeft: "4%"}}
                  source={require('../src/images/icon_lock.png')}
                />

              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Contraseña" 
                placeholderTextColor="#777"
                onChangeText={text => onChangeText(text, 'password')}/>
            </View>


            <View style={styles.inputView} >
                <Image
                      style={{resizeMode: "contain",width: 30, height: 30, position : "absolute", marginLeft: "4%"}}
                  source={require('../src/images/icon_lock.png')}
                />

              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Confirmar contraseña" 
                placeholderTextColor="#777"
                onChangeText={text => onChangeText(text, 'repeat_password')}/>
            </View>




            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Acepto términos y condiciones.*</Text>
            </View>

           
            <TouchableOpacity style={{
               width:"70%",
                backgroundColor:"#0B4E6B",
                borderRadius : 40,
                height:60,
                alignItems:"center",
                justifyContent:"center",
                marginTop:5,
                marginBottom:20
            }} onPress={()=>sendForm() }>
              <Text style={styles.register}>
                
                    {Load &&
                        <ActivityIndicator size="large" color="#fff" />
                    }
                    {!Load &&
                        <Text>Registrarse</Text>
                    }
                  </Text>
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