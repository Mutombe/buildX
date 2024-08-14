import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup, logout, fetchUser } from "../utils/api";

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

export const fetchUserData = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUser();
      console.log(response)
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;