import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import SocialLogin from '../SocialLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {useSelector, useDispatch } from 'react-redux';
//import { setUsers } from '../../store/slices/users.slice';

const FormLogin = () => {
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
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('email', text)}
          value={formData.email}
        />
        <Text style={styles.inputLabel}>Contraseña</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange('password', text)}
          value={formData.password}
          secureTextEntry
        />
        <TouchableOpacity  style={styles.buttonLink} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPassword}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.button} onPress={handleLogin}> 
          <Text style= {styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text>o</Text>
        <SocialLogin />
      </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 

  inputLabel: {
    fontSize: 16,
    color: "rgba(74, 74, 74, 1)",
    alignSelf: "flex-start",
    paddingLeft: 25,
  },
  
  input: {
    width: '85%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.62)',
    marginBottom: 10,
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

  buttonLink: {
  alignSelf: "flex-end",
  marginRight: 25,
  },

  forgotPassword: {
    color: '#008000',
    textDecorationLine: 'none',
    marginBottom: 40,
  },
});

export default FormLogin;