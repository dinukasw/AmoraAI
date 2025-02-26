import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminData: null,
    loading: false,
    error: null,
    isAuthenticated: false
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        adminLoginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        adminLoginSuccess: (state, action) => {
            state.adminData = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        adminLoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        adminLogout: (state) => {
            state.adminData = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    }
});

export const {
    adminLoginStart,
    adminLoginSuccess, 
    adminLoginFailure,
    adminLogout
} = adminSlice.actions;

export default adminSlice.reducer;