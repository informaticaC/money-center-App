import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MoneyLogo from '../../../assets/img/moneylogo.png';
import Noti from '../../../assets/img/notifications.png';

const Header = () => {
  return (
    <View style={styles.containerHeader}>
      <View style={styles.header}>
        <Image source={MoneyLogo} style={styles.logo} />
        <View>
          <Text style={styles.textMoney}>Money Center</Text>
        </View>
        <TouchableOpacity style={styles.button} >
          <Image source={Noti} style={styles.notifications} />
        </TouchableOpacity>
      </View>  
    </View>
  )
};

const styles = StyleSheet.create ({
  containerHeader: {
    
    backgroundColor: "#FFFFFF",
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop:60,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 40,
    height: 40,
  },

  textMoney: {
    fontSize: 28,
    fontWeight: "bold",
  },

  
    
  
  notifications: {
    width: 30,
	  height: 30,
  
  },
  
});

export default Header