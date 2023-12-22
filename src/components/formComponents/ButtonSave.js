
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ButtonSave = ({ isButtonEnabled, save }) => {
  return (
    <LinearGradient colors={['#32B166', '#206D40']} style={styles.gradient}>
      <TouchableOpacity
        style={[styles.button, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
        disabled={!isButtonEnabled}
        onPress={save}
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  button: {
    flex:1,
    justifyContent: "flex-end",
    height: 50,
    paddingVertical: 16,
    width: 380,
    borderRadius: 27,
    
  },

  buttonText: {
    fontSize: 16,
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

  gradient: {
    borderRadius: 27,
    flex: 1,
    marginTop: 165,
  },
});

export default ButtonSave;
