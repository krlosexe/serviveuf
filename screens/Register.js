import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ToastAndroid,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';

import {server, base_url} from '../Env';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../contexts/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
function Index(props) {
  const [notificationToken, setNotificationToken] = useState('');
  const {setUserDetails} = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  const [Load, setLoad] = useState(false);
  const [PhotoProfile, setPhotoProfile] = useState(
    'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
  );
  const [PhotoUpload, setPhotoUpload] = useState(false);
  const [Terminos] = useState(
    'https://serviceuf.pdtcomunicaciones.com/document.pdf',
  );

  useEffect(() => {
    setTimeout(() => {
      setEditable(true);
    }, 100);
  }, []);

  const [formInfo, setFormInfo] = useState({
    names: '',
    last_names: '',
    email: '',
    password: '',
    repeat_password: '',
  });

  useEffect(() => {
    async function getToken() {
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        setNotificationToken(fcmToken);
      } else {
        console.log('user doesnt have a device token yet');
      }

      console.log(fcmToken, 'TOKEN');
    }
    getToken();
  }, []);

  const _storeData = async data => {
    console.log(data, 'SUCCESS');
    data.register = true;
    data.mode_service_provider = false;
    try {
      await AsyncStorage.setItem('@Passport', JSON.stringify(data));
      //console.log(data)
      console.log('Authentication successfully');
      setUserDetails({...data});
      props.navigation.navigate('Home');
    } catch (error) {
      // Error saving data
    }
  };

  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text,
    });
  }

  function sendForm() {
    const data = {
      ...formInfo,
    };
    data.fcmToken = notificationToken;
    data.photoProfile = PhotoProfile;
    setLoad(true);
    if (
      data.names === '' ||
      data.last_names === '' ||
      data.email === '' ||
      data.password === '' ||
      data.repeat_password === ''
    ) {
      ToastAndroid.showWithGravity(
        'Completa todos los campos',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoad(false);
      return false;
    }

    if (data.password !== data.repeat_password) {
      ToastAndroid.showWithGravity(
        'Las contraseñas no coinciden',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoad(false);
      return false;
    }

    if (!PhotoUpload) {
      ToastAndroid.showWithGravity(
        'Debe subir una foto',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoad(false);
      return false;
    }

    console.log('Enviando formulario');
    console.log(base_url(server, 'clients'));
    console.log(data);

    axios
      .post(base_url(server, 'clients'), data)
      .then(function (res) {
        setLoad(false);
        _storeData(res.data);
      })
      .catch(function (error) {
        console.log('Error al enviar formulario');
        console.log(error.response.data);
        ToastAndroid.showWithGravity(
          error.response.data,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );

        setLoad(false);
      })
      .then(function () {});
  }

  const launchCamera = async () => {
    let options = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
    };

    launchImageLibrary(options, data => {
      console.log('data = ', data.base64);

      if (data.base64) {
        setPhotoProfile(`data:image/png;base64,${data.base64}`);
        setPhotoUpload(true);
      }
    });
  };

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const link = await Linking.canOpenURL(url);

      if (link) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <Text style={styles.bold} onPress={handlePress}>
        {children}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View
        style={
          {
            //  flexDirection  : "row",
          }
        }>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            resizeMode: 'contain',
            width: 95,
            height: 95,
            position: 'absolute',
            marginLeft: '25%',
            top: -20,
            left: -150,
          }}
          source={require('../src/images/round_blue.png')}
        />

        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            resizeMode: 'contain',
            width: 150,
            height: 150,
            position: 'absolute',
            marginLeft: '24%',
            top: -40,
          }}
          source={require('../src/images/triple_round.png')}
        />
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: 110,
            height: 110,
            position: 'absolute',
            right: -50,
            top: -20,
          }}
          source={require('../src/images/round_top.png')}
        />
      </View>

      <ScrollView style={{width: '100%', alignSelf: 'center'}}>
        <View style={{width: '100%', alignItems: 'center', marginTop: 130}}>
          <View style={styles.HeadProfile}>
            <TouchableOpacity onPress={() => launchCamera()}>
              <View>
                <Image
                  style={styles.HeadProfileImage}
                  source={{uri: PhotoProfile}}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                resizeMode: 'contain',
                width: 30,
                height: 30,
                position: 'absolute',
                marginLeft: '4%',
              }}
              source={require('../src/images/icon_user.png')}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Nombres"
              placeholderTextColor="#777"
              editable={editable}
              onChangeText={text => onChangeText(text, 'names')}
            />
          </View>

          <View style={styles.inputView}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                resizeMode: 'contain',
                width: 30,
                height: 30,
                position: 'absolute',
                marginLeft: '4%',
              }}
              source={require('../src/images/icon_user.png')}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Apellidos"
              placeholderTextColor="#777"
              editable={editable}
              onChangeText={text => onChangeText(text, 'last_names')}
            />
          </View>

          <View style={styles.inputView}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                resizeMode: 'contain',
                width: 27,
                height: 27,
                position: 'absolute',
                marginLeft: '4%',
              }}
              source={require('../src/images/icon_email.png')}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#777"
              keyboardType={'email-address'}
              editable={editable}
              onChangeText={text => onChangeText(text, 'email')}
            />
          </View>

          <View style={styles.inputView}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                resizeMode: 'contain',
                width: 30,
                height: 30,
                position: 'absolute',
                marginLeft: '4%',
              }}
              source={require('../src/images/icon_lock.png')}
            />

            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Contraseña"
              placeholderTextColor="#777"
              onChangeText={text => onChangeText(text, 'password')}
            />
          </View>

          <View style={styles.inputView}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                resizeMode: 'contain',
                width: 30,
                height: 30,
                position: 'absolute',
                marginLeft: '4%',
              }}
              source={require('../src/images/icon_lock.png')}
            />

            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#777"
              onChangeText={text => onChangeText(text, 'repeat_password')}
            />
          </View>

          <View style={styles.checkboxContainer}>
            {/* <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                        /> */}
            <Text style={styles.label}>
              Al registrarme acepto{' '}
              <OpenURLButton url={Terminos}>
                <Text style={{fontWeight: 'bold'}}>
                  términos y condiciones.*
                </Text>
              </OpenURLButton>
            </Text>
          </View>

          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '70%',
              backgroundColor: '#0B4E6B',
              borderRadius: 40,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 20,
            }}
            onPress={() => sendForm()}>
            <Text style={styles.register}>
              {Load && <ActivityIndicator size="large" color="#fff" />}
              {!Load && <Text>Registrarse</Text>}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center',
    borderRadius: 100,
    borderColor: '#063046',
    borderWidth: 1,
  },
  inputText: {
    height: 50,
    color: '#777',
    paddingLeft: 30,
  },
  forgot: {
    color: '#000000',
    fontSize: 14,
  },
  loginBtn: {
    width: '55%',
    backgroundColor: '#063046',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
  },

  register: {
    color: '#fff',
    fontSize: 20,
  },

  icon: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: '#000',
    lineHeight: 20,
    textAlign: 'justify',
  },

  HeadProfile: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  HeadProfileImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});
