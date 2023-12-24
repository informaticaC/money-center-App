import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const MonthPicker = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);

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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion}>
        <Text>{selectedMonth}</Text>
        <AntDesign name="down" size={24} color="black" />
      </TouchableOpacity>
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
    padding: 10,
  },
  monthList: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
});

export default MonthPicker;