import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, Pressable, TextInput}from 'react-native';
import { format } from 'date-fns';

const ShowPickerDate = () => {
  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  

  

  const toogleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      const formattedDate = format(currentDate, 'dd-MM-yyyy', { locale: esLocale }); // Formatear la fecha en español
      setIncomeDate(formattedDate);
      setIncomeData({
        ...incomeData,
        date: formattedDate,
      });
    }
    toogleDatepicker();
  };

  return (
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
      <Text style={styles.label}>Fecha</Text>
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
  )
}




const styles = StyleSheet.create({
 
  label: {
    marginBottom: -9,
    marginLeft: 10,
    fontSize: 16,
    backgroundColor:'rgba(255, 255, 255, 1)',
    color: '#4A4A4A',
    zIndex: 1000,
    alignSelf: "flex-start",
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
 
});


export default ShowPickerDate