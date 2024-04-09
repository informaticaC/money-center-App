import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { selectToken} from '../../../store/slices/token.slice';
import {useSelector} from 'react-redux';
import SearchInput from './SearchInput';  
import fetchExpensesData from '../../utils/fetchExpensesData';


const ExpensesCard = ({selectedOption, selectedMonth}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameSearchTerm, setNameSearchTerm] = useState('');

  const token = useSelector(selectToken);
 
  useEffect(() => {
   
    fetchExpensesData(token).then(expenses => {
      //console.log('ExpensesCard.js, line 21, fetchExpensesData response.data: ==>', expenses);
      setData(expenses);
    }).catch(reject => {
      console.error('IncomesCard, line 24, reject from fetchIncomeData', reject)
    }).finally(() => setLoading(false));
    
  }, [selectedOption]);

  // Función para convertir nombre de mes a número
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
  const filteredExpenses = data.filter((expense) => {
    const expenseMonth = expense.date.split('-')[1];
    const nameMatches = expense.name.toLowerCase().includes(nameSearchTerm);
    // Obtener el mes de la fecha
    return numericMonth === expenseMonth && nameMatches;
  });

  const handleNameSearchChange = () => {
    setNameSearchTerm();
  };

  
  return (
    <ScrollView style={styles.ingresosContainer}>
      <SearchInput onNameSearchChange={handleNameSearchChange} nameSearchTerm={nameSearchTerm} />
      <View >
        {filteredExpenses.map((item) => (
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




export default ExpensesCard;