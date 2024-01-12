import { configureStore } from '@reduxjs/toolkit'
import generalReducer from './generalSlice';
import scheduleReducer from './scheduleSlice';
import userReducer from './userSlice';
import { saveState, loadState } from './localstorage';

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    general: generalReducer,
    schedule: scheduleReducer,
    user: userReducer,
    persistedState,
  },
});

store.subscribe(() => {
  saveState(store.getState());
});
