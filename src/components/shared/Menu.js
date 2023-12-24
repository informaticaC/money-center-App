import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Home from "../../../assets/img/home.png";
import Objetivos from "../../../assets/img/objetivos.png";
import Perfil from "../../../assets/img/perfil.png";
import Finanzas from "../../../assets/img/finanzas.png";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const Menu = () => {

  const navigation = useNavigation();  

  const menuItems = [
    { id: 'inicio', icon: Home },
    { id: 'movimientos', icon: Finanzas },
    { id: 'metas', icon: Objetivos  },
    { id: 'perfil', icon: Perfil },
  ];
 const [selectedMenuItem, setSelectedMenuItem] = useState("inicio");
  
 
 
  const onMenuItemPress = (item) => {
    
    setSelectedMenuItem(item.id)
    
    navigation.navigate('MainTabs', { screen: item.id} );
    
  };

  
  return (
    
    <View>
    
    <View style={styles.menu}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          source={item.id}
          style={styles.containButton}
          onPress={() => onMenuItemPress(item)}
        >
          
          <View style={[
              styles.menuItem,
              selectedMenuItem === item.id ? styles.containImg : null,
             
          ]}>
            <Image
              source={item.icon}
              style={[
                styles.menuItem,
                selectedMenuItem === item.id ? styles.selectedMenuItem : null,
              ]}
            />
          </View>
          
          <Text
            style={[
              styles.menuText,
              selectedMenuItem === item.id ? styles.selectedMenuText : null,
            ]}
          >
            {item.id}
          </Text>
        </TouchableOpacity>
      ))}
      
    </View>
    
    </View>
    
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    borderTopWidth: 2,
    borderTopColor: 'rgba(0, 0, 0, 0.16)',
    borderStyle: 'solid',
    backgroundColor: "#FFF",
    
  },

  containButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },


  menuItem: {
    width: 35,
    height: 35,
  },

  menuText: {
    fontWeight: 'bold',
  },
  
  containImg: {
    backgroundColor: "#164C2C",
    width: "60%",
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
   
  },

  selectedMenuText: {
    
    color: "#237B47",
    
  },

  selectedMenuItem: {
    
    tintColor: "white",
    
    
  },
});

export default Menu;
