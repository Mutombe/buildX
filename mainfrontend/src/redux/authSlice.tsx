import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup, logout } from "../utils/api";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await login(credentials.username, credentials.password);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSignup = createAsyncThunk(
  "auth/signup",
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await signup(userData.username, userData.email, userData.password);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem("token") || null,
    error: null,
    loading: false,
  },
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        console.log("Login", state.error)
        state.loading = false;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", action.payload.user);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.error =  action.payload.email|| action.payload.username || action.payload.password;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;