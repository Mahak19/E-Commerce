import { Avatar } from "@mui/material"; // Import Avatar component from Material-UI
import React, { useState } from "react"; // Import React and useState hook
import FloatingLabel from "react-bootstrap/FloatingLabel"; // Import FloatingLabel component from react-bootstrap
import Form from "react-bootstrap/Form"; // Import Form component from react-bootstrap
import OverlayTrigger from "react-bootstrap/OverlayTrigger"; // Import OverlayTrigger component from react-bootstrap for displaying tooltips
import Tooltip from "react-bootstrap/Tooltip"; // Import Tooltip component from react-bootstrap
import { useDispatch, useSelector } from "react-redux"; // Import useSelector and useDispatch hooks from react-redux for managing state
import { Navigate, useNavigate } from "react-router-dom"; // Import Navigate and useNavigate from react-router-dom for navigation
import { UpdateUserProfile, UserProfile } from "../actions/User"; // Import actions for updating user profile and fetching user profile

// Define the UpdateProfile component
const UpdateProfile = () => {
  // Extracting necessary states from the Redux store
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.updateProfile);

  // Initializing local state variables
  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [avatar, setAvatar] = useState(
    user.avatar && user.avatar.avatar_url !== "" ? user.avatar.avatar_url : null
  );

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Navigation hook
  const navigate = useNavigate();

  // Event handler for changing user avatar
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  // Event handler for removing user avatar
  const handleRemoveImage = () => {
    setAvatar(null);
  };

  // Event handler for updating user profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    await dispatch(UpdateUserProfile(firstName, lastName, email, avatar));
    await dispatch(UserProfile());
    navigate("/account");
  };

  // Redirect to home page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  // Rendering the component
  return (
    <div className="container">
      <div className="row my-4 justify-content-center">
        <div className="col-lg-7 mb-5">
          <h3 className="fw-bold pb-5">Edit profile</h3>
          <Form className="mb-5" onSubmit={handleUpdateProfile}>
            {/* User avatar */}
            <div className="card bg-secondary-subtle mb-3">
              <div className="d-flex align-items-center justify-content-between p-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center">
                    {/* Display user avatar */}
                    <Avatar
                      sx={{ width: "60px", height: "60px" }}
                      src={avatar}
                    ></Avatar>
                    {/* Remove avatar button */}
                    {avatar && (
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => (
                          <Tooltip id="button-tooltip" {...props}>
                            Remove
                          </Tooltip>
                        )}
                      >
                        <button
                          className="btn btn-sm"
                          onClickCapture={handleRemoveImage}
                        >
                          <i
                            className="fa-solid fa-xmark"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </button>
                      </OverlayTrigger>
                    )}
                  </div>
                  {/* Display user name */}
                  <div>
                    <span>
                      {user && user.firstName} {user && user.lastName}
                    </span>
                  </div>
                </div>
                {/* Change avatar button */}
                <div>
                  <label
                    htmlFor="file-upload"
                    className="custom-file-upload"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="btn btn-sm btn-primary">Change Photo</div>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            {/* User profile inputs */}
            <div className="d-flex align-items-center gap-2">
              <div className="mb-3">
                <FloatingLabel label="First Name">
                  <Form.Control
                    type="text"
                    className="border border-secondary-subtle rounded-3"
                    placeholder="kanish"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </FloatingLabel>
              </div>
              <div className="mb-3">
                <FloatingLabel label="Last Name">
                  <Form.Control
                    type="text"
                    className="border border-secondary-subtle rounded-3"
                    placeholder="mohariya"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </FloatingLabel>
              </div>
            </div>
            <div className="mb-3">
              <FloatingLabel label="Email">
                <Form.Control
                  type="email"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="mohariya"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FloatingLabel>
            </div>
            {/* Update profile button */}
            <div className="d-grid">
              <button className="btn btn-dark" disabled={isLoading}>
                {/* Display loading text when updating */}
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

// Export the UpdateProfile component
export default UpdateProfile;
