import { createSlice } from '@reduxjs/toolkit';

const incomeSlice = createSlice({
    name: 'income',
    initialState: {},
    reducers:{
        setIncome: (state, action) => (state = action.payload)
    }
});

export const { setIncome } = incomeSlice.actions;
export default incomeSlice.reducer;