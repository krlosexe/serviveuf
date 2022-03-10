import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import { Icon } from 'react-native-eva-icons';

type Item = typeof data[0];


export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {data: [
          {screen: <StepOne {...props}/>},
          {screen: <StepTwo {...props}/>},
          {screen: <StepThree {...props}/>}
      ]};
  }


  slider: AppIntroSlider | undefined;
  _renderItem = ({item}: {item: Item}) => {
    return (
      item.screen
    );
  };



  _keyExtractor = (item: Item) => item.title;

  _renderPagination = (activeIndex: number) => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {this.state.data.length > 1 &&
              this.state.data.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? {backgroundColor: '#777'}
                      : {backgroundColor: 'rgba(0, 0, 0, .2)'},
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>
        </SafeAreaView>
      </View>
    );
  };



  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name={'arrow-forward-outline'} width={30} height={30} fill='#fff'/>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircleDone}>
        <Icon name={'checkmark-outline'} width={30} height={30} fill='#fff'/>
      </View>
    );
  };


  _onDone = () => {
    this.props.navigation.navigate("Login")
  }


  render() {
    return (
      <View style={{flex: 1}}>
         <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          onDone={this._onDone}
          data={this.state.data}
          activeDotStyle={{backgroundColor: '#F48205'}}
          ref={(ref) => (this.slider = ref)}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
    },
    image: {
      width: 320,
      height: 320,
      marginVertical: 32,
    },
    text: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center',
    },
    paginationContainer: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      right: 16,
    },
    paginationDots: {
      height: 16,
      margin: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginHorizontal: 24,
    },
    button: {
      flex: 1,
      paddingVertical: 20,
      marginHorizontal: 8,
      borderRadius: 24,
      backgroundColor: '#1cb278',
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
    },buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: "#F48205",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },

      buttonCircleDone : {
        width: 40,
        height: 40,
        backgroundColor: "#002536",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }
      
  });