import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Metadata from "../../Metadata";
import { getStripeApiKey } from "../actions/StripeApiKey";
import { RegisterUser } from "../actions/User";

// Component for user signup
const Signup = () => {
  // State variables for managing form input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux store access
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Function to handle user signup
  const handleSignup = async (e) => {
    e.preventDefault();
    // Format date of birth to ISO string
    const formattedDob = new Date(dob).toISOString();
    // Dispatch action to register user and get Stripe API key
    await dispatch(
      RegisterUser(firstName, lastName, formattedDob, avatar, email, password)
    );
    dispatch(getStripeApiKey());
  };

  // Function to handle image selection for avatar
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

  // Function to handle image removal
  const handleRemoveimage = () => {
    setAvatar(null);
    const inputElement = document.getElementById("profile-picture");
    if (inputElement) {
      inputElement.value = "";
    }
  };

  // Scroll to top and add event listener on component mount
  useEffect(() => {
    window.scroll(0, 0);
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Redirect authenticated users to home page
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  // Render signup form
  return (
    <div className="container my-4">
      {/* Metadata component for setting page title */}
      <Metadata title={"Sign up"} />
      <div className="row justify-content-center pb-5">
        <div className="col-lg-6">
          <Form onSubmit={handleSignup}>
            <h2 className="text-center fw-bold">Create Your Apple ID</h2>
            <p className="text-center">
              One Apple ID is all you need to access all Apple Services.
            </p>
            <div className="d-flex gap-3 mb-3">
              {/* Input fields for first and last name */}
              <FloatingLabel label="First Name">
                <Form.Control
                  type="text"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </FloatingLabel>
              <FloatingLabel label="Last Name">
                <Form.Control
                  type="text"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </FloatingLabel>
            </div>
            <div className="mb-4">
              {/* Input field for date of birth */}
              <label htmlFor="dob" className="form-label text-secondary">
                Date of Birth
              </label>
              <div>
                <input
                  type="date"
                  className="form-control p-3 border border-secondary-subtle text-secondary rounded-1"
                  onChange={(e) => setDob(e.target.value)}
                  value={dob}
                />
              </div>
            </div>
            <hr className="text-secondary" />
            <div className="mb-3">
              {/* Input field for selecting profile picture */}
              <label
                htmlFor="profile-picture"
                className="form-label text-secondary"
              >
                Profile Picture
              </label>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="w-100">
                  <input
                    id="profile-picture"
                    type="file"
                    className="form-control"
                    placeholder="Profile Picture"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="d-flex align-items-center">
                  {/* Avatar preview */}
                  <Avatar
                    src={avatar}
                    sx={{ width: "35px", height: "35px" }}
                  ></Avatar>
                  {/* Button to remove selected image */}
                  {avatar && (
                    <button
                      className="btn btn-sm p-1"
                      onClick={handleRemoveimage}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              {/* Input field for email address */}
              <FloatingLabel label="Email address">
                <Form.Control
                  type="email"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FloatingLabel>
              <div className="form-text">This will be your new Apple ID.</div>
            </div>
            <div className="mb-3">
              {/* Input field for password */}
              <FloatingLabel label="Password">
                <Form.Control
                  type="password"
                  className="border border-secondary-subtle rounded-3"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FloatingLabel>
            </div>
            <div className="d-grid mb-3">
              {/* Button to submit signup form */}
              <button className="btn btn-dark rounded-1" disabled={isLoading}>
                Create Account
              </button>
            </div>
            {/* Link to login page */}
            <div>
              <span>Already have an account? </span>
              <Link to={"/login"} className="text-decoration-none">
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
