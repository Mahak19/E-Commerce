import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector and useDispatch hooks from react-redux
import { getUserDetails } from "../actions/UserDetails"; // Importing action to fetch user details
import { useParams, useNavigate, Navigate } from "react-router-dom"; // Importing useParams and useNavigate hooks from react-router-dom
import Metadata from "../../Metadata"; // Importing Metadata component
import { Avatar } from "@mui/material"; // Importing Avatar component from MUI
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap
import { differenceInYears } from "date-fns"; // Importing differenceInYears function from date-fns
import { updateUserRole } from "../actions/UpdateUserRole"; // Importing action to update user role
import { UserProfile } from "../actions/User"; // Importing action to fetch user profile

// UpdateUserRole component
const UpdateUserRole = () => {
  // State variables to manage user details and role
  const [age, setAge] = useState(null);
  const [role, setRole] = useState("");

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Navigation function for routing
  const navigate = useNavigate();

  // Selecting userDetails,isAuthenticated and user states from Redux store
  const { userDetails } = useSelector((state) => state.userDetails);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Getting user ID from URL params
  const { id } = useParams();

  // Function to handle role change
  const handleRoleChange = async (e) => {
    e.preventDefault();
    await dispatch(updateUserRole(id, role)); // Dispatching action to update user role
    // Refreshing user details if the updated user is not the logged-in user
    if (user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      // Refreshing user profile if the updated user is the logged-in user
      dispatch(UserProfile());
      // Navigating to account page
      navigate("/account");
    }
  };

  // Redirecting user if not authorized
  if (user && user.role && user.role === "user") {
    return <Navigate to={"/"} />;
  }

  // Redirecting unauthenticated users to login page
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Effect hook to fetch user details
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch]);

  // Effect hook to calculate user's age based on date of birth
  useEffect(() => {
    if (userDetails && userDetails.dob) {
      const calculateAge = differenceInYears(
        new Date(),
        new Date(userDetails.dob)
      );
      setAge(calculateAge);
    }
  }, [userDetails]);

  return (
    <div className="container">
      <Metadata title={"Update Role - Admin"} />
      <div className="row my-5">
        <div className="col-lg-12">
          <div className="container">
            {/* User profile section */}
            <div className="d-flex justify-content-center">
              <Avatar
                src={
                  userDetails &&
                  userDetails.avatar &&
                  userDetails.avatar.avatar_url
                    ? userDetails.avatar.avatar_url
                    : ""
                }
                sx={{ width: "100px", height: "100px" }}
              ></Avatar>
            </div>
            <div className="d-flex justify-content-center">
              <div className="my-4">
                <h4 className="mb-0 fw-bold d-flex justify-content-center">
                  {userDetails && userDetails.firstName}{" "}
                  {userDetails && userDetails.lastName}
                </h4>
                <small className="text-secondary d-flex justify-content-center">
                  {userDetails && userDetails.email}
                </small>
              </div>
            </div>
            {/* Displaying user role and age */}
            <div className="d-flex justify-content-evenly align-items-center">
              <div>
                <p className="">Role: {userDetails && userDetails.role}</p>
              </div>
              <div>
                <p>Age: {age === 0 ? "Not Added" : age}</p>
              </div>
            </div>
            {/* Form to update user role */}
            <div className="row d-flex justify-content-center my-4">
              <div className="col-lg-6">
                <Form onSubmit={handleRoleChange}>
                  <div className="mb-4">
                    <Form.Select
                      className="py-3 rounded-1 border-secondary-subtle"
                      aria-label="Default select example"
                      onChange={(e) => setRole(e.target.value)}
                      value={role}
                    >
                      <option value="">Update Role</option>
                      {/* Conditional rendering based on current user role */}
                      {userDetails && userDetails.role === "admin" && (
                        <option value="user">User</option>
                      )}
                      {userDetails && userDetails.role === "user" && (
                        <option value="admin">Admin</option>
                      )}
                    </Form.Select>
                  </div>
                  {/* Button to update user role */}
                  <div className="row d-flex justify-content-end">
                    <div className="col-lg-4">
                      <button disabled={role === ""} className="checkout-btn">
                        Set
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting UpdateUserRole component
export default UpdateUserRole;
