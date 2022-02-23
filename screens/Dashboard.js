import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet,  View, StatusBar} from 'react-native';



import UserContext from '../contexts/UserContext'
import axios from 'axios'
import Head from '../components/Head'
import Banner from '../components/Banner'
import Menu from '../components/Menu'
import Dashboard from '../components/Dashboard'
import DashboardServiceProvider from '../components/DashboardServiceProvider'

import MenuVertical from '../components/MenuVertical'
import {server, base_url} from '../Env'   


function Index(props) {  

  const { navigation } = props

  const [vertical , setvertical]                           = useState(false)
  const [BannerServiceProvider , setBannerServiceProvider] = useState(false)
  const userDetails  = useContext(UserContext)

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


  useEffect(()=>{

    console.log(userDetails.mode_service_provider, "userDetails")
    if(userDetails.register){
      goToScreen("StepOne", false)
    }
    GetStatusClint()
  },[randomCode])


  const GetStatusClint = () =>{
    console.log(base_url(server,`clients/${userDetails.id}`))
    axios.get( base_url(server,`clients/${userDetails.id}`)).then(function (response) {
      if(response.data.service_provider == null){
        setBannerServiceProvider(true)
      }else{
        setBannerServiceProvider(false)
      }
    })
    .catch(function (error) {
        console.log(error)
        console.log('Error al enviar formularioss')
        setLoad(false)
    })
    .then(function (response) { });
  }



  const OpenMenu = ()=>{
    setvertical(true)
  }


  return (
   
    <View style={styles.container}>
      
      <StatusBar  backgroundColor="#fff" barStyle="dark-content" />

        {vertical === true &&
              <MenuVertical
                width={280}
                show={vertical}
                action={setvertical}
                goToScreen={goToScreen}
                userDetails = {{...userDetails}}
                {...props}
              />
            }
        
        <Head OpenMenu={OpenMenu} {...props} BannerServiceProvider = {BannerServiceProvider} status = {userDetails.mode_service_provider}/>
        
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