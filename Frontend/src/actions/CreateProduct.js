import axios from "axios";
import {
  createProductFailure,
  createProductRequest,
  createProductSuccess,
} from "../features/createProduct/createProductSlice";
import { toast } from "react-hot-toast";

// Function to create a new product for admin
const createProduct = (formData) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of the product creation process
    dispatch(createProductRequest());

    // Sending a POST request to create a new product
    const { data } = await axios.post(
      "/api/api/v1/admin/product/new",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensuring credentials are sent with the request
      }
    );

    // Dispatching an action upon successful creation of the product
    dispatch(createProductSuccess(data.message));

    // Displaying a success toast notification upon successful creation of the product
    toast.success(data.message);
  } catch (error) {
    // Dispatching an action upon failure of the product creation process
    dispatch(createProductFailure(error.response.data.message));

    // Displaying an error toast notification upon failure of the product creation process
    toast.error(error.response.data.message);
  }
};

// Exporting the createProduct function for use in other modules
export { createProduct };
