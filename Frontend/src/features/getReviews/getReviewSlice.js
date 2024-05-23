// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the getReviews slice
const initialState = {};

// Creating a slice of the Redux store for managing review retrieval related actions and state
export const getReviewSlice = createSlice({
  name: "getReviews", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling review retrieval request
    getReviewsRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful review retrieval
    getReviewsSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.reviews = action.payload.reviews; // Setting retrieved reviews from the action payload
      state.numberOfReviews = action.payload.numberOfReviews; // Setting number of retrieved reviews
    },
    // Reducer function for handling failed review retrieval
    getReviewsFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const { getReviewsRequest, getReviewsSuccess, getReviewsFailure } =
  getReviewSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default getReviewSlice.reducer;
