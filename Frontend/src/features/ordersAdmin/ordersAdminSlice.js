// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the ordersAdmin slice
const initialState = {};

// Creating a slice of the Redux store for managing admin orders related actions and state
export const ordersAdminSlice = createSlice({
  name: "ordersAdmin", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling admin orders request
    allOrdersRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful admin orders retrieval
    allOrdersSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.adminOrders = action.payload.adminOrders; // Setting retrieved admin orders from the action payload
      state.totalRevenue = action.payload.totalRevenue; // Setting total revenue from the action payload
    },
    // Reducer function for handling failed admin orders retrieval
    allOrdersFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const { allOrdersRequest, allOrdersSuccess, allOrdersFailure } =
  ordersAdminSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default ordersAdminSlice.reducer;
