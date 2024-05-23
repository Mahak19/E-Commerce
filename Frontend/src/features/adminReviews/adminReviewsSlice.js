import { createSlice } from "@reduxjs/toolkit";

// Initial state for adminReviewsSlice
const initialState = {};

// Creating adminReviewsSlice using createSlice function from Redux Toolkit
export const adminReviewsSlice = createSlice({
  name: "adminReviews", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer function to handle admin reviews request
    adminReviewsRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle admin reviews success
    adminReviewsSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.adminReviews = action.payload; // Set adminReviews to action payload
    },
    // Reducer function to handle admin reviews failure
    adminReviewsFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.error = action.payload; // Set error to action payload
    },
  },
});

// Extracting action creators from adminReviewsSlice
export const { adminReviewsRequest, adminReviewsSuccess, adminReviewsFailure } =
  adminReviewsSlice.actions;

// Exporting reducer function from adminReviewsSlice
export default adminReviewsSlice.reducer;
