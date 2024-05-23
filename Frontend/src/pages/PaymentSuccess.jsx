import React from "react";
import { useNavigate } from "react-router-dom";
import Metadata from "../../Metadata";

// Component for displaying payment success message
const PaymentSuccess = () => {
  // Navigate hook for redirecting
  const navigate = useNavigate();

  // Rendering the PaymentSuccess component
  return (
    <div className="container">
      {/* Metadata component for setting page title */}
      <Metadata title={"Payment Success"} />
      <div className="row my-5 pb-5 d-flex justify-content-center">
        <div className="col-lg-7 my-5">
          <div className="card bg-body-tertiary p-5">
            <div className="d-flex justify-content-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="currentColor"
                className="bi bi-check-circle text-success"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
            </div>
            <div className="d-flex justify-content-center mb-3">
              {/* Heading indicating order placed successfully */}
              <h1 className="order-heading">Order Placed Successfully</h1>
            </div>
            <div className="d-flex justify-content-center">
              {/* Button to view orders */}
              <button
                onClick={() => navigate("/orders")}
                className="btn text-light rounded-0 view-order-btn"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
