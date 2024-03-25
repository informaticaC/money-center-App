import React from 'react';
import { View, Text } from 'react-native';
import {PaperProvider} from 'react-native-paper';
import FloatingButton from '../components/shared/FloatingButton';


const ObjetiveScreen = () => {
  return (
    <PaperProvider>
      <View>
        <Text>Objectives!</Text>
      </View>
      <FloatingButton />
      
    </PaperProvider>
  )
}

export default ObjetiveScreen