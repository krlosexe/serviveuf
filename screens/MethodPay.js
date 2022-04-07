import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-simple-toast';

function Index(props){
  
    const { navigation } = props

    function goToScreen(screen)
    {   
        navigation.navigate(screen, {randomCode : Math.random()})
    }

    let randomCode 
    if(props){
        randomCode = props.route.params.randomCode
    }else{
        randomCode = Math.random()
    }

    const [Check, setCheck]         = useState(false)
    const [AmountFee, setAmountFee] = useState(0)

    useEffect(()=>{
        setAmountFee(parseFloat(props.route.params.amount))
        setCheck(false)
    },[randomCode])

    useEffect(()=>{
        if(Check){
            const comission = ((AmountFee / 100) * 5)
            const NewFee    = Math.round((AmountFee + comission))
            setAmountFee(NewFee)
        }else{
            setAmountFee(parseFloat(props.route.params.amount))
        }
    },[Check])





    async function GoToStepTwo(type_pay){
       
        const payment_method = {
            "type": type_pay,
        }

        let screen
        if(type_pay == "CARD"){
            screen = "PayToCard"
            
        }
            
        
        if(type_pay == "NEQUI"){
            screen = "PayToNequi"
        }

        await navigation.navigate(screen, {
            randomCode : Math.random(),
            amount_in_cents  : AmountFee,
            payment_concept  : props.route.params.payment_concept,
            payment_method   : payment_method,
            id_fee           : props.route.params.id_fee
        })

    }


    function currencyFormat(num) {
        return '$' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }


      return(

        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
            <View style={styles.header}>
                <View><Text style={styles.tittleHeader}>Escoge un método de pago</Text></View>
                <View><Text style={styles.SubtittleHeader}>Paga tu recarga.</Text></View>
                <View><Text style={styles.SubtittlePrice}>COP <Text style={styles.Price}>{currencyFormat(AmountFee)}</Text></Text></View>
            </View>
            

            <ScrollView style={styles.scrollView}>
                            
                
                    <View>
                        <TouchableOpacity onPress={()=>GoToStepTwo('CARD')}>
                            <View style={styles.card}>
                            
                                <View style={styles.card_image_content} >
                                    <Image
                                            style={{width: 130, height: 100, resizeMode: "contain",}}
                                            source={require('../src/images/card_pay.png')}/>
                                </View>
                            
                                <View style={styles.card_content_title}>
                                    <Text style={styles.card_subtitle}>Usa tus Tarjetas</Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={()=>GoToStepTwo('NEQUI')}>
                            <View style={styles.card}>
                            
                                <View style={styles.card_image_content} >
                                    <Image
                                            style={{width: 130, height: 100, resizeMode: "contain",}}
                                            source={require('../src/images/nequi.png')}/>
                                </View>
                            
                                <View style={styles.card_content_title}>
                                    <Text style={styles.card_subtitle}>Usa tu cuenta Nequi</Text>
                                </View>
                            </View>
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
        flexDirection  : "row",

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
        
        height:50,
        justifyContent:"center",
        padding:20,
        paddingStart: 0,
        marginBottom : 20
      },
      inputText:{
        height:50,
        color:"#777"
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

      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop : 20
      },

      

  
  });

