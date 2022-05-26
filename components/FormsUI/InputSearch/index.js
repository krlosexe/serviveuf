import React, {useState, useEffect} from 'react';
import { View, TextInput, StyleSheet, Image} from 'react-native';

function Inputs(props) {  

  const [editable, setEditable]     = useState(false)

  useEffect(()=>{
    setTimeout(() => {
      setEditable(true)
    }, 100)
  },[])


  const widthInput   = props.width  || "100%"
  const heightInput  = props.height || 42

  const styles = StyleSheet.create({
    
      inputView:{
          width: widthInput,
          backgroundColor: "#eee",
          height:heightInput,
          justifyContent:"center",
          padding:20,
          textAlign: "center",
          borderRadius: 27.5,
      },
      inputText:{
          height:50,
          color:"#777",
          paddingLeft : 17,
          fontSize : 14
      },
      icon : {
        width : 16,
        height : 16,
        resizeMode : "contain",
        position : "absolute",
        left : 12
      }
  });



  return (
    <View style={styles.inputView} >
        <TextInput  
            style                = {styles.inputText}
            secureTextEntry      = {props.secureTextEntry}
            placeholder          = {props.placeholder} 
            placeholderTextColor = {"#777"}
            keyboardType         = {props.keyboardType}
            value                = {props.value}
            editable             = {editable}
            onChangeText         = {text => props.set(text, props.name)}/>
        
    </View>
  );
}




export default React.memo(Inputs);

