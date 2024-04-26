import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircleDegrade from '../components/shared/CircleDegrade';
import axios from 'axios';
import ButtonSave from "../components/formComponents/ButtonSave";
import { SafeAreaView } from 'react-native-safe-area-context';


const ForgotPasswordScreen = () => {
  ///estado button
  /*const [isButtonEnabled, setButtonEnabled] = useState(false);

  const checkButtonEnabled = () => {
    if (email.trim() !== '') {
      setButtonEnabled(true);
      
    } else {
      setButtonEnabled(false);
    }
  };

  //actualiza el estado de los campos 
  useEffect(() => {
    checkButtonEnabled();
  }, [email]);*/

  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleInputChange = (letter) => {
    //console.log('l 12 letter:', letter);
    setEmail(letter);
    //console.log('l 16 email:>>',email);
  }

  const handleOnPress = () => {
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    const url = `${url_base}/users/reset_password`;
    //console.log('handle OnPress email:',email);
    axios.post(url, { email })
      .then(res => {
        //console.log(res.data);
        navigation.navigate('ConfirCode', email);

      })
      .catch(err => {
        console.log('No se pudo realizar la consulta')
        console.log(err);
      })
  }

  const emaill = {email}
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <CircleDegrade styleCircle={styles.circle} />
          <View style={styles.seccion}>
            <Text style={styles.titleT}>Vamos a </Text>
            <Text style={styles.title}>Recuperar</Text>
            <Text style={styles.title}>contraseña</Text>
          </View>
          <Text style={styles.text}>
            Escribe tu correo electrónico y
          </Text>
          <Text style={styles.text}>
            enviaremos un mail para que puedas
          </Text>
          <Text style={styles.text}>
            restaurar tu contraseña
          </Text>
          <View style={styles.seccion1}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleInputChange(text)}
              value={email}
              keyboardType="email-address"
            />
          </View>
          <ButtonSave save={handleOnPress} text={"Solicita el cambio"} gradient={styles.gradient} data={emaill}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',


  },

  seccion: {
    marginBottom: 60,
  },

  seccion1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  seccion2: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: 'bold',
  },

  titleT: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },


  text: {
    textAlign: "center",
    fontSize: 20,
    color: "rgba(0, 0, 0, 1)",
  },

  input: {
    width: 350,
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.62)',
    marginVertical: 25,
    fontSize: 20,
  },
  inputLabel: {
    marginTop: 20,
    fontSize: 25,
    color: "rgba(74, 74, 74, 1)",
    alignSelf: "flex-start",

  },
  buttonText: {
    color: '#fff',
    fontSize: 20,

  },
  recoverybutton: {
    backgroundColor: '#008000',
    borderRadius: 10,
    padding: 10,
    width: '40%',
    alignItems: 'center',
  },

  circle: {
    position: "absolute",
    zIndex: 0,
    borderRadius: 240,
    width: 500,
    height: 500,
    top: -300,
    alignContent: "center"
  },

  gradient: {
    flex: 1,
    borderRadius: 27,
    marginTop: 80,
    width: 380,
  },

});

export default ForgotPasswordScreen;
