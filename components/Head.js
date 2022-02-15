import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../contexts/UserContext'
import {server, base_url} from '../Env'   
import axios from 'axios'
import Banner from '../components/Banner'
const windowWidth = Dimensions.get('window').width;
function App(props) {


  const { navigation } = props
  function goToScreen(screen)
  {     
    navigation.navigate(screen, {randomCode : Math.random()})
  }


  const userDetails     = useContext(UserContext)
  const [Load, setLoad] = useState(false)
  const [Balance, setBalance] = useState(0)

  let randomCode 
  if(props.route.params){
      randomCode = props.route.params.randomCode
  }else{
      randomCode = 1
  }

  useEffect(()=>{

    console.log(props.status, "STATUS")
    getBalance()
  },[randomCode])


  const getBalance = () =>{
      setLoad(true)
      console.log(base_url(server,`get/balance/client/${userDetails.id}`))
      axios.get( base_url(server,`get/balance/client/${userDetails.id}`)).then(function (response) {
        setLoad(false)
        setBalance(currencyFormat(response.data.balance))
      })
      .catch(function (error) {
          console.log(error.response.data.message)
          console.log('Error al enviar formularioss')
          setLoad(false)
      })
      .then(function (response) {setLoad(false)});
  }


  function currencyFormat(num) {
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }



  return (
    <View style={styles.wrapper}>
        {/* <Image
          style={styles.icon}
          source={require('../src/images/logo.png')}
        /> */}


        <TouchableOpacity onPress={() => props.OpenMenu()} style={{
                borderRadius : 7,
                padding : 14,
                alignItems:"center",
                justifyContent:"center",
                marginTop:40,
                marginLeft : "10%",
            }}>
            
            <Icon name='menu' fill={"#0B4E6B"} width={35} height={35} />
        </TouchableOpacity>


          
        {props.BannerServiceProvider &&
          <Banner {...props}/>
        }

         {props.status &&
            <TouchableOpacity onPress={() => goToScreen("CreditAccount")} style={styles.balance_content}>
                <Text style={styles.balance_text}>Tú saldo</Text>
                <Text style={{...styles.balance_text, fontWeight : "bold"}}>
                  {Load &&
                    <ActivityIndicator size="small" color="#fff" />
                  }
                  {!Load &&
                    Balance
                  }
                </Text>
            </TouchableOpacity>
         }

          
      
        


        

    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row"
  },
  icon: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    marginLeft: "10%"
  },
  balance_content : {
      backgroundColor : "#0B4E6B",
      position : "absolute",
      right : 0,
      top : "25%",
      padding : 10,
      width : "35%",
      borderTopStartRadius : 30,
      borderBottomLeftRadius : 30
  },
  balance_text : {
      color : "white",
      marginLeft : 18,
      fontSize : 15
  }
  
})