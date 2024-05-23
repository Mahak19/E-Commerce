// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the stripeApiKey slice
const initialState = {};

// Creating a slice of the Redux store for managing the Stripe API key related actions and state
export const stripeApiKeySlice = createSlice({
  name: "stripeApiKey", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for setting the Stripe API key
    STRIPE_API_KEY: (state, action) => {
      state.apiKey = action.payload; // Setting the Stripe API key from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const { STRIPE_API_KEY } = stripeApiKeySlice.actions;

// Exporting the reducer function to be used in the Redux store
export default stripeApiKeySlice.reducer;
