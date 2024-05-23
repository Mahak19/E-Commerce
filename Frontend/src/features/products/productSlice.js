// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

// Initializing initial state for the product slice
const initialState = {};

// Creating a slice of the Redux store for managing product related actions and state
export const productSlice = createSlice({
  name: "product", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function for handling products retrieval request
    getProductsRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful products retrieval
    getProductsSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      // Setting retrieved products, product count, result per page, and filtered products count from the action payload
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    // Reducer function for handling failed products retrieval
    getProductsFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },

    // Reducer function for handling product details retrieval request
    getProductDetailRequest: (state) => {
      state.isLoading = true; // Setting isLoading flag to true to indicate request is in progress
    },
    // Reducer function for handling successful product details retrieval
    getProductDetailSuccess: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.productDetail = action.payload; // Setting retrieved product details from the action payload
    },
    // Reducer function for handling failed product details retrieval
    getProductDetailFailure: (state, action) => {
      state.isLoading = false; // Setting isLoading flag to false as request is completed
      state.error = action.payload; // Setting error message received from the action payload
    },
  },
});

// Exporting action creators for the defined reducers
export const {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
} = productSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default productSlice.reducer;
