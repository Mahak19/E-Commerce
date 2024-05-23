import axios from "axios";
import {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
} from "../features/orders/orderSlice";

const createNewOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());

    const { data } = await axios.post("/api/api/v1/order/new", order, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFailure(error.response.data.message));
  }
};

export { createNewOrder };
