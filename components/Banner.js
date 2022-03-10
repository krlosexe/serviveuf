import React, { useEffect, useRef, useContext, useState, useLayoutEffect } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../contexts/UserContext'
import { server, base_url } from '../Env'
import axios from 'axios'

const windowWidth = Dimensions.get('window').width;
function App(props) {


  const { navigation } = props
  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() })
  }


  const userDetails = useContext(UserContext)
  const [Load, setLoad] = useState(false)
  const [Balance, setBalance] = useState(0)

  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }

  useEffect(() => {
    getBalance()
  }, [randomCode])


  const getBalance = () => {
    setLoad(true)
    console.log(base_url(server, `get/balance/client/${userDetails.id}`))
    axios.get(base_url(server, `get/balance/client/${userDetails.id}`)).then(function (response) {
      setLoad(false)
      setBalance(currencyFormat(response.data.balance))
    })
      .catch(function (error) {
        console.log(error.response.data.message)
        console.log('Error al enviar formularioss')
        setLoad(false)
      })
      .then(function (response) { setLoad(false) });
  }


  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }




  const fadeAnim_one = useRef(new Animated.Value(0)).current;
  const fadeAnim_two = useRef(new Animated.Value(0)).current;
  const fadeIn_one = () => { Animated.timing(fadeAnim_one, {  toValue: 1, duration: 500, useNativeDriver: true }).start(); };
  const fadeOut_one = () => { Animated.timing(fadeAnim_one, { toValue: 0, duration: 500, useNativeDriver: true }).start(); };
  const fadeIn_two = () => { Animated.timing(fadeAnim_two, {  toValue: 1, duration: 500, useNativeDriver: true }).start(); };
  const fadeOut_two = () => { Animated.timing(fadeAnim_two, { toValue: 0, duration: 500, useNativeDriver: true }).start(); };
  const [print, setprint] = useState(true)
  useEffect(() => {
    if (print === true) {
      setTimeout(() => {
        fadeIn_one()
      }, 500);
      setTimeout(() => {
        fadeOut_two()
      }, 500);
    } else {
      setTimeout(() => {
        fadeOut_one()
      }, 500);
      setTimeout(() => {
        fadeIn_two()
      }, 500);
    }
  }, [print]);
  setTimeout(() => {
    setprint(!print)
  }, 3000);
  return (
    <TouchableOpacity onPress={() => goToScreen("IntroServiceProvider")} style={styles.wrapper}>
      <Animated.Text style={{ ...styles.BannerText, opacity: fadeAnim_one }}>¡Trabaja con nosotros!</Animated.Text>
      <Animated.Text style={{ ...styles.BannerText, opacity: fadeAnim_two }} >Gana ingresos extras...</Animated.Text>
    </TouchableOpacity>
  )
}
export default App;

const styles = StyleSheet.create({
  wrapper: {
    height: 30,
    backgroundColor: "#24aafc",
    width: "100%",
    position: "absolute",
    top: "18%",
  },
  BannerText: {
    marginTop: 5,
    position: "absolute",
    alignSelf: "center",
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  }
})