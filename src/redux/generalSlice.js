import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    modal: undefined,
    successModal: {
      isOpen: false,
      message: '',
    }
  },

  reducers: {
    setSuccessModal: (state, action) => {
      if (action.payload) {
        state.successModal = {
          isOpen: true,
          message: action.payload.message,
        }
      } else {
        state.successModal = {
          isOpen: false,
          message: '',
        }
      }
    },
    setModal: (state, action) => {
      if (action.payload) {
        state.modal = action.payload;
      } else {
        state.modal = undefined;
      }
    }
  },
});

export const { 
  setSuccessModal,
  setModal,
} = generalSlice.actions;

export default generalSlice.reducer;