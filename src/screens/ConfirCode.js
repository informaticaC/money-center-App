import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fondo3 from '../../assets/img/fondo3.png';

const ConfirCode = () => {
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Un array para almacenar los 6 dígitos del OTP
  const navigation = useNavigation();
 

  const handleOtpInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <ImageBackground
    source={Fondo3}
    style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Codigo</Text>
      <Text style={styles.text}>Coloca el código que recibiste por correo electrónico. </Text>
      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            onChangeText={(text) => handleOtpInputChange(index, text)}
            value={digit}
            maxLength={1} // Para permitir solo un dígito en cada casilla
            keyboardType="numeric"
          />
        ))}
      </View>
      <TouchableOpacity style={styles.verifybutton} title="Verificar" onPress={() => navigation.navigate('ConfirChangePassword')} >
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    gap:50,
 },
 backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    
    fontSize:30,
    fontWeight: 'bold',    
   },
  text: {
    fontSize: 18
   },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  verifybutton: {
    backgroundColor: '#008000', 
    borderRadius: 10, 
    padding: 10, 
    margin: 20, 
    width: '40%', 
    alignItems: 'center', 
  },

  buttonText: {
    color: '#fff', 
    fontSize: 20, 
    
  },
  // Estilos adicionales según tus necesidades
});

export default ConfirCode;