import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import IngresosGastosView from "../components/home/IngresosGastosView";
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../../store/slices/users.slice';
import UserProfile from '../components/shared/UserProfile';
import {PaperProvider} from 'react-native-paper';
import FloatingButton from '../components/shared/FloatingButton';



const HomeScreen = () => {
  
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  // Utiliza useState para manejar el estado local de userData
  const [userData, setUserData] = useState('');

  // useEffect se ejecutará cuando el componente se renderize
  useEffect(() => {
    // Función asincrónica para obtener datos de AsyncStorage
    const fetchData = async () => {
      try {
        // Recupera los datos de AsyncStorage
        const storedUserData = await AsyncStorage.getItem('@user');
        const user = JSON.parse(storedUserData)
        // Actualiza el estado local con los datos recuperados
        setUserData(user);

        // Actualiza el estado global de Redux utilizando la acción setUsers
        dispatch(setUsers(user));
        
      } catch (error) {
        console.error('Error al recuperar datos de AsyncStorage:', error);
      }
    };

    // Llama a la función fetchData
    fetchData();
  }, []); 
  
  console.log(users?.firstname)
  return (
    <PaperProvider>
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View>
         <UserProfile />
        </View>
        <View>
          <Text style={styles.textName}>
            {users?.firstname}
          </Text> 
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
    fontWeight: 'bold',
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


