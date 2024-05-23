import axios from "axios";
import {
  updateUserRoleFailure,
  updateUserRoleRequest,
  updateUserRoleSuccess,
} from "../features/updateUserRole/userRoleSlice";

// Function to update user role for admin
const updateUserRole = (id, role) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of updating user role
    dispatch(updateUserRoleRequest());

    // Sending a PUT request to update user role
    const { data } = await axios.put(
      `/api/api/v1/admin/user/${id}`,
      {
        role: role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensuring credentials are sent with the request
      }
    );

    // Dispatching an action upon successful updating of user role
    dispatch(updateUserRoleSuccess(data.message));
  } catch (error) {
    // Dispatching an action upon failure of updating user role
    dispatch(updateUserRoleFailure(error.response.data.message));
  }
};

// Exporting the updateUserRole function for use in other modules
export { updateUserRole };
