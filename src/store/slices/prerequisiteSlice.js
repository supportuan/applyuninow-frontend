// features/data/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { environment } from '../../environments/environment';

const BASE_URL = environment.API_BASE_URL;

export const fetchData = createAsyncThunk('data/fetchData', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/prerequisite`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const dataSlice = createSlice({
  name: 'prerequisite',
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default dataSlice.reducer;
