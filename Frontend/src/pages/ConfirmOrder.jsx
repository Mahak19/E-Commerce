import React from "react";
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux for accessing state
import { Navigate, useNavigate } from "react-router-dom"; // Importing Navigate and useNavigate hooks from react-router-dom for navigation
import Metadata from "../../Metadata"; // Importing Metadata component for setting page title

const ConfirmOrder = () => {
  // Extracting user authentication status and user information from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Extracting cart items, shipping information, and order summary from Redux store
  const { cartItems, shippingInfo, orderSummary } = useSelector(
    (state) => state.cart
  );

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle payment process
  const handlePayment = () => {
    const data = {
      subtotal: orderSummary.subtotal,
      taxes: orderSummary.taxes,
      total: orderSummary.total,
    };

    // Storing order information in session storage
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    // Redirecting to payment page
    navigate("/process/payment");
  };

  // Redirecting to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container">
      {/* Setting metadata title */}
      <Metadata title={"Confirm Order"} />
      <div className="row d-flex justify-content-center pb-5 my-5">
        <div className="col-md-12">
          <div className="row ">
            <div className="col-md-7">
              <div>
                <h4 className="fw-bold cart-text text-center">Cart Items</h4>
                {cartItems &&
                  cartItems.length > 0 &&
                  cartItems.map((item) => {
                    return (
                      <div
                        className="row my-5 d-flex align-items-center"
                        key={item.product}
                      >
                        <div className="col-md-3 d-flex justify-content-center">
                          {/* Displaying item image */}
                          <img
                            src={item.image}
                            style={{ maxHeight: "130px", maxWidth: "130px" }}
                            className="mb-3"
                            alt=""
                          />
                        </div>
                        <div className="col-md-6">
                          <p className="confirm-order-cart-name">{item.name}</p>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <p className="d-flex justify-content-center">
                              ₹{item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-5 border-secondary-subtle border-start">
              <div>
                <h4 className="fw-bold cart-text text-center">
                  Shipping Info And Summary
                </h4>
                <div className="my-5">
                  <div className="">
                    Name: {user.firstName} {user.lastName}
                  </div>
                  <div className="">Phone Number: {shippingInfo.phoneNo}</div>
                  <div className="">
                    Address: {shippingInfo.address} {shippingInfo.city}{" "}
                    {shippingInfo.pinCode} {shippingInfo.state}{" "}
                    {shippingInfo.country}
                  </div>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Subtotal</div>
                      <div>₹{orderSummary.subtotal}</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Shipping</div>
                      <div>FREE</div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>GST</div>
                      <div>₹{orderSummary.taxes}</div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-bold">Total</div>
                      <div>₹{orderSummary.total}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Button to initiate payment */}
              <button className="checkout-btn" onClick={handlePayment}>
                Make a payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
