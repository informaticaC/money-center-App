import { createSlice } from '@reduxjs/toolkit';


export const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers: (state, action) =>  { return state = action.payload },
    
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

  

