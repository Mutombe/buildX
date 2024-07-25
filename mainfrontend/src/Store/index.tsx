import { configureStore } from "@reduxjs/toolkit";
import useReducer from './useSlice'

const store = configureStore({
    reducer: {
        user: useReducer
    }
});
 
export default store;