import React from 'react';
import { View, StyleSheet } from 'react-native';

const Line = () => {
  return (
    <View style={styles.line} />
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: 'green', 
    borderBottomWidth: 1, 
    width: '100%', 
    margin: 20, 
  },
});

export default Line;
