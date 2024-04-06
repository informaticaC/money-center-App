import { createSlice } from '@reduxjs/toolkit';

const balanceSlice = createSlice ({
    name: 'balance',
    initialState: 0,
    reducers: {
       setBalance: (state, action) => { 
        return state = action.payload
    }
        
    }
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;