import React from 'react';
import { View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CircleDegrade = ({styleCircle}) => {
  return (
    <LinearGradient colors={[ 'rgba(18, 164, 84, 0.3)','rgba(54, 193, 111, 1)']} start={[1, 1]} end={[0, 1]} style={styleCircle}>
      <View style={styleCircle}>
      </View>
    </LinearGradient>
  )
}

export default CircleDegrade