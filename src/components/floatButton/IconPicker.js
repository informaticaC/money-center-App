import React, { useState } from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback, Text, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const IconPicker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);

  const onFocusInput = () => {
    // Muestra la barra de búsqueda cuando se enfoca en el input
    setIsSearchbarVisible(true);
  };

  const onBlurInput = () => {
    // No hace nada al perder el foco
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  const onSearchbarIconPress = () => {
    // Puedes agregar lógica adicional aquí si es necesario
  };

  const closeModal = () => {
    setIsSearchbarVisible(false);
  };

  return (
    
    <View style={styles.container}>
      
      <Text style={styles.label}>Icono</Text>
      <TouchableWithoutFeedback onPress={onFocusInput} >
        <View>
        <TextInput
          placeholder="start"
          editable={false}
          style={styles.containerInput}
        />
        </View>
      </TouchableWithoutFeedback>
        
        
      <Modal
        transparent={false}
        animationType="slide"
        visible={isSearchbarVisible}
        onRequestClose={closeModal}
        
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchbar}
              onIconPress={onSearchbarIconPress}
              
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    



    
  },


  label: {
    marginBottom: -9,
    
    fontSize: 16,
    backgroundColor:'#F4F4F4',
    zIndex: 1000,
    alignSelf: "center",
    paddingHorizontal:5,
  },

  containerInput: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 8,
    height: 63,
    width: 78,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    
  },
  searchbar: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
  
  input: {
    height: 60,
    paddingLeft: 10,
    fontSize: 16,
  },

 
});

export default IconPicker;



//value={selectedIcon}
//editable={false}