import { createSlice } from '@reduxjs/toolkit'

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    id: '',
    name: '',
    start_time: '',
    end_time: '',
    dates: [],
    users: {},
    availability: {},
    optimalTimes: []
  },

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
    setOptimalTimes: (state, action) => {
      state.optimalTimes = action.payload
    }
  },
})

export const { 
  setSchedule,
  setOptimalTimes,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
