import { createSlice } from "@reduxjs/toolkit";

// Initial state for AllUserSlice
const initialState = {};

// Creating AllUserSlice using createSlice function from Redux Toolkit
export const AllUserSlice = createSlice({
  name: "allUsers", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer function to handle all users request
    allUsersRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle all users success
    allUsersSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.users = action.payload; // Set users to action payload
    },
    // Reducer function to handle all users failure
    allUsersFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.error = action.payload; // Set error to action payload
    },
  },
});

// Extracting action creators from AllUserSlice
export const { allUsersRequest, allUsersSuccess, allUsersFailure } =
  AllUserSlice.actions;

// Exporting reducer function from AllUserSlice
export default AllUserSlice.reducer;
