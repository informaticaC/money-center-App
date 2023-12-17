import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconPicker from './IconPicker';
import Barra from "./Barra";
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkboxx from './Checkbox';

const ExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
 
  
  // funcion para input iconos 
  
  


  //funciones para input fecha 
  const toogleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setIncomeDate(currentDate.toDateString());
    }
    toogleDatepicker();
  };

  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.tituloIcon}>
        <IconPicker />
        <View >
          <Text style={styles.labelTitulo}>Titulo</Text>
          <View style={styles.inputContainer1}>
            <TextInput
               style={styles.input}
               value={title}
               onChangeText={(text) => setTitle(text)}
               placeholder="Ingresa tu título"
            />
          </View>
        </View>
      </View>
      <View >
        <Text style={styles.labelCantidad}>Cantidad</Text>
          <View style={styles.inputContainer}>
            <TextInput
               style={styles.input}
               value={amount}
               onChangeText={(text) => setAmount(text)}
               placeholder="Ingresa tu título"
            />
          </View>
      </View>
      <View>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={date}
          onChange={onChange}
        />
      )}
      
      <Pressable onPress={toogleDatepicker} >
        <Text style={styles.labelFecha}>Fecha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="ej:160"
            value={incomeDate}
            editable={false}
            style={styles.input}
          />
        </View>
      </Pressable>
      </View>
      <View>
        <Text style={styles.checkboxText}>Que tipo de ingreso es?</Text>
        <View style={styles.containerCheckbox}>
          <TouchableOpacity style={styles.checkbox}>
            <Text style={styles.textCheckbox}>Digital</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkbox}>
            <Text style={styles.textCheckbox}>Efectivo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <TouchableOpacity style={styles.button}>
      <Text>Guardar</Text>
    </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:10,
    alignItems: "center",
  },

  tituloIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
    
  
  },
  labelTitulo: {
    marginBottom: -9,
    marginRight: 170,
    fontSize: 16,
    backgroundColor:'#F4F4F4',
    zIndex: 1000,
    alignSelf: "center",
    paddingHorizontal:5,
  },

  labelCantidad: {
    marginBottom: -9,
    marginRight: 245,
    fontSize: 16,
    backgroundColor:'#F4F4F4',
    zIndex: 1000,
    alignSelf: "center",
    paddingHorizontal:5,
  },

  labelFecha: {
    marginBottom: -9,
    marginRight: 264,
    fontSize: 16,
    backgroundColor:'#F4F4F4',
    zIndex: 1000,
    alignSelf: "center",
    paddingHorizontal:5,
  },

  inputContainer1: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 8,
    width: 250,
    
  },
  
  inputContainer: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 8,
    width: 350,
    
  },
  input: {
    height: 60,
    paddingLeft: 10,
    fontSize: 16,
  },
  checkboxText:{
    fontSize: 22,
    marginTop: 20,
  },

  containerCheckbox: {
    flexDirection: "row",
    gap: 30,

  },

  checkbox: {
    paddingVertical: 10,
    width: 120,
    alignItems: "center",
    borderColor: '#4A4A4A',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 20,

  },

  textCheckbox: {
    fontSize: 18,
  },

  button: {

  },


  

});

export default ExpenseForm;


/*<DateTimePickerModal
isVisible={isDatePickerVisible}
mode="date"
onConfirm={handleDateConfirm}
onCancel={hideDatePicker}
/>*/