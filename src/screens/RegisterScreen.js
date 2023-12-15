import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import Line from "../components/Line";
import SocialLogin from '../components/SocialLogin';
import Fondo1 from '../../assets/img/fondo1.png';

const RegisterScreen = () => {
  const [userData, setuserData] = useState({
    firstname:"",
    phone:"",
    email:"",
    password:"",
  })
  
  const navigation = useNavigation();
  

  const handleRegister = () => {
    const url ="http://192.168.1.5:8080/api/v1/users";
    axios.post(url, userData)
      .then(res => {console.log( res.data)
          
          navigation.navigate('Otpverified', {dataphone:phone},)}
      )
      .catch(err=> console.log(err))
  };
 

  const handleInputChange = (key, value) => {
    setuserData({
      ...userData,
      [key]: value,
    });
  };

  return (
    <ScrollView Style={styles.scrollContent}>
       <ImageBackground
       source={Fondo1}
       style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>
      <Text style={styles.inputLabel}>Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('firstname', text)}
        value={userData.firstname}
      />
      <Text style={styles.inputLabel}>Telefono:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('phone', text)}
        value={userData.phone}
        
      />
      <Text style={styles.inputLabel}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('email', text)}
        value={userData.email}
      />
      <Text style={styles.inputLabel}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('password', text)}
        value={userData.password}
      />
      <Text style={styles.inputLabel}>Repetir contraseña:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('password', text)}
        value={userData.password}
      />
      <TouchableOpacity style={styles.registerbutton} title="Registrarse" onPress={handleRegister} >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <View style={styles.loginOption}>
        <Text>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      <Line />
      <SocialLogin />
    </View>
    </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
   backgroundImage: {
    resizeMode: 'cover',
  },
  scrollContent: {
    
    
  },
  inputLabel: {
    marginBottom: 5,
    width: "70%",
    
    
  },
  title: {
    fontSize: 42,
    marginBottom: 20,
    fontWeight: "500",
    
  },
  input: {
    width: '70%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    
  },

  registerbutton: {
    backgroundColor: '#22904E', 
    borderRadius: 10, 
    padding: 10, 
    margin: 10, 
    width: '40%', 
    alignItems: 'center', 
  },

  buttonText: {
    color: '#fff', 
    fontSize: 20, 
    
  },
  loginOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loginLink: {
    backgroundColor: '#22904E',
    textDecorationLine: 'none',
    marginLeft: 5,
  },
  
});

export default RegisterScreen;
