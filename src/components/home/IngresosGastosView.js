import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CircleProgress from './CircleProgress';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { parseJSON } from 'date-fns';

const IngresosGastosView = () => {
  const [ingresosData, setIngresosData] = useState("");
  const [gastosData, setGastosData] = useState("");
  
  const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
  const user = useSelector((state) => state.users);
  const id = user?.id;
  console.log('user', user);
  const token = useSelector((state) => state.auth.token)

 useEffect(() => {
    // Lógica para obtener datos de ingresos desde tu API
    const fetchIngresosData = async () => {
      try {
        const response = await axios.get(`${url_base}/income/byUserId/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
       setIngresosData(response.data);
       console.log(response.data)
      } catch (error) {
        console.error('Error al obtener datos de ingresos:', error);
      }
    };

    // Lógica para obtener datos de gastos desde tu API*/
    const fetchGastosData = async () => {
      try {
        const response = await axios.get(`${url_base}/expense/byUserId/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setGastosData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener datos de gastos:', error);
      }
    };

    fetchIngresosData();
    fetchGastosData();
  }, []);

  // const totalIngresos = ingresosData.

  const circleIngresos = {
    progress:0.75,
    size: 90,
    indeterminate: false,
    color: '#206D40',
    borderWidth: 3,
    borderColor: 'rgba(50, 175, 101, 0.5)',
    thickness: 12,
    strokeCap: 'round',
    unfilledColor: 'rgba(50, 175, 101, 0.5)',
    endAngle: 0.90,
    showsText: true,
  };

  const circleGastos = {
    progress:  0.3,
    size: 90,
    indeterminate: false,
    color: '#C91A2F',
    borderWidth: 3,
    borderColor: 'rgba(223, 50, 49, 0.5)',
    thickness: 12,
    strokeCap: 'round',
    unfilledColor: 'rgba(223, 50, 49, 0.5)',
    endAngle: 0.1,
    showsText: true,
  };

  
  
  /*const sumarIngresos = () => {
   //return ingresosData?.incomes.reduce((total, incomes) => total + incomes.amount, 0);
  };
  const totalIngresos = sumarIngresos();
  console.log(ingresosData)*/
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.movimientosText}>Tus movimientos</Text>
        <TouchableOpacity>
          <Text>Ver más </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <CircleProgress {...circleIngresos} />
          <View style={styles.containerText}>
            <Text></Text>
            <Text style={styles.text}>ingresos</Text>
          </View>
        </View>
        <View style={styles.circle}>
          <CircleProgress {...circleGastos} />
          <View style={styles.containerText}>
            <Text></Text>
            <Text style={styles.text}>gastos</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '35%',
    padding: 5,
    marginBottom: 5,
  },
  containerText: {
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
  },
  movimientosText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 30,
    marginVertical: 20,
  },
});

export default IngresosGastosView;




