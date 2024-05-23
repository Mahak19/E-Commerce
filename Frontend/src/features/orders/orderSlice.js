// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the order slice
const initialState = {};

// Creating a slice of the Redux store for managing order related actions and state
export const orderSlice = createSlice({
  name: "orders", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling order creation request
    createOrderRequest: (state, action) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful order creation
    createOrderSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.order = action.payload; // Setting created order details from the action payload
    },
    // Reducer function for handling failed order creation
    createOrderFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const { createOrderRequest, createOrderSuccess, createOrderFailure } =
  orderSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default orderSlice.reducer;
