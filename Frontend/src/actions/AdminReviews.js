import axios from "axios";
import {
  adminReviewsFailure,
  adminReviewsRequest,
  adminReviewsSuccess,
} from "../features/adminReviews/adminReviewsSlice";

// Function to fetch all reviews for admin
const getAllReviewsAdmin = (productId) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of fetching all reviews for admin
    dispatch(adminReviewsRequest());

    // Sending a GET request to fetch all reviews for a specific product from the server
    const { data } = await axios.get(
      `/api/api/v1/user/reviews?id=${productId}`
    );

    // Dispatching an action upon successful fetching of all reviews for admin
    dispatch(adminReviewsSuccess(data.reviews));
  } catch (error) {
    // Dispatching an action upon failure of fetching all reviews for admin
    dispatch(adminReviewsFailure());
  }
};

// Exporting the getAllReviewsAdmin function for use in other modules
export { getAllReviewsAdmin };
