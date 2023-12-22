import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

const Barra = () => {
  const [titulo, setTitulo] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titulo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={(text) => setTitulo(text)}
          placeholder="Ingresa tu título"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  label: {
    marginBottom: -9,
    marginLeft: 20,
    fontSize: 16,
    backgroundColor:'#F4F4F4',
    zIndex: 1000,
    width: 60,
    textAlign:'center'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    height: 40,
    paddingLeft: 10,
  },
});

export default Barra;