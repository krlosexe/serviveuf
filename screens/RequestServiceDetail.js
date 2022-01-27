import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, StatusBar, Image, TextInput, ScrollView, ActivityIndicator, ToastAndroid, Modal} from 'react-native';

import {server, file_server, base_url} from '../Env'    

import UserContext from '../contexts/UserContext'
import axios from 'axios'
import { showLocation } from 'react-native-map-link';
import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'
import { Icon } from 'react-native-eva-icons';



import MapView,  { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { Marker } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';


function Index(props) {  


  const { navigation } = props

  function goToScreen(screen, detail_offert)
  {     

    console.log(detail_offert, "detail_offert")
    navigation.navigate(screen, {randomCode : Math.random(), detail_offert})
  }

    const { UserDetails, setUserDetails } = useContext(UserContext)
    const userDetails                     = useContext(UserContext)
    const [editable, setEditable]         = useState(false)

    const [Load, setLoad] = useState(false);
    const [DataService, setDataService] = useState(false);


    const [modalVisible, setModalVisible] = useState(false);

    const GOOGLE_MAPS_APIKEY = 'AIzaSyBm_gLphZClLWDkUHnD0PrxCx1H0GCoXeM';
    const [RegionInitial, setRegionInitial] = useState({
      latitude: 6.2071452,
      longitude: -75.5721136,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });

    const [Region, setRegion] = useState({});


    const [formInfo , setFormInfo]       = useState({
        price            : "",
        time             : "",
        comments         : ""
      })



     useEffect(()=>{

      setFormInfo({
        price            : props.route.params.detail_service.price,
        time             : props.route.params.detail_service.time,
        comments         : "",
      })
       setDataService(props.route.params.detail_service)
    },[props.route.params.detail_service])   


    useEffect(()=>{
      setTimeout(() => {
      setEditable(true)
      }, 100)
    },[])   

    function GotoMaps(lat, lon) {
      showLocation({
        latitude: lat,
        longitude: lon,
        googleForceLatLon: false,
      })
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

      data.id_service  = props.route.params.detail_service.id
      data.id_provider = userDetails.id
     
      setLoad(true)
      if( data.price === '' || data.time === '' || data.comments === ''){
        ToastAndroid.showWithGravity(
            "Completa todos los campos",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoad(false)
        return false;
      }
      console.log('Enviando formulario')
      console.log(base_url(server,`store/offert/service`))
      console.log(data)


      axios.post( base_url(server,`store/offert/service`), data ).then(function (response) {
        setLoad(false)

        ToastAndroid.showWithGravity(
          "Su oferta se envio con Exito",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );


        goToScreen("MyOffertsServices", false)
        setLoad(false)
      return false;


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




    const OpenLocation = (latitude, longitude)=>{
      setModalVisible(true)
      console.log(latitude, longitude, "latitude, longitude")
      setRegion({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      })
    }


    
    
    
  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

         <HeadNavigate title="Servicios" props={props} />


         <ScrollView style={{marginBottom : 110}}>
            <View style={styles.Item}>
                <Text style={styles.ItemText}>Fecha:</Text>
                <Text style={styles.ItemText}>
                  {DataService && 
                    DataService.date.split(" ")[0]
                  }
                </Text>
            </View>

            <View style={styles.Item}>
                <Text style={styles.ItemText}>Hora:</Text>
                <Text style={styles.ItemText}>
                  {DataService && 
                    DataService.date.split(" ")[1]
                  }
                </Text>
            </View>

            <View style={styles.Item}>
                <Text style={styles.ItemText}>Direccion:</Text>
                <Text style={styles.ItemText}>{props.route.params.detail_service.address.replace(", Medellín, Antioquia, Colombia", "")}</Text>
            </View>


            <View style={styles.Item}>
                <Text style={styles.ItemText}>Teléfono:</Text>
                <Text style={styles.ItemText}>{DataService.phone}</Text>
            </View>


            <View style={styles.Item}>
                <Text style={styles.ItemText}>Servicio:</Text>
                <Text style={styles.ItemText}>{DataService.name_category}</Text>
            </View>


            <View style={styles.Item}>
                <Text style={styles.ItemText}>Tipo:</Text>
                <Text style={styles.ItemText}>{DataService.type}</Text>
            </View>


            <TouchableOpacity style={{color : "black", 
                            width : "50%",
                            alignSelf : "center",
                            paddingHorizontal : 20,
                            textAlign : "center",
                            fontSize : 17,
                            borderWidth : 2,
                            backgroundColor : "#063046",
                            borderRadius : 17,
                            paddingVertical : 5, 
                            marginTop : 20,
                            marginBottom : 20
                        }} onPress={() => OpenLocation(DataService.latitude, DataService.longitude)}>
                          <Text style={{color : "white", textAlign : "center"}}><View style={{flexDirection : "row"}}>
                                  <Icon style={{alignSelf : "center"}} name='navigation-2' width={20} height={20} fill='white' /> 
                                  <Text style={{marginLeft : 10, fontWeight : "bold", color : "white"}}>Ver ubicacion</Text>
                                </View></Text>
            </TouchableOpacity> 



            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >

              
              <View style={styles.centeredView}>

                <View style={styles.modalView}>

                    <View style={{ }}>
                        <Image
                                style={{resizeMode: "contain",width: 95, height: 95, position: "absolute", marginLeft: "25%", top:-20, left : -330}}
                            source={require('../src/images/round_blue.png')}
                        />
                        <Image
                                style={{width: 110, height: 110, position: "absolute",  top: -40, right : -220}}
                            source={require('../src/images/round_top.png')}
                        />
                        <Image
                                style={{resizeMode: "contain",width: 150, height: 150, position: "absolute", marginLeft: "24%", top: -40, left : -180}}
                            source={require('../src/images/triple_round.png')}
                        />
                    </View>


                    <View style={{width:'90%', 
                                  marginTop : 80}}>

                          <View style = {{marginBottom : 20, width : "100%", flexDirection : "row"}}>
                            <View style = {{width : "10%"}}>
                              <TouchableOpacity  onPress={()=>setModalVisible(!modalVisible) }>
                                  <Image
                                    style={styles.btn_back}
                                    source={require('../src/images/btn_back.png')}
                                  />
                              </TouchableOpacity>
                            </View>
                            <View style = {{width : "85%"}}>
                              <Text style={{textAlign : "center", fontSize : 20, color : "#063046"}}>{props.route.params.detail_service.address.replace(", Medellín, Antioquia, Colombia", "")}</Text>
                            </View>
                          </View>

                          <MapView
                            style={styles.map} 
                            initialRegion={RegionInitial}
                            region={Region}
                            onPress={(data)=>console.log(data)}
                          >
                            {/* <MapViewDirections
                              origin={origin}
                              destination={destination}
                              apikey={GOOGLE_MAPS_APIKEY}
                              strokeWidth = { 7 } 
                              strokeColor = "#1a73e7" 
                            /> */}

                              <Marker
                                coordinate={{ latitude : Region.latitude , longitude : Region.longitude }}
                                image={require('../src/images/marker.png')}
                              /> 
                          </MapView>
                    </View>  



                  <TouchableOpacity style={{color : "black", 
                            width : "50%",
                            alignSelf : "center",
                            paddingHorizontal : 20,
                            textAlign : "center",
                            fontSize : 17,
                            borderWidth : 2,
                            backgroundColor : "#063046",
                            borderRadius : 17,
                            paddingVertical : 5, 
                            marginTop : 20,
                            marginBottom : 20
                        }} onPress={() => GotoMaps(DataService.latitude, DataService.longitude)}>
                          <Text style={{color : "white", textAlign : "center"}}><View style={{flexDirection : "row"}}>
                                  <Icon style={{alignSelf : "center"}} name='navigation-2' width={20} height={20} fill='white' /> 
                                  <Text style={{marginLeft : 10, fontWeight : "bold", color : "white"}}>Cómo llegar</Text>
                                </View></Text>
                    </TouchableOpacity>


                </View>
              </View>
            </Modal>














            <Text style={{...styles.ItemText, marginTop : 20, textAlign : "center", alignSelf :"center"}}>Comentarios</Text>

            <Text style={{color : "black", 
                            width : "90%",
                            alignSelf : "center",
                            paddingHorizontal : 20,
                            textAlign : "center",
                            fontSize : 17,
                            borderWidth : 2,
                            borderColor : "#063046",
                            borderRadius : 17,
                            paddingVertical : 5, 
                            marginTop : 9
                        }}>
                            {DataService.comments}
            </Text>


            
            


            <Image style={styles.ImageService} source={{ uri: `${file_server}/img/request_services/${DataService.photo}`}}
                        />



            <View style={{justifyContent : "center", marginTop : 20}}>
                <View style={{
                    width: 210,
                    backgroundColor:"#063046",
                    borderRadius : 100,
                    alignItems:"center",
                    justifyContent:"center",
                    padding : 8,
                    alignSelf : "center",
                    zIndex : 999
                }}>
                    <Text style={{color : "white", fontSize : 18}}>Propuestas:</Text>
                </View>

                <View style={{
                    width : "90%",
                    height : 1,
                    backgroundColor : "#ED6306",
                    position : "absolute",
                    zIndex : 10,
                    alignSelf : "center"
                }}></View>
            </View>

            <View style ={{alignItems : "center", marginTop : 10}}>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Precio" 
                        placeholderTextColor="#777"
                        editable={editable}
                        value={formInfo.price}
                        onChangeText={text => onChangeText(text, 'price')}/>
                </View>

                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Tiempo" 
                        placeholderTextColor="#777"
                        editable={editable}
                        value={formInfo.time}
                        onChangeText={text => onChangeText(text, 'time')}/>
                </View>


                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Notas" 
                        placeholderTextColor="#777"
                        editable={editable}
                        value={formInfo.comments}
                        onChangeText={text => onChangeText(text, 'comments')}/>
                </View>

                {props.route.params.detail_service.lock != true && 
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
                }
                

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

  map : {
    width : "100%", 
    height : 500,
    borderRadius : 40,
    position : "relative",
    zIndex : -100,
  },

  Item : {
      flexDirection : "row",
      width : "100%",
      alignSelf : "center",
      justifyContent : "space-between",
      padding : 6,
  },
  ItemText : {
      fontSize : 20,
      color : "#063046",
      width : "50%",
      textAlign : "center"
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
    color:"white",
    textAlign : "center",
    fontSize : 10
  },


  ImageService:{
    width: 200, height: 200, 
    alignSelf : "center",
    justifyContent : "center",
    marginTop : 20
  
 },

 modalView: {
  padding: 0,
  alignItems: "center",
  backgroundColor : 'white',
  height: "100%",
  shadowOffset: {
  width: 0,
  height: 0
  },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0
},

btn_back: {
  width: 35,
  height: 35,
  resizeMode: "contain",
}





});