import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    modal: undefined, // This way we can use the same modal state for al modals but passing a string such as 'new_user_form' or 'input_calendar'
    errorModal: {
      isOpen: false,
      message: '',
    }
  },

  reducers: {
    setErrorModal: (state, action) => {
      if (action.payload.error) {
        state.errorModal = {
          isOpen: true,
          message: action.payload.error,
        }
      } else {
        state.errorModal = {
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
  setErrorModal,
  setModal,
} = generalSlice.actions;

export default generalSlice.reducer;