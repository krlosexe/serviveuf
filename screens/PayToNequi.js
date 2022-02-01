import React, {useEffect, useState, useContext, useCallback}  from 'react';
import { StyleSheet, Alert,Text, Linking, Picker, View, TextInput, TouchableOpacity, StatusBar, Image, ScrollView} from 'react-native';

import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import {token_wompi, ApiWompi} from '../Env' 
import axios from 'axios'



function Index(props){

    const [requesting , setRequesting ]  = useState(false)
    const [Error , setError ]            = useState(false)

    const [NumberPhone, setNumberPhone]              = useState("")
  
    const [isSelected, setSelection] = useState(false);
    const [Terminos, setTerminos]  = useState("#")

    const [acceptance_token, setacceptance_token]  = useState(false)

    const userDetails  = useContext(UserContext)
    const { setUserDetails } = useContext(UserContext) 



    function goToScreen(screen)
    {   
        navigation.navigate(screen, {randomCode : Math.random()})
    }

    

    let randomCode 
    if(props){
        randomCode = props.route.params.randomCode
        //randomCode = Math.random()
    }else{
        randomCode = Math.random()
    }





    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const link = await Linking.canOpenURL(url);
      
          if (link) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Text style={styles.bold}  onPress={handlePress}> {children} </Text>;
      };



    const { navigation } = props
    
    function goToScreen(screen)
    {   
        navigation.navigate(screen)
    }



    useEffect(()=>{


      
        axios.get(`${ApiWompi}merchants/${token_wompi}`).then(function (response) {

            const acceptance_token_generate = response.data.data.presigned_acceptance.acceptance_token

            setacceptance_token(acceptance_token_generate)

            setTerminos(response.data.data.presigned_acceptance.permalink)
        })
          .catch(function (error) {
              console.log('Error al enviar formulario')
              console.log(error);
              console.log(error.response);
              
              
          })
          .then(function () {
    
          });

    }, [randomCode])




    function GotoPay() { 

        if(!isSelected){
            Toast.show("Debes aceptar los terminos y condiciones")
            return false;
        }

        const payment_method = {
            "type": props.route.params.payment_method.type,
            "phone_number": NumberPhone
        }

        if(NumberPhone == ""){
            Toast.show("Debes ingresar un número de teléfono")
            return false;
               
        }

        console.log(acceptance_token, "TOKEN GENERADO")
        setError(false)

        navigation.navigate("PaymentSummary", {
            randomCode : Math.random(),
            amount_in_cents  : props.route.params.amount_in_cents,
            payment_concept  : "Recarga de Saldo",
            payment_method   : payment_method,
            acceptance_token : acceptance_token,
            id_fee           : props.route.params.id_fee
        })

        goToScreen("PaymentSummary")


     }



     if(requesting){
        return(
          <View style={{
              justifyContent : 'center',
              alignItems : 'center',
              flex : 1
          }}>
              <Text style={{
  
              }}>Espere un momento por favor . . .</Text>
          </View>)
      }




     

      



    function Instructions(){
       
        if(!ShowInstructions)
            setShowInstructions(true)
        else
            setShowInstructions(false)
    }
  

    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


      return(

        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
            <View style={styles.header}>
                <View><Text style={styles.tittleHeader}>Ingresa tus datos</Text></View>
                <View><Text style={styles.SubtittleHeader}>Paga tu {"Recarga de Saldo"}.</Text></View>
                <View><Text style={styles.SubtittlePrice}>COP <Text style={styles.Price}>{currencyFormat(props.route.params.amount_in_cents)}</Text></Text></View>
            </View>
            

            <ScrollView style={styles.scrollView}>
                            
                <View>
                    
                    <View style={styles.card}>

                        {
                            Error &&
                            <Text style={styles.TextError} >Los datos ingresados son incorrectos</Text>
                        }
                       
                        <View style={styles.inputView} >
                            <Text>NÚMERO CELULAR ASOCIADO A CUENTA NEQUI</Text>
                            <TextInput  
                                style={styles.inputText}
                                placeholder="EJ: 3152908765" 
                                placeholderTextColor="#777"
                                onChangeText={text => setNumberPhone(text)}
                                keyboardType={'numeric'}
                                value={NumberPhone}
                                
                            />
                        </View>


                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Acepto haber leído los <OpenURLButton url={Terminos}>Términos y Condiciones y la Política de Privacidad</OpenURLButton> para hacer esta compra.</Text>
                        </View>

                        


                        


                    </View>


                    <TouchableOpacity style={styles.loginBtn} onPress={()=>GotoPay()}   >
                        <Text style={styles.loginText}>Pagar</Text>
                    </TouchableOpacity>


                </View>



            </ScrollView>


        </View>
    )


    
}

export default Index;



const styles = StyleSheet.create({

    header: {
        padding        : 30,
        backgroundColor: 'white',
        paddingBottom: 20,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        width: "100%"
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
        color : "#063046"
    },



    ItemsHeaderFlex: {
        flexDirection  : "row",
        justifyContent : "space-between",
       
    },

    container: {
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%",
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
        marginTop: 10
    },

    SubtittleHeader:{
        color: '#777'
    },

    SubtittlePrice : {
        color: '#063046',
        fontSize: 20,
        marginTop: 10
    },

    Price : {
        fontWeight : "bold"
    },

    scrollView: {
        marginTop : 1,
        marginHorizontal: 90,
        marginBottom: 80,
        width : "90%",
        height : "100%"
      },
      
    card:{
        color: '#777',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 30,
        width: "100%",

        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,

        borderLeftColor: "#063046",
        borderLeftWidth: 5
    },

    card_image:{
        color: "black",
        marginRight: 10
    },

    card_title : {
        fontWeight: "bold",
        marginTop: 15
    },

    card_title_center : {
        fontWeight: "bold",
        marginTop: 15,
        textAlign: "center"
    },
    card_subtitle : {
        color: "#777",
        marginLeft : 10,
        width : "60%",
    },


    card_content_title : {
        width : "80%",
        justifyContent : "space-evenly"
    },


    inputView:{
        width:"100%",
        borderBottomColor: "#063046",
        borderBottomWidth: 1,
        
      
        justifyContent:"center",

        paddingStart: 0,
        marginBottom : 20
      },
      inputText:{
        height:50,
        color:"#777",
        backgroundColor : "#eee",
        paddingLeft: 10
      },
      icon_money : {
          color : "#063046",
          fontWeight: "bold",
          fontSize: 30,
          marginTop: 20,
          marginEnd: 20
      },


      icon_calendar : {
          marginTop: 25,
          marginRight: 10
      },

      amount : {
          fontSize: 20,
          marginTop: 10,
          color : "#063046"
      },

      loginBtn:{
        width:"100%",
        backgroundColor:"#063046",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:100
      },

      btnCLose : {
        width:"100%",
        color:"#3f4a56",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
      },

      CloseText : {
        color:"#3f4a56",
        fontSize : 17
      },

      loginText:{
        color:"white"
      },


      btnQuote:{
        width:"100%",
        backgroundColor:"#063046",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:15,
      },

      form : {
          width : "100%"
      },
      card_image_content : {
        marginRight: 10,
        borderRightWidth: 1,
        borderRightColor : "#eee",
        paddingRight : 10
      },

      selects_row : {
        flexDirection  : "row",
        
      } ,


      select_month_content : {
        width : 60,
        borderBottomWidth: 1,
        borderBottomColor : "#063046",
        backgroundColor: "#eee",
        marginRight : 20
      },
      select_month: {
        height: 40,
        color: "#777",
        
      },

      

      select_year_content : {
        width : 60,
        borderBottomWidth: 1,
        borderBottomColor : "#063046",
        backgroundColor: "#eee"
      },
      select_year: {
        width : 100,
        height: 40,
        color: "#777",
      },

      Instrucciones : {
        padding: 10,
        marginTop: 15,  
        backgroundColor: "#f2f9ff",
        borderRadius: 5,
        borderColor: "#bfe1ff",
        borderWidth: 1,
          
      },
      TextInstrucciones : {
          marginBottom: 10,
          color: "#3f4a56",
          lineHeight: 18
      },
      bold : {
          fontWeight : "bold"
      },
      contentImageCard : {
          flexDirection : "row",
          justifyContent : "space-between"
      },

      ImageCard : {
        resizeMode: "contain",
        width : 120
      },



      contentAcceptCard  :{
        flexDirection : "row",
        justifyContent : "space-between",
        backgroundColor : "#f7f9fa",
        borderColor : "#dfe6ee",
        borderWidth : 1,
        borderRadius : 5,
        padding : 10,
        marginBottom : 20,
        alignItems: "center",
      },

      contentAcceptCardText : {
        color : "#777",
        fontSize : 12
      },

      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop : 20
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
        color : "#777",
        lineHeight : 20 
      },


      TextError : {
          color : "red",
          marginBottom : 10
      }



  
  });

