// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the updatePassword slice
const initialState = {};

// Creating a slice of the Redux store for managing password update related actions and state
export const updatePasswordSlice = createSlice({
  name: "updatePassword", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling password update request
    updatePasswordRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful password update
    updatePasswordSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.message = action.payload; // Setting success message received from the action payload
    },
    // Reducer function for handling failed password update
    updatePasswordFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const {
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,
} = updatePasswordSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default updatePasswordSlice.reducer;
