import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel"; // Importing FloatingLabel component from react-bootstrap
import Form from "react-bootstrap/Form"; // Importing Form component from react-bootstrap
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux for managing state
import { Link, useNavigate } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import Metadata from "../../Metadata"; // Importing Metadata component for setting page title
import { ForgotUserPassword } from "../actions/User"; // Importing action for user password recovery

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State for storing email input value

  const navigate = useNavigate(); // Hook for programmatic navigation
  const dispatch = useDispatch(); // Dispatcher for dispatching actions

  const { isLoading } = useSelector((state) => state.user); // Extracting loading state from Redux store

  // Function to handle forgot password submission
  const handleForgotPassword = (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    dispatch(ForgotUserPassword(email)); // Dispatching action for user password recovery
  };

  return (
    <div className="pb-5">
      {/* Setting metadata title */}
      <Metadata title={"Recover Your Apple ID - Apple"} />
      <div className="container pb-5">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h5 fw-semibold m-0">Apple ID</div>
          <div className="d-flex align-items-center gap-3">
            {/* Link to sign in page */}
            <div>
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
                    {/* Form for email input and submission */}
                    <Form onSubmit={handleForgotPassword}>
                      <FloatingLabel label="Email address">
                        <Form.Control
                          type="email"
                          className="border border-secondary-subtle mb-4"
                          placeholder="name@example.com"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </FloatingLabel>
                      <div>
                        {/* Submit button */}
                        <button
                          className="btn px-4 forgot-password-btn"
                          disabled={isLoading}
                        >
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
                {/* Image */}
                <div>
                  <img
                    src="https://appleid.cdn-apple.com/iforgot/static/bin/cb7953610/dist/assets/profile.svg"
                    style={{ width: "60px", height: "60px" }}
                    alt=""
                  />
                </div>
                {/* Information */}
                <div>
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

export default ForgotPassword;
