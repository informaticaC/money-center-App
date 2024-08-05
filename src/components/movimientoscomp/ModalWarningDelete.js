import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const ModalWarningDelete = ({modalWarningVisible, setModalWarningVisible}) => {

  const handlePressCancel = () => {
    console.log('Borrar registro');
    setModalWarningVisible(false);
  }

  const handlePressDelete = () => {
    console.log('Borrar registro');
    setModalWarningVisible(false);
    
  }

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalWarningVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalWarningVisible);
    }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <TouchableOpacity  onPress={handlePress} >
              <Text style={styles.modalText} >
                Borrar registro
              </Text>
            </TouchableOpacity> */}
            <View style={styles.buttonContainer} >
            <TouchableOpacity  onPress={handlePressDelete} style={styles.button}>
              <Text style={styles.modalText} >
                Si, borrar.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={handlePressCancel} style={[styles.button, { backgroundColor: 'green'}]}>
              <Text style={styles.modalText} >
                Cancelar
              </Text>
            </TouchableOpacity>
            </View>

          </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  modalView: {
    gap: 20,
    margin: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    padding: 5,
  },
  button:{
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  }
})

export default ModalWarningDelete