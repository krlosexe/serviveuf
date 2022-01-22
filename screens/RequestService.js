import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ScrollView, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'
import DatePicker from 'react-native-date-picker'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import PhotoUpload from 'react-native-photo-upload'
import { Pulse } from 'react-native-animated-spinkit'

import { ActionSheet } from 'react-native-cross-actionsheet'


function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   
    navigation.navigate(screen, {randomCode : Math.random()})
  }

    const { UserDetails, setUserDetails }   = useContext(UserContext)
    const userDetails                       = useContext(UserContext)
    const [editable, setEditable]           = useState(false)
    const [Load, setLoad]                   = useState(false);
    const [LoadOrder, setLoadOrder]         = useState(true);
    const [date, setDate]                   = useState(new Date)
    const [open, setOpen]                   = useState(false)
    const [DateString, setDateString]       = useState(false)

    const [SelectType, setSelectType]   = useState(false)

    const [TypeService, setTypeService]   = useState("Tipo")


    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }

    console.log(randomCode, "randomCode")

    useEffect(()=>{
      setTimeout(() => {
        setEditable(true)
      }, 100)
      setSelectType(false)

      if(props.route.params.service == "Trenzas"){
        console.log("TRENZAS")
        setSelectType(true)
      }

      if(props.route.params.service == "Pedicure"){
        console.log("Pedicure")
        setSelectType(true)
      }


    },[randomCode])


    const [formInfo , setFormInfo] = useState({
      id_client   : userDetails.id,
      id_category : props.route.params.id_service,
      date        : '',
      phone       : '',
      address     : '',
      comments    : '',
      photo       : '',
      type        : ''
  })


   const typeSelect = ()=>{

    let optionsSelect = []
    if(props.route.params.service == "Trenzas"){
       optionsSelect = [
        { text: 'Cabello',   onPress:() => setTypeService('Cabello') },
        { text: 'Kanekalon', onPress:() => setTypeService('Kanekalon') },
        { text: 'Sintético', onPress:() => setTypeService('Sintético') },
        { text: 'Kinky',     onPress:() => setTypeService('Kinky') },
        { text: 'Lana',      onPress:() => setTypeService('Lana') }
      ]
    }

    if(props.route.params.service == "Pedicure"){
       optionsSelect =  [
        { text: 'Sencillas',      onPress:()  => setTypeService('Sencillas') },
        { text: 'Semipermanente', onPress:()  => setTypeService('Semipermanente') },
        { text: 'Acrílicas',      onPress:()  => setTypeService('Acrílicas') },
        { text: 'Esculpidas',     onPress:()  => setTypeService('Esculpidas') },
        { text: 'Retoque',         onPress:() => setTypeService('Retoque') }
      ]
    }

      ActionSheet.options({
          options: optionsSelect,
          cancel: { onPress: () => console.log('cancel') }
      })
    }


//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log("notificación en primer plano")
//       console.log("noti---->", remoteMessage)
//       //setremoteMessage(remoteMessage)
//     });

// //     //const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
// //     messaging().setBackgroundMessageHandler(async remoteMessage => {
// //       console.log("notificación en segundo plano")
// // //      console.log("noti---->", remoteMessage)
// //   //    console.log()
// //       setremoteMessage(remoteMessage)
// //     });

//     return unsubscribe;
//   }, [])





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


      data.type = TypeService

    
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

            <ScrollView>
                <View>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                      setOpen(false)
                      setDate(date)
                      
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

                    {SelectType &&
                      <TouchableOpacity style={styles.inputView} onPress={()=>typeSelect()}>
                          <View style={styles.inputText}>
                              <Text style={{marginTop : 14, textAlign : "center"}}>{TypeService}</Text>
                          </View>
                      </TouchableOpacity>
                    }

                    <View style={styles.inputView} >
                      <TextInput  
                        style={styles.inputText}
                        placeholder="Comentarios" 
                        placeholderTextColor="#777"
                        onChangeText={text => onChangeText(text, 'comments')}/>
                    </View>

                    <PhotoUpload containerStyle={{marginTop : -10}}   onPhotoSelect={image => {
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
                        alignSelf : "center"
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
            </ScrollView>

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