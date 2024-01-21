import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';


const SliderForm = () => {
  const [selectedForm, setSelectedForm] = useState("Iniciar sesion")

  const handleLoginPress = () => {
    // Lógica para manejar el botón de Ingresos
    setSelectedForm('Iniciar sesion');
  };

  const handleRegisterPress = () => {
    // Lógica para manejar el botón de Gastos
    setSelectedForm('Registrate');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerForms}>
          <LinearGradient colors={selectedForm === 'Iniciar sesion' ? ["#237B47", "#164C2C"] : ["transparent", "transparent"]}
            style={styles.gradient}>
            <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
              <Text style={selectedForm === 'Iniciar sesion' ? styles.textSelectButton : styles.textUnselectButton}>
                Iniciar Sesion
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient  colors={selectedForm === 'Registrate' ? ["#237B47", "#164C2C"] : ["transparent", "transparent"]}
          style={styles.gradient}
          >
            <TouchableOpacity onPress={handleRegisterPress} style={styles.button}>
              <Text style={selectedForm === 'Registrate' ? styles.textSelectButton : styles.textUnselectButton}>
                Registrate
              </Text >
            </TouchableOpacity>
          </LinearGradient>
        </View>  
      </View>
      {selectedForm === 'Iniciar sesion' && (
        <View>
          <FormLogin/>
        </View>
      )}
      {selectedForm === 'Registrate' && (
        <View >
          <FormRegister/>
        </View>
      )}   
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 50,
    alignItems: "center",
    
  },
  
  containerForms: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    borderWidth: 1,
    borderColor:  "rgba(0, 0, 0, 0.28)",
    width: "85%",
    height: 50,
  },

  button: {
    
   
  },

  gradient: {
    width: "50%",
    borderRadius: 30,
  },

  textSelectButton: {
    fontSize: 18,
    color: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
   
  },

  textUnselectButton: {
    fontSize: 18,
    color: "#237B47",
    paddingHorizontal: 10,
    paddingVertical: 10,
   
  }, 
})

export default SliderForm