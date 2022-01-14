
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';



function Index(props){

    const [loaded, setLoaded] = useState(false)
    
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle= "dark-content"/>
            <Image
                    style={styles.icon}
                source={require('../src/images/logo.png')}
            />
        </View>
    )

}




export default Index;



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },


      icon: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        marginBottom:40
      }
  });


