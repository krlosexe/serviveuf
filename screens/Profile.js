import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ImageBackground, ActivityIndicator, ScrollView, Linking} from 'react-native';

import {file_server, server, base_url} from '../Env'   
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu'
import axios from 'axios'


function Index(props) {  

  function goToScreen(screen, categories = false) {
    props.navigation.navigate(screen, { randomCode: Math.random(), categories })
  }

    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const userDetails  = React.useContext(UserContext)


    const [PhotoProfile, setPhotoProfile] = useState(false)
    const [Load, setLoad]                 = useState(false)
    const [LoadBalance, setLoadBalance]    = useState(false)
    const [LabelBtnServiceProvider, setLabelBtnServiceProvider] = useState("Modo prestador de servicios")
    const [Balance, setBalance] = useState(0)
    const [Categories, setCategories] = useState([])

    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }
    useEffect(()=>{

      if(userDetails.photo_profile == null){
        setPhotoProfile('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
      }else{
        setPhotoProfile(`${file_server}/img/usuarios/profile/${userDetails.photo_profile}`)
      }

      GetStatusServiceProvider()
      getBalance()


      if(userDetails.mode_service_provider){
        getCategories()
      }

    },[randomCode])


    const getBalance = () =>{
      setLoadBalance(true)
      console.log(base_url(server,`get/balance/client/${userDetails.id}`))
      axios.get( base_url(server,`get/balance/client/${userDetails.id}`)).then(function (response) {
        setLoadBalance(false)
        setBalance(currencyFormat(response.data.balance))
      })
      .catch(function (error) {
          console.log(error.response.data.message)
          console.log('Error al enviar formularioss')
          setLoadBalance(false)
      })
      .then(function (response) {setLoadBalance(false)});
    }


    const getCategories = () =>{
      console.log(base_url(server,`get/categories/client/${userDetails.id}`))

      axios.get( base_url(server,`get/categories/client/${userDetails.id}`)).then(function (response) {
        setCategories(response.data)
      })
      .catch(function (error) {
          console.log(error.response.data.message)
          console.log('Error al enviar formularioss')
      })
    }


    function currencyFormat(num) {
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function GetStatusServiceProvider(){
        setLoad(true)
        console.log('Enviando formulario')
        console.log(base_url(server,`get/status/service/provider/${userDetails.id}`))
  
        axios.get( base_url(server,`get/status/service/provider/${userDetails.id}`) ).then(function (response) {
          setLoad(false)

          if(response.data.service_provider){

            if(response.data.service_provider == "Reviewing"){
              setLabelBtnServiceProvider("En revisión")
            }

            if(response.data.service_provider == "Approved"){
                if(response.data.service_provider_status == "Inactive"){
                  setLabelBtnServiceProvider("Modo prestador de servicios")
                }
                if(response.data.service_provider_status == "Active"){
                  setLabelBtnServiceProvider("Desactivar")
                }
            }

            
          }
          console.log(response.data)
        })
        .catch(function (error) {
            console.log('Error al enviar formulario')
          console.log(error)
            ToastAndroid.showWithGravity(
              "ha ocurrido un error",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
          );
          setLoad(false)
  
        })
        .then(function () { setLoad(false)});
    }




    const ServiceProvider = () =>{
      setLoad(true)
      console.log(base_url(server,`get/status/service/provider/${userDetails.id}`))
      axios.get( base_url(server,`get/status/service/provider/${userDetails.id}`)).then(function (response) {
        setLoad(false)
        if(response.data.service_provider == null){
          goToScreen("ServiceProviderRegister")
        }

        if(response.data.service_provider == "Approved" && response.data.service_provider_status == "Inactive"){
          ModeActiveProvider("Active")
        }

        if(response.data.service_provider == "Approved" && response.data.service_provider_status == "Active"){
          ModeActiveProvider("Inactive")
        }
      })
      .catch(function (error) {
          console.log(error.response.data.message)
          console.log('Error al enviar formularioss')
          setLoad(false)
      })
      .then(function (response) {setLoad(false)});

    }


    const ModeActiveProvider = (status) =>{
      setLoad(true)
      console.log(base_url(server,`update/status/service/provider/${userDetails.id}/${status}`))
      axios.get( base_url(server,`update/status/service/provider/${userDetails.id}/${status}`)).then(function (response) {
        setLoad(false)
        GetStatusServiceProvider()

        if(status == "Active"){
          _storeData({"mode_service_provider" : true})
        }
        if(status == "Inactive"){
          _storeData({"mode_service_provider" : false})
        }
       
      })
      .catch(function (error) {
          console.log(error.response.data.message)
          console.log('Error al enviar formularioss')
          setLoad(false)
      })
      .then(function (response) {setLoad(false)});
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





    const logout = async () => {
        try {
          //await AsyncStorage.removeItem('@Passport');
          await AsyncStorage.setItem('@Passport', JSON.stringify({"mode_service_provider" : userDetails.mode_service_provider }) );
          console.log('logout')
          setUserDetails({"mode_service_provider" : userDetails.mode_service_provider })
          goToScreen("Home")
        } catch (error) {
          console.log(error.message);
        }
      }
  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <View>
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


          <ScrollView style={{width : "100%", marginTop: 100, marginBottom : 100}}>
            
            <View style={{...styles.HeadProfile, marginBottom : 30}}>
                <View style={{marginTop : 0, width : "40%", alignItems : "center"}}>
                    <ImageBackground source={require('../src/images/back_profile.png')}
                            style={styles.HeadProfileImageBackgroud}>
                        <Image style={styles.HeadProfileImage} source={{ uri: PhotoProfile}}/>
                    </ImageBackground>
                    
                </View>
                <View style={{marginTop : 0,width: "60%"}}>
                    <Text style={{...styles.HeadProfileText, fontWeight : "bold", width:"90%", alignSelf : "center"}}>{userDetails.names} {userDetails.last_names}</Text>
                   
                    {userDetails.mode_service_provider &&
                        <Text style={{...styles.HeadProfileText, fontSize : 20}}>
                            {LoadBalance &&
                              <ActivityIndicator size="small" color="#063046" />
                            }
                            {!LoadBalance &&
                              Balance
                            }
                        </Text>
                    }

                    <TouchableOpacity style={styles.BtnMode} onPress={()=>ServiceProvider()}>
                        <Text style={styles.loginText}>

                        {Load &&
                            <ActivityIndicator size="small" color="#fff" />
                        }
                        {!Load &&
                            <Text>{LabelBtnServiceProvider}</Text>
                        }
                            
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>


            {/* <View style={{width : "80%", alignSelf :"center", flexDirection : "row", justifyContent : "space-around"}}>
              {
                Categories.length > 0 &&

                Categories.map((item, key)=>{
                  return <Text style={{backgroundColor : "#063046", borderRadius : 200, padding: 2, paddingHorizontal : 10, color : "white"}}>{item.name}</Text>
                })
              }
            </View> */}

            <TouchableOpacity style={styles.BtnOptions} onPress={()=>goToScreen("ProfileEdit")}>
                <Text style={{fontSize: 18}}>
                    <Text>Editar perfil</Text>
                </Text>
            </TouchableOpacity>


            {userDetails.mode_service_provider &&
               <TouchableOpacity style={styles.BtnOptions} onPress={()=>goToScreen("ProfileEditCtagories", Categories)}>
                <Text style={{fontSize: 18}}>
                    <Text>Editar Categorias</Text>
                </Text>
              </TouchableOpacity>
            }

           
            {userDetails.mode_service_provider &&
               <TouchableOpacity style={styles.BtnOptions} onPress={()=>goToScreen("MovementHistory")}>
               <Text style={{fontSize: 18}}>
                   <Text>Historial de movimientos</Text>
               </Text>
            </TouchableOpacity>
            }
            

            {userDetails.mode_service_provider &&
                <TouchableOpacity style={styles.BtnOptions} onPress={()=>goToScreen("CreditAccount")}>
                    <Text style={{fontSize: 18}}>
                        <Text>Abonar a la cuenta</Text>
                    </Text>
                </TouchableOpacity>
            }



            {userDetails.mode_service_provider &&
                <TouchableOpacity style={styles.BtnOptions} onPress={()=>goToScreen("Interes")}>
                    <Text style={{fontSize: 18}}>
                        <Text>De interes</Text>
                    </Text>
                </TouchableOpacity>
            }





            <TouchableOpacity style={styles.BtnOptions} onPress={()=>logout()}>
                <Text style={{fontSize: 18}}>
                    <Text>Cerrar sesion</Text>
                </Text>
            </TouchableOpacity>

            <Text style={{marginTop : 40, fontSize : 23, textAlign : "center", color : "#063046"}}>Soporte</Text>

            <View style={styles.ContentSuport}>
                <TouchableOpacity style={{...styles.BtnOptions, width : "35%", backgroundColor : "#808080"}} onPress={()=>Linking.openURL(`tel:${3135300742}`)}>
                    <Image
                        style={{width: 35, height: 35}}
                            source={require('../src/images/icon_phone_suport.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.BtnOptions, width : "35%", backgroundColor : "#39B54A"}} onPress={()=>Linking.openURL('whatsapp://send?phone=+573135300742')}>
                    <Image
                        style={{width: 35, height: 35}}
                            source={require('../src/images/icon_whatsap.png')}
                    />
                </TouchableOpacity>
            </View>

           
            
          </ScrollView>

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
  BtnMode:{
    width: 100,
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
    alignSelf : "center",
    marginBottom : 10
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

  HeadProfile : {
      width : "100%",
    flexDirection : "row",
    justifyContent: "space-around"
  },

  HeadProfileImage:{
      width: 90, height: 90, 
      alignSelf : "center",
      justifyContent : "center",
      alignItems : "center",
      borderRadius : 100,
      marginTop: 10
   },
  HeadProfileImageBackgroud : {flex: 1,
    width : 110,
    height : 110,
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
   }


});