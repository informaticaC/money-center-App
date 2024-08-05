import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import IncomeForm from '../../screens/IncomeForm';
//import { LinearGradient } from 'expo-linear-gradient';

const ModalDeleteEdit = ({modalVisible, setModalVisible, item, whatEdit, setModalWarningVisible}) => {
	//console.log('do you want to do something with: ', item)
  const navigation = useNavigation();

  const handleEdit = () => {

    setModalVisible(false);
    if (whatEdit === 'income') navigation.navigate('IncomeEdit', {itemId: item, mode: "edit"});
    if (whatEdit === 'expense') navigation.navigate('ExpenseForm', {itemId: item, mode: "edit"});
    
  }

  const handleDelete = () => {
    setModalVisible(false);
    setModalWarningVisible(true);

  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>

        <View style={styles.modalView}>
          <TouchableOpacity style={[{ flexDirection: 'row'}, {gap: 5}, {alignContent: 'flex-start' }]} onPress={handleEdit} >
            <MaterialIcons name="mode-edit-outline" size={24} color="black" />
            <Text style={styles.modalText}>Editar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[{ flexDirection: 'row'}, {gap: 5}]} onPress={handleDelete}>
            <MaterialIcons name="delete-outline" size={24} color="red" /> 
            <Text style={[styles.modalText,{color: 'red'}]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    //modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 5,
    marginTop: 22,
  },
  modalView: {
    gap: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 22,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity: 0.95
  },
    
  modalText: {
    textAlign: 'left',
    fontFamily: 'UrbanistBold',
    fontSize: 17,
    
  },
 
})

export default ModalDeleteEdit