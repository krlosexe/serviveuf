import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Modal, Text, TouchableWithoutFeedback, Image, TouchableOpacity, StyleSheet, Button, Dimensions, Animated } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { file_server } from '../Env.js';

import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Menu(props) {
  const WIDTH = props.width;
  const { userDetails, setUserDetails } = useContext(UserContext)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeWidth = useRef(new Animated.Value(WIDTH)).current;
  const [AboutModal, setAboutModal] = useState(false);

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

    console.log(userDetails, "userDatiel")
    if (props.show === true) {
      fadeIn();
      big();
    }
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
      props.goToScreen(screen)
    }, 500);
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
                  source={{ uri: `https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg` }}
                />
            </View>
            <Text style={styles.name}>Carlos Cardenas</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.email}>cardenascarlos18@gmail.com</Text>
            </View>
          </LinearGradient>


          <TouchableOpacity style={styles.BtnMode} onPress={()=>ServiceProvider()}>
                <Text style={styles.loginText}>

                    Modo Prestador de Servicio
                    
                </Text>
            </TouchableOpacity>


          <View style={{ paddingBottom: 40 }}>

            <TouchableOpacity
              onPress={() => Go("Profile")}
              style={styles.opt}>
              <Icon name='briefcase-outline' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Mis Servicios</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => Go("ClinicList")}
              style={styles.opt}>
              <Icon name='settings' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Go("Sala")}
              style={styles.opt}>
              <Icon name='alert-circle' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Ayuda</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => Go("MedicsList")}
              style={styles.opt}>
              <Icon name='message-square' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Soporte</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Go("DashboardFly")}
              style={styles.opt}>
              <Icon name='shield' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Seguridad</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => Go("text")}
              style={styles.opt}>
              <Icon name='calendar-outline' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Mis recervaciones</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => Go("DashboardServices")}
              style={styles.opt}>
              <Icon name='people' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Proteccion</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => Go("DashboardServices")}
              style={styles.opt}>
              <Icon name='share' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Compartir</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.opt} onPress={() => logOut()}>
              <Icon name='power-outline' fill={"#777"} width={20} height={20} />
              <Text style={styles.optText}>Cerrar Sesión</Text>
            </TouchableOpacity>


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
  }
});
export default Menu;