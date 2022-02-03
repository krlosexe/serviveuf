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
    <TouchableOpacity  onPress={() => goToScreen("ServiceProviderRegister")} style={styles.wrapper}>
        <Text style = {styles.BannerText}>Click aqui y Gana dinero extra como prestador de servicio</Text>
    </TouchableOpacity>
  )
}
export default App;

const styles = StyleSheet.create({
  wrapper: {
      backgroundColor : "#24aafc",
      padding : 20,
  },
  BannerText : {
      color : "white",
      textAlign : "center",
      fontWeight : "bold"
  }
  
})