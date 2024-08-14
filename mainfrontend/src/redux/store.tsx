import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice"
import addPropertyReducer from "./addPropertySlice"
import categoryReducer from './categorySlice';

const store: any = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    categories: categoryReducer,
    addproperties: addPropertyReducer
  },
});

export default store;
