import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import CheckboxButton from '../components/formComponents/CheckboxButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonSave from '../components/formComponents/ButtonSave';
import axios from 'axios';
import { selectToken} from '../../store/slices/token.slice';
import {useSelector, useDispatch } from 'react-redux';
import { setBalance } from '../../store/slices/balance.slice';
import ShowPickerDate from '../components/formComponents/ShowPickerDate';
import { useNavigation } from '@react-navigation/native'

const IncomeForm = ({route}) => {
  const {itemId, mode} = route.params;
  const income = useSelector( state => state.income);
  // console.log('Incomeform.js, line 17, data to edit, itemId:', itemId);
  console.log('Incomeform.js, line 18, data to edit, mode:', mode);
  // console.log('Incomeform.js, line 19, income:', income);
  const incomeToEdit = income.filter(inc => inc.id === itemId);
  //console.log('incomeToEdit::::', incomeToEdit)
  const [incomeData, setIncomeData] = useState({
    name: (mode==="edit") ? (incomeToEdit[0].name) : "",
    description: (mode==="edit") ? incomeToEdit[0].description : "",
    amount: (mode==="edit") ? (incomeToEdit[0].amount).toString() : "",
    date: (mode==="edit") ? (incomeToEdit[0].date) : "",
  })
  
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigation = useNavigation();
  
  const handleSave = () => {
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    //const url = `${url_base}/income`//'http://192.168.100.21:8080/api/v1/income'
    const { name, amount, description, date} = incomeData;

    if (mode === 'edit'){
      const url = `${url_base}/income/${itemId}`;
      axios.put(url,  { name, amount, description, date}, {headers} )
            .then((res) => {
              console.log('IncomeForm.js, line 45, res:', res);
              console.log('Dato actualizado correctamente, itemId:', itemId);
              dispatch(setBalance(null));
              setIncomeData({
                name:"",
                description:"",
                amount:"",
                date:"",
              });                
              navigation.navigate('MainTabs', { screen: 'inicio' });
            })
            .catch( err => console.error(err));
    } else {
      const url = `${url_base}/income`
      axios.post(url, { name, amount, description, date}, {headers})
      .then((res) => {
        dispatch(setBalance(null));
        setIncomeData({
          name:"",
          description:"",
          amount:"",
          date:"",
        });                
        navigation.navigate('MainTabs', { screen: 'inicio' });
      })
        .catch(error => {
          
          console.log(error,"error, linea 37-IncomeForm.js")
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
    }
    
    

        
  };

  // estados del button guardar para desavilitar en caso de que los input esten vacios  
  /*const [isButtonEnabled, setButtonEnabled] = useState(false);*/

  const handleInputChange = (key, value) => {
    setIncomeData({
      ...incomeData,
      [key]: value,
    });
  };

  
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
              keyboardType='number-pad'     
            />
          </View>
        </View>
        <ShowPickerDate data={incomeData} funcion={setIncomeData} field="date" mode={mode}/>
        <CheckboxButton
          Data={incomeData}
          setData={setIncomeData}
          style1={styles.selectedCheckbox}
          style2={styles.selectedTextCheckbox}
        />
        <ButtonSave save={handleSave} text={"Guardar"} gradient={styles.gradient} data={incomeData}/>
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
    backgroundColor: 'rgba(50, 176, 102, 0.15)',
    borderColor: '#206D40',
    borderWidth: 2,
  },

  selectedTextCheckbox: {
    color: "#206D40",
    fontWeight: 'bold',
  },

  gradient: {
    borderRadius: 27,
    flex: 1,
    marginTop: 165,
    width: 380,
  },
});

export default IncomeForm