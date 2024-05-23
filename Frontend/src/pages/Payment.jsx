import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Metadata from "../../Metadata";
import { createNewOrder } from "../actions/Order";

// Payment component for processing payments
const Payment = () => {
  // Redux selectors for retrieving state variables
  const { apiKey } = useSelector((state) => state.stripeApiKey);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const orderSum = JSON.parse(sessionStorage.getItem("orderInfo"));

  // State variables
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // Stripe elements and stripe instance
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  // Redux dispatch function
  const dispatch = useDispatch();

  // Payment and order details
  const payment = {
    amount: Math.round(orderSum.total * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderSum.subtotal,
    taxPrice: orderSum.taxes,
    totalPrice: orderSum.total,
  };

  // Function to submit payment
  const submitPayment = async (e) => {
    e.preventDefault();
    setIsPaymentProcessing(true);

    try {
      const { data } = await axios.post(
        "/api/api/v1/process/payment",
        payment,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${user.firstName} ${user.lastName}`,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
              postal_code: shippingInfo.pinCode,
            },
          },
        },
      });

      if (result.error) {
        setIsPaymentProcessing(false);
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createNewOrder(order));
          navigate("/payment/success");
        } else {
          toast.error("Payment failed try again later");
        }
      }
    } catch (error) {
      setIsPaymentProcessing(false);
      toast.error(error.response.data.message);
    }
  };

  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Rendering the Payment component
  return (
    <div>
      {apiKey && (
        <div>
          <div className="container">
            <Metadata title={"Payment"} />
            <div className="row d-flex justify-content-center my-3 pb-5">
              <div className="col-lg-11 mb-4">
                <div className="d-flex justify-content-between align-items-end">
                  <div>
                    <div className="mb-0 shipping-text">Checkout</div>
                  </div>
                  <div>
                    <small style={{ color: "#06c" }}>
                      Order Summary: ₹{orderSum && orderSum.total}
                    </small>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="my-5">
                  <h1 className="payment-heading">How do you want to pay?</h1>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <form onSubmit={submitPayment}>
                      <div className="mb-3">
                        <label htmlFor="card-no" className="form-label">
                          Enter your card information.
                        </label>
                        <CardNumberElement
                          className="form-control p-3 border border-secondary-subtle"
                          id="card-no"
                        />
                      </div>
                      <div className="d-flex justify-content-between gap-2 mb-3">
                        <div className="w-100">
                          <CardExpiryElement className="form-control p-3 border border-secondary-subtle" />
                        </div>
                        <div className="w-100">
                          <CardCvcElement className="form-control p-3 border border-secondary-subtle" />
                        </div>
                      </div>
                      <div className="">
                        <button
                          disabled={isPaymentProcessing}
                          className="checkout-btn"
                        >
                          {isPaymentProcessing ? (
                            "Paying..."
                          ) : (
                            <> Pay –– ₹{orderSum && orderSum.total} </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
