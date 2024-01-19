import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  start_time: '',
  end_time: '',
  dates: [],
  users: {},
  availability: {},
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.start_time = action.payload.start_time;
      state.end_time = action.payload.end_time;
      state.dates = action.payload.dates;
      state.users = action.payload.users;
      state.availability = action.payload.availability;
    },
    resetSchedule: (state) => {
      Object.assign(state, initialState);
    }
  },
})

export const { 
  setSchedule,
  resetSchedule
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
