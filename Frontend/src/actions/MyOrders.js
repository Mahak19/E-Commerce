import axios from "axios";
import {
  myOrdersFailure,
  myOrdersRequest,
  myOrdersSuccess,
} from "../features/myOrders/myOrdersSlice";
import {
  orderDetailsFailure,
  orderDetailsRequest,
  orderDetailsSuccess,
} from "../features/orderDetails/orderDetailsSlice";

// Function to fetch orders of the current user
const getMyOrders = () => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of fetching user's orders
    dispatch(myOrdersRequest());

    // Sending a GET request to fetch user's orders
    const { data } = await axios.get("/api/api/v1/user/orders");

    // Dispatching an action upon successful fetching of user's orders
    dispatch(myOrdersSuccess(data.orders));
  } catch (error) {
    // Dispatching an action upon failure of fetching user's orders
    dispatch(myOrdersFailure(error.response.data.message));
  }
};

// Function to fetch details of a specific order
const getOrderDetails = (id) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of fetching order details
    dispatch(orderDetailsRequest());

    // Sending a GET request to fetch order details
    const { data } = await axios.get(`/api/api/v1/order/${id}`);

    // Dispatching an action upon successful fetching of order details
    dispatch(orderDetailsSuccess(data.order));
  } catch (error) {
    // Dispatching an action upon failure of fetching order details
    dispatch(orderDetailsFailure(error.response.data.message));
  }
};

// Exporting the getMyOrders and getOrderDetails functions for use in other modules
export { getMyOrders, getOrderDetails };
