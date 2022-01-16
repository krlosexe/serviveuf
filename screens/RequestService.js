import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Button, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'
import DatePicker from 'react-native-date-picker'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'

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
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    
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

         <HeadNavigate title="Ordenar" props={props} />

         <Text style={styles.titleService}>{props.route.params.service}</Text>


         <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}

        />
          <View style={{width : "100%",alignItems: 'center', marginTop : 40}}>
            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Elige una fecha" 
                placeholderTextColor="#777"
                editable={editable}
                onChangeText={text => onChangeText(text, 'names')}/>
            </View>


            <View style={styles.inputView} >
                
              <TextInput  
                style={styles.inputText}
                placeholder="Hora" 
                placeholderTextColor="#777"
                editable={editable}
                onChangeText={text => onChangeText(text, 'last_names')}/>
            </View>


            <View style={styles.inputView} >
                
              <TextInput  
                style={styles.inputText}
                placeholder="Dirección" 
                placeholderTextColor="#777"
                keyboardType={'email-address'}
                editable={editable}
                onChangeText={text => onChangeText(text, 'email')}/>
            </View>


            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Teléfono / Celular" 
                placeholderTextColor="#777"
                onChangeText={text => onChangeText(text, 'password')}/>
            </View>


            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Comentarios" 
                placeholderTextColor="#777"
                onChangeText={text => onChangeText(text, 'repeat_password')}/>
            </View>

           
            <TouchableOpacity style={{
               width:"70%",
                backgroundColor:"#0B4E6B",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
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
  Head : {
      marginTop : 100,
      flexDirection : "row",
      justifyContent: "space-between",
      width : "100%",
      padding : 10
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
    width: 40,
    height: 100,
    resizeMode: "contain",
  },

  btn_back: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  
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
  },

  titleService : {
      color : "#0B4E6B",
      fontSize : 25,
     textAlign: "center",
     fontWeight : "bold"
  }

});