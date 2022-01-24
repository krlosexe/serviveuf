
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, TextInput, ActivityIndicator, ToastAndroid} from 'react-native';

import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'
import HeadNavigate from '../components/HeadNavigate'

import {server, file_server, base_url} from '../Env'    
import axios from 'axios'
import ImagePicker from 'react-native-image-picker';

function Index(props) {  

  function goToScreen(screen) {
    props.navigation.navigate(screen, { randomCode: Math.random() })
  }

    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const userDetails  = React.useContext(UserContext)
    const [editable, setEditable] = React.useState(false)
    const [Load, setLoad] = React.useState(false);
    const [PhotoProfile, setPhotoProfile] = useState(false)


    const [formInfo , setFormInfo]       = React.useState({
      names            : userDetails.names,
      last_names       : userDetails.last_names,
      email            : userDetails.email,
      identification   : userDetails.identification
    })



    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }
    useEffect(()=>{
        setFormInfo(userDetails)

      if(userDetails.photo_profile == null){
        setPhotoProfile('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
      }else{
        setPhotoProfile(`${file_server}/img/usuarios/profile/${userDetails.photo_profile}`)
      }
    },[randomCode])


    useEffect(()=>{
        setTimeout(() => {
          setEditable(true)
        }, 100)
      },[])

    function onChangeText(text, key){
        setFormInfo({
            ...formInfo,
            [key] : text
        })
    }


    const _storeData = async (data) => {
        console.log({...userDetails,...data}, "SUCCESS")
        data.register = false
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify({...userDetails,...data}) );
          //console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...userDetails,...data})
          goToScreen("Profile")
      }
      catch (error) {
          console.log(error)
        // Error saving data
      }
    }


    function sendForm(){
        const data = {
            names            : formInfo.names,
            last_names       : formInfo.last_names,
            email            : formInfo.email,
            identification   : formInfo.identification
        }
      
        setLoad(true)
        if( data.names === '' || data.last_names === '' || data.email === ''){
          ToastAndroid.showWithGravity(
              "Completa todos los campos",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setLoad(false)
          return false;
        }
  
        console.log('Enviando formulario')
        console.log(base_url(server,`clients/${userDetails.id}`))
        console.log(data)
  
        axios.put( base_url(server,`clients/${userDetails.id}`), data ).then(function (res) {
          setLoad(false)
          _storeData(formInfo)

          ToastAndroid.showWithGravity(
            "Tu perfil se actualizo exitosamente",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );

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




      const launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);

          if(response.data){
            setPhotoProfile(`data:image/png;base64,${response.data}`)

            UpdatePhotoProfile(response.data)
          }
            
        });
    
      }



      function UpdatePhotoProfile(image){
          console.log('Enviando formulario')
          console.log(base_url(server,`update/photo/clients/${userDetails.id}`))
          
          const data = {
            photo : image
          }
    
          axios.put( base_url(server,`update/photo/clients/${userDetails.id}`), data ).then(function (response) {
            _storeData({"photo_profile" : response.data})
            ToastAndroid.showWithGravity(
              "Tu perfil se actualizo exitosamente",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );

          })
          .catch(function (error) {
              console.log('Error al enviar formulario')
            console.log(error.response.data)
              ToastAndroid.showWithGravity(
                error.response.data,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
r          })
          .then(function () {
    
    
          });
      }


  
  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <HeadNavigate title="Perfil" props={props} />



          <View >
            
            <View style={styles.HeadProfile}>

                <TouchableOpacity onPress={() =>launchImageLibrary()}   >
                    <View>
                        <Image style={styles.HeadProfileImageBackgroud} source={require('../src/images/profile_edit.png')}
                        />

                        <Image style={styles.HeadProfileImage} source={{ uri: PhotoProfile}}
                        />


                        <TouchableOpacity onPress={() =>launchImageLibrary()}   >
                            <Image style={{
                                width: 50, height: 50, 
                                alignSelf : "center",
                                justifyContent : "center",
                                position : "absolute", 
                                bottom : 70,
                                right : 70
                            }} source={require('../src/images/icon_edit_profile.png')}
                            />
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </View>


            <View style ={{alignItems : "center", marginTop : 10}}>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="E-Mail" 
                        placeholderTextColor="#777"
                        keyboardType={'email-address'}
                        editable={editable}
                        value={formInfo.email}
                        onChangeText={text => onChangeText(text, 'email')}/>
                </View>


                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Nombres" 
                        placeholderTextColor="#777"
                        value={formInfo.names}
                        editable={editable}
                        onChangeText={text => onChangeText(text, 'names')}/>
                </View>


                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Apellidos" 
                        placeholderTextColor="#777"
                        editable={editable}
                        value={formInfo.last_names}
                        onChangeText={text => onChangeText(text, 'last_names')}/>
                </View>


                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Cédula / NIT" 
                        placeholderTextColor="#777"
                        editable={editable}
                        value={formInfo.identification}
                        onChangeText={text => onChangeText(text, 'identification')}/>
                </View>

                    

                <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}>
                    <Text style={styles.loginText}>
                            {Load &&
                                <ActivityIndicator size="large" color="#fff" />
                            }
                            {!Load &&
                                <Text style={{fontSize : 20}}>Guardar</Text>
                            }
                    </Text>
                 </TouchableOpacity>

            </View>
            
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
    textAlign : "center"
  },
  forgot:{
    color:"#000000",
    fontSize:14
  },
  BtnMode:{
    width:"80%",
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
    alignSelf : "center"
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

  HeadProfile : {
    flexDirection : "row",
    justifyContent: "space-around",
    marginBottom : -50,
    marginTop: -20
  },

  HeadProfileImage:{
      width: 136, height: 136, 
      alignSelf : "center",
      justifyContent : "center",
      position: "relative",
      position : "absolute", 
      top: "27%",
      left : "29%",
      borderRadius : 100
   },
  HeadProfileImageBackgroud : {
    width: 298, height: 298, 
    alignSelf : "center",
    justifyContent : "center",
    position: "relative",
    resizeMode : "contain"
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


});