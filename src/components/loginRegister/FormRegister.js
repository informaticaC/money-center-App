import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import SocialLogin from '../SocialLogin';
import Toast from 'react-native-root-toast';

const FormRegister = () => {
  const [userData, setuserData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
  })
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigation = useNavigation();
 
  const handleRegister = () => {
    if (userData.password != confirmPassword) {
      console.log('Las contraseñas deben ser iguales!!!');
      let toast = Toast.show(`${userData.firstname || 'Future New User'}, las contraseñas deben ser iguales!! `, {
        duration: 1500, //Toast.durations.LONG,
        backgroundColor: '#008000',
      });
      return;
    }
    //console.log('Intentando registro...');
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    const url = `${url_base}/users`; //"http://192.168.100.21:8080/api/v1/users";
    axios.post(url, userData)
      .then(res => {
        console.log('Linea 33 FormRegister.js:==>',res.data);
        console.log(res.status);
        console.log('userData.email: ', userData.email);
        navigation.navigate('ConfirCode', userData.email)}
        //navigation.navigate('Otpverified', userData.email)}
      )
      .catch(err=> console.log('Linea 36 Error log, FormRegister.js:==>',err))
  };
 
  const handleInputChange = (key, value) => {
    setuserData({
      ...userData,
      [key]: value,
    });
    //console.log('userData.password:=>',userData.password);
  };

  const handleConfirmPassword = (text) => {
    //console.log(text);
    setConfirmPassword(text);
    setTimeout(()=>{

      //console.log('confirmPassword: ',confirmPassword);
    },500)
  }

  return (
    <ScrollView Style={styles.scrollContent}>
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Nombre</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('firstname', text)}
        value={userData.firstname}
      />
      <Text style={styles.inputLabel}>Apellido</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('lastname', text)}
        value={userData.phone}
        
      />
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange('email', text)}
        value={userData.email}
        keyboardType = 'email-address'
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
        onChangeText={(text) => handleConfirmPassword(text)}
        value={confirmPassword}
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