import React, { useState } from 'react';
import { FAB, Portal} from 'react-native-paper';
import {StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//import LinearGradient from 'react-native-linear-gradient';


const FloatingButton = () => {

  const navigation = useNavigation();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);
  
  return (
    
    <Portal >
      
      <FAB.Group
        fabStyle={{ backgroundColor: isMenuVisible ? "#F01E44" : '#22904E' , width:65, height:65, alignItems: "center", justifyContent: "center", borderRadius:22}}
        color="#D9D9D9"
        open={isMenuVisible}
        icon={isMenuVisible ? 'close' : 'plus'}
        elevation={5}
        actions={[
          { icon: "checkbox-marked-circle-plus-outline", label: 'Nueva meta',labelTextColor:"#CDCDCD", color: "#585858",style:{backgroundColor:"#CDCDCD", }, containerStyle:{backgroundColor:"#585858", }, onPress: () => navigation.navigate("ObjetiveForm") },
          { icon:"currency-usd", label: 'Nuevo ingreso',labelTextColor:"#CDCDCD",color: "#585858",style:{backgroundColor:"#CDCDCD"}, containerStyle:{backgroundColor:"#585858"}, onPress: () => navigation.navigate('IncomeForm') },
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

