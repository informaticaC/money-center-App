import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchIncomeData = async (token) => {
  //console.log('Fetching incomes from server!!!!!!!');
  //console.log('Token to fetch incomes:', tok);
  return new Promise( async (incomes, reject) => {
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    let data;
      // if (!token) {
      //   token = await AsyncStorage.getItem("@token");
      // }
              
    try {
        axios.get(`${url_base}/income/getIncomes`,{
                headers: {
                Authorization: `Bearer ${token}`
              }
        }).then( response => {
            data = response.data;
            incomes(data.sort((a,b) => Date.parse(b.date)-Date.parse(a.date)));
        }).catch( err => {
            console.error('fetchIncomeData.js, line 20, error:', err);
            reject(err);
        });
          
    } catch (error) {
          console.error('fetchIncomeData, line 25--Error obtaining payment data received (incomes):', error);
          reject(error)
    }
    })
};

export default fetchIncomeData;