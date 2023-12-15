import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,ImageBackground, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import Line from "../components/Line"
import SocialLogin from '../components/SocialLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fondo3 from '../../assets/img/fondo3.png';
//import {useSelector, useDispatch } from 'react-redux';
//import { setUsers } from '../../store/slices/users.slice';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigation = useNavigation();

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  
  //redux
  //const { users} = useSelector(state => state);
  //const dispatch = useDispatch();
  //console.log(users)
  const handleLogin = () => {
    // lógica de inicio de sesión
    const url ="http://192.168.1.5:8080/api/v1/users/login"
    const { email, password } = formData;
    axios.post(url, { email, password })
      .then((res) => {
        console.log(res.data)
        AsyncStorage.setItem('@token', JSON.stringify(res.data.token));
        AsyncStorage.setItem('@user', JSON.stringify(res.data.user));
        
        // Actualizar estado de Redux y AsyncStorage
        //dispatch(setUsers(res.data.user));
        navigation.navigate('MainTabs', { screen: 'inicio' });
      })
        .catch(error => {
          console.log(error,"error, linea 46")
          if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un código de estado
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // La solicitud fue hecha pero no se recibió ninguna respuesta
            console.log(error.request);
          } else {
            // Algo sucedió en el proceso de configuración que desencadenó el error
            console.log('Error', error.message);
          }
          
        });
        
  };

 
  return (
    <ImageBackground
      source={Fondo3}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.inputLabel}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={(text) => handleInputChange('email', text)}
          value={formData.email}
        />
        <Text style={styles.inputLabel}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={(text) => handleInputChange('password', text)}
          value={formData.password}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.button} onPress={handleLogin}> 
          <Text style= {styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.registerOption}>
          <Text >¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.registerLink}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        <Line />
        <SocialLogin />
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 30,
    marginBottom:40,
    fontWeight: "bold",
  },

  inputLabel: {
    marginBottom: 5,
    width: "80%",
    
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,

  },  

  button: {
    backgroundColor: '#22904E',
    padding: (5,10,5,10),
    borderRadius: 10,
  },

  buttonText: {
    color:"white",
    fontSize: 20,
    alignContent: "center"
  },

  forgotPassword: {
    color: '#008000',
    textDecorationLine: 'none',
    marginBottom: 20,
  },
  registerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  registerLink: {
    color: '#008000',
    textDecorationLine: 'none',
    marginLeft: 5,
  },

  

});

export default LoginScreen;
