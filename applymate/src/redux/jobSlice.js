import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  value: 0,
}

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    increment: (state) => {
   
      state.value += 1
    },
   
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, incrementByAmount } = jobSlice.actions

export default jobSlice.reducer