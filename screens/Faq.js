import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ImageBackground, ActivityIndicator, ScrollView} from 'react-native';

import {file_server, server, base_url} from '../Env'   
import AsyncStorage from '@react-native-community/async-storage'
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
          title: '¿CUÁL ES LA EXPERIENCIA DE USTEDES EN ESTE TIPO DE SERVICIOS?', 
          data: 'Cirucredito es producto de la reunión de médicos cirujanos a nivel nacional que determinaron la posibilidad de brindar a toda la población colombiana, la posibilidad de realizar sus sueños quirúrgicos sin la necesidad de acudir a una entidad crediticia, así directamente, se ha financiado a más de 6.000 pacientes en todo el territorio nacional. Hoy en día cuentan con un amplio portafolio de servicios financieros para procedimientos médicos y quirúrgicos.',
        },
        { 
          title: '¿CÓMO INICIO EL  PROCESO DE FINANCIACIÓN?',
          data: 'Lo primero que debes hacer es pedir el preaprobado de tu procedimiento, así veremos si tu crédito es viable. Diligencia tu formulario'
        },
        { 
         title: '¿CÓMO PUEDO PAGAR LOS SERVICIOS QUE OFRECEN?         ',
         data: 'Hemos estructurado unos métodos de pago que permiten acceder con facilidad a todos nuestros servicios, en nuestra página web puedes consultarlo o en nuestra línea amiga; manejamos varias líneas de financiación y métodos de programación de pagos.'
        },
        { 
          title: '¿SI DEVENGO DE UN SALARIO MÍNIMO PUEDO ACCEDER A UN CRÉDITO?',
          data: 'Si, nuestras estructuras financieras son directamente sin banco o cooperativa, financiamos fácilmente y con la posibilidad de tener hasta sesenta meses de crédito.'
        },
        { 
            title: '¿NECESITO DE UN BANCO PARA FINANCIAR?',
            data: 'La gran mayoría de financiaciones que otorgamos se hacen directamente sin la necesidad de un intermediario, como un banco o cooperativa; todo depende del porcentaje a financiar y de su capacidad de endeudamiento.'
          },
          { 
            title: '¿SI SOY UNA PERSONA DEPENDIENTE QUE DOCUMENTACIÓN NECESITO PARA FINANCIAR?',
            data: 'Hemos estructurado financiaciones sin la necesidad de un fiador, por lo cual es importante para la cita que nuestra asesora financiera determine si usted sola como paciente o un tomador puedan ejecutar el crédito sin la necesidad de un segundo o fiador.'
          },
          { 
            title: '¿SI SOY UNA PERSONA INDEPENDIENTE QUE DOCUMENTACIÓN NECESITO PARA FINANCIAR?',
            data: 'Para los pacientes que son independientes, deben demostrar sus ingresos por medio de: Rut o Cámara de comercio, Certificado de ingresos y retenciones (dado por contador) / Extractos Bancarios, Copia de la cédula, Formularios diligenciados, Comprobante pago estudio de crédito'
          },
          { 
            title: '¿NECESITO UN FIADOR?',
            data: 'Hemos estructurado financiaciones sin la necesidad de un fiador, por lo cual es importante para la cita que nuestra asesora financiera determine si usted sola como paciente o un tomador puedan ejecutar el crédito sin la necesidad de un segundo o fiador.'
          },
          { 
            title: '¿FINANCIAN PROCEDIMIENTOS EN TODAS LAS CIUDADES DEL PAÍS?',
            data: 'Financiamos tus sueños en más de 20 clínicas a nivel nacional, por lo cual debes preguntarle a tu asesora, qué clínica y qué cirujano es el más adecuado para ti.'
          },

          { 
            title: '¿CUAL ES EL INTERÉS QUE MANEJAN?',
            data: 'El interés depende de la línea de crédito por donde se tramite la documentación de cada paciente, va del 1% al 3%, una vez en consulta, el paciente podrá hacer una simulación de crédito con su asesora y conocer esta información según su caso.'
          },

          { 
            title: '¿DE CUÁNTO ES LA CUOTA MENSUAL A PAGAR?',
            data: 'El máximo plan de pagos que se puede tramitar es a 48 meses, es decir 4 años. El paciente es libre de definir la cuota a manejar con el fin de no atrasarse en el tema de los pagos, siempre y cuando no supere los 48 meses.'
          },

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

                    <View style={{flexDirection  : "row",justifyContent : "space-evenly", backgroundColor: "white", marginTop: 10, padding: 10}}>
                        <TouchableOpacity style={ TabsActive == 1  ? styles.BtnFaqActive : styles.BtnFaq} onPress={()=>SetTab(1)} >
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
      }
  

});