import { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircleDegrade from '../components/shared/CircleDegrade';
import ButtonSave from "../components/formComponents/ButtonSave";


const ConfirCode = (email) => {
  console.log('l 7 ConfirCode.js email: ', email.route.params);

  const [otp, setOtp] = useState([]); // Un array para almacenar los 6 dígitos del OTP
  const [otpValue, setOtpValue] = useState('');// email.route.params.email
  const navigation = useNavigation();
  const inputRef = useRef(0);
  // inputRef.current._children[0].focus();
  const handleOtpInputChange = (value) => {
    console.log('value:==>', value)
    const newOtp = [...otp];
    let isVerified = true;
    for (let i = 0; i < inputRef.current._children.length; i++) {

      if (isVerified === true && inputRef.current._children[i].isFocused()) {
        isVerified = false;
        console.log('i:', i, 'value: ', value);
        newOtp[i] = (value);
        if (value && i < inputRef.current._children.length - 1) {
          inputRef.current._children[i].focus(false);
          inputRef.current._children[i + 1].focus(true);//saltar a la próxima ventana.          
        }
      }
    }
    console.log('newOtp:==>>', newOtp);
    setOtp(newOtp);
    console.log("otp:==>>", otp);


    if (newOtp.every((digit) => digit !== '')) {
      setOtpValue(newOtp.join(''));
    }
    console.log('otpValue:=>', otpValue);

  };

  const sendOtpToBackend = async () => {
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    const url = `${url_base}/users/verify/${otpValue}`;
    try {

      axios.post(url, { email: email.route.params })
        .then(response => {
          if (response.status === 202) {
            // Procesar la respuesta exitosa del backend aquí
           
           navigation.navigate('ConfirChangePassword', email);
          }
          if (response.status === 200) {
            navigation.navigate('LoginScreen');
          }
        })
        .catch(err => {
          //console.log('Line 41 Otpverified.js :=>',err.message);
          console.log('Error 401, wrong verification code')
          // Add a Toast on screen.
          let toast = Toast.show(`Codigo de verificación equivocado para ${email.route.params}`, {
            duration: 1500, //Toast.durations.LONG,
            backgroundColor: '#008000',
          });
          inputRef.current._children.map(input => {
            console.log(input.clear());
          })
          inputRef.current._children[0].focus();
        })

    } catch (error) {
      // Manejar errores de red u otros errores
      console.error(error);
      console.log("no se pudo verificar")
    }
  };

  const otpp = { otpValue }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <CircleDegrade styleCircle={styles.circle} />
          <View>
            <Text style={styles.titleT}>Listo!</Text>
            <Text style={styles.title}>Revisa tu Email</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Accede a la bandeja de entrada de </Text>
            <Text style={styles.text}>({email.route.params}) y sigue los pasos</Text>
            <Text style={styles.text}> para acceder a la app. </Text>
          </View>
          <View style={styles.otpInputContainer} ref={inputRef}>
            {/* {otp.map((digit, index) => (
          <TextInput
            key={index}
            focus="true"
            style={styles.otpInput}
            onChangeText={(text) => handleOtpInputChange(index, text)}
            //value={digit}
            maxLength={1} // Para permitir solo un dígito en cada casilla
            keyboardType="numeric"
           
          />
        ))} */}
            <TextInput
              style={styles.otpInput}
              focus="true"
              onChangeText={(text) => handleOtpInputChange(text)}
              // value={digit}
              maxLength={1} // Para permitir solo un dígito en cada casilla
              keyboardType="numeric"
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleOtpInputChange(text)}
              // value={digit}
              maxLength={1} // Para permitir solo un dígito en cada casilla
              keyboardType="numeric"
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleOtpInputChange(text)}
              // value={digit}
              maxLength={1} // Para permitir solo un dígito en cada casilla
              keyboardType="numeric"
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleOtpInputChange(text)}
              // value={digit}
              maxLength={1} // Para permitir solo un dígito en cada casilla
              keyboardType="numeric"
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleOtpInputChange(text)}
              // value={digit}
              maxLength={1} // Para permitir solo un dígito en cada casilla
              keyboardType="numeric"
            />
            <TextInput
              style={styles.otpInput}
              onChangeText={(text) => handleOtpInputChange(text)}
              // value={digit}
              maxLength={1} // Para permitir solo un dígito en cada casilla
              keyboardType="numeric"
            />
          </View>
          <ButtonSave save={sendOtpToBackend} text={"Confirmar"} gradient={styles.gradient} data={otpp} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },

  title: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: 'bold',
  },

  titleT: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 70,
    marginBottom: 20,
  },

  textContainer: {
    marginTop: 30,
  },

  text: {
    textAlign: "center",
    fontSize: 20,
    color: "rgba(0, 0, 0, 1)",
  },

  /*instructions: {
    fontSize: 18,
    marginBottom: 20,
  },*/

  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 10,
    fontWeight: "bold",
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

  gradient: {
    flex: 1,
    borderRadius: 27,
    marginTop: 80,
    width: 380,
  },

  // Estilos adicionales según tus necesidades
});

export default ConfirCode;