import { DataGrid } from "@mui/x-data-grid"; // Importing DataGrid component from MUI library
import React, { useState } from "react"; // Importing React and useState hook
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import Metadata from "../../Metadata"; // Importing Metadata component
import { getAllReviewsAdmin } from "../actions/AdminReviews"; // Importing action to fetch all reviews for admin
import { deleteReview } from "../actions/DeleteReviews"; // Importing action to delete a review
import { Navigate } from "react-router-dom";

// Reviews component definition
const Reviews = () => {
  // State variable for productId
  const [productId, setProductId] = useState("");

  // Selecting adminReviews state using useSelector hook
  const { adminReviews } = useSelector((state) => state.adminReviews);

  // Retrieving isAuthenticated and user state from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Columns configuration for the DataGrid
  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 270, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Comments",
      minWidth: 230,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Ratings",
      type: "number",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "number",
      width: "200",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <button
              className="btn btn-sm text-danger"
              onClick={() => handleDeleteReview(params.row.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>
          </div>
        );
      },
    },
  ];

  // Array to store rows data
  const rows = [];

  // Mapping adminReviews data to rows array
  adminReviews &&
    adminReviews.map((review) => {
      return rows.push({
        id: review._id,
        name: review.firstName + " " + review.lastName,
        comment: review.comment,
        rating: review.rating,
      });
    });

  // Function to handle review deletion
  const handleDeleteReview = async (id) => {
    await dispatch(deleteReview(productId, id)); // Dispatching deleteReview action
    dispatch(getAllReviewsAdmin(productId)); // Fetching all reviews after deletion
  };

  // Function to handle getting reviews based on productId
  const handleGetReviews = (e) => {
    e.preventDefault();
    dispatch(getAllReviewsAdmin(productId)); // Function to handle getting reviews based on productId
  };

  // Redirecting user if not authorized
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />;
  }

  // Redirecting unauthenticated users to login page
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container">
      <Metadata title={"Product Reviews - Admin"} />
      <div className="my-2">
        <h3 className="d-flex justify-content-center">All Reviews</h3>
      </div>
      <div className="my-3">
        {/* Form to input productId */}
        <form onSubmit={handleGetReviews}>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              {/* Input field for productId */}
              <input
                type="search"
                className="form-control search-reviews border-secondary-subtle rounded-0 border-secondary-subtle rounded-start-5 ps-3 py-2"
                placeholder="Enter Product Id"
                onChange={(e) => setProductId(e.target.value)}
                value={productId}
              />
            </div>
            <div>
              {/* Button to search reviews */}
              <button className="btn btn-dark rounded-0 rounded-end-5 py-2">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="my-5">
        {/* Conditional rendering based on adminReviews length */}
        {adminReviews && adminReviews.length === 0 ? (
          <div className="d-flex justify-content-center pt-5">
            <h1 className="fw-bold no-products-heading">No Reviews</h1>
          </div>
        ) : (
          // DataGrid component to display reviews
          <DataGrid
            columns={columns}
            rows={rows}
            disableRowSelectionOnClick
            autoHeight
            pageSizeOptions={[5, 10, 25, 100]}
          />
        )}
      </div>
    </div>
  );
};

// Exporting Reviews component
export default Reviews;
