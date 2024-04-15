import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView} from 'react-native';
import Fondo3 from '../../assets/img/fondo3.png';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

const ConfirChangePassword = (email) => {
  const {route} = email.route.params;
  //console.log('ConfirChangePassword email:==>>', route.params);
  const navigation = useNavigation();
  const [pass1, setPass1] = useState(null);
  const [pass2, setPass2] = useState(null);
  const handleInputChange = (text) => {
    //console.log('l 12 letter:', letter);
    setPass1(text);
    console.log('l 16 pass1:>>',pass1);
  }
  
  const handleInputChange2 = (text) => {
    //console.log('l 12 letter:', letter);
    setPass2(text);
    //console.log('l 16 pass2:>>',pass2);
  }
  
  const handleOnPress = () => {
    if (pass1 === pass2) {
      const email = route.params;
      const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
      const url = `${url_base}/users/reset_password/11`
      axios.post(url, {password: pass1, email: email})
        .then(res => {
          //console.log(res.data);
          navigation.navigate('LoginScreen');
        })
        .catch( err => console.error(err));
        
    } else {
      console.log("Las contraseñas deben ser iguales!!")
    }
  }

  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Contraseña</Text>
      <View style={styles.containerInput}>
      <Text style={styles.inputLabel}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingresa tu nueva contraseña'
        onChangeText={(text) => handleInputChange(text)}
        value={pass1}
      />  
      <Text style={styles.inputLabel}>Repetir contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder='Repite tu nueva contraseña'
        onChangeText={(text) => handleInputChange2(text)}
        value={pass2}
      /> 
      </View> 
      <TouchableOpacity style={styles.confirbutton} onPress={() => handleOnPress()} >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
    container: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    containerInput: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
     backgroundImage: {
      resizeMode: 'cover',
      flex:1,
    },
  
    inputLabel: {
      marginBottom: 5,
      width: "70%",
      
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 50,
    },
    input: {
      width: '70%',
      height: 40,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 10,
    },
  
    confirbutton: {
      backgroundColor: '#008000', 
      borderRadius: 10, 
      padding: 10, 
      margin: 10, 
      width: '40%', 
      alignItems: 'center', 
    },
  
    buttonText: {
      color: '#fff', 
      fontSize: 20, 
      
    },
  
    
  });
  

export default ConfirChangePassword