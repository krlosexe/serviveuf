import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ImageBackground} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage'
import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu'
function Index(props) {  


    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const userDetails  = React.useContext(UserContext)


  function goToScreen(screen) {
    props.navigation.navigate(screen, { randomCode: Math.random() })
  }


    function Skip() {
        _storeData(userDetails)
    }


    const _storeData = async (data) => {
        console.log(data, "SUCCESS")
        data.register = false
      try {
          await AsyncStorage.setItem('@Passport', JSON.stringify(data) );
          //console.log(data)
          console.log('Authentication successfully')
          setUserDetails({...data})
          props.navigation.navigate("Dashboard", { randomCode: Math.random() })
      }
      catch (error) {
        // Error saving data
      }
    }

    
    
    useEffect(()=>{
        
    },[])


    const logout = async () => {
        try {
          await AsyncStorage.removeItem('@Passport');
          console.log('logout')
          setUserDetails({})
          goToScreen("Home")
        } catch (error) {
          console.log(error.message);
        }
      }
  return (
    <View style={styles.container}>
      <Image
          style={styles.step_image}
          source={require('../src/images/intro_provider.png')}
      />
    </View>
  );

}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent : "flex-end"
  },
  
  step_image : {
    width: "100%",
    height : "100%",
    alignSelf : "center",
    resizeMode : "contain",
    marginTop : 200
    
  }

});