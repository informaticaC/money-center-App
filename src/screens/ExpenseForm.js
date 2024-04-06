import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import IconPicker from '../components/formComponents/IconPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonSave from '../components/formComponents/ButtonSave';
import CheckboxButton from '../components/formComponents/CheckboxButton';
import axios from 'axios';
import { selectToken} from '../../store/slices/token.slice';
import {useSelector} from 'react-redux';
import ShowPickerDate from '../components/formComponents/ShowPickerDate';
import { useNavigation } from '@react-navigation/native';
const ExpenseForm = () => {

  const [expenseData, setExpenseData] = useState({
    name:"",
    description:"",
    amount:"",
    date:"",
    icon:"",
  })
    
  // estados del checkbox digital o efectivo 
  
  // estados del button guardar para deshabilitar en caso de que los input esten vacios  
  const [isButtonEnabled, setButtonEnabled] = useState(false);

  const handleInputChange = (key, value) => {
    setExpenseData({
      ...expenseData,
      [key]: value,
    });
  };

  const token = useSelector(selectToken);
  
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigation = useNavigation();
  const handleSave = () => {
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    const url = `${url_base}/expense`; //'http://192.168.100.21:8080/api/v1/expense'
    const { name, amount, description, date, icon} = expenseData;
    axios.post(url, { name, amount, description, date, icon}, {headers})
      .then((res) => {
        setExpenseData({
          name:"",
          description:"",
          amount:"",
          date:"",
          icon:"",
        });
        navigation.navigate('MainTabs', { screen: 'inicio' });  
      })
        .catch(error => {
          
          console.log(error,"error, linea 53 ExpenseForm.js")
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
  
  // funcion para input iconos 
  
    const handleIconSelect = (selectedIcon) => {
      console.log(expenseData.icon)
      setExpenseData({
        ...expenseData,
        icon: selectedIcon,
        
      });
    };
   
  // funciones de button guardar 
  // verifica si los input estan vacios 
  const checkButtonEnabled = () => {
    if (expenseData.name.trim() !== '' && expenseData.amount.trim() !== '' && expenseData.date.trim() !== '' && expenseData.description.trim() !== '' && expenseData.icon.trim() !== '') {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };
  
  //actualiza el estado de los campos 

  useEffect(() => {
    checkButtonEnabled();
  }, [expenseData.name, expenseData.amount, expenseData.date, expenseData.icon, expenseData.description]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container} >
          <View style={styles.tituloIcon}>
            <IconPicker onSelect={handleIconSelect} />
            <View >
              <Text style={styles.label}>Titulo</Text>
              <View style={styles.inputContainer1}>
                <TextInput
                  style={styles.input}
                  value={expenseData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  placeholder='Ej: pago de Servicios'
                />
              </View>
            </View>
          </View>
          <View >
            <Text style={styles.label}>Cantidad</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={expenseData.amount}
                  onChangeText={(text) => handleInputChange('amount', text)}
                  placeholder='Ej: 2000, 3000'
                  keyboardType='number-pad'
                />
              </View>
          </View>
          <ShowPickerDate data={expenseData} funcion={setExpenseData} field="date"/>
          <CheckboxButton
            Data={expenseData}
            setData={setExpenseData}
            style1={styles.selectedCheckbox}
            style2={styles.selectedTextCheckbox}
          />
          <ButtonSave isButtonEnabled={isButtonEnabled} save={handleSave} />
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
    borderColor: 'rgba(74, 74, 74, 1)',
    borderRadius: 8,
    width: 250,
  },
  
  inputContainer: {
    borderWidth: 1,
    borderColor: 'rgba(74, 74, 74, 1)',
    borderRadius: 8,
    width: 350,
  },

  input: {
    height: 60,
    paddingLeft: 10,
    fontSize: 16,
  },

  selectedCheckbox: {
    backgroundColor: 'rgba(229, 49, 49, 0.15)',
    borderColor: '#B00020',
    color: '#B00020',
    borderWidth: 2,
  },

  selectedTextCheckbox: {
    color: '#B00020',
    fontWeight: 'bold',
  },
});

export default ExpenseForm;


