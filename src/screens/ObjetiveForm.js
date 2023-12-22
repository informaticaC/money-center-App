import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconPicker from '../components/formComponents/IconPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonSave from '../components/formComponents/ButtonSave';
import ColorPicker from '../components/formComponents/ColorPicker';

const ObjetiveForm = () => {

  const [incomeData, setIncomeData] = useState({
    icon:"",
    name:"",
    budget:"",
    color:"",
    deadline:"",
  }); 
    
  const handleInputChange = (key, value) => {
    setIncomeData({
      ...incomeData,
      [key]: value,
    });
  };  
  

  //estados del componente datetimepicker
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [incomeDate, setIncomeDate] = useState("");

  // estados del button guardar para desavilitar en caso de que los input esten vacios  
  const [isButtonEnabled, setButtonEnabled] = useState(false);

 
  
  // funcion para input iconos 
  
    const handleIconSelect = (selectedIcon) => {
      // Maneja la lógica de selección del icono aquí
      console.log('Icono seleccionado:', selectedIcon);
      // Puedes realizar más acciones según la selección del icono
    };

    const handleColorSelect = (selectedIcon) => {
      // Maneja la lógica de selección del icono aquí
      console.log('Icono seleccionado:', selectedIcon);
      // Puedes realizar más acciones según la selección del icono
    };
  


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

 

  // funciones de button guardar 
  // verifica si los input estan vacios 
  const checkButtonEnabled = () => {
    if (incomeData.name.trim() !== '' && incomeData.budget.trim() !== '' && incomeDate.trim() !== '') {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  //actualiza el estado de los campos 

  useEffect(() => {
    checkButtonEnabled();
  }, [incomeData.name, incomeData.budget, incomeDate]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container} >
          <View style={styles.tituloIcon}>
            <IconPicker onSelect={handleIconSelect}  />
            <View >
              <Text style={styles.label}>Nombre</Text>
              <View style={styles.inputContainer1}>
                <TextInput
                  style={styles.input}
                  value={incomeData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  placeholder='Ej: sueldo '
                />
              </View>
            </View>
          </View>
          <View style={styles.tituloIcon}>
            <ColorPicker onSelectc={handleColorSelect} />
            <View>
              <Text style={styles.label}>Objetivo</Text>
                <View style={styles.inputContainer1}>
                  <TextInput
                    style={styles.input}
                    value={incomeData.budget}
                    onChangeText={(text) => handleInputChange("budget", text)}
                    placeholder='Ej: 2000, 3000'
                  />
              </View>
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
              <Text style={styles.label}>Fecha limite</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder='Ej: 2000, 3000'
                  value={incomeDate}
                  editable={false}
                  style={styles.input}
                  onChangeText={(text) => handleInputChange("deadline", text)}
                />
              </View>
            </Pressable>
          </View>
          <ButtonSave isButtonEnabled={isButtonEnabled} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:10,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    
   
  },  
  container1: {
    flex: 1,
    gap:10,
  },

  tituloIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
  },

  label: {
    marginBottom: -9,
    marginLeft: 20,
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
    marginBottom: 120,
  },

  input: {
    height: 60,
    paddingLeft: 10,
    fontSize: 16,
  },

 
});

export default ObjetiveForm;
