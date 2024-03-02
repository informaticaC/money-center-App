import React, { useState } from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchInput = ({ onNameSearchChange, nameSearchTerm}) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre..."
        value={nameSearchTerm}
        onChangeText={onNameSearchChange}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});


export default SearchInput;
