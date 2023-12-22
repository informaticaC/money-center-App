import { createSlice } from '@reduxjs/toolkit';

export const tokenslice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenslice.actions;
export const selectToken = (state) => state.auth.token;
export default tokenslice.reducer;
