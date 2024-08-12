import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice"
import categoryReducer from './categorySlice';

const store: any = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    categories: categoryReducer,
  },
});

export default store;
