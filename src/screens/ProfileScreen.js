import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserProfile from '../components/shared/UserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  
  const navigation = useNavigation();

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage ha sido limpiado exitosamente.');
      navigation.navigate("LoginScreen")
    } catch (error) {
      console.error('Error al limpiar AsyncStorage:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.header}>
          <View>
            <UserProfile />
          </View>
          <View>
            <Text style={styles.textName}>
              Exequiel Mainero
            </Text>
          </View>
          <View style={styles.containerLevel}>
            <Icon name="star" size={30} color='#22904E' />
            <Text style={styles.textLevel}>Nivel:5 <Text style={styles.span}>|</Text> 26.000 pts</Text>
            <Icon name="chevron-right" size={30} color='#22904E' />
          </View>
          <Text>kekelom88@gmail.com</Text>
        </View>
        <View>
          <Text>Configuración</Text>
          <View style={styles.containerCard}>
            <View style={styles.card}>
             <Icon name="recent-actors" size={24} color='#212121'  />
             <Text style={styles.textCard}>Nombre y foto de perfil</Text>
             <Icon name="chevron-right" size={24} color='#212121'  />
            </View>
            <View style={styles.card}>
             <Icon name="lock-outline" size={24} color='#212121'  />
             <Text style={styles.textCard}>Contraseña</Text>
             <Icon name="chevron-right" size={24} color='#212121'  />
            </View>
            <View style={styles.card}>
             <Icon name="" size={24} color='#212121'  />
             <Text style={styles.textCard}>Bloqueo de app</Text>
             <Icon name="chevron-right" size={24} color='#212121'  />
              </View>
            <View style={styles.card}>
             <Icon name="emoji-people" size={24} color='#212121'  />
             <Text style={styles.textCard}>Ayuda y comentarios</Text>
             <Icon name="chevron-right" size={24} color='#212121'  />
            </View>
            <View style={styles.card}>
             <Icon name="policy" size={24} color='#212121'  />
             <Text style={styles.textCard}>Política de privacidad</Text>
             <Icon name="chevron-right" size={24} color='#212121' />
            </View>
          </View>
        </View>
        <TouchableOpacity  onPress={clearAsyncStorage} style={styles.button}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
      
    
  )
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#F4F4F4",
  },
  header: {
    alignItems:"center",
    gap: 10,
    marginTop: 15,
  },
  
  containerLevel: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 90,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    gap: 10,
    borderRadius: 24,
    shadowColor: "rgba(0, 0, 0, 0.15",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.40,
    shadowRadius: 4.65,
  
    elevation: 8,
  },

  textLevel: {
    color: '#22904E',
    
  },

  containerCard: {
    justifyContent: "center",
    alignItems:"center",
    gap: 10,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "90%",
    padding: 16,
    borderRadius: 16,
    
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },

  textCard: {
    color: "#212121",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 10,
    
  },

  button: {
    alignSelf: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#B00020",
    fontSize: 16,
    paddingBottom: 25,
  },
});

export default ProfileScreen