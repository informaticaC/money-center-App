import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import CircleProgress from './CircleProgress';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setBalance } from '../../../store/slices/balance.slice';
import { setMonthSelected } from '../../../store/slices/monthSelected';
import fetchIncomeData from '../../utils/fetchIncomeData';
import fetchExpensesData from '../../utils/fetchExpensesData';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Icon } from 'react-native-elements';
import Svg, { Path } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';
import Months from '../../constants/Months';

const IngresosGastosView = () => {
  //console.log('IngresosGastosView, begining, line 11');
  
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const user = useSelector((state) => state.users);
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.balance);
  const [showComponent, setShowComponent] = useState(true);
  const monthSelected = useSelector( (state) => state.monthSelected);
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
      
  }, [balance, user, monthSelected, totalIncome, totalExpense]);

  const sum = (accumulator, item) => {
    //console.log(item.amount);
    return accumulator + item.amount;
  }
  
  const initialValue = 0 ; 
  const getTotal = async (arrayData) => {
    //console.log('line 74, arrayData in getTotal:::::::::::::', arrayData);
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
    size: 102,
    indeterminate: false,
    color: '#206D40',
    borderWidth: 4,
    borderColor: 'rgba(50, 175, 101, 0.5)',
    thickness: 11,
    strokeCap: 'round',
    unfilledColor: 'rgba(50, 175, 101, 0.5)',
    endAngle: 0.1,
    showsText: showComponent ? false : true,
  };

  const circleGastos = {
    progress:  progress(totalIncome, totalExpense, false),
    size: 102,
    indeterminate: false,
    color: '#C91A2F',
    borderWidth: 4,
    borderColor: 'rgba(223, 50, 49, 0.5)',
    thickness: 11,
    strokeCap: 'round',
    unfilledColor: 'rgba(223, 50, 49, 0.5)',
    endAngle: 0.1,
    showsText: showComponent ? false : true,
  };

  const calcCent = () => {
    const cent = balance - Math.trunc(balance);
    if (cent === 0) return '00';
    return (Math.round(cent * 100));
  }

  const handleOnpressSeeMore = () => {
    navigation.navigate('MainTabs', { screen: 'movimientos' });
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.movimientosText}>Mis movimientos</Text>
          <Text style={styles.date}>{Months[monthSelected]} {new Date().getFullYear()}</Text>
        </View>
        <TouchableOpacity style={styles.balanceContainer} onPress={handleOnpressSeeMore }>
          <Text style={styles.seeMore}>Ver más</Text>
          <View style={styles.arrowSeeMore} >
            <Svg xmlns="http://www.w3.org/2000/svg" height={32} fill={'rgba(50, 175, 101, 1)'} viewBox="0 -960 960 960" width={32} >
              <Path d="M504-480L320-664l56-56 240 240-240 240-56-56 184-184z" />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={[styles.balance, {display: showComponent ? 'flex' : 'none'}]} >${new Intl.NumberFormat().format(Math.trunc(balance))}</Text>
        <Text style={[styles.cent, {display: showComponent ? 'flex' : 'none'}]}>{calcCent()}</Text>
        <Text style={[styles.balanceOff,{display: showComponent ? 'none' : 'flex'}]}>$ ****</Text>

        <View style={[styles.eyeContainer,{display: showComponent ? 'none' : 'flex'}]}  >
          <TouchableOpacity style={styles.showBalance} onPress={() => setShowComponent(true)}>
            <Svg  style={styles.eye} xmlns="http://www.w3.org/2000/svg" height={34} viewBox="0 -960 960 960" width={34} >
              <Path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200zm0-300zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280z" />
            </Svg>
          </TouchableOpacity>
        </View>

        <View style={[styles.eyeContainer,{display: showComponent ? 'flex' : 'none'}]} >
          <TouchableOpacity style={styles.showBalance} onPress={() => setShowComponent(false)} >
            <Svg style={styles.eye} xmlns="http://www.w3.org/2000/svg" height={34} viewBox="0 -960 960 960" width={34} >
              <Path d="M644-428l-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428zm128 126l-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56zM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82zm319 93zm-151 75z" />
            </Svg>
          </TouchableOpacity>
        </View>
       
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <CircleProgress {...circleIngresos} />
          <View style={styles.containerCircleText}>
            <Text style={[styles.text, {display: showComponent ? 'flex' : 'none'}]}>${ (Math.trunc(totalIncome))}</Text>
            <Text style={[styles.textDescriptionIncomes, {display: showComponent ? 'flex' : 'none'}]}>ingresos</Text>
          </View>
        </View>
        <View style={styles.circle}>
          <CircleProgress {...circleGastos} />
          <View style={styles.containerCircleText}>
            <Text style={[styles.text, {display: showComponent ? 'flex' : 'none'}]}>${Math.trunc(totalExpense)}</Text>
            <Text style={[styles.textDescriptionExpenses,{display: showComponent ? 'flex' : 'none'}]}>gastos</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {fontFamily: 'UrbanistBold',},
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //fontFamily: 'UrbanistBold',
    paddingBottom: 5
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: '31%',
    padding: 5,
    marginBottom: 5,
  },
  movimientosText: {
    flexDirection: 'row',
    fontSize: 20,
    fontFamily: 'UrbanistBold',
    marginHorizontal: 30,
    marginTop: 16,
    marginBottom: 0,
  },
  date: {
    marginHorizontal: 30,
    marginTop: 0, 
  },
  seeMore:{
    fontSize: 20,
    fontFamily: 'UrbanistRegular',
    marginHorizontal: 30,
    marginTop: 16,
    marginBottom: 10,
    color: 'rgba(50, 175, 101, 1)',
  },
  arrowSeeMore: {
    position: 'absolute',
    top: '30%',
    left: '78%',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    },
  balance: {
    fontSize: 40,
    fontFamily: 'UrbanistBold',
    paddingStart:  30,
    display: 'flex',
  },
  balanceOff: {
    fontSize: 41,
    fontFamily: 'UrbanistBold',
    paddingStart:  30,
    display: 'none',
  },
  cent: {
    paddingTop: 6,
    fontSize: 22,
    fontFamily: 'UrbanistBold',
    paddingLeft: 10,
    display: 'flex',
  },
  eyeContainer: {
    position: 'absolute',
    top: '21%',
    left: '55%',
  },
  
  containerCircleText: {
    position: 'absolute',
    alignItems: 'center',
    top: '35%',
    left: '24%',
    
  },
  text: {
    fontFamily: 'UrbanistBold',
    marginHorizontal: 0,
    paddingHorizontal: 0
    
  },
  textDescriptionIncomes: {
    fontFamily: 'UrbanistMedium',
  },
  textDescriptionExpenses: {
    fontFamily: 'UrbanistMedium',
    paddingHorizontal: 6,
  },
});


export default IngresosGastosView;




