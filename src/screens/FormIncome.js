import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const FormIncome = () => {

  const [incomeData, setIncomeData] = useState({
    name:"",
    description:"",
    amount:"",
    //date:"",
  })
  
  const handleInputChange = (key, value) => {
    setIncomeData({
      ...incomeData,
      [key]: value,
    });
  };

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePress = (paymentType) => {
    setSelectedPayment(paymentType);
  };


  return (
    <View>
      <View>
        <Text>Nuevo ingreso</Text>
        <TouchableOpacity>
          <Icon name="save" size={20}/>
        </TouchableOpacity>
      </View>
      <View style={styles.containerinput}>
      <Text>Nuevo ingreso</Text>
        <TextInput
          style={styles.input}
          label="Titulo" 
          onChangeText={(text) => handleInputChange('name', text)}
          value={incomeData.name}     
        />
         <TextInput
          style={styles.input}
          label="amount" 
          onChangeText={(text) => handleInputChange('amount', text)}
          value={incomeData.amount}     
        />
         <TextInput
          style={styles.input}
          label="Titulo" 
          onChangeText={(text) => handleInputChange('name', text)}
          value={incomeData.name}     
        />
        <View style={styles.containerButton}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedPayment === 'digital' && styles.selectedButton,
        ]}
        onPress={() => handlePress('digital')}
      >
        <Text style={styles.buttonText}>Digital</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedPayment === 'efectivo' && styles.selectedButton,
        ]}
        onPress={() => handlePress('efectivo')}
      >
        <Text style={styles.buttonText}>Efectivo</Text>
      </TouchableOpacity>
    </View>


      </View>
    </View>
  )
};


const styles = StyleSheet.create({

  containerinput: {
   
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%"
    
  },

  input: {
    width:"80%",
    height: 50,
    borderColor: "#4A4A4A",
    borderWidth: 1,
    borderRadius: 5,
  },

  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedButton: {
    backgroundColor: 'blue', // Cambia este color al que desees para el estado seleccionado
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
   
  
});

export default FormIncome