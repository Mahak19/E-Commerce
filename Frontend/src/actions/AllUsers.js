import axios from "axios";
import {
  allUsersFailure,
  allUsersRequest,
  allUsersSuccess,
} from "../features/AllUsers/AllUsersSlice";

// Function to fetch all users for admin
const getAllUsers = () => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of fetching all users for admin
    dispatch(allUsersRequest());

    // Sending a GET request to fetch all users from the server
    const { data } = await axios.get("/api/api/v1/admin/users");

    // Dispatching an action upon successful fetching of all users for admin
    dispatch(allUsersSuccess(data.user));
  } catch (error) {
    // Dispatching an action upon failure of fetching all users for admin
    dispatch(allUsersFailure(error.response.data.message));
  }
};

// Exporting the getAllUsers function for use in other modules
export { getAllUsers };
