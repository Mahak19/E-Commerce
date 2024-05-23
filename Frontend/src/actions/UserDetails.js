import axios from "axios";
import {
  getUserDetailsFailure,
  getUserDetailsRequest,
  getUserDetailsSuccess,
} from "../features/userDetails/userDetailsSlice";

// Function for fetching user details
const getUserDetails = (id) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of fetching user details
    dispatch(getUserDetailsRequest());

    // Sending a GET request to fetch user details by ID
    const { data } = await axios.get(`/api/api/v1/admin/user/${id}`);

    // Dispatching an action upon successful fetching of user details
    dispatch(getUserDetailsSuccess(data.user));
  } catch (error) {
    // Dispatching an action upon failure of fetching user details
    dispatch(getUserDetailsFailure(error.response.data.message));
  }
};

// Exporting the function
export { getUserDetails };
