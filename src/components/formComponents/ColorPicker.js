import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ColorPicker = ({ onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FF0000'); // Color por defecto
  const [searchQuery, setSearchQuery] = useState('');

  const colors = [
    { key: '#FF0000', label: 'Red' },
    { key: '#00FF00', label: 'Green' },
    { key: '#0000FF', label: 'Blue' },
    // Agrega más colores según sea necesario
  ];

  const filteredColors = colors.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderColorItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleColorSelect(item.key)}>
      <View
        style={{
          backgroundColor: item.key,
          width: 30,
          height: 30,
          borderRadius: 15,
          margin: 5,
        }}
      />
    </TouchableOpacity>
  );

  const handleColorSelect = color => {
    setSelectedColor(color);
    setModalVisible(false);
    onSelect(selectedColor);
  };

  return (
    <View>
      <Text style={styles.label}>Color</Text>
      <TouchableOpacity style={styles.containerButton} onPress={() => setModalVisible(true)}>
        <View name={selectedColor} style={[styles.colorButton, { backgroundColor: selectedColor }]} />
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
              <Icon name="search" size={20} color="#4A4A4A" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={text => setSearchQuery(text)}
              />
            </View>
            <FlatList
              data={filteredColors}
              renderItem={renderColorItem}
              keyExtractor={item => item.key}
              horizontal={true}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#B00020', marginTop: 20, alignSelf: 'center' }}>Close</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 1000,
    alignSelf: 'center',
    paddingHorizontal: 5,
  },

  containerButton: {
    borderWidth: 1,
    borderColor: '#4A4A4A',
    borderRadius: 8,
    
    height: 62,
    width: 76,
  },

  colorButton: {
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: 15,
    height: 30,
    width: 30,
  },

  modalContainer: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },

  modalContent: {
    width: 230,
    height: 230,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 80,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  containerInput: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    gap: 8,
    backgroundColor: 'rgba(228, 228, 228, 1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInput: {
    height: 35,
    width: '70%',
  },

  searchIcon: {},
});

export default ColorPicker;
