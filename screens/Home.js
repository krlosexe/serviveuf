import React, {useState, useEffect, useContext}  from 'react';
import { StyleSheet} from 'react-native';

import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'

import {serverQa, base_url} from '../Env' 
import axios from 'axios'

import RequestPermission from '../permission';
import Splash from './Splash'
import Login from './Login'
import Dashboard from './Dashboard'

import messaging from '@react-native-firebase/messaging';

function Index(props){


    const { setUserDetails } = useContext(UserContext)
    const userDetails  = React.useContext(UserContext)

    const [ isSplashing , setIsSplashing  ] = useState(true)



    const _retrieveData = async () => {

       
        try {
            const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
                
            if (value && value.email !== undefined) {
                
                setUserDetails(value)

                console.log(value.email, "value.email")
                setTimeout(()=>{

                    setIsSplashing(false)

            },1000)
                return value
          }else{
              setTimeout(()=>{
                setIsSplashing(false)
                },3000)
            
          }
        } catch (error) {
          // Error retrieving data
        }
      };




      useEffect(()=>{

        console.log(userDetails, "userDetail123")
        if (Platform.OS === 'android') {
            RequestPermission().then(_ => {
              console.log('requested!');
            });
            
        }
        _retrieveData()
    },[])






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





    function setDone(){
        setIsIntro(false)
    }
    
    function onAuthSuccess(){
        _retrieveData()
    }




    if(isSplashing){
        setTimeout(() => {
            setIsSplashing(false)
        }, 3000)
        return <Splash />
    }



    if( !userDetails.email && !isSplashing)
        return <Login {...props}/>


    // if(userDetails.email && !isSplashing)
    //     return <Dashboard {...props}/>
     if(userDetails.email && !isSplashing)
         return <Dashboard {...props}/>



    return <></>
}



export default Index;


const styles = StyleSheet.create({

    header: {
        padding        : 30,
        backgroundColor: 'white',
        paddingBottom: 50,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        position: "absolute",
        top: 0
    },

    menu: {
        padding        : 10,
        width: "100%",
        backgroundColor: 'white',
        flexDirection  : "row",
        justifyContent : "space-evenly",
        position: "absolute",
        bottom: 0,
        borderTopColor: "#ddd",
        borderTopWidth: 1
    },

    itemMenu : {
        alignItems: "center"
    },
    

    texMenu : {
        color : "#777"
    },

    texMenuActive : {
        color : "#0093d9"
    },


    ItemsHeaderFlex: {
        flexDirection  : "row",
        justifyContent : "space-between",
       
    },

    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%"
    },

    icon: {
      width: 80,
      height: 80,
      marginTop: -20
    },
    profile: {
        width: 50,
        height: 50,
        marginTop: -10
    },

    tittleHeader:{
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 30
    },

    SubtittleHeader:{
        color: '#777'
    },


    card:{
        color: '#777',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 30,
        width: "85%",
        flexDirection  : "row",

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,

        borderBottomColor: "#0093d9",
        borderBottomWidth: 5
    },

    card_image_content:{
        color: "black",
        marginRight: 10
    },

    card_title : {
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 15
    },
    card_subtitle : {
        color: "#777",
    },

    card_image : {
        width: 80,
        height: 80
    },

    cardTitleLong : {
        color: "#777",
        fontWeight: "bold",
        fontSize: 20
    },
    amountRequest: {
        color:  "#0093d9",
        fontWeight: "bold",
        fontSize: 39,
        marginTop: 10,
        marginBottom: 10
    },
    plazos: {
        fontWeight: "bold"
    },

    contentCuotasStatus : {
        flexDirection  : "row",
        justifyContent : "space-between",
        marginTop: 10
    },
    cuotas: {
        color:  "#0093d9",
        fontWeight: "bold",
    },
    statusPendiente : {
        color: "red",
        position: "relative",
        fontWeight: "bold"
    },
    statusAprovado : {
        color: "green",
        position: "relative",
        fontWeight: "bold"
    }
  
  });

