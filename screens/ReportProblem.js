import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import HeadNavigate from '../components/HeadNavigate'
function Index(props) {  


  const { navigation } = props

  function goToScreen(screen, amount)
  {   
    navigation.navigate(screen, {randomCode : Math.random(), amount})     
  }


    
    const [notificationToken , setNotificationToken] = useState('')
    const userDetails             = useContext(UserContext)
    const [editable, setEditable] = useState(false)
    const [isSelected, setSelection] = useState(false);
    const [Load, setLoad] = useState(false);

    
    useEffect(()=>{
      setTimeout(() => {
        setEditable(true)
      }, 100)
    },[])


    const [formInfo, setFormInfo] = useState({
      comments : ''
    })


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
      data.id_client  = userDetails.id
      data.id_service = props.route.params.detail_offert.id_service
      console.log(data)
      if(data.comments === ''){
        ToastAndroid.showWithGravity(
            "Debes escribir algo",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoad(false)
        return false;
      }

      setLoad(true)
      console.log(base_url(server,`report/services`))
      axios.post( base_url(server,`report/services`), data).then(function (response) {
        setLoad(false)
      
        ToastAndroid.showWithGravity(
          "Tu reporte fue enviado",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );

        goToScreen("MyOffertsServices", false)

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




      //goToScreen("MethodPay", data.comments)
    }


  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          

          <View style={{width : "100%",alignItems: 'center', marginTop: 10}}>
            <HeadNavigate title="Reportar un Problema" props={props}/>


            <View style={{width : "100%", alignItems : "center", marginTop : 50}}>

                <Text style={{fontSize : 18, marginBottom : 50, color : "#0B4E6B"}}>Cuentanos cual fue tu inconveniente</Text>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Escriba..." 
                        placeholderTextColor="#999"
                        editable={editable}
                        textAlign={'center'}     
                        multiline={true}
                        autoFocus={true}
                        onChangeText={text => onChangeText(text, 'comments')}/>

                </View>

            
                <TouchableOpacity style={{
                width:"60%",
                    backgroundColor:"#0B4E6B",
                    borderRadius : 40,
                    height:60,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:5,
                    marginBottom:20
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
          </View>


          <View style={{backgroundColor : "red",  position: "absolute", bottom : 0, width : "100%"}}>
              <Image style={{width: 110, height: 110, position: "absolute", left: -50, bottom: -20}}
                  source={require('../src/images/round_top.png')}/>

              <Image style={{resizeMode: "contain",width: 150, height: 150, position: "absolute", marginLeft: "25%", bottom: -40, transform: [{ rotate: '180deg' }]}}
                  source={require('../src/images/triple_round.png')}/>

               <Image style={{resizeMode: "contain",width: 95, height: 95, position: "absolute", marginLeft: "25%",  bottom: -10, right: -60}}
                  source={require('../src/images/round_blue.png')}/>
          </View>



      

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
    marginBottom:20,
    justifyContent:"center",
    borderRadius: 40,
    borderColor : "#063046",
    alignItems : "center",
    borderWidth : 1,
    height : 100
  },
  inputText:{
    color:"#999",
    fontSize : 20,
    borderRadius: 40
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
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color : "#000",
    lineHeight : 20,
    textAlign : "justify"
  }

});