import React from 'react'
import { FlatList, View, Text} from 'react-native'


const ITEM = function ( item, key, userDetails,  ){

    if(item.sender === userDetails.id){
            return (
                <View  key={key} style={{justifyContent : 'flex-end', width : '100%', alignItems : 'flex-end'}}>
                    <View style={{ margin : 10, backgroundColor : "#0B4E6B", borderRadius : 15, padding : 10}}>    
                        <Text style={{color : 'white'}}>{item.message}</Text>
                    </View>
            </View>
        )
    }
    else{
        return (
            
            <View key={key} style={{justifyContent : 'flex-end', width : '100%', alignItems : 'flex-start'}}>
                <View  style={{ margin : 10, backgroundColor : '#f1f3f2', borderRadius : 15, padding : 10}}>    
                    <Text>{item.message}</Text>
                </View>
            </View>)
    }
}


export default class MyAwesomeComponent extends React.Component {
    FlatListRef = null; // add a member to hold the flatlist ref
  


                
        

            
    render() {
      return (
        <FlatList
          ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...
          onContentSizeChange={() => this.FlatListRef.scrollToEnd()} // scroll it
          contentContainerStyle={{marginBottom: 200}}
          data={this.props.conversation}
          renderItem={({ item, key }) => {
            return (
                ITEM(item, key, this.props.userDetails)
            );
          }}
        />
      );
    }
  }