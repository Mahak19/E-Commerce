import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/MyOrders";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Loading from "./Loading";

// Component to display order details
const OrderDetails = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Redux state variable to store order details
  const { isLoading, orderDetails } = useSelector(
    (state) => state.orderDetails
  );

  // Extracting order ID from URL parameters
  const { id } = useParams();

  // Effect hook to fetch order details based on the ID
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch]);

  // Rendering the OrderDetails component
  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row d-flex justify-content-center my-5 pb-5">
          <div className="col-lg-11">
            <div>
              <h2>Your Order</h2>
            </div>
            <div className="card my-4">
              <div className="card-body bg-secondary-subtle">
                <div className="row gy-3">
                  <div className="col-lg-3">
                    <div>
                      <small className="d-block text-uppercase">
                        Order Placed
                      </small>
                      <small>
                        {orderDetails &&
                          format(
                            new Date(orderDetails && orderDetails.createdAt),
                            "dd MMMM yyyy"
                          )}
                      </small>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div>
                      <small className="d-block text-uppercase">Total</small>
                      <small>₹{orderDetails && orderDetails.totalPrice}</small>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-end">
                    <div>
                      <small className="d-block text-secondary">
                        ORDER # {orderDetails && orderDetails._id}
                      </small>
                      <small className="d-flex justify-content-end">
                        Status:
                        <span
                          className={
                            orderDetails &&
                            orderDetails.orderStatus === "Processing"
                              ? "text-danger mx-2"
                              : orderDetails &&
                                orderDetails.orderStatus === "Shipped"
                              ? "text-warning mx-2"
                              : "text-success mx-2"
                          }
                        >
                          {orderDetails && orderDetails.orderStatus}
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h4 className="mb-0 fw-bold">Successful</h4>
                  <small className="">
                    Paid on:{" "}
                    {orderDetails &&
                      format(
                        new Date(orderDetails && orderDetails.paidAt),
                        "dd MMMM yyyy"
                      )}
                  </small>
                </div>
                {orderDetails &&
                  orderDetails.orderItems &&
                  orderDetails.orderItems.map((item) => {
                    return (
                      <div key={item._id} className="row gy-4 my-5">
                        <div className="col-lg-3 d-flex justify-content-center">
                          <img
                            style={{ maxHeight: "200px", maxWidth: "200px" }}
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="col-lg-5">
                          <p className="mb-2 text-secondary"># {item._id}</p>
                          <p className="mb-2 fw-bold">{item.name}</p>
                          <p className="mb-2">₹ {item.price}</p>
                        </div>
                        <div className="col-lg-3">
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr />
              <div className="card-body">
                <h4 className="text-center">
                  Payment And Shipping Information
                </h4>
                <div className="row gy-4 my-5">
                  <div className="col-lg-6 d-flex">
                    <div>
                      <p className="">
                        Payment Id:{" "}
                        {orderDetails &&
                          orderDetails.paymentInfo &&
                          orderDetails.paymentInfo.id}
                      </p>
                      <p className="">
                        Payment Status:{" "}
                        {orderDetails &&
                          orderDetails.paymentInfo &&
                          orderDetails.paymentInfo.status}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex">
                    <div>
                      <p>
                        Address:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.address}
                      </p>
                      <p>
                        City:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.city}
                      </p>
                      <p>
                        Pin Code:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.pinCode}
                      </p>
                      <p>
                        State:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.state}
                      </p>
                      <p>
                        Country:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.country}
                      </p>
                      <p>
                        Phone Number:{" "}
                        {orderDetails &&
                          orderDetails.shippingInfo &&
                          orderDetails.shippingInfo.phoneNo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="card-body">
                <div className="row d-flex justify-content-end">
                  <div className="col-lg-6">
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <p className="mb-0">Subtotal</p>
                      </div>
                      <div>
                        <span>₹ {orderDetails && orderDetails.itemsPrice}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <p className="mb-0">Tax</p>
                      </div>
                      <div>
                        <span>₹ {orderDetails && orderDetails.taxPrice}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <div>
                        <p className="mb-0 fs-4 fw-semibold">Total</p>
                      </div>
                      <div>
                        <span className="fs-4 fw-semibold">
                          ₹ {orderDetails && orderDetails.totalPrice}
                        </span>
                      </div>
                    </div>
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

export default OrderDetails;
