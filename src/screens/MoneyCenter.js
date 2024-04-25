import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/img/moneylogo.png';

import axios from 'axios';
import getConfigToken from '../utils/getConfigToken';
import FormLogin from '../components/loginRegister/FormLogin';
import { setUsers } from '../../store/slices/users.slice';
import { setToken } from '../../store/slices/token.slice';
import { useDispatch, useSelector } from 'react-redux';

const MoneyCenter = () => {
  const navigation = useNavigation();
  //const [user, setUser] = useState(null);
  const [isValidToken, setIsValidToken] = useState('false');
  const [tokenStored, setTokenStored] = useState();
  const [userStored, setUserStored] = useState();//
  // console.log('begining MoneyCenter.js, line 21, tokenStored:==>>',(tokenStored));
  // console.log('begining MoneyCenter.js, line 22, userStored:==>>',(userStored));
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const isLogged = async () => { //función que devuelve una promesa de recuperar los datos del local storage y cargarlos en userStored
    return new Promise(async (resolve, reject) => {
      console.log('Is logged?')
      await AsyncStorage.getItem("@user").then(res => {
        setUserStored(JSON.parse(res));
        dispatch(setUsers(JSON.parse(res))); //actualizar el usuario global
        const usr = JSON.parse(res);
        AsyncStorage.getItem("@token").then(res => {
          setTokenStored(JSON.parse(res));
          // console.log('isLogged, line 34, tokenStored:==>>');
          // console.log(JSON.parse(res));
          dispatch(setToken(JSON.parse(res)));
          const tkn = JSON.parse(res);
          const localData = { usr, tkn }
          resolve(localData);
          reject(userStored);
        })
      });
    })
  }

  const checkUserLogged = async (token) => {

    return new Promise(async (resolve, reject) => {
      const url = `${process.env.EXPO_PUBLIC_API_URL_BASE}/users/me`;
      //console.log('Money Center, line 50, checkUserLogged, tokenStored::::====-+-->>', token)
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          //console.log(res.data);
          //console.log('MoneyCenter.js, line 58:>>>>',res.status);
          //console.log('token valid!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          setIsValidToken(true);
          resolve(true);
        })
        .catch(err => {
          setTimeout(() => {
            //console.log('MoneyCenter.js line 61, Codigo de error por /me:=>', err.response.status);
            setIsValidToken(false);
            reject(false);
            logOut();
          }, 100)

        });
    });


  };
  const logOut = async () => {
    console.log('Loggin Out!!')
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@token");
    dispatch(setUsers(null));
    dispatch(setToken(null));
    console.log('Already Out From Money Center!!');
  }

  React.useEffect(() => {

    isLogged()
      .then(resolve => {
        if (resolve.tkn) {
          //console.log('MoneyCenter.js line 90, user from global state:', user);
          //console.log('MoneyCenter.js line 91, isLogged-resolve, resolve?.usr stored, MoneyCenter.js:', resolve?.usr);
          //console.log('MoneyCenter.js line 92, isLogged-resolve, Token stored, MoneyCenter.js:', resolve?.tkn);
          //console.log('MoneyCenter.js, line 93, checking if isValidToken', resolve.usr.email);
          checkUserLogged(resolve.tkn).then((resolve) => {//check if the token is valid
            // console.log('MoneyCenter.js, line 89, isValid??:', resolve);
            if (resolve) {
              //console.log('MoneyCenter.js, line 89, isValidToken:', resolve);  
              navigation.navigate('MainTabs', { screen: 'inicio' }); // go to HomeScreen.js
            } else {
              // console.log('Line 94, Token Invalid :( !!!!!!');
              logOut().then(() => {
                navigation.navigate("MoneyCenter");
              });
            };
          });
        } else {
          console.log('Not logued :(');
          logOut().then(() => {
            //navigation.navigate('LoginScreen')
            console.log('isValidToken: ', isValidToken);
            console.log('userStored: ', userStored);
            navigation.navigate("MoneyCenter");
          });
        };
      })
      .catch(reject => {
        console.log('MoneyCenter.js, line 119, isLogged().then rejected:==>', reject)
        console.log('Not logued :(');
        logOut().then(() => {
          //navigation.navigate('LoginScreen')
          console.log('isValidToken: ', isValidToken);
          console.log('userStored: ', userStored);
          navigation.navigate("MoneyCenter");
        });
      });

  }, []);
  const email = "kekelom88@gmail.com"
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.moneyCenterText}>Money Center</Text>
      </View>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.text}>Controla tus finanzas con nosotros</Text>
      <Text style={styles.title2}>¡Empieza hoy!</Text>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ConfirChangePassword', email)}
      >
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logOut}>
        <Text>logOut</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  title: {
    marginTop: 80,
    fontSize: 40,
    fontWeight: 'bold',
  },

  title2: {
    marginBottom: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 18
  },

  moneyCenterText: {
    color: 'black', // Color de texto predeterminado
    fontSize: 24, // Tamaño de fuente
    fontWeight: 'bold', // Peso de fuente en negrita
  },

  button: {
    backgroundColor: "#22904E", // Color de fondo
    borderRadius: 10, // Bordes redondeados
    padding: 10, // Relleno interno
    margin: 10, // Margen superior
    width: '50%', // Ancho del botón
    alignItems: 'center', // Alinear contenido al centro horizontalmente
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 5,
    borderRadius: 5

  },
});

export default MoneyCenter