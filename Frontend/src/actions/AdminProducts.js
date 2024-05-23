import axios from "axios";
import {
  adminProductsFailure,
  adminProductsRequest,
  adminProductsSuccess,
} from "../features/adminProducts/adminProductsSlice";

// Function to fetch admin products
const getAdminProducts = () => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of fetching admin products
    dispatch(adminProductsRequest());

    // Sending a GET request to fetch admin products from the server
    const { data } = await axios.get("/api/api/v1/admin/products");

    // Dispatching an action upon successful fetching of admin products
    dispatch(adminProductsSuccess(data.products));
  } catch (error) {
    // Dispatching an action upon failure of fetching admin products
    dispatch(adminProductsFailure(error.response.data.message));
  }
};

// Exporting the getAdminProducts function for use in other modules
export { getAdminProducts };
