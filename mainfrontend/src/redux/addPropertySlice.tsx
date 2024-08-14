// src/features/property/propertySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to handle the property upload
export const uploadProperty = createAsyncThunk(
  'property/uploadProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/properties/', propertyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    properties: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProperty.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadProperty.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties.push(action.payload);
      })
      .addCase(uploadProperty.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
