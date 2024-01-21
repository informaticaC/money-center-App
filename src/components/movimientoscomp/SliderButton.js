import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IncomesCard from './IncomesCard';
import ExpensesCard from './ExpensesCard';


const SliderButtons = () => {
  const [selectedOption, setSelectedOption] = useState('Ingresos');
  

  const handleIngresosPress = () => {
    // Lógica para manejar el botón de Ingresos
    setSelectedOption('Ingresos');
  };

  const handleGastosPress = () => {
    // Lógica para manejar el botón de Gastos
    setSelectedOption('Gastos');
  };
 
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, selectedOption === "Ingresos" && styles.buttonIngresos ]} onPress={handleIngresosPress}>
          <Text style={[styles.buttonText, selectedOption === "Ingresos" && styles.buttonTextIngresos  ]}>Ingresos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selectedOption === "Gastos" && styles.buttonGastos  ]} onPress={handleGastosPress}>
          <Text style={[styles.buttonText, selectedOption === "Gastos" && styles.buttonTextGastos  ]}>Gastos</Text>
        </TouchableOpacity>
      </View>
      {selectedOption === 'Gastos' && (
        <ExpensesCard selectedOption= {selectedOption} />
      )}
      {selectedOption === 'Ingresos' && (
        <IncomesCard selectedOption= {selectedOption} />
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
  },
  buttonContainer: {
    backgroundColor: '#FEF7FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#FEF7FF',
    padding: 15,
    width: '50%',
    alignItems: 'center',
    borderTopColor: "#F4F4F4",
    borderBottomColor: "#F4F4F4",
    borderBottomWidth: 4,
    borderTopWidth: 4,
  },

  buttonIngresos:{
    borderBottomColor: "#32B166",
  },

  buttonGastos:{
    borderBottomColor: "#FF5732",
  },
  
  buttonTextGastos:{
    color: "#FF5732",
  },

  buttonTextIngresos:{
    color: "#32B166",
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    color: "#A3A3A3",
    fontSize: 14,
  },
  
});

export default SliderButtons;


