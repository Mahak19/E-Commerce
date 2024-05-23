import axios from "axios";
import {
  getReviewsFailure,
  getReviewsRequest,
  getReviewsSuccess,
} from "../features/getReviews/getReviewSlice";

// Function to fetch reviews for a specific product
const getReviews = (id) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of fetching reviews
    dispatch(getReviewsRequest());

    // Sending a GET request to fetch reviews for the specified product
    const { data } = await axios.get(`/api/api/v1/user/reviews?id=${id}`);

    // Dispatching an action upon successful fetching of reviews
    dispatch(
      getReviewsSuccess({
        reviews: data.reviews,
        numberOfReviews: data.numberOfReviews,
      })
    );
  } catch (error) {
    // Dispatching an action upon failure of fetching reviews
    dispatch(getReviewsFailure());
  }
};

// Exporting the getReviews function for use in other modules
export { getReviews };
