import { createSlice } from "@reduxjs/toolkit";

// Initial state for authSlice
const initialState = {
  isAuthenticated: false,
};

// Creating authSlice using createSlice function from Redux Toolkit
export const authSlice = createSlice({
  initialState, // Initial state
  name: "auth", // Slice name
  reducers: {
    // Reducer function to handle login user request
    LoginUserRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle login user success
    LoginUserSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.isAuthenticated = true; // Set isAuthenticated to true
      state.user = action.payload; // Set user to action payload
    },
    // Reducer function to handle login user failure
    LoginUserFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.error = action.payload; // Set error to action payload
      state.isAuthenticated = false; // Set isAuthenticated to false
    },

    // Reducer function to handle register user request
    RegisterUserRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle register user success
    RegisterUserSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.isAuthenticated = true; // Set isAuthenticated to true
      state.user = action.payload; // Set user to action payload
    },
    // Reducer function to handle register user failure
    RegisterUserFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.isAuthenticated = false; // Set isAuthenticated to false
      state.error = action.payload; // Set error to action payload
    },

    // Reducer function to handle logout user request
    LogoutUserRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
      state.isAuthenticated = true; // Set isAuthenticated to true
    },
    // Reducer function to handle logout user success
    LogoutUserSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.isAuthenticated = false; // Set isAuthenticated to false
      state.message = action.payload; // Set message to action payload
    },
    // Reducer function to handle logout user failure
    LogoutUserFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.isAuthenticated = true; // Set isAuthenticated to true
      state.error = action.payload; // Set error to action payload
    },

    // Reducer function to handle forgot password request
    ForgotPasswordRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle forgot password success
    ForgotPasswordSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.message = action.payload; // Set message to action payload
    },
    // Reducer function to handle forgot password failure
    ForgotPasswordFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.error = action.payload; // Set error to action payload
    },

    // Reducer function to handle reset password request
    resetPasswordRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle reset password success
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.message = action.payload; // Set message to action payload
    },
    // Reducer function to handle reset password failure
    resetPasswordFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.error = action.payload; // Set error to action payload
    },

    // Reducer function to handle user profile request
    UserProfileRequest: (state) => {
      state.isLoading = true; // Set isLoading to true
    },
    // Reducer function to handle user profile success
    UserProfileSuccess: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.isAuthenticated = true; // Set isAuthenticated to true
      state.user = action.payload; // Set user to action payload
    },
    // Reducer function to handle user profile failure
    UserProfileFailure: (state, action) => {
      state.isLoading = false; // Set isLoading to false
      state.error = action.payload; // Set error to action payload
      state.isAuthenticated = false; // Set isAuthenticated to false
    },
  },
});

// Extracting action creators from authSlice
export const {
  LoginUserRequest,
  LoginUserSuccess,
  LoginUserFailure,
  RegisterUserRequest,
  RegisterUserSuccess,
  RegisterUserFailure,
  LogoutUserRequest,
  LogoutUserSuccess,
  LogoutUserFailure,
  ForgotPasswordRequest,
  ForgotPasswordSuccess,
  ForgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  UserProfileRequest,
  UserProfileSuccess,
  UserProfileFailure,
} = authSlice.actions;

// Exporting reducer function from authSlice
export default authSlice.reducer;
