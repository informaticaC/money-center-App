import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import IconPicker from '../components/formComponents/IconPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonSave from '../components/formComponents/ButtonSave';
import ColorPicker from '../components/formComponents/ColorPicker';
import ShowPickerDate from '../components/formComponents/ShowPickerDate';
import axios from 'axios';
import { selectToken} from '../../store/slices/token.slice';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native'

const ObjetiveForm = () => {

  const [metaData, setMetaData] = useState({
    icon:"",
    name:"",
    budget:"",
    color:"",
    deadline:"",
    //date ??
  }); 
    
  const handleInputChange = (key, value) => {
    setMetaData({
      ...metaData,
      [key]: value,
    });
  };

  const token= useSelector(selectToken);
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const navigation = useNavigation();  
  const handleSave = () => {
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    const url =`${url_base}/objectives`
    const { name, budget, color, deadline, icon} = metaData;
    axios.post(url, { name, budget, color, deadline, icon}, {headers})
      .then((res) => {
        //console.log('res.status ObjetiveForm.js:==>>>', res.data)
        setMetaData({
          icon:"",
          name:"",
          budget:"",
          color:"",
          deadline:"",
        }); 
        navigation.navigate('MainTabs', { screen: 'inicio' });
      })
        .catch(error => {
          
          console.log(error,"error, linea 46, ObjetiveForm.js")
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

  //funcion para ingresar la fecha al estado metadata

 

  // funcion para input iconos 
    const handleIconSelect = (selectedIcon) => {
      setMetaData({
        ...metaData,
        icon: selectedIcon,
      });
    };
    
    // funcion para input color
    const handleColorSelect = (selectedColor) => {
      console.log(selectedColor)
      setMetaData({
        ...metaData,
        color: selectedColor,
      });
    };
  // estados del button guardar para desavilitar en caso de que los input esten vacios  
  const [isButtonEnabled, setButtonEnabled] = useState(false);  
  
  // funciones de button guardar 
  // verifica si los input estan vacios 
  const checkButtonEnabled = () => {
    if (metaData.name.trim() !== '' && metaData.budget.trim() !== '' && metaData.deadline.trim() !== '' && metaData.color.trim() !== '' && metaData.icon.trim() !== '') {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };  
  //actualiza el estado de los campos 
  useEffect(() => {
    checkButtonEnabled();
  }, [metaData.name, metaData.budget, metaData.deadline, metaData.color, metaData.icon]);
  
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
                  value={metaData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  placeholder='Ej: Vacaciones 🛫 '
                />
              </View>
            </View>
          </View>
          <View style={styles.tituloIcon}>
            <ColorPicker onSelect={handleColorSelect} />
            <View>
              <Text style={styles.label}>Objetivo</Text>
                <View style={styles.inputContainer1}>
                  <TextInput
                    style={styles.input}
                    value={metaData.budget}
                    onChangeText={(text) => handleInputChange("budget", text)}
                    placeholder='Ej: 2000, 3000'
                  />
              </View>
            </View>
          </View>
          <ShowPickerDate data={metaData} funcion={setMetaData}  field="deadline" />
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
    marginBottom: 120,
  },

  input: {
    height: 60,
    paddingLeft: 10,
    fontSize: 16,
  },

 
});

export default ObjetiveForm;
