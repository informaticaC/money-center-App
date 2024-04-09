import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CircleProgress from './CircleProgress';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setBalance } from '../../../store/slices/balance.slice';
import { setMonthSelected } from '../../../store/slices/monthSelected';
import { setReload } from '../../../store/slices/reload.slice';
import fetchIncomeData from '../../utils/fetchIncomeData';
import fetchExpensesData from '../../utils/fetchExpensesData';

const IngresosGastosView = () => {
  console.log('IngresosGastosView, begining, line 11');
  
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const user = useSelector((state) => state.users);
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.balance);
  const monthSelected = useSelector( (state) => state.monthSelected);
  const dispatch = useDispatch();
  const reload = useSelector(state => state.reload);
  //console.log('IngresosGastosView.js, line 22, balance:===========>>', balance);
  useEffect(() => {
   
    const currentMonth = new Date().getMonth();
    //console.log('IngresosGastosView, line28, currentMonth:===>>>>>>>>>>>>>>>>>>>>>>>>>>>>', currentMonth);
    dispatch(setMonthSelected(currentMonth+1));
    //console.log('IngresosGastosView.js, line 32, monthSelected:-------------------------------: ', monthSelected);
    fetchIncomeData(token).then((incomes)=>{
      
      console.log('IngresosGastosView.js, line 31, incomes from fetchIncomesData(incomes):::', incomes);
      
      getTotal(incomes).then(resIncomes => {
        console.log('Total incomes, line 35, resIncomes:', resIncomes);
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
            console.log('Total Expenses, line 48, resExpenses:', resExpenses);
            setTotalExpense(resExpenses);
            dispatch(setBalance(totalIncome - totalExpense));
            console.log('IngresosGastosView.js, line 49, balance:================>>>>>>>>>>>>>>>>>>>', Math.round(balance));
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
      //dispatch(setReload(false));
  }, [balance, user, monthSelected, totalExpense, totalIncome]);

  const sum = (accumulator, item) => {
    //console.log(item.amount);
    return accumulator + item.amount;
  }
  
  const initialValue = 0 ; 
  const getTotal = async (arrayData) => {
    //console.log('line 74, arrrayData in getTotal:::::::::::::', arrayData);
    //console.log('getTotal, line 78, monthSelected___________________:', monthSelected);
    //arrayData.map(data => console.log('Month:=======>>>-+-+->>>>>',Number(data.date.split('-')[1])));
    const newArrayData = arrayData.filter(data => {
           return Number(data.date.split('-')[1]) === monthSelected;
    })
    //console.log('line 79, newArrayData in getTotal:::::::::::::', newArrayData);
    const total = await newArrayData.reduce(sum, initialValue); 
    return total;
  }
    
  const circleIngresos = {
    progress: 0.75,
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
        <Text style={styles.balance}>${new Intl.NumberFormat().format(balance)}</Text>
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




