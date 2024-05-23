import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useParams, useNavigate } from "react-router-dom";
import Metadata from "../../Metadata";
import { useDispatch } from "react-redux";
import { ResetUserPassword } from "../actions/User";

// Component for resetting user password
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  // Hook for navigation
  const navigate = useNavigate();

  // Extracting parameters from URL
  const params = useParams();

  // Function to handle resetting password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    await dispatch(ResetUserPassword(params.token, password, confirmPassword));
    navigate("/");
  };

  // Rendering the ResetPassword component
  return (
    <div className="pb-5">
      {/* Metadata component for setting page title */}
      <Metadata title={"Recover Your Apple ID - Apple"} />
      <div className="container pb-5">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h5 fw-semibold">Apple ID</div>
          <div className="d-flex align-items-center gap-3">
            <div>
              {/* Link to sign in */}
              <small>
                <Link to={"/login"} className="text-decoration-none text-dark">
                  Sign In
                </Link>
              </small>
            </div>
            <div>
              <small>FAQ</small>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-5">
          <h3 className="fw-bold">Reset your password</h3>
          <div className="row my-4 pb-5 gy-4">
            <div className="col-lg-7 border-end">
              <p>
                Enter your email address that you use with your account to
                continue.
              </p>
              <div className="container">
                <div className="row">
                  <div className="col-lg-7">
                    {/* Form for resetting password */}
                    <Form onSubmit={handleResetPassword}>
                      <FloatingLabel label="New Password">
                        {/* Input for new password */}
                        <Form.Control
                          type="password"
                          className="border border-secondary-subtle mb-4"
                          placeholder="name@example.com"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </FloatingLabel>
                      <FloatingLabel label="Confirm Password">
                        {/* Input for confirming password */}
                        <Form.Control
                          type="password"
                          className="border border-secondary-subtle mb-4"
                          placeholder="name@example.com"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          value={confirmPassword}
                        />
                      </FloatingLabel>
                      <div>
                        {/* Button to continue */}
                        <button className="btn px-4 forgot-password-btn">
                          Continue
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex container justify-content-center gap-4">
                <div>
                  {/* Image for illustration */}
                  <img
                    src="https://appleid.cdn-apple.com/iforgot/static/bin/cb7953610/dist/assets/profile.svg"
                    style={{ width: "60px", height: "60px" }}
                    alt=""
                  />
                </div>
                <div>
                  {/* Information for the user */}
                  <small className="text-secondary">
                    You’ve come to the right place to reset a forgotten
                    password. For your security, we’ll ask you a few questions
                    to verify that you’re the owner of this account.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
