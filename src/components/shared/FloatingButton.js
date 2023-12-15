import React, { useState } from 'react';
import { FAB, Portal, PaperProvider,Provider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import ExpenseForm from '../floatButton/ExpenseForm';
//import LinearGradient from 'react-native-linear-gradient';


const FloatingButton = () => {

  const navigation = useNavigation();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [isExpenseFormVisible, setIsExpenseFormVisible] = useState(false); // Nuevo estado para controlar el modal


  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);
  
  const openExpenseForm = () => setIsExpenseFormVisible(true); // Función para abrir el modal del formulario de gastos
  const closeExpenseForm = () => setIsExpenseFormVisible(false);
  

  return (
    
    
        <Portal >
        
        <FAB.Group
          fabStyle={{ backgroundColor: isMenuVisible ? "#F01E44" : '#22904E' , width:65, height:65, alignItems: "center", justifyContent: "center", }}
          
          color="#D9D9D9"
          open={isMenuVisible}
          icon={isMenuVisible ? 'close' : 'plus'}
          elevation={1}
          actions={[
            { icon: "checkbox-marked-circle-plus-outline", label: 'Nueva meta',labelTextColor:"#CDCDCD", color: "#585858",style:{backgroundColor:"#CDCDCD", }, containerStyle:{backgroundColor:"#585858", }, onPress: () => console.log('Pressed ') },
            { icon:"currency-usd", label: 'Nuevo ingreso',labelTextColor:"#CDCDCD",color: "#585858",style:{backgroundColor:"#CDCDCD"}, containerStyle:{backgroundColor:"#585858"}, onPress: () => navigation.navigate('FormIncome') },
            { icon:"currency-usd-off" , label: 'Nuevo Gasto',labelTextColor:"#CDCDCD",color: "#585858",style:{backgroundColor:"#CDCDCD"}, containerStyle:{backgroundColor:"#585858"}, onPress: () =>  navigation.navigate("ExpenseForm") },
          ]}
          onStateChange={({ open }) => open ? openMenu() : closeMenu()}
          onPress={() => {
            if (isMenuVisible) {
              closeMenu();
            }
             else {
              openMenu();
            }
          }}
       
        />
      </Portal>
      
    
  );
};

const styles = StyleSheet.create({
 
});

export default FloatingButton;


//</LinearGradient>
//<LinearGradient colors={["#32B166 ", "#206D40"]}></LinearGradient>

