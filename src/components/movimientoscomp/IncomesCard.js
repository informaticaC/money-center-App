import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { selectToken} from '../../../store/slices/token.slice';
import {useSelector} from 'react-redux';
import SearchInput from './SearchInput';
import fetchIncomeData from '../../utils/fetchIncomeData';

const IncomesCard = ({selectedOption, selectedMonth}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const token = useSelector(selectToken);
  //console.log('Linea 14, IncomesCard.js, selectToken:==>>',  token); //selectToken
  const balance = useSelector((state) => state.balance);

  useEffect(() => {
    
    fetchIncomeData(token).then(incomes => {
      //console.log('IncomesCard.js, line 20, incomes response.data: ==>', incomes);
      setData(incomes);
    }).catch(reject => {
      console.error('IncomesCard, line 23, reject from fetchIncomeData',reject)
    }).finally(() => setLoading(false));

  }, [selectedOption, balance]); //
  
  const monthNameToNumber = () => {
    const monthsMap = {
      enero: '01',
      febrero: '02',
      marzo: '03',
      abril: '04',
      mayo: '05',
      junio: '06',
      julio: '07',
      agosto: '08',
      septiembre: '09',
      octubre: '10',
      noviembre: '11',
      diciembre: '12',
    };

    const normalizedMonthName = selectedMonth.toLowerCase();
    return monthsMap[normalizedMonthName] || null;
  };

  // Convertir el nombre del mes a su representación numérica
  const numericMonth = selectedMonth ? monthNameToNumber(selectedMonth) : null;

  // Filtrar gastos según el mes seleccionado
  const filteredIncomes = data.filter((income) => {
    const incomeMonth = income.date.split('-')[1];
    // Obtener el mes de la fecha
    return incomeMonth === numericMonth;
  })
  return (
    <ScrollView style={styles.ingresosContainer}>
      <SearchInput />
      <View >
        {filteredIncomes.map((item) => (
          <View key={item.id} style={styles.containerCard}>
            <View>
              <Text style={styles.titleCard}>{item.date}</Text>
              <View style={styles.containerIzq}>
                <View>
                  <MaterialIcons name={"input"} size={18}   color="black" />
                </View>
                <View>
                  <Text style={styles.TextNameDes} >{item.name}</Text>
                  <Text style={styles.TextNameDes} >{item.description}</Text>
                </View>
              </View>
          </View>
          <View style={styles.containerDer}>
            <View>
              <Text>$ {item.amount}</Text>
            </View>
            <TouchableOpacity style={styles.buttonEdit}>
              <MaterialIcons name="more-vert" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>  
          ))}     
      </View>
    </ScrollView>
  );
};
 
const styles = StyleSheet.create({
  
  ingresosContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    marginTop: 0,
    width: "100%",
  },

  containerCard: {
    flexDirection: "row",
    gap: 30,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(74, 74, 74, 1)",
  },

  containerIzq: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingLeft: 10,
  },

  titleCard: {
   color: "#212121",
   fontSize: 16,
   fontWeight: "bold",
   paddingLeft: 10,
  },

  TextNameDes: {
    fontSize: 15,
    color: "#4A4A4A",
  },

  buttonEdit: {
  
  },

  containerDer: {
    flexDirection: "row",
    paddingRight: 10,
    alignItems: "center",
  },
});




export default IncomesCard;