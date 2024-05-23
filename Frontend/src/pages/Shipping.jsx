import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Metadata from "../../Metadata";
import { Country, State } from "country-state-city";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import { saveShippingInfo } from "../actions/Cart";

// Component for managing shipping details during checkout
const Shipping = () => {
  // Redux store access
  const { isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo, orderSummary } = useSelector((state) => state.cart);

  // State variables for managing form input
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Function to handle form submission for shipping details
  const handleSubmitShippingDetails = (e) => {
    e.preventDefault();
    // Validation for empty fields
    if (!country || country === "Country") {
      toast.error("Please select a country");
      return;
    }

    if (!state || state === "State") {
      toast.error("Please select a state");
      return;
    }

    if (!city) {
      toast.error("Please enter the city");
      return;
    }

    if (!pinCode) {
      toast.error("Please enter the pin code");
      return;
    }

    if (!address) {
      toast.error("Please enter the address");
      return;
    }

    // Validating phone number
    if (!phoneNo || phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Should be 10 digits");
      return;
    }
    // Dispatch action to save shipping info and navigate to order confirmation
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  // Redirect to login if user is not authenticated
  if (isAuthenticated === false) {
    return <Navigate to={"/login"} />;
  }

  // Rendering the Shipping component
  return (
    <div className="container">
      {/* Metadata component for setting page title */}
      <Metadata title={"Shipping Details - Secure Checkout"} />
      <div className="row d-flex justify-content-center my-3 pb-4">
        <div className="col-lg-11">
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <div className="mb-0 shipping-text">Checkout</div>
            </div>
            <div>
              {/* Displaying order summary */}
              <small className="" style={{ color: "#06c" }}>
                Show Order Summary: ₹{orderSummary.total}
              </small>
            </div>
          </div>
          <hr className="my-2" />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-11">
          <h1 className="shipping-header">Where should we send your order?</h1>
          <div className="row my-5">
            <div className="col-lg-6">
              {/* Form for entering shipping details */}
              <Form onSubmit={handleSubmitShippingDetails}>
                <h2 className="form-header mb-4">Enter your address:</h2>
                <div className="mb-3">
                  {/* Dropdown for selecting country */}
                  <Form.Select
                    className="p-3 border border-secondary-subtle rounded-3"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    <option>Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </Form.Select>
                </div>
                <div className="mb-3">
                  {/* Dropdown for selecting state */}
                  {country && (
                    <Form.Select
                      className="p-3 border border-secondary-subtle rounded-3"
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                    >
                      <option>State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </Form.Select>
                  )}
                </div>
                <div className="mb-3">
                  {/* Input field for city */}
                  <FloatingLabel label="City">
                    <Form.Control
                      type="text"
                      className="border border-secondary-subtle rounded-3"
                      placeholder="City"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    />
                  </FloatingLabel>
                </div>
                <div className="mb-3">
                  {/* Input field for pin code */}
                  <FloatingLabel label="Pin Code">
                    <Form.Control
                      type="text"
                      className="border border-secondary-subtle rounded-3"
                      placeholder="Pin Code"
                      onChange={(e) => setPinCode(e.target.value)}
                      value={pinCode}
                    />
                  </FloatingLabel>
                </div>
                <div className="mb-3">
                  {/* Input field for street address */}
                  <FloatingLabel label="Street Address">
                    <Form.Control
                      type="text"
                      className="border border-secondary-subtle rounded-3"
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </FloatingLabel>
                </div>
                <div className="mb-5">
                  {/* Input field for phone number */}
                  <FloatingLabel label="Phone Number">
                    <Form.Control
                      type="text"
                      className="border border-secondary-subtle rounded-3"
                      placeholder="address"
                      onChange={(e) => setPhoneNo(e.target.value)}
                      value={phoneNo}
                      size="10"
                    />
                  </FloatingLabel>
                </div>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-lg-7">
                      {/* Button to continue */}
                      <button className="checkout-btn">Continue</button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
