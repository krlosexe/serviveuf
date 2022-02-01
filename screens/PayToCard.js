import React, {useEffect, useState, useContext, useCallback}  from 'react';
import { StyleSheet, Alert,Text, Linking, View,
         TextInput, TouchableOpacity, StatusBar, Image, ScrollView, ActivityIndicator, ActionSheetIOS, Button} from 'react-native';

import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-simple-toast';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import {server, base_url, token_wompi, ApiWompi} from '../Env' 
import axios from 'axios'


function Index(props){

    const [requesting , setRequesting ]  = useState(false)
    const [Error , setError ]            = useState(false)

    const [NumberCard, setNumberCard]              = useState("4242424242424242")
    const [NameCard, setNameCard]                  = useState("Carlos Cardenas")
    const [MonthExpiredCard, setMonthExpiredCard]  = useState("")
    const [YearExpiredCard, setYearExpiredCard]    = useState("")
    const [CvcCard, setCvcCard]                    = useState("789")
    const [acceptance_token, setacceptance_token]  = useState(false)


    const [ShowInstructions, setShowInstructions]  = useState(false)
    const [isSelected, setSelection] = useState(false);
    const [Terminos, setTerminos]  = useState("#")

    const userDetails  = useContext(UserContext)
    const { setUserDetails } = useContext(UserContext) 


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



    const { navigation } = props
 




    const optionsMonth = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    const onPressCardMonth = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: optionsMonth,
      },
      buttonIndex => {
        setMonthExpiredCard(optionsMonth[buttonIndex])
      }
    );



    const optionsYear = ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
    const onPressCardYear = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: optionsYear,
      },
      buttonIndex => {
        setYearExpiredCard(optionsYear[buttonIndex])
      }
    );



    useEffect(()=>{

        axios.get(`${ApiWompi}merchants/${token_wompi}`).then(function (response) {

            const acceptance_token = response.data.data.presigned_acceptance.acceptance_token
            setacceptance_token(acceptance_token)

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

        setRequesting(true)
        let config = {
            headers: {
              "Authorization": `Bearer ${token_wompi}`,
            }
        }
          const data_card = {
            "number"      : NumberCard,
            "cvc"         : CvcCard, 
            "exp_month"   : MonthExpiredCard, 
            "exp_year"    : YearExpiredCard, 
            "card_holder" : NameCard
        }
    
           axios.post(`${ApiWompi}/tokens/cards`, data_card, config).then(function (response) {
            
    
            setRequesting(false)



            const token_card = response.data.data.id

            const payment_method = {
                "type": props.route.params.payment_method.type,
                "token": token_card,
                "installments": 1,
            }



            console.log(response.data.data.id, "Token Tarjeta")

            setError(false)

            navigation.navigate("PaymentSummary", {
                randomCode : Math.random(),
                amount_in_cents  : props.route.params.amount_in_cents,
                payment_concept  : "Recarga de Saldo",
                payment_method   : payment_method,
                data_card,
                acceptance_token : acceptance_token
            })

            /*
            setUserDetails({
                ...userDetails,
                acceptance_token
            })*/
    
    
         }).catch(function (error) {
              console.log('Error al enviar formulario')
           //   console.log(error);
              console.log(error.response, "EL ERROR");
              setRequesting(false)
              setError(true)
              
          }).then(function () {
    
        });


     }



     if(requesting){
        return(
          <View style={{
              justifyContent : 'center',
              alignItems : 'center',
              flex : 1
          }}>
              <ActivityIndicator size="large" color="#063046" />
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
                <View><Text style={styles.SubtittleHeader}>Paga tu Recarga.</Text></View>
                <View><Text style={styles.SubtittlePrice}>COP <Text style={styles.Price}>{currencyFormat(props.route.params.amount_in_cents)}</Text></Text></View>
            </View>
            

            <ScrollView style={styles.scrollView}>
                            
                <View>
                    
                    <View style={styles.card}>


                        <View style={styles.contentAcceptCard}>
                            <Text style = {styles.contentAcceptCardText} >ACEPTAMOS</Text>
                            <Image
                                style={{width: 50, height: 50, resizeMode: "contain",}}
                                source={require('../src/images/mastercard.png')}/>
                            
                            <Image
                                style={{width: 50, height: 50, resizeMode: "contain",}}
                                source={require('../src/images/visa.png')}/>

                            <Image
                                style={{width: 50, height: 50, resizeMode: "contain",}}
                                source={require('../src/images/american.png')}/>
                        </View>

                        {
                            Error &&
                            <Text style={styles.TextError} >Los datos ingresados son incorrectos</Text>
                        }
                       
                    
                        <View style={styles.inputView} >
                            <Text>NÚMERO DE LA TARJETA</Text>
                            <TextInput  
                                style={styles.inputText}
                                placeholder="EJ: 5524881234123456" 
                                placeholderTextColor="#777"
                                onChangeText={text => setNumberCard(text)}
                                keyboardType={'numeric'}
                                value={NumberCard}
                                
                            />
                        </View>


                        <View style={styles.inputView} >
                            <Text>NOMBRE DEL TARJETAHABIENTE</Text>
                            <TextInput  
                                style={styles.inputText}
                                placeholder="EJ: Carlos Cardenas" 
                                placeholderTextColor="#777"
                                onChangeText={text => setNameCard(text)}
                                value={NameCard}
                            />
                        </View>


                        <View style={styles.selects_row}>
                            
                            <View style={{ backgroundColor: "#eee", width: "24%", marginRight: 4, borderBottomWidth: 1, borderBottomColor : "#063046"}}>
                                {
                                 Platform.OS === "ios" &&
                                    <Button color="#333" onPress={onPressCardMonth} title={MonthExpiredCard}/>
                                }

                                {
                                    Platform.OS === "android" &&
                                        <Picker
                                            style={{ height: 50, width: 100}}
                                            selectedValue={MonthExpiredCard}
                                            onValueChange={(itemValue, itemIndex) => setMonthExpiredCard(itemValue)}
                                        >
                                        <Picker.Item label="Mes" value="Mes" />
                                        <Picker.Item label="01" value="01" />
                                        <Picker.Item label="02" value="02" />
                                        <Picker.Item label="03" value="03" />
                                        <Picker.Item label="04" value="04" />
                                        <Picker.Item label="05" value="05" />
                                        <Picker.Item label="06" value="06" />
                                        <Picker.Item label="07" value="70" />
                                        <Picker.Item label="08" value="08" />
                                        <Picker.Item label="09" value="09" />
                                        <Picker.Item label="10" value="10" />
                                        <Picker.Item label="11" value="11" />
                                        <Picker.Item label="12" value="12" />
                                    </Picker>
                                }

                                {
                                 Platform.OS === "ios" &&
                                    <Text style={{backgroundColor: "#063046", color: "white", textAlign : "center"}}>Mes</Text>
                                }


                            </View>

                            <View style={{ backgroundColor: "#eee", width: "24%", marginRight: 4,  borderBottomWidth: 1, borderBottomColor : "#063046"}}>

                                {
                                    Platform.OS === "ios" &&
                                        <Button color="#333" onPress={onPressCardYear} title={YearExpiredCard}/>
                                }

                                {
                                    Platform.OS === "android" &&
                                       <Picker
                                        style={{ height: 50, width: 100}}
                                        selectedValue={YearExpiredCard}
                                        onValueChange={(itemValue, itemIndex) => setYearExpiredCard(itemValue)}
                                    >
                                        <Picker.Item label="Año" value="Año" />
                                        <Picker.Item label="20" value="20" />
                                        <Picker.Item label="21" value="21" />
                                        <Picker.Item label="22" value="22" />
                                        <Picker.Item label="23" value="23" />
                                        <Picker.Item label="24" value="24" />
                                        <Picker.Item label="25" value="25" />
                                        <Picker.Item label="26" value="26" />
                                        <Picker.Item label="27" value="27" />
                                        <Picker.Item label="28" value="28" />
                                        <Picker.Item label="29" value="29" />
                                        <Picker.Item label="30" value="30" />
                                    </Picker>
                                }

                                {
                                 Platform.OS === "ios" &&
                                    <Text style={{backgroundColor: "#063046", color: "white", textAlign : "center"}}>Año</Text>
                                }



                            </View>


                            <View style={{ backgroundColor: "#eee", width: "41%", borderBottomWidth: 1, borderBottomColor : "#063046"}}>
                                <TextInput  
                                    style={styles.inputText}
                                    placeholder="CVC" 
                                    placeholderTextColor="#777"
                                    onChangeText={text => setCvcCard(text)}
                                    maxLength={4}
                                    keyboardType={'numeric'}
                                    value={CvcCard}
                                />

                            </View>

                            

                            <TouchableOpacity style={{justifyContent: "center"}} onPress={()=>Instructions()}   >
                                <View style={{justifyContent: "center"}}>
                                    <Text style={{fontWeight: "bold", paddingLeft: 8, paddingTop: 2,color: "#fff", backgroundColor: "#3f4a56", marginLeft: 10, width: 25, height: 25, fontSize: 15, borderRadius: 100}}>?</Text>
                                </View>
                            </TouchableOpacity>

                        </View>



                        {ShowInstructions &&

                            <View style={styles.Instrucciones}>
                                <Text style={styles.TextInstrucciones}>
                                    Puedes encontrar el código de seguridad (3 dígitos) en <Text style={styles.bold} >el reverso</Text> de tu tarjeta.
                                </Text>

                                <Text style={styles.TextInstrucciones}>
                                    ¿Tienes American Express? Encontrarás el código de seguridad (4 dígitos) en el <Text style={styles.bold} >frente</Text> de tu tarjeta.
                                </Text>


                                <View style={styles.contentImageCard} >
                                    <Image style={styles.ImageCard} source={require('../src/images/card_atras.png')}/>
                                    <Image style={styles.ImageCard} source={require('../src/images/card_frente.png')}/>
                                </View>


                                <TouchableOpacity style={styles.btnCLose} onPress={()=>setShowInstructions(false)}   >
                                    <Text style={styles.CloseText}>Cerrar</Text>
                                </TouchableOpacity>


                            </View>

                        }




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
        marginTop: 20
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
        marginBottom: 50,
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

