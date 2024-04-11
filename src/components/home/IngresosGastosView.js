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
import Icon from 'react-native-vector-icons/MaterialIcons';

const IngresosGastosView = () => {
  //console.log('IngresosGastosView, begining, line 11');
  
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
      
      //console.log('IngresosGastosView.js, line 31, incomes from fetchIncomesData(incomes):::', incomes);
      
      getTotal(incomes).then(resIncomes => {
        //console.log('Total incomes, line 35, resIncomes:', resIncomes);
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
            //console.log('Total Expenses, line 48, resExpenses:', resExpenses);
            setTotalExpense(resExpenses);
            dispatch(setBalance(totalIncome - totalExpense));
            //console.log('IngresosGastosView.js, line 49, balance:================>>>>>>>>>>>>>>>>>>>', Math.round(balance));
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
    
  const progress = (totalIncome, totalExpense, type)=>{//type === true return income, else expense
    if (type) {
      if (totalIncome === 0) {
        return 0;
      } else { return ( balance ) / ( totalIncome ); }
    } else {
      if ( totalIncome === 0) {
        return 0
      } else { return ( totalExpense ) / ( totalIncome )}
    }
   
  }
  const circleIngresos = {
    progress: progress(totalIncome, totalExpense, true),
    size: 90,
    indeterminate: false,
    color: '#206D40',
    borderWidth: 3,
    borderColor: 'rgba(50, 175, 101, 0.5)',
    thickness: 10,
    strokeCap: 'round',
    unfilledColor: 'rgba(50, 175, 101, 0.5)',
    endAngle: 0.1,
    showsText: false,
  };


  const circleGastos = {
    progress:  progress(totalIncome, totalExpense, false),
    size: 90,
    indeterminate: false,
    color: '#C91A2F',
    borderWidth: 3,
    borderColor: 'rgba(223, 50, 49, 0.5)',
    thickness: 10,
    strokeCap: 'round',
    unfilledColor: 'rgba(223, 50, 49, 0.5)',
    endAngle: 0.1,
    showsText: false,
  };

  const calcCent = () => {
    const cent = balance - Math.trunc(new Intl.NumberFormat().format(balance));
      console.log('IngresosGastosView.js, line 66, cent:==>', cent);
      return (new Intl.NumberFormat().format(cent * 100));
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.movimientosText}>Mis movimientos</Text>
        <TouchableOpacity>
          <Text>Ver más </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>${Math.trunc(new Intl.NumberFormat().format(balance))}</Text>
        <Text style={styles.cent}>{calcCent()}</Text>
        <Icon name='visibility-off'  style={styles.eye}/>
        {/* <Icon name='visibility' style={styles.eye}/> */}
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <CircleProgress {...circleIngresos} />
          <View style={styles.containerText}>
            <Text style={styles.text}>${totalIncome}</Text>
            <Text style={styles.textDescriptionIncomes}>ingresos</Text>
          </View>
        </View>
        <View style={styles.circle}>
          <CircleProgress {...circleGastos} />
          <View style={styles.containerText}>
            <Text style={styles.text}>${totalExpense}</Text>
            <Text style={styles.textDescriptionExpenses}>gastos</Text>
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
  
  movimientosText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 30,
    marginTop: 16,
    marginBottom: 10,
    
  },
  balanceContainer: {
    flexDirection: 'row',
    alignContent: 'center'

  },
  balance: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingStart:  30
    
  },
  cent: {
    paddingTop: 5,
    fontSize: 20,
    paddingLeft: 5
  },
  eye: {
    
    fontSize: 40,
    paddingLeft: 20,
    fontWeight: '100'
  },
 
  containerText: {
    position: 'absolute',
    alignItems: 'center',
    top: '35%',
    left: '19%',
  },
  text: {
    fontWeight: 'bold',
    marginHorizontal: 0,
    paddingHorizontal: 0
    
  },
  textDescriptionIncomes: {
    fontWeight: 'normal',
    
  },
  textDescriptionExpenses: {
    fontWeight: 'normal',
    paddingHorizontal: 6,
    
  },
});


export default IngresosGastosView;




