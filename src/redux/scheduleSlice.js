import { createSlice } from '@reduxjs/toolkit'

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    id: '',
    name: '',
    start_time: '',
    end_time: '',
    users: {},
    availability: {}
  },

  reducers: {
    setSchedule: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.start_time = action.payload.start_time;
      state.end_time = action.payload.end_time;
      state.users = action.payload.users;
      state.availability = action.payload.availability;
    },
  },
})

export const { setSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
