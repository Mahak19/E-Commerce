import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, Navigate, useLocation } from "react-router-dom";
import Metadata from "../../Metadata";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../actions/User";
import { getStripeApiKey } from "../actions/StripeApiKey";

// Login component for user authentication
const Login = () => {
  // State variables for email, password, and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redux state variables for user authentication and loading status
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Function to toggle password visibility
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(LoginUser(email, password));
    dispatch(getStripeApiKey());
  };

  // Effect hook to scroll to the top of the page on component mount
  useEffect(() => {
    window.scroll(0, 0);
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Extracting redirect URL from location
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/account";

  // Redirecting user if already authenticated
  if (isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  // Rendering the login form
  return (
    <div className="container">
      <Metadata title={"Login"} />
      <div className="mx-5 my-4">
        <h1 className="fw-bold login-text">Sign in for faster checkout.</h1>
      </div>
      <div className="row justify-content-center my-5 mx-1 pb-5">
        <div className="col-lg-6">
          <Form onSubmit={handleLogin}>
            <h4 className="text-center login-text-heading fw-semibold mb-4 ">
              Sign in to Apple Store
            </h4>
            <div className="mb-3">
              <FloatingLabel label="Email address">
                <Form.Control
                  type="email"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FloatingLabel>
            </div>
            <div className="mb-3">
              <FloatingLabel label="Password">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className="border border-secondary-subtle rounded-3"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FloatingLabel>
            </div>
            <div className="mb-2 d-flex justify-content-between">
              <div className="d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="show-password"
                    value={""}
                    onChange={handleShowPassword}
                  />
                  <label htmlFor="show-password" className="form-label">
                    Show Password
                  </label>
                </div>
              </div>
              <div>
                <Link to={"/forgot/password"} className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="d-grid mb-3">
              <button className="btn btn-dark rounded-1" disabled={isLoading}>
                Login
              </button>
            </div>
            <div>
              <span>Don't have an account yet? </span>
              <Link to={"/new"} className="text-decoration-none">
                Sign up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
