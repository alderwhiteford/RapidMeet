import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    email: '',
  },

  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    }
  },
});

export const { 
  setUser,
} = userSlice.actions;

export default userSlice.reducer;