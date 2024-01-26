import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const MonthPicker = ({setSelectedMonth, selectedMonth}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  

  const months = [
    { label: 'Enero', value: '01' },
    { label: 'Febrero', value: '02' },
    { label: 'Marzo', value: '03' },
    { label: 'Abril', value: '04' },
    { label: 'Mayo', value: '05' },
    { label: 'Junio', value: '06' },
    { label: 'Julio', value: '07' },
    { label: 'Agosto', value: '08' },
    { label: 'Septiembre', value: '09' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' },
  ];

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };
 
  const handleMonthSelect = (label) => {
    setSelectedMonth(label);
    setIsCollapsed(true);
   
  };
  
  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    setSelectedMonth(months[currentMonthIndex].label);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerButtonMonth}>
        <Text style={styles.textPicker}>{selectedMonth}</Text>
      <TouchableOpacity onPress={toggleAccordion} style={styles.buttonMonth}>  
        <AntDesign name="caretdown" size={10} color="#32B166" style={styles.buttonIcon} />
      </TouchableOpacity>
      
      </View>
      
      {isCollapsed ? null : (
        <View style={styles.monthList}>
          {months.map((month) => (
            <TouchableOpacity
              key={month.value}
              onPress={() => handleMonthSelect(month.label)}
            >
              <Text>{month.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
   
  },

  containerButtonMonth: {
    backgroundColor: "rgba(245, 245, 250, 1)",
    flexDirection: "row",
    paddingVertical: 5,
    alignSelf: "center",
    width: 140,
    borderColor: "#32B166",
    borderWidth: 1,
    borderRadius: 10
  },

  textPicker:{
    color: "#32B166",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    paddingLeft: 5,
    width: 100,
    
  },

  buttonMonth:{
    alignSelf: "center",
    width: 20,
    
  },

  

  monthList: {
    
    
    padding: 5,
    alignItems: "center",
    
    alignSelf:"center",
    position: "absolute",
    zIndex: 1000,
    backgroundColor:"rgba(245, 245, 250, 1)",
  },
});

export default MonthPicker;