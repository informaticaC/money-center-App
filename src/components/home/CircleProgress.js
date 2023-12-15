import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';


const CircleProgress = ({progress, size, indeterminate, color, borderWidth, borderColor, thickness, strokeCap, endAngle, unfilledColor, showsText}) => {
  
  
  return <Progress.Circle size={size} indeterminate={indeterminate} showsText={showsText}  strokeCap={strokeCap} progress={progress}  thickness={thickness} unfilledColor={unfilledColor} borderWidth= {borderWidth} endAngle={endAngle} borderColor={borderColor} color={color} />

    
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircleProgress;