import { configureStore } from '@reduxjs/toolkit'
import scheduleReducer from './scheduleSlice';

export const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
  },
});
