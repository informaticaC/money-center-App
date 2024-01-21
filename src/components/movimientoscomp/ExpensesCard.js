import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Icon } from 'react-native';
import axios from 'axios';
import { selectToken} from '../../../store/slices/token.slice';
import {useSelector} from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';


const ExpensesCard = ({selectedOption}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const token= useSelector(selectToken);
  
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  
  const url = "http://192.168.1.5:8080/api/v1/expense"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {headers});
        setData(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]);
  
  return (
    <ScrollView style={styles.ingresosContainer}>
      <View >
        {data.map((item) => (
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
    borderWidth: 1,
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