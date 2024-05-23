// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the orderDetails slice
const initialState = {};

// Creating a slice of the Redux store for managing order details related actions and state
export const orderDetailsSlice = createSlice({
  name: "orderDetails", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling order details request
    orderDetailsRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful order details retrieval
    orderDetailsSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.orderDetails = action.payload; // Setting retrieved order details from the action payload
    },
    // Reducer function for handling failed order details retrieval
    orderDetailsFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const { orderDetailsRequest, orderDetailsSuccess, orderDetailsFailure } =
  orderDetailsSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default orderDetailsSlice.reducer;
