import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';


const IconP = ({ onSelect}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('star'); // Icono por defecto
  const [searchQuery, setSearchQuery] = useState('');
  

  const data = [
    { key: 'user', label: 'User' },
    { key: 'heart', label: 'Heart' },
    { key: 'star', label: 'Star' },
    // Agrega más iconos según sea necesario
  ];

  
  

  const filteredData = data.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleIconSelect(item.key)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Icon name={item.key} size={20} />
        
      </View>
    </TouchableOpacity>
  );

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setModalVisible(false); // Cierra el modal después de seleccionar un icono
    onSelect(icon); // Puedes pasar el icono seleccionado al componente padre si es necesario
  };

 
  return (
    
    <View>
      <Text style={styles.label}>Icono</Text>
      <TouchableOpacity style={styles.containerButton} onPress={() => setModalVisible(true)}>
        <Icon name={selectedIcon} size={27} color='#4A4A4A' style={styles.iconButton} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.containerInput}>
              <Icon name="search" size={20} color='#4A4A4A' style={styles.searchIcon} />
              <TextInput
                
                style={styles.searchInput}
                placeholder="Buscar"
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#B00020", marginTop: 20, alignSelf: "center"}}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    
    
    
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: -9,
    color: '#4A4A4A',
    fontSize: 16,
    backgroundColor:'rgba(255, 255, 255, 1)',
    zIndex: 1000,
    alignSelf: "center",
    paddingHorizontal: 5,
  },

  containerButton: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 8,
    height: 62,
    width: 76,
  },

  iconButton: {
    alignSelf: "center",
    paddingVertical: 15,
  },

  modalContainer: {
    flex: 1,
     // Alinea el modal hacia abajo
    alignItems: 'flex-start',
    backgroundColor: 'transparent', // Fondo oscuro semi-transparente
  },

  modalContent: {
    width: 230,
    height: 230,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 80,
    marginLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },

  containerInput: {
    width: "100%",
    flexDirection: "row",
    height: 40,
    gap: 8,
    backgroundColor: "rgba(228, 228, 228, 1)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },

  searchInput: {
    height: 35,
    width: "70%",
  },

  searchIcon: {
    
    
  },

});

export default IconP;
