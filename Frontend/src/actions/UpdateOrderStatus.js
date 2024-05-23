import axios from "axios";
import {
  updateOrderStatusFailure,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
} from "../features/updateOrderStatus/updateOrderSlice";
import { toast } from "react-hot-toast";

// Function to update the status of an order for admin
const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of updating the order status
    dispatch(updateOrderStatusRequest());

    // Sending a PUT request to update the order status
    const { data } = await axios.put(
      `/api/api/v1/admin/order/${id}`,
      {
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensuring credentials are sent with the request
      }
    );

    // Dispatching an action upon successful update of the order status
    dispatch(updateOrderStatusSuccess(data.message));

    // Displaying a success toast notification upon successful update of the order status
    toast.success(data.message);
  } catch (error) {
    // Dispatching an action upon failure of updating the order status
    dispatch(updateOrderStatusFailure(error.response.data.message));

    // Displaying an error toast notification upon failure of updating the order status
    toast.error(error.response.data.message);
  }
};

// Exporting the updateOrderStatus function for use in other modules
export { updateOrderStatus };
