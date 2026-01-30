// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/prerequisiteSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
