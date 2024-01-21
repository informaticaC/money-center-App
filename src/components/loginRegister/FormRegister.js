import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import SocialLogin from '../SocialLogin';


const FormRegister = () => {
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
    <View style={styles.container}>
       <Text style={styles.inputLabel}>Nombre</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('firstname', text)}
        value={userData.firstname}
      />
      <Text style={styles.inputLabel}>Telefono</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('phone', text)}
        value={userData.phone}
        
      />
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('email', text)}
        value={userData.email}
      />
      <Text style={styles.inputLabel}>Nueva contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('password', text)}
        value={userData.password}
      />
      <Text style={styles.inputLabel}>Confirmar contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('password', text)}
        value={userData.password}
      />
      <TouchableOpacity style={styles.registerbutton} title="Registrarse" onPress={handleRegister} >
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
      <SocialLogin />
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  

  scrollContent: {
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
  
 
  
});

export default FormRegister;