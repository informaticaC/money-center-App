import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ButtonSave = ({save, text, gradient, data}) => {

  const [isButtonEnabled, setButtonEnabled] = useState(false);  

  const checkButtonEnabled = () => {
    // Verifica si todos los campos están llenos
    const allFieldsFilled = Object.values(data).map(value => value.trim() !== '');
  
    // Si todos los campos están llenos, allFieldsFilled contendrá solo true
    // Si hay algún campo vacío, allFieldsFilled contendrá al menos un false
    // Usamos includes para verificar si hay algún false en el array
    const buttonEnabled = !allFieldsFilled.includes(false);
  
    // Actualiza el estado del botón basado en si todos los campos están llenos
    setButtonEnabled(buttonEnabled);
  };
  
  // Actualiza el estado de los campos y el botón cuando los campos de metaData cambian
  useEffect(() => {
    checkButtonEnabled();
  }, Object.values(data));
  
  return (
    <LinearGradient colors={['#32B166', '#206D40']} style={gradient}>
      <TouchableOpacity
        style={[styles.button, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
        disabled={!isButtonEnabled}
        onPress={save}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  button: {
    flex:1,
    justifyContent: "flex-end",
    paddingVertical: 10,
    borderRadius: 27,
  },

  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
  },

  buttonEnabled: {
    // Otros estilos adicionales si es necesario
  },

  buttonDisabled: {
    backgroundColor: 'rgba(163, 163, 163, 1)',
    // Otros estilos adicionales si es necesario
  },

  
});

export default ButtonSave;
