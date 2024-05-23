import axios from "axios";
import { toast } from "react-hot-toast";
import {
  ForgotPasswordFailure,
  ForgotPasswordRequest,
  ForgotPasswordSuccess,
  LoginUserFailure,
  LoginUserRequest,
  LoginUserSuccess,
  LogoutUserFailure,
  LogoutUserRequest,
  LogoutUserSuccess,
  RegisterUserFailure,
  RegisterUserRequest,
  RegisterUserSuccess,
  UserProfileFailure,
  UserProfileRequest,
  UserProfileSuccess,
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
} from "../features/auth/authSlice";
import {
  UpdateProfileFailure,
  UpdateProfileRequest,
  UpdateProfileSuccess,
} from "../features/updateProfile/updateProfileSlice";
import {
  updatePasswordFailure,
  updatePasswordRequest,
  updatePasswordSuccess,
} from "../features/updatePassword/updatePasswordSlice";

// Register a new user
const RegisterUser =
  (firstName, lastName, dob, avatar, email, password) => async (dispatch) => {
    try {
      dispatch(RegisterUserRequest());
      const { data } = await axios.post(
        "/api/api/v1/user/new",
        {
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          avatar: avatar,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(RegisterUserSuccess(data.result));
      toast.success(data.message);
    } catch (error) {
      dispatch(RegisterUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

// Log in a user
const LoginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(LoginUserRequest());
    const { data } = await axios.post(
      "/api/api/v1/user/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(LoginUserSuccess(data.user));
    toast.success(data.message);
  } catch (error) {
    dispatch(LoginUserFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

// Log out a user
const LogoutUser = () => async (dispatch) => {
  try {
    dispatch(LogoutUserRequest());
    const { data } = await axios.get("/api/api/v1/user/logout");
    dispatch(LogoutUserSuccess(data.message));
    toast.success(data.message);
  } catch (error) {
    dispatch(LogoutUserFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

// Forgot user password
const ForgotUserPassword = (email) => async (dispatch) => {
  try {
    dispatch(ForgotPasswordRequest());

    const { data } = await axios.post(
      "/api/api/v1/forgot/password",
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(ForgotPasswordSuccess(data.message));
    toast(data.message, {
      duration: 6000,
    });
  } catch (error) {
    dispatch(ForgotPasswordFailure(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

// Reset user password
const ResetUserPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());
      const { data } = await axios.put(
        `/api/api/v1/reset/password/${token}`,
        {
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(resetPasswordSuccess(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(resetPasswordFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

// Get User Profile
const UserProfile = () => async (dispatch) => {
  try {
    dispatch(UserProfileRequest());

    const { data } = await axios.get("/api/api/v1/user/profile");
    dispatch(UserProfileSuccess(data.user));
  } catch (error) {
    dispatch(UserProfileFailure(error.response.data.message));
  }
};

// Update user password
const UpdateUserPassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch(updatePasswordRequest());
      const { data } = await axios.put(
        "/api/api/v1/user/update/password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(updatePasswordSuccess(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(updatePasswordFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

// Update User Profile
const UpdateUserProfile =
  (firstName, lastName, email, avatar) => async (dispatch) => {
    try {
      dispatch(UpdateProfileRequest());
      const { data } = await axios.put(
        "/api/api/v1/user/update/profile",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          avatar: avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(UpdateProfileSuccess(data.message));
      toast.success(data.message);
    } catch (error) {
      dispatch(UpdateProfileFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };

export {
  ForgotUserPassword,
  LoginUser,
  LogoutUser,
  RegisterUser,
  ResetUserPassword,
  UserProfile,
  UpdateUserPassword,
  UpdateUserProfile,
};
