// CheckboxButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CheckboxButton = ({ handleDigitalPress, handleCashPress, isDigitalSelected, isCashSelected, style1, style2 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.checkboxText}>¿Qué tipo de gasto es?</Text>
      </View>
      <View style={styles.containerCheckbox}>
        <TouchableOpacity
          style={[styles.checkbox, isDigitalSelected && style1]}
          onPress={handleDigitalPress}
        >
          <Text style={[styles.textCheckbox, isDigitalSelected && style2]}>
            Digital
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.checkbox, isCashSelected && style1]}
          onPress={handleCashPress}
        >
          <Text style={[styles.textCheckbox, isCashSelected && style2]}>
            Efectivo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    marginTop: 10,
    gap: 20,
  },

  checkboxText: {
    fontSize: 22,
    color: '#4A4A4A',
    marginLeft: -70,
  },

  containerCheckbox: {
    flexDirection: 'row',
    gap: 15,
  },

  checkbox: {
    paddingVertical: 10,
    width: 110,
    alignItems: 'center',
    borderColor: '#4A4A4A',
    borderRadius: 20,
    borderWidth: 1,
  },

  textCheckbox: {
    fontSize: 18,
    color: '#4A4A4A',
  },

  
});

export default CheckboxButton;
