import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define a type for the slice state

interface CouterState {
    value: number
}

// Define the initial state using that type

const initialState: CouterState = {
    value: 0
}

export const couterSlice = createSlice({
    name: 'couter',
    initialState,
    reducers: {

    }
})

export const {} = couterSlice.actions
export default couterSlice.reducer