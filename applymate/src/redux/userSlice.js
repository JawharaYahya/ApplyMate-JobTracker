import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  role: 'user' 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.role = action.payload.role || 'user';
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.role = 'user';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;