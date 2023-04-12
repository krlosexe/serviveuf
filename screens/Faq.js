import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ImageBackground, ActivityIndicator, ScrollView} from 'react-native';

import {file_server, server, base_url} from '../Env'   
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu'
import axios from 'axios'
import { stat } from 'react-native-fs';
import Accordian from '../components/Accordian'

function Index(props) {  

  function goToScreen(screen) {
    props.navigation.navigate(screen, { randomCode: Math.random() })
  }

    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const userDetails  = React.useContext(UserContext)


    const [TabsActive, setTabsActive]  =  useState(1)


    const [Menu , setMenu ]  = React.useState([
        { 
          title: '¿Cómo se toma un pedido?', 
          data: `Inicialmente eliges el servicio en la bandeja de servicio Diligencia el formulario con sus datos teniendo en cuenta:
          \n\nAgenda: para el mismo día con un promedio de 2 horas antes del servicio\n\n
          Foto: Suba una foto del servicio que desea realizarse\n\n si tiene algún detalle extra utiliza los
          comentarios para hacernos saber y tenerlo en cuenta al momento de hacer la cotización,
          Envía tu solicitud y espera ofertas de nuestros prestadores de servicio, elige la que mejor
          te parezca. `,
        },
        { 
          title: '¿Cómo pagar mi servicio?',
          data: 'Mediante pago en efectivo o transferencia a cuenta bancaria, se concreta con el prestador de servicio '
        },
        { 
         title: '¿Qué hago si necesito el cabello para mis trenzas?',
         data: `Diligencia el formulario y en la parte de “cabello” eliges el tipo con el que deseas hacerte las trenzas, en la parte de comentarios dejas la información de ¿Cuántos paquetes de cabello? ¿Qué color el cabello? O te comunicas con la prestadora de servicio y defines los  detalles sobre el cabello. Tenga en cuenta que las ofertas le llegaran con el precio del cabello incluido o será variable en caso que no defina todos los detalles sobre el cabello.`
        },
        { 
          title: '¿Prestador de servicios no llega?',
          data: `Antes de cancelar el servicio, comuníquese con el prestador de servicio, si este no contesta, comunicarse con el área de soporte`
        },
        { 
            title: '¿Cómo identifico un prestador de servicio?',
            data: 'El prestador de servicio debe identificarse al momento de llegada, mostrar evidencia con el servicio en proceso y utilizar las herramientas de trabajo correspondientes a su labor'
          },
          { 
            title: '¿Qué hago cuando mi servicio ha finalizado?',
            data:  `Le llegara una notificación indicándole la finalización de su servicio, le invitamos a calificar el prestador o prestadora de servicio según su satisfacción. En caso de no ser notificado, puede acceder a la pestaña “mis servicios” y realizar la calificación.`
          },
          { 
            title: '¿Cómo convertirse en prestador de servicio?',
            data: `Se requiere una experiencia mínima de 1 año verificable en las modalidades que elija, el proceso inicial es diligenciar el formulario, nos pondremos en contacto contigo para la inducción, de ser aceptado seguiría la activación en plataforma.`
          },
          { 
            title: '¿Cómo recargar mi cuenta?',
            data: `En la pestaña, “abonar a mi cuenta” eliges el método de pago que mas utilices y realizas la operación, teniendo en cuenta el abono mínimo`
          },
          { 
            title: '¿Cómo cancelar una agenda?',
            data: `Todas las agendas canceladas sin justa causa tendrán un cobro del 5% que solo se cobrara si la cita es cancelada. Invitamos a modificar la agenda, opción que solo se puede hacer una vez. `
          }

      ])

      const [Tabs, setTabs]              =  useState(Menu)



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
          <View style={{width : "100%",alignItems: 'center', marginTop: 130}}>
                <ScrollView style={styles.scrollView}>

                    <Text style={{fontSize : 20, color : "black", textAlign : "center"}}>Nuestros datos de contacto</Text>
                    <Text style={{fontSize : 15, color : "black", textAlign : "center"}}>Email: informacion@serviuf.com</Text>


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




                    <View style={{flexDirection  : "row",justifyContent : "space-evenly", backgroundColor: "white", marginTop: 10, padding: 10}}>
                        <TouchableOpacity style={ TabsActive == 1  ? styles.BtnFaqActive : styles.BtnFaq} >
                            <Text style={{fontSize : 20, color : "#0B4E6B"}}>Preguntas Frecuentes</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        Tabs.map((item, key) =>{
                            return <Accordian 
                                title = {item.title}
                                data = {item.data}
                            />
                        })
                    }
                </ScrollView>
          </View>

          {/* <Menu props={props}/> */}
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

    scrollView: {
        marginHorizontal: 20,
        marginBottom: 10,
        width: "90%",
      },

      ContentSuport : {
        width : "100%",
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center"
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
  

});