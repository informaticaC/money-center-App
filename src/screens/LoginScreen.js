import React, { useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, Image} from 'react-native';
import SliderForm from '../components/loginRegister/SliderForm';
import CircleDegrade from '../components/shared/CircleDegrade';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/img/moneylogo.png';
//import {useSelector, useDispatch } from 'react-redux';
//import { setUsers } from '../../store/slices/users.slice';


const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CircleDegrade />
      <ScrollView >
        <View >
          <Image source={Logo} style={styles.logo}/>
          <View style={styles.containerSlider}>
            <SliderForm />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
};


const styles = StyleSheet.create({

  container: {
  },
  containerSlider: {
    backgroundColor: "#fff",
    borderRadius: 35,
    marginHorizontal: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
   
  
  },

  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    zIndex: 100,
    alignSelf: "center",
    
  },
 

  

});

export default LoginScreen;
