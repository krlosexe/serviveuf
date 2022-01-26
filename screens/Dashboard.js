import React, {useEffect} from 'react';
import { Platform, PermissionsAndroid, StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Image, ActivityIndicator, Alert} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'

import UserContext from '../contexts/UserContext'

import Head from '../components/Head'
import Menu from '../components/Menu'
import Dashboard from '../components/Dashboard'
import DashboardServiceProvider from '../components/DashboardServiceProvider'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import MapView,  { PROVIDER_GOOGLE } from 'react-native-maps'; 
import { Marker } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 6.203163470125818, longitude: -75.56753838434815};
const destination = {latitude: 6.2071452, longitude: -75.5721136,};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBm_gLphZClLWDkUHnD0PrxCx1H0GCoXeM';


// navigator.geolocation = require('@react-native-community/geolocation');
// navigator.geolocation = require('react-native-geolocation-service');

function Index(props) {  

  const { navigation } = props

  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const [Load, setLoad] = React.useState(false);
  const [Request, setRequest] = React.useState(false);
  const [RequestStatus, setRequestStatus] = React.useState(false);
  const [RequestCategory, setRequestCategory] = React.useState(false);
  const [RequestDate, setRequestDate] = React.useState(false);
  const [RequestId, setRequestId] = React.useState(false);

  const userDetails  = React.useContext(UserContext)

  function goToScreen(screen, service, id_service)
  {   
    navigation.navigate(screen, {randomCode : Math.random(), service, id_service})
  }
    
  let randomCode 
  if(props.route.params){
      randomCode = props.route.params.randomCode
  }else{
      randomCode = 1
  }


  async function requestPermissions() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

     
      if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      }
    }
  }




  useEffect(()=>{
    // console.log(userDetails.mode_service_provider, "mode_service_provider")
    // getRequestServices()
    //   requestPermissions()

  },[randomCode])

  const getRequestServices = () =>{
    setLoad(true)
    console.log(base_url(server,`request/service/by/client/${userDetails.id}`))
    axios.get( base_url(server,`request/service/by/client/${userDetails.id}`)).then(function (response) {
      if(response.data.id){

        setRequest(true)

        setRequestStatus(response.data.status)
        setRequestCategory(response.data.name_category)
        setRequestDate(response.data.date)
        setRequestId(response.data.id)
        console.log(response.data.id)
      }
    })
    .catch(function (error) {

        console.log(error.response.data.message)
        console.log('Error al enviar formularioss')
        setLoad(false)
    })
    .then(function (response) {
        setLoad(false)
    });
  }

  useEffect(()=>{
    if(userDetails.register){
      goToScreen("StepOne", false)
    }
  },[])


const [Region, setRegion] = React.useState({
  latitude: 6.2071452,
  longitude: -75.5721136,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
});


// const onRegionChange = (region) => {
//   this.setState({ region });
// }


  return (


  //   <View style={styles.container}>


  //   <MapView
  //     style={styles.map} 
  //     initialRegion={Region}
  //     onPress={(data)=>console.log(data)}
    
  //   >
  //     <MapViewDirections
  //       origin={origin}
  //       destination={destination}
  //       apikey={GOOGLE_MAPS_APIKEY}
  //       strokeWidth = { 7 } 
  //       strokeColor = "#1a73e7" 
  //     />


  //     <Marker
  //         coordinate={{ latitude : Region.latitude , longitude : Region.longitude }}
         
  //       />


  //       <Marker
  //         coordinate={origin}
  //         onDragEnd={(e) => console.log(e, "EEEEE")}
  //       />


  //   </MapView>

  //  </View>
   
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <Head/>
        
         {userDetails.mode_service_provider == true &&
          <DashboardServiceProvider {...props} />
        }

        {(userDetails.mode_service_provider == false || userDetails.mode_service_provider == undefined) &&
          <Dashboard {...props} />
        } 

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


  // container: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // map: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },



  content_services : {
    padding: 20
  },
  services_item : {
    flexDirection : "row",
    alignContent : 'space-around'
  },
  services_left : {
    width: "100%",
    height: 100,
    borderTopLeftRadius : 14,
    borderBottomLeftRadius : 14
  },


  services_right : {
    width: "100%",
    height: 100,
    borderTopRightRadius : 14,
    borderBottomRightRadius : 14
  },


  services_image_left:{
    width : "40%"
  },


  services_image_right:{
    width : "40%"
  },


  services_text_left : {
    textAlign : "center",
    alignItems : "center",
    backgroundColor : "#FF9700",
    color : "white",
    width : "60%",
    paddingTop : "10%",
    borderTopEndRadius : 14,
    borderBottomEndRadius : 14
  },


  services_text_right : {
    textAlign : "center",
    alignItems : "center",
    backgroundColor : "#0B4E6B",
    color : "white",
    width : "60%",
    paddingTop : "10%",
    borderTopStartRadius : 14,
    borderBottomStartRadius : 14
  },


  services_item_text_small : {
    color : "white",
    fontSize : 10
  },
  services_item_text_long : {
    color : "white",
    fontSize : 18
  },


  linearGradient: {
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

  request : {
    width : "80%",
    alignContent : "center",
    alignSelf : "center",
    padding : 14,
    borderRadius : 4,
    backgroundColor : "#fff",
    borderLeftColor : "#00d763",
    borderLeftWidth : 3,
    marginBottom : 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }

});