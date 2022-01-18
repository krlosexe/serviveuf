import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Button, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'
import DatePicker from 'react-native-date-picker'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import PhotoUpload from 'react-native-photo-upload'
import { Pulse } from 'react-native-animated-spinkit'
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

         <HeadNavigate title="Ordenar" props={props} />

         <Text style={styles.titleService}>{props.route.params.service}</Text>

          {!Load && 

            <View>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    //var datestring = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);


                    var datestring = date.getFullYear() + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);



                    setDateString(datestring)

                    onChangeText(datestring, "date")

                    console.log(datestring)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
                <View style={{width : "100%",alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => setOpen(true)} style={{width : "100%",alignItems: 'center', marginTop : 40}}>
                    <View style={{...styles.inputView, height:60}} >

                          {DateString &&
                            <Text style={ {textAlign : "center"}}>{DateString}</Text>
                          }

                          {!DateString &&  
                              <Text style={ {textAlign : "center"}}>Elige una fecha</Text>
                          }
                      
                    </View>
                  </TouchableOpacity>
                
                  <View style={styles.inputView} >
                      
                    <TextInput  
                      style={styles.inputText}
                      placeholder="Dirección" 
                      placeholderTextColor="#777"
                      editable={editable}
                      onChangeText={text => onChangeText(text, 'address')}/>
                  </View>


                  <View style={styles.inputView} >
                    <TextInput  
                      style={styles.inputText}
                      placeholder="Teléfono / Celular" 
                      placeholderTextColor="#777"
                      onChangeText={text => onChangeText(text, 'phone')}/>
                  </View>


                  <View style={styles.inputView} >
                    <TextInput  
                      style={styles.inputText}
                      placeholder="Comentarios" 
                      placeholderTextColor="#777"
                      onChangeText={text => onChangeText(text, 'comments')}/>
                  </View>

                  <PhotoUpload containerStyle={{marginTop : -10, backgroundColor : "red"}}   onPhotoSelect={image => {
                    if (image) {
                        console.log(image) 
                        onChangeText(image, 'photo')
                      }}
                    }>
                    
                      <Image style={{
                          width: 250,
                          height : 150,
                          resizeMode : "contain"
                      }}title = "jaja"
                      source={require('../src/images/upload_image.png')} />
                  </PhotoUpload>


                </View>



                  
                  
                  <TouchableOpacity style={{
                    width:"70%",
                      backgroundColor:"#0B4E6B",
                      borderRadius: 40,
                      height:60,
                      alignItems:"center",
                      justifyContent:"center",
                      alignSelf : "center",
                      marginTop: 200
                  }} onPress={()=>sendForm() }>
                    <Text style={styles.register}>
                      
                          {Load &&
                              <ActivityIndicator size="large" color="#fff" />
                          }
                          {!Load &&
                              <Text>Enviar</Text>
                          }
                        </Text>
                  </TouchableOpacity>
            </View>

          }



            {Load &&
              <View style = {{width : "100%"}}>
                

                {LoadOrder && 
                   <Text style={{textAlign : "center", marginTop : 20, fontSize : 25, color : "#FF9700"}}>Estamos creando tu orden</Text>
                }

                {!LoadOrder && 
                   <Text style={{textAlign : "center", marginTop : 20, fontSize : 25, color : "#FF9700"}}>Tu pedido ha sido creado correctamente</Text>
                }
                
                {LoadOrder && 
                   <View style={{alignItems :"center", marginTop : 100}}>
                     <Pulse size={200} color="#0B4E6B" />
                   </View>
                }


                {!LoadOrder && 
                   <View style={{alignItems :"center", marginTop : 100}}>
                     <Image
                      style={styles.image_sucess}
                      source={require('../src/images/success.png')}
                    />
                   </View>
                }


                {!LoadOrder && 
                   <Text style={{textAlign : "center", marginTop : 50, fontSize : 16, color : "#FF9700", width : "80%", textAlign : "center", alignSelf : "center"}}>Espera las ofertas de nuestros prestadores de servicio</Text>
                }


                {!LoadOrder && 
                    <TouchableOpacity style={{
                      width:"50%",
                        backgroundColor:"#0B4E6B",
                        borderRadius: 40,
                        height:50,
                        alignItems:"center",
                        justifyContent:"center",
                        alignSelf : "center",
                        marginTop : 25
                    }} onPress={()=>goToScreen("Dashboard") }>
                      <Text style={styles.register}>
                        Finalizar</Text>
                    </TouchableOpacity>
                }




                



              </View>
          }
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
  },

  image_sucess : {
    width: 150,
    height: 150,
    resizeMode: "contain"
  },


});