import { createSlice } from '@reduxjs/toolkit';


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

  

