import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet,  View, TextInput, TouchableOpacity, StatusBar, Image, SafeAreaView, ActivityIndicator} from 'react-native';
 
import axios from 'axios'

import { Icon } from 'react-native-eva-icons';
import UserContext from '../contexts/UserContext'
import HeadNavigate from '../components/HeadNavigate'

import ScrollChat from '../components/ScrollChat/Index'
import {server, base_url} from '../Env' 
import messaging from '@react-native-firebase/messaging';
function Index(props) {  


  const { navigation } = props
  
  function goToScreen(screen)
  {   

  }
    const userDetails                                = useContext(UserContext)
    const { UserDetails, setUserDetails }            = useContext(UserContext)
    const [ message , setMessage ]                   = useState('')
    const [conversation, setConversation]            = useState([])
    const [Load, setLoad]                            = useState(false)



    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }

    useEffect(()=>{

      console.log(props.route.params)
      GetChats(true)
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        GetChats(false)
      });

    },[randomCode])


    const GetChats = (init)=>{

      if(init){
        setLoad(true)
      }
      axios.get( base_url(server,`chat/souport/by/client/${props.route.params.id_service}`)).then(function (response) {
        console.log(response.data, "CHATS")
        setConversation(response.data)
        setLoad(false)
      })
      .catch(function (error) {
          console.log(error)
          console.log('Error al enviar formularioss')
          setLoad(false)
      })
      .then(function (response) { });
    }

    function sendMessage(){
      
      const newMessage = {
        "sender" : userDetails.id,
        "message" :message.text
      }
      setConversation([...conversation, newMessage])

      const data = {
        "sender"     : userDetails.id,
        "receiver"   : props.route.params.receiver,
        "id_service" : props.route.params.id_service,
        "message"    : message.text
      }
      setMessage('')
      console.log(base_url(server,`chat/souport`))
      axios.post( base_url(server,`chat/souport`), data).then(function (response) {})
      .catch(function (error) {
          console.log(error)
          console.log('Error al enviar formularioss')
      })
      .then(function (response) { });



  }




  return (
    <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <View style={{
            //  flexDirection  : "row",
           }}>

              <Image
                      style={{resizeMode: "contain",width: 95, height: 95, position: "absolute", marginLeft: "25%", top: 20, left: -150}}
                  source={require('../src/images/round_blue.png')}
              />
              
              <Image
                      style={{width: 110, height: 110, position: "absolute", right: -50, top: -20}}
                  source={require('../src/images/round_top.png')}
              />
          </View>
           
          <View style={{width : "100%",alignItems: 'center', marginTop: 10}}>
            <HeadNavigate title="Chats" props={props} />
              
        

          </View>
          
          {Load &&
            <ActivityIndicator size="large" color="#063046" />
          }
         {!Load &&
          <ScrollChat conversation={conversation} userDetails={userDetails}/>
         }
          

          <View style={{ width:'100%', paddingVertical : 10, bottom : 0, justifyContent : 'center', borderWidth : 1, borderColor : '#f1f3f2'}}>
              <View style={{ position : 'relative', width:'100%', paddingVertical : 10, bottom : 0, justifyContent : 'center', width : '75%'}}>
                  <TextInput
                      multiline={true}
                      onChangeText={(text) => setMessage({text})}
                      value={message}
                      style={{  marginLeft : 10,borderRadius : 15, backgroundColor : '#f1f0f0',paddingLeft : 10 }}
                      placeholder={'Tu mensaje aqui'} />
                  
                    <TouchableOpacity onPress={()=>sendMessage()} style={styles.buttonTab}>
                      <Icon name={'navigation-2-outline'} width={25} height={25} fill='white'/>
                    </TouchableOpacity>
                  </View>
              </View>



      

    </SafeAreaView>
  );

}

export default Index;

const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : "column",
    backgroundColor : 'white',
    paddingTop : 0,
},
  scroll : {
    flex : 1,
    flexDirection : 'column',
  },

  content : {
    flex: 1,
    backgroundColor : 'white',
    flexDirection: 'column',

  },
  buttonsTabsContainer : {
    position : 'absolute',
    flexDirection : 'row'
  },
  buttonTab : {
    backgroundColor : "#0B4E6B",
    height :45,
    width : 45,
    justifyContent : 'center',
    borderRadius : 50,
    justifyContent : 'center',
    alignItems : 'center',
    position : 'absolute',
    right : -65,
    
  },
  buttonText: {
    textAlign : 'center',
    color :'white'
  }

});