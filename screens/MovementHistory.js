import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View,  StatusBar, ToastAndroid, ActivityIndicator, ScrollView} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'
import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'

import { Icon } from 'react-native-eva-icons';


function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   
    navigation.navigate(screen, {randomCode : Math.random()})
  }

    const { UserDetails, setUserDetails } = useContext(UserContext)
    const userDetails                     = useContext(UserContext)
    const [Load, setLoad]                 = useState(false);
    const [Data, setData]                 = useState([]);
    

    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }

    useEffect(()=>{
      GetAccountStatus()
    },[randomCode])


    function GetAccountStatus(){
    
      setLoad(true)
      
      console.log('Enviando formulario')
      console.log(base_url(server,`get/account/status/client/${userDetails.id}`))

      axios.get( base_url(server,`get/account/status/client/${userDetails.id}`)).then(function (response) {
        setData(response.data)
        setLoad(false)
      })
      .catch(function (error) {
          console.log('Error al enviar formulario')
        console.log(error.response.data)
          ToastAndroid.showWithGravity(
            error.response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        setLoad(false)
      })
      .then(function () {});
    }



    const numberForMonth = (number) =>{
      let month

      if(number == "01"){
        month = "ENE"
      }

      if(number == "02"){
        month = "FEB"
      }
      if(number == "03"){
        month = "MAR"
      }
      if(number == "04"){
        month = "ABR"
      }
      if(number == "05"){
        month = "MAY"
      }
      if(number == "06"){
        month = "JUN"
      }
      if(number == "07"){
        month = "JUL"
      }
      if(number == "08"){
        month = "AGO"
      }
      if(number == "09"){
        month = "SEP"
      }
      if(number == "10"){
        month = "OCT"
      }
      if(number == "11"){
        month = "NOV"
      }
      if(number == "12"){
        month = "DIC"
      }
    


      return month
    }
    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

         <HeadNavigate title="Historial movimientos" props={props} />

         <Text style={styles.titleService}>{props.route.params.service}</Text>

         {Load &&
          <ActivityIndicator size="large" color="#063046" />
         }
        <ScrollView style={{marginBottom : 100}}>
          {Data.length > 0 && !Load &&
              Data.map((item, key)=>{
                  return <View style={styles.Card}>
                            <View style={styles.TextDate}>
                                  <Text style={styles.Day}>{item.created_at.split("-")[2].split(" ")[0]}</Text>
                                  <Text style={styles.Month}>{numberForMonth(item.created_at.split("-")[1])}</Text>
                            </View>
                            <View style={styles.TextConcept}>

                                {item.payment != null &&
                                  <View>
                                    <Text style={styles.TextConceptName}>Abono</Text>
                                    <Text style={{fontSize : 12}}>a la cuenta</Text>
                                  </View>
                                }


                                {item.discharge != null &&
                                  <View>
                                    <Text style={{...styles.TextConceptName, color : "red"}}>Descuento</Text>
                                    <Text style={{fontSize : 12}}>por comision</Text>
                                  </View>
                                }


                                
                            </View>
                            <View style={styles.TextCardPrice}>
                                

                                {item.payment != null &&
                                  <Text style={styles.Price}>{currencyFormat(item.payment)}</Text>
                                }


                                {item.discharge != null &&
                                  <Text style={styles.Price}>{currencyFormat(item.discharge)}</Text>
                                }


                            </View>
{/*               
                            <View style={styles.View}>
                                <Icon style={{alignSelf : "center"}} name='eye' width={20} height={20} fill='#063046' /> 
                                <Text style={styles.ViewText}>Ver más</Text>
                            </View> */}
              
                        </View>
              })
            }
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
  
  Card : {
      width : "85%",
      alignSelf : "center",
      flexDirection : "row",
      justifyContent : "space-around",
      paddingHorizontal: 5,
      paddingVertical: 20,
      borderColor : "#063046",
      borderWidth : 2,
      margin : 10,
      borderRadius : 14
  },

  TextDate : {
      alignItems : "center",
      borderRightColor : "#808080",
      borderRightWidth: 1,
      paddingHorizontal : 5,
      paddingRight : 10
  },

  Day : {
      fontSize : 29,
      color : "#FF9700",
      
  },
  Month : {
      fontSize : 12,
      color : "#063046"
  },

  TextConcept : {
      justifyContent : "center",
      paddingRight : 20,
      borderRightColor : "#808080",
      borderRightWidth: 1,
  },
  TextConceptName : {
      color : "black",
      fontSize : 15
  },

  TextCardPrice : {
    justifyContent : "center", 
    borderRightColor : "#808080",
    borderRightWidth: 1,
    paddingRight : 20,
  },

  View : {
      textAlign : "center",
      alignContent : "center",
      justifyContent : "center"
  },
  ViewText : {
      fontSize : 12,
      color : "#063046"
  }


});