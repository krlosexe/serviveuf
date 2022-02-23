import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'

function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {     
    navigation.navigate(screen, {randomCode : Math.random()})
  }

  const [Load, setLoad] = React.useState(false);
    const [editable, setEditable] = useState(false)

    useEffect(()=>{
      setTimeout(() => {
        setEditable(true)
      }, 100)
    },[])


    const [formInfo , setFormInfo]  = useState({
        email : '',
    })


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
      if( data.email === ''){
        setLoad(false)
        ToastAndroid.showWithGravity(
            "Introduce tus email",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        return false;
      }


      console.log('Enviando formulario')
      console.log(base_url(server,`auth/recovery`))
      console.log(data)


      axios.post( base_url(server,`auth/recovery`), data ).then(function (res) {
        setLoad(false)
        goToScreen("Login")
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

          <View style={{width : "100%",alignItems: 'center', marginTop: 230}}>

              <Text
                style={{
                    fontSize: 20,
                    color : "black",
                    marginBottom: 30
                }}
              >Recordar contraseña</Text>
            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Correo electrónico" 
                placeholderTextColor="#777"
                keyboardType={'email-address'}
                editable={editable}
                onChangeText={text => onChangeText(text, 'email')}/>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}>
                {Load &&
                    <ActivityIndicator size="large" color="#fff" />
                }
                {!Load &&
                    <Text style={styles.loginText}>Enviar</Text>
                }
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