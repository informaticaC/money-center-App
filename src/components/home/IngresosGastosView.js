import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CircleProgress from './CircleProgress';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setBalance } from '../../../store/slices/balance.slice';
import fetchIncomeData from '../../utils/fetchIncomeData';
import fetchExpensesData from '../../utils/fetchExpensesData';

const IngresosGastosView = () => {
  console.log('IngresosGastosView, begining, line 11');
  const [incomesData, setIncomesData] = useState("");
  const [expensesData, setExpensesData] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const user = useSelector((state) => state.users);
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  //console.log('IngresosGastosView.js, line 22, balance:===========>>', balance);
  useEffect(() => {
    // Lógica para obtener datos de ingresos desde tu API
    //console.log('IngresosGastosView.js, line 22, user (from global state:==>>', user);
    //console.log('IngresosGastosView.js, line 23, token (from global state:==>>', token);
    //-+-+- Manejar aquí la variable global incomes!!!!!!!!!!!!!!
    const currentDate = new Date();
    console.log('IngresosGastosView, line28, currentDate', currentDate);
    fetchIncomeData(token).then((incomes)=>{
      
      console.log('line 32, incomes from fetchIncomesData(incomes):::', incomes);
      getTotal(incomes).then(resIncomes => {
        //console.log('Total incomes, line 47:', resIncomes);
        setTotalIncome(resIncomes);
      })
      .catch( err => 
        console.error('error on line 38 IngresosGastosView.js getTotal(incomes):==>>', err)
        );
      }
      // here goes fetchExpenseData
      ).then(()=> {
        fetchExpensesData(token).then((expenses) =>{
          //console.log('IngresosGastosView.js, line 44, expenses array returned by fetchExpensesData:', expenses);
          //
          getTotal(expenses).then(resExpenses => {
            console.log('Total Expenses, line 47, resExpenses:', resExpenses);
            setTotalExpense(resExpenses);
            dispatch(setBalance(totalIncome - resExpenses));
            console.log('IngresosGastosView.js, line 49, balance:================>>>>>>>>>>>>>>>>>>>', balance);
          })
          .catch( err => 
            console.error('error on line 66 IngresosGastosView.js getTotal(expenses):==>>',err)
            );
            
          }).catch( err => {
            console.error('IngresosGastosView.js, line 57 error: ===>>>', err)
          });
      })
      .catch( err => {
        console.error('IngresosGastosView.js, line 40 error: ===>>>', err)
      });
      
      
      
      }, [balance]);

  const sum = (accumulator, item) => {
    //console.log(item.amount);
    return accumulator + item.amount;
  }
  
  const initialValue = 0 ; 
  const getTotal = async (arrayData) => {
    console.log('line 85, arrrayData in getTotal::::::::::::', arrayData)
    const total = await arrayData.reduce(sum, initialValue); 
    return total;
  }
    
  const circleIngresos = {
    progress:0.75,
    size: 90,
    indeterminate: false,
    color: '#206D40',
    borderWidth: 3,
    borderColor: 'rgba(50, 175, 101, 0.5)',
    thickness: 10,
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
    thickness: 10,
    strokeCap: 'round',
    unfilledColor: 'rgba(223, 50, 49, 0.5)',
    endAngle: 0.1,
    showsText: true,
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.movimientosText}>Tus movimientos</Text>
        <TouchableOpacity>
          <Text>Ver más </Text>
        </TouchableOpacity>
      </View>
      <View >
        <Text style={styles.balance}>${balance}</Text>
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
  balance: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 30
  }
});


export default IngresosGastosView;




