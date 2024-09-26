import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonSave from "../components/formComponents/ButtonSave";
import CircleDegrade from '../components/shared/CircleDegrade';

const ConfirChangePassword = (email) => {
  const { route } = email.route.params;
  //console.log('ConfirChangePassword email:==>>', route.params);
  const navigation = useNavigation();
  /* const [pass1, setPass1] = useState(null);
  const [pass2, setPass2] = useState(null);*/
  const [pass, setPass] = useState({
    pass1: "",
    pass2: "",
  })
  /*const handleInputChange = (text) => {
    //console.log('l 12 letter:', letter);
    setPass(text);
    console.log('l 16 pass1:>>', pass.pass1);
  }*/

  const handleInputChange = (key, value) => {
    setPass({
      ...pass,
      [key]: value,
    });
  };

  /*const handleInputChange2 = (text) => {
    //console.log('l 12 letter:', letter);
    setPass(text);
    //console.log('l 16 pass2:>>',pass2);
  }*/

  const handleOnPress = () => {
    if (pass.pass1 === pass.pass2) {
      const email = route.params;
      const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
      const url = `${url_base}/users/reset_password/11`
      axios.post(url, { password: pass.pass1, email: email })
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
          <CircleDegrade styleCircle={styles.circle} />
          <View>
            <Text style={styles.title}>Nueva Contraseña</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleInputChange('pass1', text)}
              value={pass.pass1}
            />
            <Text style={styles.inputLabel}>Repetir contraseña:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleInputChange('pass2', text)}
              value={pass.pass2}
            />
          </View>
          <ButtonSave save={handleOnPress} text={"Confirmar"} gradient={styles.gradient} data={pass} />
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
    marginBottom: 120,
    marginTop: 80,
    alignSelf: "center",
  },

  inputContainer: {
    flex: 1,
    alignSelf: "center",
    width: '85%',
  },

  inputLabel: {
    fontSize: 16,
    color: "rgba(74, 74, 74, 1)",
    alignSelf: "flex-start",
    
  },

  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.62)',
    marginBottom: 20,
    fontSize: 16
  },

  gradient: {
    flex: 1,
    borderRadius: 27,
    marginTop: 80,
    width: 350,
    alignSelf: "center",
  },

  circle: {
    position: "absolute",
    zIndex: 0,
    borderRadius: 240,
    width: 500,
    height: 500,
    top: -300,
    alignSelf: "center"
  },
});


export default ConfirChangePassword