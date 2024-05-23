import axios from "axios";
import {
  deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
} from "../features/deleteProducts/deleteProductSlice";
import { toast } from "react-hot-toast";

// Function to delete a product for admin
const deleteProduct = (id) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of the product deletion process
    dispatch(deleteProductRequest());

    // Sending a DELETE request to delete the product
    const { data } = await axios.delete(`/api/api/v1/admin/product/${id}`);

    // Dispatching an action upon successful deletion of the product
    dispatch(deleteProductSuccess(data.message));

    // Displaying a success toast notification upon successful deletion of the product
    toast.success(data.message);
  } catch (error) {
    // Dispatching an action upon failure of the product deletion process
    dispatch(deleteProductFailure(error.response.data.message));

    // Displaying an error toast notification upon failure of the product deletion process
    toast.error(error.response.data.message);
  }
};

// Exporting the deleteProduct function for use in other modules
export { deleteProduct };
