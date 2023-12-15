import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Otpverified = ({ route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpValue, setOtpValue] = useState('');
  const dataphone = route.params.dataphone;

  const handleOtpInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (newOtp.every((digit) => digit !== '')) {
      setOtpValue(newOtp.join(''));
    }
  };

  const sendOtpToBackend = async () => {
    const url ="http://192.168.1.5:8080/api/v1/users/verify/:code";
    try {
      const response = await axios.post(url, {
        code: otpValue,
        phone: dataphone,
      });

      if (response.status === 200) {
        // Procesar la respuesta exitosa del backend aquí
      } else {
       
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error(error);
      console.log("no se pudo verificar")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Nombre de tu App</Text>
      <Text style={styles.phoneNumber}>Tu número de teléfono: {dataphone} </Text>
      <Text style={styles.instructions}>Ingresa el OTP</Text>
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
      <TouchableOpacity style={styles.verifybutton} title="Verificar" onPress={sendOtpToBackend}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 24,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  verifybutton: {
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

export default Otpverified;

