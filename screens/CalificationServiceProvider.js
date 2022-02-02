import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ImageBackground, Image, ToastAndroid, ActivityIndicator, ScrollView} from 'react-native';

import {file_server, server, base_url} from '../Env'   
import axios from 'axios'

import HeadNavigate from '../components/HeadNavigate'
import Menu from '../components/Menu'

import StarRating from 'react-native-star-rating';
function Index(props) {  


  const { navigation } = props

  function goToScreen(screen)
  {   
    navigation.navigate(screen, {randomCode : Math.random()})
  }

 
    const [PhotoProfile, setPhotoProfile] = useState(false)
    const [Load, setLoad] = useState(false);
    const [Raiting, setRaiting] = useState(0);

    const [formInfo , setFormInfo]       = React.useState({
        comments            : '',
    })


    let randomCode 
    if(props.route.params){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = 1
    }
    
    useEffect(()=>{
      if(props.route.params.detail_offert.photo_profile == null){
        setPhotoProfile('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
      }else{

        console.log(`${file_server}/img/usuarios/profile/${props.route.params.detail_offert.photo_profile}`)
        setPhotoProfile(`${file_server}/img/usuarios/profile/${props.route.params.detail_offert.photo_profile}`)
      }
      props.route.params.detail_offert.status
    },[randomCode])



    const sendForm = ()=>{

        const data = { ...formInfo, rating : Raiting, id_service : props.route.params.detail_offert.id }
        console.log('Enviando formulario')
        console.log(base_url(server,`calification/service/provider`))
        console.log(data, "DATA")
      
        setLoad(true)
        axios.post( base_url(server,`calification/service/provider`), data).then(function (response) {
          goToScreen("MyRequestServices", false)
          setLoad(false)

            ToastAndroid.showWithGravity(
                "Tu calificacion se envio con exito",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );


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
  
    }

    function onChangeText(text, key){
        setFormInfo({
            ...formInfo,
            [key] : text
        })
      }
  

  return (
    <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <HeadNavigate title="Calificación" props={props} />
        

        <ScrollView style={{marginBottom : 90}}>
            <View style={styles.Banner}>
                <View>
                    <ImageBackground  resizeMode="contain" source={require('../src/images/back_profile2.png')}
                            style={styles.HeadProfileImageBackgroud}>
                        <Image style={styles.HeadProfileImage} source={{ uri: PhotoProfile}} />
                    </ImageBackground>
                    
                </View>

                <View style={{alignItems : "center", marginTop : -20}}>

                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={Raiting}

                      fullStarColor={'#FF9700'}
                      animation = "zoomInUp"
                      selectedStar={setRaiting}
                    />

                    
                </View>
            </View>


            <Text style={{textAlign : "center", color :"#063046", fontSize : 25, marginTop : -10}}>Comentarios</Text>

            <View style={styles.Comments}>
                <View style={styles.inputView} >
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Comentarios" 
                    placeholderTextColor="#777"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => onChangeText(text, 'comments')}/>
                </View>
            </View>



            <TouchableOpacity style={{
                  width:"70%",
                    backgroundColor:"#0B4E6B",
                    borderRadius : 40,
                    height:60,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:5,
                    marginBottom:20,
                    alignSelf : "center",
                    marginTop : 20
                }} onPress={()=>sendForm() }>
                  <Text style={styles.register}>
                    
                        {Load &&
                            <ActivityIndicator size="large" color="#fff" />
                        }
                        {!Load &&
                            <Text style={{color : "white"}}>Calificar</Text>
                        }
                      </Text>
                </TouchableOpacity>
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
  
  Banner : {
      width : "100%",
      alignSelf : "center",
      justifyContent : "space-around",
      padding : 20,
      paddingBottom : 40
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius : 400
  },

  
  Name : {
      color : "white",
      fontSize : 19,
      textAlign : "center"
  },

  Starts : {
    flexDirection : "row",
    justifyContent : "space-between",
    width : "50%",
    marginTop: 4,
    marginBottom: 8
  },
  Price : {
      color : "#fff",
      marginBottom: 5
  },
 

  HeadProfileImage:{
    width: 150, height: 150, 
    alignSelf : "center",
    borderRadius : 500,
    marginLeft : "4.5%"
    
 },
    HeadProfileImageBackgroud : {
        width : 330,
        height : 330,
        justifyContent : "center",
        alignSelf : "center",
    },

    Comments : {
        textAlign : "center",
        width : "80%",
        alignItems : "center",
        alignSelf : "center",
        marginTop : 20
    },

    CommentsText : {
        fontSize : 17,
        textAlign : "center",
        color : "#063046",
        lineHeight : 26
    },
    MethodPays : {
        backgroundColor : "#E6E6E6",
        width : "88%",
        alignSelf : "center",
        borderRadius : 20,
        padding : 5,
        paddingHorizontal : 20,
        marginTop: 20,
        flexDirection : "row",
        justifyContent : "space-between"
    },

    MethodPaysItems : {
        flexDirection : "row",
        alignItems : "center"
    },

    IconCard : {
        width : 30,
        height : 30,
        resizeMode : "contain"
    },
    inputView:{
        width:"100%",
        justifyContent:"center",
        padding:20,
        textAlign: "center",
        borderRadius: 30,
        borderColor : "#063046",
        borderWidth : 1,
      },
      inputText:{
        
        color:"#777",
      },

});