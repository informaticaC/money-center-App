import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usersSlice = createSlice({
  name: 'users',
  initialState: null,
 reducers: {
    setUsers: (state, action) => { 
      return action.payload;
      // Guardar en AsyncStorage
     // AsyncStorage.setItem('@userData', JSON.stringify(action.payload));
    },
    // ... otras acciones
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

  

