import axios from "axios";
import {
  deleteReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
} from "../features/adminDeleteReviews/deleteReviewsSlice";
import { toast } from "react-hot-toast";

// Function to delete a review for admin
const deleteReview = (productId, id) => async (dispatch) => {
  try {
    // Dispatching an action to indicate the start of the review deletion process
    dispatch(deleteReviewRequest());

    // Sending a DELETE request to delete the review
    const { data } = await axios.delete(
      `/api/api/v1/user/reviews?productId=${productId}&id=${id}`
    );

    // Dispatching an action upon successful deletion of the review
    dispatch(deleteReviewSuccess(data.message));

    // Displaying a success toast notification upon successful deletion of the review
    toast.success(data.message);
  } catch (error) {
    // Dispatching an action upon failure of the review deletion process
    dispatch(deleteReviewFailure());

    // Displaying an error toast notification upon failure of the review deletion process
    toast.error(data.message);
  }
};

// Exporting the deleteReview function for use in other modules
export { deleteReview };
