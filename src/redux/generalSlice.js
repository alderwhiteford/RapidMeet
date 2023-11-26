import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    modalOpen: false,
  },

  reducers: {
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    }
  },
});

export const { 
  setModalOpen,
} = generalSlice.actions;

export default generalSlice.reducer;