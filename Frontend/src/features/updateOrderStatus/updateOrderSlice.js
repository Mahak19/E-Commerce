// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the updateOrder slice
const initialState = {};

// Creating a slice of the Redux store for managing order update related actions and state
export const updateOrderSlice = createSlice({
  name: "updateOrder", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling order status update request
    updateOrderStatusRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful order status update
    updateOrderStatusSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.message = action.payload; // Setting success message received from the action payload
    },
    // Reducer function for handling failed order status update
    updateOrderStatusFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const {
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
} = updateOrderSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default updateOrderSlice.reducer;
