import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("login", credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("signup", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("logout");
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,
    loading: false,
    success: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
            state.user = null;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.success = true;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(login.rejected, (state: any, action) => {
        state.error = action.payload;
        state.token = null;
        state.loading = false;
        console.log(action.error.message);
        if (action.error.code = '400') {
          state.error = "Access Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.success = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state: any, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { setUser, setToken, clearAuth } = authSlice.actions;

export default authSlice.reducer;
