import axios from "axios";
import {
  allOrdersFailure,
  allOrdersRequest,
  allOrdersSuccess,
} from "../features/ordersAdmin/ordersAdminSlice";

// Function to fetch all orders for admin
const getAllOrders = () => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of fetching all orders for admin
    dispatch(allOrdersRequest());

    // Sending a GET request to fetch all orders from the server
    const { data } = await axios.get("/api/api/v1/admin/orders");

    // Dispatching an action upon successful fetching of all orders for admin
    dispatch(
      allOrdersSuccess({
        adminOrders: data.orders,
        totalRevenue: data.totalAmount,
      })
    );
  } catch (error) {
    // Dispatching an action upon failure of fetching all orders for admin
    dispatch(allOrdersFailure(error.response.data.message));
  }
};

// Exporting the getAllOrders function for use in other modules
export { getAllOrders };
