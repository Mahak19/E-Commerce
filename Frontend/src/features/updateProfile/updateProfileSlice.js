// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the updateProfile slice
const initialState = {};

// Creating a slice of the Redux store for managing profile update related actions and state
export const updateProfileSlice = createSlice({
  name: "updateProfile", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling profile update request
    UpdateProfileRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful profile update
    UpdateProfileSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.message = action.payload; // Setting success message received from the action payload
    },
    // Reducer function for handling failed profile update
    UpdateProfileFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const {
  UpdateProfileRequest,
  UpdateProfileSuccess,
  UpdateProfileFailure,
} = updateProfileSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default updateProfileSlice.reducer;
