import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/baseApiUtil';

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
      const response = await api.get("/categories/");
      return response.data;
    }
  );

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
