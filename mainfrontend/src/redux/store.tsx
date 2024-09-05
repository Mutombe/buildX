import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import propertyReducer from "./propertySlice"
import categoryReducer from './categorySlice';
import unitReducer from "./unitSlice"
import bookingReducer from "./bookingSlice"

const store: any = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    categories: categoryReducer,
    units: unitReducer,
    bookings: bookingReducer,
  },
});

export default store;
