import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice"
import categoryReducer from './categorySlice';
import unitReducer from "./unitSlice"

const store: any = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    categories: categoryReducer,
    units: unitReducer,
  },
});

export default store;
