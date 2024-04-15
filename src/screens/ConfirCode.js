import { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet,TouchableOpacity,ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fondo3 from '../../assets/img/fondo3.png';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { SafeAreaView } from 'react-native-safe-area-context';


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
        newOtp[i]=(value);
        if (value && i < inputRef.current._children.length -1 ) {
          inputRef.current._children[i].focus(false);
          inputRef.current._children[i+1].focus(true);//saltar a la próxima ventana.          
        }
      }
    }
    console.log('newOtp:==>>', newOtp);
    setOtp(newOtp);
    console.log("otp:==>>",otp);
    

    if (newOtp.every((digit) => digit !== '')) {
      setOtpValue(newOtp.join(''));
    }
    console.log('otpValue:=>',otpValue);
    
  };

  const sendOtpToBackend = async () => {
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    const url =`${url_base}/users/verify/${otpValue}`;
    try {
      
      axios.post(url,{email: email.route.params})
           .then(response =>{
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
  
  return (
   < SafeAreaView>
    
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Codigo</Text>
      <Text style={styles.text}>Coloca el código que recibiste por correo electrónico.({email.route.params}) </Text>
      <View style={styles.otpInputContainer} ref={inputRef}>
        {/* {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            onChangeText={(text) => handleOtpInputChange(index, text)}
            value={digit}
            maxLength={1} // Para permitir solo un dígito en cada casilla
            keyboardType="numeric"
            ref={inputRef}
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
      <TouchableOpacity style={styles.verifybutton} title="Verificar" onPress={sendOtpToBackend} >
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    gap:50,
 },
 backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    
    fontSize:30,
    fontWeight: 'bold',    
   },
  text: {
    fontSize: 18
   },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  
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
  },
  verifybutton: {
    backgroundColor: '#008000', 
    borderRadius: 10, 
    padding: 10, 
    margin: 20, 
    width: '40%', 
    alignItems: 'center', 
  },

  buttonText: {
    color: '#fff', 
    fontSize: 20, 
    
  },
  // Estilos adicionales según tus necesidades
});

export default ConfirCode;