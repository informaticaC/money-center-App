import { createSlice } from '@reduxjs/toolkit';

const incomeSlice = createSlice({
    name: 'incomes',
    initialState: 0,
    reducers:{
        
        setIncome: (state, action) => (state = action.payload)
        
    }
});

export const { setIncome } = incomeSlice.actions;
export default incomeSlice.reducer;