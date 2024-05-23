// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the deleteUser slice
const initialState = {};

// Creating a slice of the Redux store for managing user deletion related actions and state
export const deleteUserSlice = createSlice({
  name: "deleteUser", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling user deletion request
    deleteUserRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful user deletion
    deleteUserSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.message = action.payload; // Setting success message received from the action payload
    },
    // Reducer function for handling failed user deletion
    deleteUserFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const { deleteUserRequest, deleteUserSuccess, deleteUserFailure } =
  deleteUserSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default deleteUserSlice.reducer;
