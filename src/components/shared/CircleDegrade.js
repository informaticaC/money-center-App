import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CircleDegrade = () => {
  return (
    <LinearGradient colors={[ 'rgba(18, 164, 84, 0)','rgba(54, 193, 111, 1)']} style={styles.circle}>
      <View style={styles.circle}>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create ({
  circle: {
    position: "absolute",
    zIndex: 0,
    borderRadius:200,
    width: 400,
    height: 400,
    top: -160,
    left: -100,
  }, 
});

export default CircleDegrade