
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'date-fns';

const fetchExpensesData = async (token) => {
  //console.log('Fetching expenses from server!!!!!!!');
 
  return new Promise( async (expenses, reject) => {
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    let data;
    try {
          axios.get(`${url_base}/expense/getExpenses`,{
                  headers: {
                  Authorization: `Bearer ${token}`
                },
          }).then( response => {
              data = response.data;
              //console.log('fetchExpensesData.js, line 21, data:', data)
              ;
              expenses(data.sort((a,b) => Date.parse(b.date)-Date.parse(a.date)));
            }).catch( err => {
                console.error('fetchExpenseData.js, line 26, error:', err);
                reject(err);
            });
            //setIncomesData(response.data);
    } catch (error) {
            console.error('fetchExpenseData, line 31--Error obtaining payment data received (incomes):', error);
            reject(error)
      }
    })
  
  };

  export default fetchExpensesData;