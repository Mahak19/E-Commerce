import { Avatar } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Metadata from "../../Metadata";
import { LogoutUser } from "../actions/User";

// Define the Account component
const Account = () => {
  // Extracting data from Redux store
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Logout function
  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Render account information
  return (
    <div className="container">
      <Metadata title={"Account"} />
      <div className="d-flex align-items-center justify-content-between">
        <div className="h5 fw-semibold m-0">Apple ID</div>
        <div>
          <small>
            <button className="btn btn-sm sign-out-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </small>
        </div>
      </div>
      <hr />
      <div className="row my-5">
        <div className="col-lg-4">
          <div>
            <Avatar
              src={user && user.avatar && user.avatar.avatar_url}
              sx={{ width: "80px", height: "80px" }}
            ></Avatar>
            <div className="my-4">
              {/* User name and email */}
              <h5 className="mb-0 fw-bold">
                {user && user.firstName} {user && user.lastName}
              </h5>
              <small className="text-secondary">{user && user.email}</small>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div>
            <h2 className="fw-bold account-heading">Personal Information</h2>
            <small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed id
              iure a quidem inventore, laudantium dolor quis ut esse facilis.
            </small>
            <div className="row gy-4 my-5">
              {/* Update profile section */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="d-flex align-items-start justify-content-between pt-3 px-3 pb-5">
                    <div>
                      <h6 className="mb-0">Update Your Profile</h6>
                      <small className="text-secondary">
                        {user && user.email}
                      </small>
                    </div>
                    {/* Link to update profile */}
                    <div>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => (
                          <Tooltip id="button-tooltip" {...props}>
                            Update Profile
                          </Tooltip>
                        )}
                      >
                        <Link to={"/update/profile"}>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </Link>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
              {/* Update password section */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="d-flex align-items-start justify-content-between pt-3 px-3 pb-5">
                    <div>
                      <h6 className="mb-0">Password</h6>
                      <small className="text-secondary">
                        Last Updated{" "}
                        {format(
                          new Date(user && user.passwordUpdatedAt),
                          "MMMM dd, yyyy"
                        )}
                      </small>
                    </div>
                    {/* Link to update password */}
                    <div>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={(props) => (
                          <Tooltip id="button-tooltip" {...props}>
                            Update Password
                          </Tooltip>
                        )}
                      >
                        <Link to={"/update/password"}>
                          <i className="fa-solid fa-key account-icon"></i>
                        </Link>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
              {/* Account security section */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="d-flex align-items-start justify-content-between pt-3 px-3 pb-5">
                    <div>
                      <h6 className="mb-0">Account Security</h6>
                      <small className="text-secondary">
                        JWT Authentication Security
                      </small>
                    </div>
                    <div>
                      <i className="fa-solid fa-shield-halved account-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
              {/* App-specific password section */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="d-flex align-items-start justify-content-between pt-3 px-3 pb-5">
                    <div>
                      <h6 className="mb-0">App-Specific Password</h6>
                      <small className="text-secondary">View details</small>
                    </div>
                    <div>
                      <i className="fa-solid fa-eye account-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
