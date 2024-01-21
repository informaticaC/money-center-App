import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import {PaperProvider} from 'react-native-paper';
import FloatingButton from '../components/shared/FloatingButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonthPicker from '../components/movimientoscomp/MonthPicker';
import SliderButtons from '../components/movimientoscomp/SliderButton';

const MovimientosScreen = () => {
 
  return (
    <PaperProvider >
      <SafeAreaView style={styles.container}>
        <ScrollView>  
          <View style={styles.textPicker}>
            <Text style={styles.textMovimiento}>Mis Movimientos</Text>
            <View>
              <MonthPicker/>
            </View>
          </View>
          <View>
            <SliderButtons />
          </View>
          <FloatingButton />
        </ScrollView>  
      </SafeAreaView>
    </PaperProvider>
  )
};

const styles = StyleSheet.create ({
  container:{
    backgroundColor: "#FFF",
    flex: 1,
  },

  textMovimiento:{
    fontSize: 24,
    textAlign: 'center',
    color: "#212121",
    fontWeight: "bold",
    marginBottom: 10,
  }, 
});

export default MovimientosScreen