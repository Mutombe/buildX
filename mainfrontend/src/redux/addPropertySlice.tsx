import {createProperty} from '../utils/api';
import { createSlice } from '@reduxjs/toolkit';


const addPropertySlice = createSlice({
    name: 'properties',
    initialState: {
        properties: [],
        //units: [],
        loading: false,
        success: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProperty.fulfilled, (state, action: any) => {
                state.properties.push(action.payload);
                console.log(action.payload)
            })

    },
});

export default addPropertySlice.reducer;
