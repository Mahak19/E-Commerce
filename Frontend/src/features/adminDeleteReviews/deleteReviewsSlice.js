import { createSlice } from "@reduxjs/toolkit";

// Initial state for deleteReviewSlice
const initialState = {};

// Creating deleteReviewSlice using createSlice function from Redux Toolkit
export const deleteReviewSlice = createSlice({
  name: "deleteReviews", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer function to handle delete review request
    deleteReviewRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle delete review success
    deleteReviewSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.message = action.payload; // Set message to action payload
    },
    // Reducer function to handle delete review failure
    deleteReviewFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.error = action.payload; // Set error to action payload
    },
  },
});

// Extracting action creators from deleteReviewSlice
export const { deleteReviewRequest, deleteReviewSuccess, deleteReviewFailure } =
  deleteReviewSlice.actions;

// Exporting reducer function from deleteReviewSlice
export default deleteReviewSlice.reducer;
