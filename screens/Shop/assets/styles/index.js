
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    contentNotification : {
        backgroundColor: "white",
        borderColor : "#777",
        borderWidth : 1,
        alignItems: 'center',
        justifyContent : "center",
        borderRadius : 100
    },
    imgNotification: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    contentSearch : {
        flexDirection : "row", 
        alignItems : "center", 
        justifyContent : "space-between", 
        paddingHorizontal : 20,
    },

    MainContainer: {
        flex: 1,
        backgroundColor: 'white'
      },
    
    gridbox: {
        flex: 1,
        height: 250,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom : 10,
        marginTop : 10
    },

    gridText: {
        fontSize: 14,
        fontWeight : "500",
        fontFamily,
        color : "black",
        lineHeight : 19,
        marginTop : 10,
        textAlign : "left",
        alignSelf : "flex-start",
        marginLeft : 23
    },

    gridPrice: {
        fontSize: 16,
        fontWeight : "500",
        fontFamily,
        color : "red",
        lineHeight : 22,
        marginTop : 10,
        textAlign : "left",
        alignSelf : "flex-start",
        marginLeft : 23
    },

    
    imageItem : {
        width : 150,
        height : 150,
        borderRadius : 24,
        resizeMode : "cover"
    }
    
  });

  export {
    styles
  }