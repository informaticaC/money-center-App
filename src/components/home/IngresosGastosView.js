import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,  } from 'react-native';
import CircleProgress from './CircleProgress';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setBalance } from '../../../store/slices/balance.slice';
import { setMonthSelected } from '../../../store/slices/monthSelected';
import fetchIncomeData from '../../utils/fetchIncomeData';
import fetchExpensesData from '../../utils/fetchExpensesData';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Icon } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {IconButton} from 'react-native-paper';
import Svg, { Path } from "react-native-svg";
import { MaterialIcons } from '@expo/vector-icons';


const IngresosGastosView = () => {
  //console.log('IngresosGastosView, begining, line 11');
  
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const user = useSelector((state) => state.users);
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.balance);
  const monthSelected = useSelector( (state) => state.monthSelected);
  const dispatch = useDispatch();
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
      } else { return ( balance ) / ( totalIncome ) }
    } else {
      if ( totalIncome === 0) {
        return 0
      } else { return ( totalExpense ) / ( totalIncome ) }
    }
  }

  const circleIngresos = {
    progress: progress(totalIncome, totalExpense, true),
    size: 100,
    indeterminate: false,
    color: '#206D40',
    borderWidth: 4,
    borderColor: 'rgba(50, 175, 101, 0.5)',
    thickness: 11,
    strokeCap: 'round',
    unfilledColor: 'rgba(50, 175, 101, 0.5)',
    endAngle: 0.9,
    showsText: false,
  };


  const circleGastos = {
    progress:  progress(totalIncome, totalExpense, false),
    size: 100,
    indeterminate: false,
    color: '#C91A2F',
    borderWidth: 4,
    borderColor: 'rgba(223, 50, 49, 0.5)',
    thickness: 11,
    strokeCap: 'round',
    unfilledColor: 'rgba(223, 50, 49, 0.5)',
    endAngle: 0.9,
    showsText: false,
  };

  const calcCent = () => {
    const cent = balance - Math.trunc(new Intl.NumberFormat().format(balance));
      //console.log('IngresosGastosView.js, line 66, cent:==>', cent);
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
        <Text style={styles.balance} >${Math.trunc(new Intl.NumberFormat().format(balance))}</Text>
        <Text style={styles.cent}>{calcCent()}</Text>
        <Svg style={styles.eye} xmlns="http://www.w3.org/2000/svg" viewBox="200 -248 640 1024" >
          <Path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-105.2-82.4c39.6-40.6 66.4-86.1 79.9-118.4 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7 0-70.7-57.3-128-128-128-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zm205.1 160.8l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3 0-5.5-.7-10.9-2-16h2c44.2 0 80 35.8 80 80 0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8l-37.7-29.7c-22.8 29.7-39.1 59.3-48.6 82.2-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47 43.8 111.7 80.6 192.5 80.6 47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5 0 70.7 57.3 128 128 128 13.3 0 26.1-2 38.2-5.8z" />
        </Svg>
        {/* <View>
          <MaterialIcons name={"visibility"} size={18}  color={"black"} />
        </View> */}
       
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
    fontFamily: '',
    fontSize: 20,
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
    fontSize: 40,
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
    fontWeight: '100',
    
    
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




