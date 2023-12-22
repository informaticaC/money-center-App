import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import CircleProgress from './CircleProgress';
import { LinearGradient } from 'expo-linear-gradient';



const IngresosGastosView = () => {
  
   
  const circleIngresos = {
    progress:0.7,
    size:90,
    indeterminate:false,
    color: "#206D40",
    borderWidth: 3,
    borderColor:"rgba(50, 175, 101, 0.5)",
    thickness:12,
    strokeCap:"round",
    unfilledColor:"rgba(50, 175, 101, 0.5)",
    endAngle:0.9,
    showsText:true,
  };

  
  const circleGastos = {
    progress:0.3,
    size:90,
    color: '#C91A2F',
    unfilledColor: 'rgba(223, 50, 49, 0.5)',
    borderWidth: 3,
    indeterminate:false,
    endAngle:0.1,
    showsText:true,
    borderColor:'rgba(223, 50, 49, 0.5)',
    thickness:12,
    strokeCap:"round",
    

  };


  return (
    <View style={styles.container}>
       <View style={styles.textContainer} >
          <Text style={styles.movimientosText}>Tus movimientos</Text>
          <TouchableOpacity>
            <Text>Ver más </Text>
          </TouchableOpacity>
        </View>
      <View style={styles.circleContainer}>  
      <View style={styles.circle}>
        <CircleProgress {...circleIngresos}  />
        <View style={styles.containerText}>
          <Text >$12000</Text>
          <Text style={styles.text}>ingresos</Text>
        </View>
      </View>
      <View style={styles.circle}>
        <CircleProgress {...circleGastos}  />
        <View style={styles.containerText}>
          <Text >$6000</Text>
          <Text style={styles.text}>gastos</Text>
        </View>
      </View>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create ({
  
  container: {
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  
  circleContainer: {
    flexDirection: 'row', 
    justifyContent: "center",
    alignItems: "center",
    
  },

  circle: {
    width:"35%",
    padding: 5,
    marginBottom:5,
  },
  
  containerText: {
    position: 'absolute',
    textAlign: 'center',
    //transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    top: "50%",
    left: "50%", // Centra el texto horizontalmente dentro del círculo
  },

  movimientosText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginVertical: 20,
    
  },
})

export default IngresosGastosView;



