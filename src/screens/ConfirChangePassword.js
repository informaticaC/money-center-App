import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

const ConfirChangePassword = (email) => {
  const { route } = email.route.params;
  //console.log('ConfirChangePassword email:==>>', route.params);
  const navigation = useNavigation();
  const [pass1, setPass1] = useState(null);
  const [pass2, setPass2] = useState(null);
  const handleInputChange = (text) => {
    //console.log('l 12 letter:', letter);
    setPass1(text);
    console.log('l 16 pass1:>>', pass1);
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
      axios.post(url, { password: pass1, email: email })
        .then(res => {
          //console.log(res.data);
          navigation.navigate('LoginScreen');
        })
        .catch(err => console.error(err));

    } else {
      console.log("Las contraseñas deben ser iguales!!")
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Nueva Contraseña</Text>
          <View style={styles.inputContainer}>
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
    

  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 50,
  },
 
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  

  inputLabel: {
    fontSize: 16,
    color: "rgba(74, 74, 74, 1)",
    alignSelf: "flex-start",
    paddingLeft: 25,
  },

  input: {
    width: '85%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.62)',
    marginBottom: 10,
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