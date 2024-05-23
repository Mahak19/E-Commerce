// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the myOrders slice
const initialState = {};

// Creating a slice of the Redux store for managing user orders related actions and state
export const myOrdersSlice = createSlice({
  name: "myOrders", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling user orders request
    myOrdersRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful user orders retrieval
    myOrdersSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.orders = action.payload; // Setting retrieved orders from the action payload
    },
    // Reducer function for handling failed user orders retrieval
    myOrdersFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const { myOrdersRequest, myOrdersSuccess, myOrdersFailure } =
  myOrdersSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default myOrdersSlice.reducer;
