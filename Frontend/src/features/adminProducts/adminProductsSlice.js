import { createSlice } from "@reduxjs/toolkit";

// Initial state for adminProductsSlice
const initialState = {};

// Creating adminProductsSlice using createSlice function from Redux Toolkit
export const adminProductsSlice = createSlice({
  name: "adminProducts", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer function to handle admin products request
    adminProductsRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle admin products success
    adminProductsSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.adminProducts = action.payload; // Set adminProducts to action payload
    },
    // Reducer function to handle admin products failure
    adminProductsFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.error = action.payload; // Set error to action payload
    },
  },
});

// Extracting action creators from adminProductsSlice
export const {
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFailure,
} = adminProductsSlice.actions;

// Exporting reducer function from adminProductsSlice
export default adminProductsSlice.reducer;
