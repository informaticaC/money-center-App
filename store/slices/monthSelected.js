import { createSlice } from "@reduxjs/toolkit";

const monthSelectedSlice = createSlice ({
    name: 'monthSelected',
    initialState: 1,
    reducers: {
        setMonthSelected: (state, action) => {
            return state = action.payload
        }
    },
});

export const { setMonthSelected } = monthSelectedSlice.actions; 
export default monthSelectedSlice.reducer;
