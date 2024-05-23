import axios from "axios";
import {
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
} from "../features/deleteUser/deleteUsersSlice";

// Function to delete a user for admin
const deleteUsers = (id) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of the user deletion process
    dispatch(deleteUserRequest());

    // Sending a DELETE request to delete the user
    const { data } = await axios.delete(`/api/api/v1/admin/user/${id}`);

    // Dispatching an action upon successful deletion of the user
    dispatch(deleteUserSuccess(data.message));
  } catch (error) {
    // Dispatching an action upon failure of the user deletion process
    dispatch(deleteUserFailure(error.response.data.message));
  }
};

// Exporting the deleteUsers function for use in other modules
export { deleteUsers };
