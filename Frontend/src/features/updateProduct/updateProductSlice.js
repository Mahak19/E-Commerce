// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the updateProduct slice
const initialState = {};

// Creating a slice of the Redux store for managing product update related actions and state
export const updateProductSlice = createSlice({
  name: "updateProduct", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling product update request
    updateProductRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful product update
    updateProductSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.message = action.payload; // Setting success message received from the action payload
    },
    // Reducer function for handling failed product update
    updateProductFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const {
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
} = updateProductSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default updateProductSlice.reducer;
