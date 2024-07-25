import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils/baseApiUtil";

export const loginUser = createAsyncThunk(
    '/login',
    async (username, password) => {
        const request = await client.post("/login", { username: username, password: password });
        const response = request.data.data;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
);

const userSlice: any = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        isLoggedIn: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.isLoggedIn = false;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                console.log(action.error.message);
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Access Denied ! Invalid Credentials';
                } else {
                    state.error = action.error.message;
                }
            })
    }
});

export default userSlice.reducer;