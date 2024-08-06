import { createSlice} from '@reduxjs/toolkit';
import { fetchProperties, fetchUserProperties, createProperty, deleteProperty, updateProperty, fetchUnits } from '../utils/api';

const propertySlice = createSlice({
    name: 'properties',
    initialState: {
        properties: [],
        userProperties: [],
        units: [],
        loading: false,
        success: false,
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
                state.success = true;
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state:any, action) => {
                state.loading = false;
                state.success = false
                state.error = action.payload;
            })
            .addCase(fetchUnits.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUnits.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.units = action.payload;
            })
            .addCase(fetchUnits.rejected, (state: any, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(fetchUserProperties.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.userProperties = action.payload;
            })
            .addCase(fetchUserProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProperty.fulfilled, (state, action: any) => {
                state.userProperties.push(action.payload);
            })
            .addCase(updateProperty.fulfilled, (state: any, action) => {
                const index = state.userProperties.findIndex((property: any) => property.id === action.payload.id);
                if (index !== -1) {
                    state.userProperties[index] = action.payload;
                }
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.userProperties = state.userProperties.filter((property: any) => property.id !== action.payload);
            });
    },
});

export default propertySlice.reducer;
