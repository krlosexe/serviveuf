import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, Image, TouchableOpacity, StyleSheet, Button, Dimensions, Animated, ActivityIndicator, Switch, Platform} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import LinearGradient from 'react-native-linear-gradient';
import { base_url, server, file_server } from '../Env.js';
import Share from 'react-native-share';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'



import StarRating from 'react-native-star-rating';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Menu(props) {


  function goToScreen(screen) {
    props.navigation.navigate(screen, { randomCode: Math.random() })
  }



  const WIDTH = props.width;
  const { userDetails, setUserDetails } = useContext(UserContext)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeWidth = useRef(new Animated.Value(WIDTH)).current;
  const [PhotoProfile, setPhotoProfile] = useState(false)
  const [Load, setLoad]                 = useState(false)
  const [LabelBtnServiceProvider, setLabelBtnServiceProvider] = useState("Modo prestador de servicios")
  const [Rating, setRating]   = useState(0)
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function closet() {
    fadeOut()
    small()
    setTimeout(() => {
      props.action(false);
    }, 1000);
  }

  const logOut = async () => {
    console.log("good bye")
    try {
      await AsyncStorage.removeItem('@Passport');
      setUserDetails({
        id: null,
        name: null,
        surname: null,
        rol: null,
        email: null,
        language: null,
        password: null,
        phone: null,
        photo_profile: null
      })

      props.action(false);
      props.goToScreen("Home")
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {

    if (props.show === true) {
      fadeIn();
      big();
    }


    if(props.userDetails.photo_profile == null){
      setPhotoProfile('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
    }else{
      setPhotoProfile(`${file_server}/img/usuarios/profile/${props.userDetails.photo_profile}`)
    }

    GetStatusServiceProvider()
    GetRating()
  }, [props.show]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  const big = () => {
    Animated.timing(fadeWidth, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const small = () => {
    Animated.timing(fadeWidth, {
      toValue: WIDTH,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  
  function Go(screen) {
    closet()
    setTimeout(() => {
      props.goToScreen(screen, { randomCode: Math.random() })
    }, 500);
  }


  const GetRating = ()=>{
    console.log('Enviando formulario')
    console.log(base_url(server,`get/rating/service/provider/${props.userDetails.id}`))

    axios.get( base_url(server,`get/rating/service/provider/${props.userDetails.id}`) ).then(function (response) {
      console.log(response.data)
      setRating(response.data)
    })
  }

  function GetStatusServiceProvider(){
        setLoad(true)
        console.log('Enviando formulario')
        console.log(base_url(server,`get/status/service/provider/${props.userDetails.id}`))
  
        axios.get( base_url(server,`get/status/service/provider/${props.userDetails.id}`) ).then(function (response) {
          setLoad(false)

          if(response.data.service_provider){

            if(response.data.service_provider == "Reviewing"){
              setLabelBtnServiceProvider("En revisión")
            }

            if(response.data.service_provider == "Approved"){
                if(response.data.service_provider_status == "Inactive"){
                  setLabelBtnServiceProvider("Modo prestador de servicios")
                  _storeData({"mode_service_provider" : false})
                }
                if(response.data.service_provider_status == "Active"){
                  setLabelBtnServiceProvider("Desactivar")
                  _storeData({"mode_service_provider" : true})
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
      console.log(base_url(server,`get/status/service/provider/${props.userDetails.id}`))
      axios.get( base_url(server,`get/status/service/provider/${props.userDetails.id}`)).then(function (response) {
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
          console.log(error)
          console.log('Error al enviar formularioss')
          setLoad(false)
      })
      .then(function (response) {setLoad(false)});

    }

    

    const ModeActiveProvider = (status) =>{
      setLoad(true)
      console.log(base_url(server,`update/status/service/provider/${props.userDetails.id}/${status}`))
      axios.get( base_url(server,`update/status/service/provider/${props.userDetails.id}/${status}`)).then(function (response) {
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
        console.log({...props.userDetails,...data}, "SUCCESS")
        data.register = false
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify({...props.userDetails,...data}) );
          //console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...props.userDetails,...data})
         // goToScreen("Profile")
      }
      catch (error) {
          console.log(error)
        // Error saving data
      }
    }



  const ShareApp = () => {
    console.log("SHARE")

    const options = Platform.select({
      default: {
        title: 'Compartir App',
        message: "https://play.google.com/store/apps/details?id=com.pielis&hl=es-419"
      },
    });


    if(Platform.OS === "android"){
      Share.open(options).catch(err => console.log(err));
    }else{
      Share.open({
        title: 'Share',
          url: "https://play.google.com/store/apps/details?id=com.pielis&hl=es-419"
      }).catch(err => console.log(err));

    }

  }


  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@Passport');
      console.log('logout')
      setUserDetails({})
      goToScreen("Home")
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <View style={[styles.wrapper, { display: props.show === true ? "flex" : "none" }]}>
      <Animated.View style={[styles.wrap, { width: WIDTH, transform: [{ translateX: fadeWidth }] }]}>
        <ScrollView>
          <LinearGradient colors={["#0B4E6B", "#0B4E6B"]} style={styles.head}>
            <TouchableOpacity onPress={() => closet()} style={{ position: "absolute", zIndex: 999, top: 10, right: 10 }}>
              <Icon name='close-outline' fill={"white"} width={20} height={20} />
            </TouchableOpacity>
            <View style={[styles.avatar, { width: WIDTH / 2.8, height: WIDTH / 2.8, borderRadius: WIDTH / 2 }]}>
                <Image
                  style={styles.img}
                  source={{ uri: PhotoProfile}}
                />
            </View>
            <Text style={{...styles.name, marginBottom : 10}}>{props.userDetails.names} {props.userDetails.last_names}</Text>

            <StarRating
              disabled={false}
              maxStars={5}
              rating={Rating}
              fullStarColor={'#FF9700'}
              emptyStarColor = {"#fff"}
              starSize = {23}
            />

          </LinearGradient>


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


          <View style={{ paddingBottom: 40 }}>

              {props.userDetails.mode_service_provider &&
                <TouchableOpacity
                  onPress={() => Go("MyOffertsServices")}
                  style={styles.opt}>
                  <Icon name='briefcase-outline' fill={"#777"} width={20} height={20} />
                  <Text style={styles.optText}>Mis Ofertas</Text>
                </TouchableOpacity>
              }

              {!props.userDetails.mode_service_provider &&
                <TouchableOpacity
                  onPress={() => Go("MyRequestServices")}
                  style={styles.opt}>
                  <Icon name='briefcase-outline' fill={"#777"} width={20} height={20} />
                  <Text style={styles.optText}>Mis Servicios</Text>
                </TouchableOpacity>
              }


            


            {/* <TouchableOpacity
              style={styles.opt}>
              <Icon name='moon-outline' fill={"#777"} width={20} height={20} />
              <Text style={{...styles.optText, marginRight : "25%"}}>Modo Oscuro</Text>

              <Switch
                trackColor={{ false: "#999", true: "#999" }}
                thumbColor={isEnabled ? "#0B4E6B" : "#eee"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => Go("Faq")}
              style={styles.opt}>
              <Icon name='alert-circle' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Ayuda</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => Go("Profile")}
              style={styles.opt}>
              <Icon name='message-square' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Soporte</Text>

              


            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Go("Security")}
              style={styles.opt}>
              <Icon name='shield' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Seguridad</Text>
            </TouchableOpacity>
{/* 
            <TouchableOpacity
              onPress={() => Go("DashboardServices")}
              style={styles.opt}>
              <Icon name='people' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Proteccion</Text>
            </TouchableOpacity> */}


            <TouchableOpacity
              onPress={() => ShareApp()}
              style={styles.opt}>
              <Icon name='share' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Compartir</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.opt} onPress={() => logOut()}>
              <Icon name='power-outline' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Cerrar Sesión</Text>
            </TouchableOpacity>


            <View style={{flexDirection : "row", justifyContent : "center", marginTop : 20}}>
               <Image
                  style={{
                    width  : 30, 
                    height : 30,
                    marginHorizontal : 20
                  }}
                  source={require('../src/images/icon_facebook.png')}
                />


                <Image
                  style={{
                    width  : 30, 
                    height : 30,
                    marginHorizontal : 20
                  }}
                  source={require('../src/images/icon_instagram.png')}
                />


            </View>

            <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                      marginBottom:40,
                      alignSelf : "center",
                      marginTop : 3
                    }}
                source={require('../src/images/logo.png')}
            />



          </View>
        </ScrollView>
      </Animated.View>


      <TouchableWithoutFeedback onPress={() => closet()}>
        <Animated.View style={[styles.back, { opacity: fadeAnim }]}></Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: windowWidth,
    height: windowHeight,
    position: "absolute",
    zIndex: 999999,
    flex: 1,
    top: 0,
    right: 0,
    
  },
  wrap: {
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    flexDirection: "column",
    height: "100%",
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "silver",
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: "white",
    overflow: "hidden",
  },
  img: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  name: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
    color: "white",
  },
  email: {
    color: "white",
    fontSize: 14,
  },
  opt: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center"
  },
  optText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#555"
  },
  back: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  BtnMode:{
    width:"80%",
    backgroundColor:"#0B4E6B",
    borderRadius:25,
    height:35,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom : 10,
    alignSelf : "center"
  },

  loginText:{
    color:"white",
    textAlign : "center",
    fontSize : 12
  },

  Starts : {
    flexDirection : "row",
    justifyContent : "space-between",
    width : "50%",
    marginTop: 4,
    marginBottom: 8
  }
});
export default Menu;