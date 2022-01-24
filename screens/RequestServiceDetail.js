import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, StatusBar, Image, TextInput, ScrollView} from 'react-native';

import {file_server, base_url} from '../Env'    

import UserContext from '../contexts/UserContext'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'


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

    const [formInfo , setFormInfo]       = useState({
        price            : "",
        time             : "",
        comments         : ""
      })



      useEffect(()=>{
        setDataService(props.route.params.detail_service)
    },[props.route.params.detail_service])   


    useEffect(()=>{
        setTimeout(() => {
        setEditable(true)
        }, 100)
    },[])   


    
  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

         <HeadNavigate title="Servicios" props={props} />


         <ScrollView style={{marginBottom : 110}}>
            <View style={styles.Item}>
                <Text style={styles.ItemText}>Fecha:</Text>
                <Text style={styles.ItemText}>{DataService.date.split(" ")[0]}</Text>
            </View>

            <View style={styles.Item}>
                <Text style={styles.ItemText}>Hora:</Text>
                <Text style={styles.ItemText}>{DataService.date.split(" ")[1]}</Text>
            </View>

            <View style={styles.Item}>
                <Text style={styles.ItemText}>Direccion:</Text>
                <Text style={styles.ItemText}>{DataService.address}</Text>
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





});