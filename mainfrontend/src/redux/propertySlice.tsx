import { createSlice} from '@reduxjs/toolkit';
import { fetchProperties, fetchUserProperties, createProperty, deleteProperty, updateProperty } from '../utils/api';

const propertySlice = createSlice({
    name: 'properties',
    initialState: {
        properties: [],
        userProperties: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserProperties.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.userProperties = action.payload;
            })
            .addCase(fetchUserProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProperty.fulfilled, (state, action) => {
                state.userProperties.push(action.payload);
            })
            .addCase(updateProperty.fulfilled, (state, action) => {
                const index = state.userProperties.findIndex((property) => property.id === action.payload.id);
                if (index !== -1) {
                    state.userProperties[index] = action.payload;
                }
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.userProperties = state.userProperties.filter((property) => property.id !== action.payload);
            });
    },
});

export default propertySlice.reducer;
