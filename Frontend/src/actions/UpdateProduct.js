import axios from "axios";
import {
  updateProductFailure,
  updateProductRequest,
  updateProductSuccess,
} from "../features/updateProduct/updateProductSlice";

import { toast } from "react-hot-toast";

// Function to update a product for admin
const UpdateProducts = (id, formData) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of updating the product
    dispatch(updateProductRequest());

    // Sending a PUT request to update the product
    const { data } = await axios.put(
      `/api/api/v1/admin/product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensuring credentials are sent with the request
      }
    );
    // Dispatching an action upon successful updating of the product
    dispatch(updateProductSuccess(data.message));

    // Displaying a success toast notification upon successful updating of the product
    toast.success(data.message);
  } catch (error) {
    // Dispatching an action upon failure of updating the product
    dispatch(updateProductFailure(error.response.data.message));

    // Displaying an error toast notification upon failure of updating the product
    toast.error(error.response.data.message);
  }
};

// Exporting the UpdateProducts function for use in other modules
export { UpdateProducts };
