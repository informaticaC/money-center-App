import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CheckboxButton = ({ Data, setData, style1, style2 }) => {
  // estados del checkbox digital o efectivo 
  const [isDigitalSelected, setDigitalSelected] = useState(false);
  const [isCashSelected, setCashSelected] = useState(false);
 
  // funciones para la seleccion "efectivo" o "digital"

  const handleDigitalPress = () => {
    setDigitalSelected(true);
    setCashSelected(false);
    setData({
      ...Data,
      description: "Digital",
    });
  };
  
  const handleCashPress = () => {
    setDigitalSelected(false);
    setCashSelected(true);
    setData({
      ...Data,
      description: "Efectivo",
    });
  };
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
    borderColor: '#A3A3A3',
    borderRadius: 20,
    borderWidth: 1,
  },

  textCheckbox: {
    fontSize: 18,
    color: '#4A4A4A',
  },

  
});

export default CheckboxButton;
