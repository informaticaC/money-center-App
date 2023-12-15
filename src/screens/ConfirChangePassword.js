import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import Fondo3 from '../../assets/img/fondo3.png';

const ConfirChangePassword = () => {
  return (
    <ImageBackground
       source={Fondo3}
       style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Contraseña</Text>
      <View style={styles.containerInput}>
      <Text style={styles.inputLabel}>Contraseña:</Text>
      <TextInput
        style={styles.input}
      />  
      <Text style={styles.inputLabel}>Repetir contraseña:</Text>
      <TextInput
        style={styles.input}
      /> 
      </View> 
      <TouchableOpacity style={styles.confirbutton}  >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>  
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    containerInput: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
     backgroundImage: {
      resizeMode: 'cover',
      flex:1,
    },
  
    inputLabel: {
      marginBottom: 5,
      width: "70%",
      
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 50,
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
  
    confirbutton: {
      backgroundColor: '#008000', 
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
  
    
  });
  

export default ConfirChangePassword