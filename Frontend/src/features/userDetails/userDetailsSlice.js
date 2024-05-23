// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the userDetails slice
const initialState = {};

// Creating a slice of the Redux store for managing user details related actions and state
export const userDetailsSlice = createSlice({
  name: "userDetails", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling user details retrieval request
    getUserDetailsRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful user details retrieval
    getUserDetailsSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.userDetails = action.payload; // Setting retrieved user details from the action payload
    },
    // Reducer function for handling failed user details retrieval
    getUserDetailsFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const {
  getUserDetailsRequest,
  getUserDetailsSuccess,
  getUserDetailsFailure,
} = userDetailsSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default userDetailsSlice.reducer;
