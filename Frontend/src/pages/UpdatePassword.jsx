import React, { useState } from "react"; // Import React and useState hook
import { Form } from "react-bootstrap"; // Import Form component from react-bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel"; // Import FloatingLabel component from react-bootstrap
import { useDispatch, useSelector } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux for managing state
import { Navigate, useNavigate } from "react-router-dom"; // Import Navigate and useNavigate from react-router-dom for navigation
import Metadata from "../../Metadata"; // Import Metadata component for managing page metadata
import { UpdateUserPassword, UserProfile } from "../actions/User"; // Import actions for updating user password and fetching user profile

// Define the UpdatePassword component
const UpdatePassword = () => {
  // Extracting necessary states from the Redux store
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.updatePassword);

  // Initializing local state variables
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Navigation hook
  const navigate = useNavigate();

  // Event handler for updating user password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    // Dispatch action to update user password
    await dispatch(
      UpdateUserPassword(oldPassword, newPassword, confirmPassword)
    );
    // Dispatch action to fetch user profile
    await dispatch(UserProfile());
  };

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Rendering the component
  return (
    <div className="container">
      {/* Page metadata */}
      <Metadata title={"Update Password"} />
      <div className="mx-5 my-4">
        <h1 className="fw-bold login-text">Password Updation.</h1>
      </div>
      <div className="row justify-content-center my-5 mx-1 pb-5">
        <div className="col-lg-6">
          {/* Password update form */}
          <Form onSubmit={handleUpdatePassword}>
            <h4 className="text-center login-text-heading fw-semibold mb-4 ">
              Update Your Password
            </h4>
            {/* Old password input */}
            <div className="mb-3">
              <FloatingLabel label="Old Password">
                <Form.Control
                  type="password"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                />
              </FloatingLabel>
            </div>
            {/* New password input */}
            <div className="mb-3">
              <FloatingLabel label="New Password">
                <Form.Control
                  type="password"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </FloatingLabel>
            </div>
            {/* Confirm password input */}
            <div className="mb-3">
              <FloatingLabel label="Confirm Password">
                <Form.Control
                  type="password"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </FloatingLabel>
            </div>
            {/* Update password button */}
            <div className="d-grid mb-3">
              <button className="btn btn-dark rounded-1" disabled={isLoading}>
                Update
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

// Export the UpdatePassword component
export default UpdatePassword;
