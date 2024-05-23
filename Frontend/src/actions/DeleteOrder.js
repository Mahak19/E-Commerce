import axios from "axios";
import {
  deleteOrderFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
} from "../features/deleteOrders/deleteOrderSlice";
import { toast } from "react-hot-toast";

// Function to delete an order for admin
const deleteOrders = (id) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of the order deletion process
    dispatch(deleteOrderRequest());

    // Sending a DELETE request to delete the order
    const { data } = await axios.delete(`/api/api/v1/admin/order/${id}`);

    // Dispatching an action upon successful deletion of the order
    dispatch(deleteOrderSuccess());

    // Displaying a success toast notification upon successful deletion of the order
    toast.success(data.message);
  } catch (error) {
    // Dispatching an action upon failure of the order deletion process
    dispatch(deleteOrderFailure(error.response.data.message));

    // Displaying an error toast notification upon failure of the order deletion process
    toast.error(error.response.data.message);
  }
};

// Exporting the deleteOrders function for use in other modules
export { deleteOrders };
