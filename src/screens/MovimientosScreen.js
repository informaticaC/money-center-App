import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import {PaperProvider} from 'react-native-paper';
import FloatingButton from '../components/shared/FloatingButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonthPicker from '../components/movimientoscomp/MonthPicker';

const MovimientosScreen = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>  
          <View>
            <Text>Mis Moviemientos</Text>
            <View>
              <MonthPicker />
            </View>
          </View>
          <FloatingButton />
        </ScrollView>  
      </SafeAreaView>
    </PaperProvider>
  )
}

export default MovimientosScreen