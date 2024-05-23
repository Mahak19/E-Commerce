// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the userRole slice
const initialState = {};

// Creating a slice of the Redux store for managing user role update related actions and state
export const userRoleSlice = createSlice({
  name: "userRole", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling user role update request
    updateUserRoleRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful user role update
    updateUserRoleSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.message = action.payload; // Setting success message received from the action payload
    },
    // Reducer function for handling failed user role update
    updateUserRoleFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const {
  updateUserRoleRequest,
  updateUserRoleSuccess,
  updateUserRoleFailure,
} = userRoleSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default userRoleSlice.reducer;
