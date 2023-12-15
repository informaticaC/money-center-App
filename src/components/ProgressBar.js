import React from 'react';
import { View, StyleSheet } from 'react-native';
import  ProgressBar from 'react-native-progress/Bar';


const BarProgress = () => {
  return <ProgressBar progress={0.7} width={112} color={"#793BCA"} unfilledColor={'#E44FE980'} borderColor={'black'} height={12} borderRadius={16} borderWidth={4} />
    
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarProgress;
