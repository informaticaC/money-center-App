import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView} from 'react-native';
import CheckboxButton from '../components/formComponents/CheckboxButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonSave from '../components/formComponents/ButtonSave';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { selectToken, setToken } from '../../store/slices/token.slice';
import {useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';



const IncomeForm = () => {

  const [incomeData, setIncomeData] = useState({
    name:"",
    description:"",
    amount:"",
    date:"",
  })
  
  const token= useSelector(selectToken);
  console.log(token )
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleSave = () => {
    // lógica de inicio de sesión
    const url ='http://192.168.1.5:8080/api/v1/income'
    const { name, amount, description, date} = incomeData;
    axios.post(url, { name, amount, description, date}, {headers})
      .then((res) => {
        
        
      })
        .catch(error => {
          
          console.log(error,"error, linea 46")
          if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un código de estado
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // La solicitud fue hecha pero no se recibió ninguna respuesta
            console.log(error.request);
          } else {
            // Algo sucedió en el proceso de configuración que desencadenó el error
            console.log('Error', error.message);
          }
          
        });
        
  };

  // estados del button guardar para desavilitar en caso de que los input esten vacios  
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  // estados del checkbox digital o efectivo 
  const [isDigitalSelected, setDigitalSelected] = useState(false);
  const [isCashSelected, setCashSelected] = useState(false);

  // funciones para la seleccion "efectivo" o "digital"
  const handleDigitalPress = () => {
    setDigitalSelected(true);
    setCashSelected(false);
    setIncomeData({
      ...incomeData,
      description: "Digital",
    });
  };
  
  const handleCashPress = () => {
    setDigitalSelected(false);
    setCashSelected(true);
    setIncomeData({
      ...incomeData,
      description: "Efectivo",
    });
  };

  const handleInputChange = (key, value) => {
    setIncomeData({
      ...incomeData,
      [key]: value,
    });
  };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [incomeDate, setIncomeDate] = useState("");

  const toogleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const esLocale = require('date-fns/locale/es'); 

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      const formattedDate = format(currentDate, 'dd/MM/yyyy', { locale: esLocale }); // Formatear la fecha en español
      setIncomeDate(formattedDate);
      setIncomeData({
        ...incomeData,
        date: formattedDate,
      });
    }
    toogleDatepicker();
  };

  

  // funciones de button guardar 
  // verifica si los input estan vacios 
  
  
  const checkButtonEnabled = () => {
    if (incomeData.name.trim() !== '' && incomeData.amount.trim() !== '' && incomeDate.trim() !== '' && incomeData.description.trim() !== '') {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  //actualiza el estado de los campos 
  useEffect(() => {
    checkButtonEnabled();
  }, [incomeData.name, incomeData.amount, incomeDate, incomeData.description]);
  console.log(incomeDate)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.containerinput}>
        <View>
          <Text style={styles.label}>Titulo</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Ej: sueldo '
              onChangeText={(text) => handleInputChange('name', text)}
              value={incomeData.name}     
            />
          </View>
        </View>
        <View>
          <Text style={styles.label}>Cantidad</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Ej: 2000, 3000'
              onChangeText={(text) => handleInputChange('amount', text)}
              value={incomeData.amount}     
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
          <Text style={styles.label}>Fecha</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Seleccionar una fecha"
              value={incomeDate}
              editable={false}
              style={styles.input}
            />
          </View>
        </Pressable>
        </View>
        <CheckboxButton
          handleDigitalPress={handleDigitalPress}
          handleCashPress={handleCashPress}
          isDigitalSelected={isDigitalSelected}
          isCashSelected={isCashSelected}
          style1={styles.selectedCheckbox}
          style2={styles.selectedTextCheckbox}
        />
        <ButtonSave isButtonEnabled={isButtonEnabled} save={handleSave}/>
      </View>
      </ScrollView>
    </SafeAreaView>  
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },  
 
  label: {
    alignSelf: "flex-start",
    marginBottom: -9,
    marginLeft: 20,
    fontSize: 16,
    backgroundColor:'rgba(255, 255, 255, 1)',
    color: '#4A4A4A',
    zIndex: 1000,
    paddingHorizontal:5,
  },

  containerinput: {
    alignItems: 'center',
    gap: 10,
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

  selectedCheckbox: {
    backgroundColor: 'rgba(50, 176, 102, 0.15)',
    borderColor: '#206D40',
    borderWidth: 2,
  },

  selectedTextCheckbox: {
    color: "#206D40",
    fontWeight: 'bold',
  },
});

export default IncomeForm