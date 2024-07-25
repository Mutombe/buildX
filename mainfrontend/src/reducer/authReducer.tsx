import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
