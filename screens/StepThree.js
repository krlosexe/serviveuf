import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, ImageBackground} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../contexts/UserContext'
import Menu from '../components/Menu'
function Index(props) {  

  function goToScreen(screen) {
    props.navigation.navigate(screen, { randomCode: Math.random() })
  }

    const { UserDetails, setUserDetails } = React.useContext(UserContext)
    const userDetails  = React.useContext(UserContext)
    
    useEffect(()=>{
        
    },[])


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
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />


            <TouchableOpacity style={styles.loginBtn} onPress={()=>sendForm()}>
              <Text style={styles.loginText}>
                Omitir
              </Text>
            </TouchableOpacity>

            <Image
                style={styles.step_image}
                source={require('../src/images/image_stepThree.png')}
              />
            <Image
                style={styles.lines_steps}
                source={require('../src/images/lines_steps.png')}
            />

        <View style={styles.contentStep}>
            <Text style={{fontSize : 40, color : "#fff"}}>Paso 3.</Text>
            <Text style={styles.Text}>Lorem ipsum dolor sit 
                amet, consectetuer 
                adipiscing elit, sed diam 
                nonummy nibh euismod 
                tincidunt ut laoreet 
                dolore magna aliquam</Text>


        </View>
        <View style = {styles.barBottom}>
            <View>
                <Text>
                    
                    <TouchableOpacity  onPress={()=>goToScreen("StepOne") }>
                        <Image
                        style={styles.btn_step}
                        source={require('../src/images/step_disabled.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>goToScreen("StepTwo") }>
                        <Image
                        style={styles.btn_step}
                        source={require('../src/images/step_disabled.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>goToScreen("StepThre") }>
                        <Image
                        style={styles.btn_step}
                        source={require('../src/images/step_enabled.png')}
                        />
                    </TouchableOpacity>
                </Text>
            </View>
            <View>
                <TouchableOpacity  onPress={()=>Skip() }>
                    <Image
                    style={styles.btn_next}
                    source={require('../src/images/btn_next.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
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

  contentStep : {
      backgroundColor : "red", 
      alignItems : "center", 
      padding : 20, 
      backgroundColor : "#063046"
  },
  Text : {
    textAlign : "center", 
    width : "70%", 
    marginTop : 10, 
    fontSize : 20, 
    marginTop : 20, 
    color : "#fff"
  },

  lines_steps : {
    width: "160%",
    height: 100,
    resizeMode : "stretch",
    marginBottom : -60,
    marginLeft: -160
  },
  step_image : {
    width: "90%",
    alignSelf : "center",
    resizeMode : "contain",
    marginBottom : -550
    
  },

  barBottom : {
      backgroundColor : "white",
      width : "100%",
      flexDirection : "row",
      justifyContent : "space-between",
      padding : 25
  },

  btn_next: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },


  btn_step: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight : 20,
    justifyContent : "center",
    marginTop : 10
  },
  loginBtn:{
    position : "absolute",
    top: 40,
    width:"30%",
    backgroundColor:"#063046",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    alignSelf : "center"
  },

  loginText:{
    color:"white",
    fontSize : 17
  },
});