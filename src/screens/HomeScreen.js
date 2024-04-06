import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import IngresosGastosView from "../components/home/IngresosGastosView";
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../../store/slices/users.slice';
import { setToken } from '../../store/slices/token.slice';
import UserProfile from '../components/shared/UserProfile';
import {PaperProvider} from 'react-native-paper';
import FloatingButton from '../components/shared/FloatingButton';
import getConfigToken from '../utils/getConfigToken';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const HomeScreen = () => {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.auth.token);
  // Utiliza useState para manejar el estado local de userData
  const [userData, setUserData] = useState(true);

  const navigator = useNavigation();

  const checkUserLogged = async () => {
    console.log('HomeScreen.js, line 27, users (global store):', users)
    console.log('HomeScreen.js, line 28, token from global store:======>>', token);
    const url = `${process.env.EXPO_PUBLIC_API_URL_BASE}/users/me`;

    axios.get(url, { headers: { Authorization:`Bearer ${token}` } })
          .then(res => {
            //console.log('UserData = true!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            setUserData(true);
            return true;
          })
          .catch(err => {
            console.error(err);
            logOut();
            console.log('UserData = false!!!!!!!!!!!!!!!!!!!!!!!!!!!');

            setUserData(false);
          });
          
  };

  const logOut = async () => {
    console.log('Loggin Out!!')
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@token");
    setTimeout(() => {
      console.log('From HomeScreen, line54, going to Login Screen');
      navigator.navigate("LoginScreen");
    }, 50);
    console.log('Already Out!!');
  }
  
  const fetchData = async () => {
    try {
      // Recupera los datos de AsyncStorage
      const storedUserData = await AsyncStorage.getItem('@user');
      const user = JSON.parse(storedUserData);
      const storedToken = await AsyncStorage.getItem('@token');
      const token = JSON.parse(storedToken);
      // Actualiza el estado local con los datos recuperados
      dispatch(setUsers(user));
      dispatch(setToken(token));

    } catch (error) {
      console.error('Error al recuperar datos de AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // console.log('HomeScreen.js, line 27, users (global store):', users?.email );
    // console.log('token:======>>', token);
    // Función asincrónica para obtener datos de AsyncStorage
   
    fetchData();
   

  }, []);

  return (
    <PaperProvider>
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View>
         <UserProfile />
        </View>

        <View style={styles.movimientosContainer}>
          <View style={styles.circleprogress}>
            <IngresosGastosView />
          </View>
        </View>
      </View>
      <View>
        <ProgressBar />
      </View>
    </View>
    <FloatingButton />

    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 40,
    height: 40,
  },

  textMoney: {
    fontSize: 25,
    fontWeight: "bold",
  },
  notifications: {
    width: 26,
    height: 26,
  },

  textName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 20,

  },

// nombre y finanzas personales
userContainer: {
  padding: 16,

},

movimientosContainer: {
  backgroundColor: "#FFF",
  borderRadius: 14,
  shadowColor: "#000",
  shadowOffset: {
	  width: 0,
	  height: 4,
  },
  shadowOpacity: 0.30,
  shadowRadius: 4.65,

  elevation: 8,

},





});

export default HomeScreen;


