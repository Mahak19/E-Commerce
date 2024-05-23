import axios from "axios";
import {
  addReviewFailure,
  addReviewRequest,
  addReviewSuccess,
} from "../features/reviews/reviewSlice";
import { toast } from "react-hot-toast";

// Function to add a review for a product by a user
const addUserReview = (id, ratings, comments) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of the review addition process
    dispatch(addReviewRequest());

    // Sending a PUT request to the server to add or update the user's review
    const { data } = await axios.put(
      "/api/api/v1/user/review",
      {
        productId: id,
        rating: ratings,
        comment: comments,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensuring credentials are sent with the request
      }
    );

    // Dispatching an action upon successful addition of the review
    dispatch(addReviewSuccess(data.message));
    // Displaying a success toast notification upon successful addition of the review
    toast.success(data.message);
  } catch (error) {
    // Dispatching an action upon failure of the review addition process
    dispatch(addReviewFailure(error.response.data.message));
    // Displaying an error toast notification upon failure of the review addition process
    toast.error(error.response.data.message);
  }
};

// Exporting the addUserReview function for use in other modules
export { addUserReview };
