import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image, ToastAndroid, ActivityIndicator, ScrollView} from 'react-native';

import {server, base_url} from '../Env'    
import axios from 'axios'


import UserContext from '../contexts/UserContext'
import CheckBox from '@react-native-community/checkbox';
import { ActionSheet } from 'react-native-cross-actionsheet'


function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   

    navigation.navigate(screen, {randomCode : Math.random()})
  }
    
    const userDetails                         = useContext(UserContext)
    const [Load, setLoad]                     = useState(false)
    const [CheckBarber, setCheckBarber]       = useState(false)
    const [CheckTrenzas, setCheckTrenzas]   = useState(false)
    const [CheckPedicure, setCheckPedicure]   = useState(false)
    const [editable, setEditable]             = useState(false)
    const [TypeDocument, setTypeDocument]     = useState("Tipo de documento")
    const [Municipality, setMunicipality]     = useState("Municipio")


    const [formInfo , setFormInfo]       = React.useState({
        names                : userDetails.names,
        last_names           : userDetails.last_names,
        email                : userDetails.email,
        identification       : userDetails.identification,
        type_identification  : userDetails.type_identification,
        phone                : userDetails.phone,
        municipality         : userDetails.municipality,
    })



    useEffect(()=>{
        setFormInfo(userDetails)
        setTimeout(() => {
            setEditable(true)
        }, 100)
    },[])


    const typeDocument = ()=>{
        ActionSheet.options({
            options: [
              { text: 'Cedula de Ciudadania',  onPress:() => setTypeDocument('Cedula de Ciudadania') },
              { text: 'Cedula de Extrangeria', onPress:() => setTypeDocument('Cedula de Extrangeria') },
              { text: 'Pasaporte',             onPress:() => setTypeDocument('Pasaporte') }
            ],
            cancel: { onPress: () => console.log('cancel') }
        })
    }


    const selectMunicipality = ()=>{
        ActionSheet.options({
            options: [
              { text: 'Medellin', onPress:()  => setMunicipality('Medellin') },
              { text: 'Itagui',   onPress:()  => setMunicipality('Itagui') },
              { text: 'Envigado', onPress:()  => setMunicipality('Envigado') },
              { text: 'Bello',    onPress:()  => setMunicipality('Bello') }
            ],
            cancel: { onPress: () => console.log('cancel') }
        })
    }


  
    function sendForm(){
     
      setLoad(true)

      const data = {
        "names"               : formInfo.names,        
        "last_names"          : formInfo.last_names,
        "email"               : formInfo.email,
        "identification"      : formInfo.identification,
        "type_identification" : formInfo.type_identification,
        "phone"               : formInfo.phone,
        "municipality"        : formInfo.municipality,
        "barber"              : CheckBarber,
        "trenzado"            : CheckTrenzas,
        "pedicure"            : CheckPedicure,
        "id_client"           : userDetails.id
      }
      

      data.type_identification = TypeDocument
      data.municipality        = Municipality

      console.log('Enviando formulario')
      console.log(base_url(server,`postulated/service/provicer`))
      console.log(data)

      axios.post( base_url(server,`postulated/service/provicer`), data ).then(function (res) {
        setLoad(false)
        goToScreen("Profile")
      })
      .catch(function (error) {
          console.log('Error al enviar formulario')
        console.log(error)
          ToastAndroid.showWithGravity(
            "ha ocurrido un error",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

        setLoad(false)

      })
      .then(function () { setLoad(false)});
     
    }


  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
          <View style={{
            //  flexDirection  : "row",
           }}>
              <Image
                      style={{resizeMode: "contain",width: 95, height: 95, position: "absolute", marginLeft: "25%", top:30, left: -100}}
                  source={require('../src/images/doble_roun.png')}
              />
              <Image
                      style={{resizeMode: "contain",width: 150, height: 150, position: "absolute", marginLeft: "25%", top: -70}}
                  source={require('../src/images/round_top_center.png')}
              />
              <Image
                      style={{width: 140, height: 140, position: "absolute", right: -60, top: -20}}
                  source={require('../src/images/round_top.png')}
              />

          </View>


          <ScrollView>
            <View style={{width : "100%",alignItems: 'center', marginTop: 130}}>

                <Text style={{marginBottom : 20}}>Es necesario llenar la siguiente información</Text>


                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Nombres" 
                            placeholderTextColor="#777"
                            editable={editable}
                            value={formInfo.names}
                            onChangeText={text => onChangeText(text, 'names')}/>
                    </View>


                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Apellidos" 
                            placeholderTextColor="#777"
                            editable={editable}
                            value={formInfo.last_names}
                            onChangeText={text => onChangeText(text, 'last_names')}/>
                    </View>


                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Email" 
                            placeholderTextColor="#777"
                            editable={editable}
                            value={formInfo.email}
                            onChangeText={text => onChangeText(text, 'email')}/>
                    </View>


                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Telefono" 
                            placeholderTextColor="#777"
                            editable={editable}
                            value={formInfo.phone}
                            onChangeText={text => onChangeText(text, 'phone')}/>
                    </View>

                    <TouchableOpacity style={styles.inputView} onPress={()=>typeDocument()}>
                        <View style={styles.inputText}>
                            <Text style={{marginTop : 14}}>{TypeDocument}</Text>
                        </View>
                    </TouchableOpacity>



                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Número de Documento" 
                            placeholderTextColor="#777"
                            editable={editable}
                            value={formInfo.identification}
                            onChangeText={text => onChangeText(text, 'identification')}/>
                    </View>


                    <TouchableOpacity style={styles.inputView} onPress={()=>selectMunicipality()}>
                        <View style={styles.inputText}>
                            <Text style={{marginTop : 14}}>{Municipality}</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={styles.ContentCheck}>
                        <View style={styles.itemCheck}>
                            <Text>Barberia</Text>
                            <CheckBox
                                value={CheckBarber}
                                onValueChange={(newValue) => setCheckBarber(newValue)}
                            />
                        </View>

                        <View style={styles.itemCheck}>
                            <Text>Trenzados</Text>
                            <CheckBox
                                value={CheckTrenzas}
                                onValueChange={(newValue) => setCheckTrenzas(newValue)}
                            />
                        </View>

                        <View style={styles.itemCheck}>
                            <Text>Pedicure</Text>
                            <CheckBox
                                value={CheckPedicure}
                                onValueChange={(newValue) => setCheckPedicure(newValue)}
                            />
                        </View>
                    </View>

                

                <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}>
                <Text style={styles.loginText}>
                        {Load &&
                            <ActivityIndicator size="large" color="#fff" />
                        }
                        {!Load &&
                            <Text>Enviar</Text>
                        }
                </Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
          


      

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
    backgroundColor:"#E6E6E6",
    
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    textAlign: "center",
    borderRadius: 100
  },
  inputText:{
    height:50,
    color:"#777"
  },
  forgot:{
    color:"#000000",
    fontSize:12
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
    color:"#fff"
  },

  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  ContentCheck : {
    flexDirection : "row", 
    width : "80%",
    alignSelf : "center",
    justifyContent : "space-between"
  },
  itemCheck : {alignItems : "center"}


});