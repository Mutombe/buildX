import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice"

const store: any = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
  },
});

export default store;
